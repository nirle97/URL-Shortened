const request = require("supertest");
const app = require("./app");
const DataBase = require("./databaseClass");

describe("Post Request To /api/shorturl", () => {

  it("Should return the short URL from the database after it was appended successfully", async () => {
    const fullUrl = 'https://www.a.com/'
    const response = await request(app)
    .post('/api/shorturl')
    .send({"fullUrl": fullUrl});

    const responseJson = JSON.parse(response.text);
    const expectedShortUrl = await DataBase.isUrlExists(fullUrl);

    // Is the status code 200
    expect(response.status).toBe(200);
    // Are the URLs equal
    expect(responseJson["shortUrl"]).toBe(expectedShortUrl["shortUrl"]);
  });

  test("if an existed URL returns the proper message", async () => {
    const fullUrl = 'https://www.b.com/';
    const response = await request(app)
    .post('/api/shorturl')
    .send({"fullUrl": fullUrl});

    const responseJson = await JSON.parse(response.text);
    const expectedErrorMessage = "URL already exists";

    // Is the status code 200
    expect(response.status).toBe(200);
    // Are the error messages equal
    expect(responseJson["Error"]).toBe(expectedErrorMessage);
  });
  test("if an invalid URL returns the proper message", async () => {
    const fullUrl = 'httpwww.b.com/';
    const response = await request(app)
    .post('/api/shorturl')
    .send({"fullUrl": fullUrl});

    const responseJson = await JSON.parse(response.text);
    const expectedErrorMessage = "Invalid URL";

    // Is the status code 404
    expect(response.status).toBe(404);
    // Are the error messages equal
    expect(responseJson["Error"]).toBe(expectedErrorMessage);
  });
  test("if an invalid URL returns the proper message", async () => {
    const fullUrl = 'httpwww.b.com/';
    const response = await request(app)
    .post('/api/shorturl')
    .send({"fullUrl": fullUrl});

    const responseJson = await JSON.parse(response.text);
    const expectedErrorMessage = "Invalid URL";

    // Is the status code 404
    expect(response.status).toBe(404);
    // Are the error messages equal
    expect(responseJson["Error"]).toBe(expectedErrorMessage);
  });
});
describe("Post Request To /api/statistics", () => {

  test("If the statistics page retrieved the data about the short URl correctly", async () => {
    const shortUrl = 'vFlVm2sbE';
    const urlObj = await DataBase.getFullUrlObjectByShortUrl(shortUrl)
    const response = await request(app).get(`/api/statistics/${shortUrl}`);
    const responseJson = JSON.parse(response.text);
    // Is the status code 200
    expect(response.status).toBe(200);
    // Are URL Objects equal
    expect(responseJson).toEqual(urlObj);
  });

  test("If the statistics page returns error in case short URL doesn't exist", async () => {
    const shortUrl = 'ZZZZ';
    const urlObj = await DataBase.getFullUrlObjectByShortUrl(shortUrl)
    const response = await request(app).get(`/api/statistics/${shortUrl}`);
    const responseJson = JSON.parse(response.text);
    // Is the status code 404
    expect(response.status).toBe(404);
    // Are the error messages equal
    expect(responseJson["Error"]).toEqual(`no such short URL: ${shortUrl}`);
  });
});
