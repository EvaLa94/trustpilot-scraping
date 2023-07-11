const scrapeData = require("./services/scrapeData");

const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

readline.question("Enter the trustpilot website to be scraped:", (answer) => {
  if (answer.includes("https://it.trustpilot.com/review/")) {
    scrapeData(answer);
  }
  readline.close();
});

/* TEST A FEW EXAMPLES:

  https://it.trustpilot.com/review/www.intondo.com
  https://it.trustpilot.com/review/roomlessrent.com

*/
