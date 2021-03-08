const request = require("supertest");
const app = require("./app");
const DataBase = require("./databaseClass");
const { getDataJsonbin } = require("./backend-utils");
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

    expect(response.status).toBe(200);
    expect(responseJson["shortUrl"]).toBe(expectedShortUrl["shortUrl"]);
  }, 40000);

  test("if an existed URL returns the proper message", async () => {
    const response = await request(app)
    .post('/api/shorturl')
    .send({"fullUrl": FULLURL});

    const responseJson = await JSON.parse(response.text);
    const expectedErrorMessage = "URL already exists";

    expect(response.status).toBe(200);
    expect(responseJson["Error"]).toBe(expectedErrorMessage);
  }, 40000);

  test("if an invalid URL returns the proper message", async () => {
    const inVlaidFullUrl = "http://ww.google.com"
    console.log("inVlaidFullUrl ", inVlaidFullUrl);
    const response = await request(app)
    .post('/api/shorturl')
    .send({"fullUrl": inVlaidFullUrl});

    const responseJson = await JSON.parse(response.text);
    console.log("responseJson ", responseJson);
    const expectedErrorMessage = "Invalid URL";

    expect(response.status).toBe(404);
    expect(responseJson["Error"]).toBe(expectedErrorMessage);
  }, 40000);
});


describe("Post Request To /api/statistics", () => {

  test("If the statistics page retrieved the data about the short URL correctly", async () => {
    const shortUrl = (await (DataBase.isUrlExists(FULLURL)))["shortUrl"];
    const urlObj = await DataBase.getFullUrlObjectByShortUrl(shortUrl);

    const response = await request(app).get(`/api/statistics/${shortUrl}`);
    const responseJson = JSON.parse(response.text);

    expect(response.status).toBe(200);
    expect(responseJson).toEqual(urlObj);
  }, 40000);

  test("If the statistics page returns error in case short URL doesn't exist", async () => {
    const shortUrl = 'InValidURL';
    const response = await request(app).get(`/api/statistics/${shortUrl}`);
    const responseJson = JSON.parse(response.text);

    expect(response.status).toBe(404);
    expect(responseJson["Error"]).toEqual(`no such short URL: ${shortUrl}`);
  }, 40000);
});

describe("Delete request to /api/shorturl", () => {
  it("should delete all urls from the database", async () => {
    const response = await request(app).delete(`/api/shorturl/`);
    const serverMessage = JSON.parse(response.text);
    const allUrlsObjects = await getDataJsonbin();
    expect(response.status).toBe(200);
    expect(allUrlsObjects.length).toBe(0);
    expect(serverMessage["message"]).toBe("all URLs were deleted successfuly");

  }, 80000)
})