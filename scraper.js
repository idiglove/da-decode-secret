const axios = require("axios");
const cheerio = require("cheerio");

async function scrapeWebsite(url) {
  try {
    // Fetch the HTML of the webpage
    const { data } = await axios.get(url);

    // Load the HTML into cheerio
    const $ = cheerio.load(data);

    const content = $("table tr")
      .toArray()
      .map((item) => {
        return $(item)
          .toArray()
          .map((td) =>
            $(td)
              .toArray()
              .map((p) => $(p).text())
          );
      });

    console.log(content);

    // Add more scraping logic here as needed
  } catch (error) {
    console.error("Error scraping the website:", error.message);
  }
}

// Replace with the URL you want to scrape
const url =
  "https://docs.google.com/document/d/e/2PACX-1vRMx5YQlZNa3ra8dYYxmv-QIQ3YJe8tbI3kqcuC7lQiZm-CSEznKfN_HYNSpoXcZIV3Y_O3YoUB1ecq/pub";

scrapeWebsite(url);
