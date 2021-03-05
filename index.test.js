const request = require("supertest");
const app = require("./index");
const APISHORTURL = "http://localhost:3001/api/shorturl"
const DataBase = require("./databaseClass");

// jest.mock("shortid")
// Fix for open handles issue

describe("Post Request To /api/shorturl", () => {

  it("Should return the short URL from the database after it was appended successfully", async () => {
    const fullUrl = 'https://www.a.com/'
    const response = await request(app)
    .post('/api/shorturl')
    .send({"fullUrl": fullUrl});

    const responseJson = await JSON.parse(response.text);
    const expectedShortUrl = await DataBase.isUrlExists(fullUrl);

    // Is the status code 200
    expect(response.status).toBe(200);
    // are tasks equal
    expect(responseJson["shortUrl"]).toBe(expectedShortUrl["shortUrl"]);
  });

  // it("Should return an error message with status code 400 for illegal id", async () => {
  //   expect.assertions(2);
  //   const response = await request(app).get("/b/aba");

  //   expect(response.status).toBe(400);

  //   expect(response.body["message"]).toBe("Illegal ID");
  // });

  // it("Should return an error message with status code 404 for not found bin", async () => {
  //   expect.assertions(2);
  //   const response = await request(app).get("/b/8");

  //   // Is the status code 404
  //   expect(response.status).toBe(404);

  //   // Is the body equal to the error
  //   expect(response.body.message).toBe("Bin not found");
  // });
});

// describe("POST route", () => {
//   const date = new Date().getTime();
//   const taskToSend = {
//     "my-todo": { priority: "1", date, text: "aaa" }
//   };

//   const expectedResponse = {
//     record: taskToSend,
//     metadata: {
//       id: taskToSend["my-todo"]["date"],
//     },
//   };

//   const errorResponses = {
//     missingText: "Can't create task, text is missing...",
//     missingDate: "Can't create task, date is missing...",
//     missingPriority: "Can't create task, priority is missing..."
//   }

//   it("Should post a new task successfully", async () => {
//     expect.assertions(2);
//     const response = await request(app).post("/b").send(taskToSend);

//     expect(response.status).toBe(200);

//     expect(response.body).toEqual(expectedResponse);
//   });

//   it("Should return an error message with 400 status code if body is missing text", async () => {
//     expect.assertions(2);
//     const taskWithoutText = {
//       "my-todo": { priority: "1", date: 1614101194861 },
//     }
//     const response = await request(app).post("/b").send(taskWithoutText);

//     expect(response.status).toBe(400);

//     expect(response.body.message).toEqual(errorResponses.missingText);
//   });

//   it("Should return an error message with 400 status code if body is missing date", async () => {
//     expect.assertions(2);
//     const taskWithoutDate = {
//       "my-todo": { priority: "1", text: "bbb" },
//     }
//     const response = await request(app).post("/b").send(taskWithoutDate);

//     expect(response.status).toBe(400);

//     expect(response.body.message).toEqual(errorResponses.missingDate);
//   });

//   it("Should return an error message with 400 status code if body is missing priority", async () => {
//     expect.assertions(2);
//     const taskWithoutPriority = {
//       "my-todo": { text: "aaa", date: 1614101194861 },
//     }
//     const response = await request(app).post("/b").send(taskWithoutPriority);

//     expect(response.status).toBe(400);

//     expect(response.body.message).toEqual(errorResponses.missingPriority);
//   });
// });

// describe("PUT route", () => {
//   it("Should return an error message with status code 400 for illegal id", async () => {
//     expect.assertions(2);
//     const response = await request(app).put("/b/aba");

//     expect(response.status).toBe(400);

//     expect(response.body["message"]).toBe("Illegal ID");
//   });

//   it("Should return an error message with status code 404 for not found bin", async () => {
//     expect.assertions(2);
//     const response = await request(app).put("/b/8");

//     expect(response.status).toBe(404);

//     expect(response.body.message).toBe("Bin not found");
//   });

//   it("Should update a task successfully", async () => {
//     expect.assertions(2);
//     const allTasks = await request(app).get("/b");
//     const latestTask = allTasks.body[allTasks.body.length - 1];

//     const taskToSend = {
//       "my-todo": { priority: "1", date: latestTask["my-todo"]["date"], text: "bbb" },
//     };

//     const response = await request(app)
//       .put(`/b/${latestTask["my-todo"]["date"]}`)
//       .send(taskToSend);

//     expect(response.status).toBe(200);

//     expect(response.body).toEqual(taskToSend);
//   });

//   it("Should not add another file", async () => {
//     expect.assertions(2);
//     const allTasks = await request(app).get("/b");
//     const latestTask = allTasks.body[allTasks.body.length - 1];

//     const taskToSend = {
//       "my-todo": { priority: "1", date: latestTask["my-todo"]["date"], text: "bbb" },
//     };

//     const response = await request(app)
//       .put(`/b/${latestTask["my-todo"]["date"]}`)
//       .send(taskToSend);

//     const tasksAfterUpdate = await request(app).get("/b");

//     expect(response.status).toBe(200);

//     expect(tasksAfterUpdate.length).toBe(allTasks.length);
//   });
// });

// describe("DELETE route", () => {
//   it("Should delete task successfully", async () => {
//     expect.assertions(3);
//     const allTasks = await request(app).get("/b");
//     const latestTask = allTasks.body[allTasks.body.length - 1];

//     const response = await request(app).delete(
//       `/b/${latestTask["my-todo"]["date"]}`
//     );
//     const allTasksAfterDelete = await request(app).get("/b");

//     expect(response.status).toBe(200);

//     expect(allTasksAfterDelete.body.length).toBe(allTasks.body.length - 1);

//     expect(response.body.message).toBe("Bin deleted successfully");
//   });

//   it("Should return an error message with status code 400 for illegal id", async () => {
//     expect.assertions(2);
//     const response = await request(app).delete("/b/aba");

//     expect(response.status).toBe(400);

//     expect(response.body["message"]).toBe("Illegal ID");
//   });

//   it("Should return an error message with status code 404 for not found bin", async () => {
//     expect.assertions(2);
//     const response = await request(app).delete("/b/8");

//     expect(response.status).toBe(404);

//     expect(response.body.message).toBe("Bin not found");
//   });
// });