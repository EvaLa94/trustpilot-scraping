/**
 * Scrape the results of a single trustpilot webpage
 * 
 * @param {object} page - An instance of Page created with puppeteer's method newPage
 * @returns {array} listOfReviews - An array of objects representing each a single review
 */
module.exports = scrapeSinglePage = async (page) => {
    return await page.evaluate(() => {
        const cards = document.querySelectorAll(".styles_reviewCardInner__EwDq2");
        const listOfReviews = [];
  
        for (const card of cards) {
          const reviewTitle = card.querySelector("h2").innerText;
          const reviewBody = card.querySelector("p").innerText;
          const reviewTime = card.querySelector("time").dateTime;
          const reviewStars = card.querySelector(
            "div[data-service-review-rating] img"
          ).alt;
  
          listOfReviews.push({
            reviewTitle,
            reviewBody,
            reviewTime,
            reviewStars,
          });
        }
        return listOfReviews;
      });
}