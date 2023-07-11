const fs = require("fs");

 /**
  * Save the data in a new CSV file in UTF-8 format
  * 
  * @param {string} fileName - The name to be given to the file
  * @param {string} header - The values of the first column
  * @param {string} content - The content of the rows
  * 
  */
module.exports = saveDataToCsv = (fileName, header ,content) => {

    fs.appendFile(
      `${fileName}.csv`,
      header + content,
      { encoding: "utf8", bom: true },
      (err) => {
        if (err) {
          console.error(err);
        }
      }
    );
}