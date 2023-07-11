const puppeteer = require("puppeteer");
const saveDataToCsv = require('./saveDataToCsv');
const scrapeSinglePage = require('./scrapeSinglePage');

/**
 * Scrape the data from a trustpilot website and save it in a CSV file
 * 
 * @param {string} url - The url of the trustpilot page that needs to be scraped
 */
module.exports = scrapeData = async (url) => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "load" });

  const result = [];
  let count = 1;
  let isLastPage;

  const companyName = await page.$eval(".title_displayName__TtDDM", (el) =>
    el.innerText.trim()
  );

  while (!isLastPage) {
    const currentPageReviews = await scrapeSinglePage(page);

    result.push(...currentPageReviews);

    const tableContent = currentPageReviews
      .map(({ reviewTitle, reviewBody, reviewTime, reviewStars }) => {
        return `"${reviewTitle}";"${reviewBody}";"${reviewTime}";"${reviewStars}"\n`;
      })
      .join("");

    const tableHeader = "\ufeffTitle;Body;Time;Stars\n";

    saveDataToCsv(companyName, tableHeader, tableContent);

    isLastPage = await page.evaluate(() => {
      return document.querySelector('nav[role="navigation"] a[name="pagination-button-next"]').hasAttribute("aria-disabled");
    });

    if (!isLastPage) {
      count++;
      await page.goto(`${url}?page=${count}`, { waitUntil: "load" });
    }
  }

  await browser.close();
};
