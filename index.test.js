const request = require("supertest");
const puppeteer = require("puppeteer");
const app = require("./app");
const DataBase = require("./databaseClass");
require("dotenv").config();
afterAll(() => {DataBase.deleteAll()})
const FULLURL = 'https://www.google.com/'

describe("Post Request To /api/shorturl", () => {
  
  it("Should return the short URL from the database after it was appended successfully", async () => { 
    const response = await request(app)
    .post('/api/shorturl')
    .send({"fullUrl": FULLURL});

    const responseJson = JSON.parse(response.text);
    const expectedShortUrl = await DataBase.isUrlExists(FULLURL);

    // Is the status code 200
    expect(response.status).toBe(200);
    // Are the URLs equal
    expect(responseJson["shortUrl"]).toBe(expectedShortUrl["shortUrl"]);
  });

  test("if an existed URL returns the proper message", async () => {
    const response = await request(app)
    .post('/api/shorturl')
    .send({"fullUrl": FULLURL});

    const responseJson = await JSON.parse(response.text);
    const expectedErrorMessage = "URL already exists";

    // Is the status code 200
    expect(response.status).toBe(200);
    // Are the error messages equal
    expect(responseJson["Error"]).toBe(expectedErrorMessage);
  });

  test("if an invalid URL returns the proper message", async () => {
    const inVlaidFullUrl = FULLURL.slice(0, 12)
    const response = await request(app)
    .post('/api/shorturl')
    .send({"fullUrl": inVlaidFullUrl});

    const responseJson = await JSON.parse(response.text);
    const expectedErrorMessage = "Invalid URL";

    // Is the status code 404
    expect(response.status).toBe(404);
    // Are the error messages equal
    expect(responseJson["Error"]).toBe(expectedErrorMessage);
  });
});


describe("Post Request To /api/statistics", () => {

  test("If the statistics page retrieved the data about the short URL correctly", async () => {
    const shortUrl = (await (DataBase.isUrlExists(FULLURL)))["shortUrl"];
    const urlObj = await DataBase.getFullUrlObjectByShortUrl(shortUrl);

    const response = await request(app).get(`/api/statistics/${shortUrl}`);
    const responseJson = JSON.parse(response.text);

    // Is the status code 200
    expect(response.status).toBe(200);
    // Are URL Objects equal
    expect(responseJson).toEqual(urlObj);
  });

  test("If the statistics page returns error in case short URL doesn't exist", async () => {
    const shortUrl = 'InValidURL';
    const response = await request(app).get(`/api/statistics/${shortUrl}`);
    const responseJson = JSON.parse(response.text);

    // Is the status code 404
    expect(response.status).toBe(404);
    // Are the error messages equal
    expect(responseJson["Error"]).toEqual(`no such short URL: ${shortUrl}`);
  });
});

describe("puppeteer test for client side", () => {
  const URL = 'http://localhost:3001';

  it.only("input field should be empty after the 'Shorten' button is clicked", async () => {
    await request(app).get('/');
    browser = await puppeteer.launch({
      headless: false,
      slowMo: 30
    });
    page = await browser.newPage();
    await page.goto(URL, { waitUntil: 'networkidle2' });
    const inputFiled = await page.$$("#url-input");
    console.log(inputFiled);
    await inputFiled.type(FULLURL);
    const shortenButton = await page.$("#submit-button");
    await shortenButton.click();
    expect(inputFiled.innerText).toBe("")
    await browser.close();
  },40000)

})
