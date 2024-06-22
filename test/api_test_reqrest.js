const chai = require("chai");
const supertest = require("supertest");
const baseURL = "https://reqres.in"
const chaiJsonSchema = require('chai-json-schema');
const readJsonSchema = require("../helper/helper");

chai.use(chaiJsonSchema)
const expect = chai.expect;

describe("reqres.in API Test", () => {
    var createdID;
    it("TC1 - GET Single User", async () => {
        const schema = readJsonSchema('get_single_user_schema.json');
        const response = await supertest(baseURL)
            .get("/api/users/2");

        console.log(response.body);
        expect(response.status).to.equal(200)
        expect(response.body.id).to.equal(createdID)
        expect(response.body.data.first_name).to.equal("Janet")

        expect(response.body).to.be.jsonSchema(schema)
    });
    it("TC2 - POST Create User", async () => {
        const schema = readJsonSchema('post_create_user_schema.json');
        const body = {
            "name": "morpheus",
            "job": "leader",
            "id": "718",
            "createdAt": "2024-06-22T17:21:48.347Z"
        }
        const response = await supertest(baseURL)
            .post("/api/users")
            .send(body);
        
        createdID = response.body.id
        console.log(response.body)
        expect(response.status).to.equal(201)
        expect(response.body.job).to.equal("leader")
        expect(response.body.id).to.equal("718")

        expect(response.body).to.be.jsonSchema(schema)
    });

    it("TC3 - DELETE User", async () => {
        const response = await supertest(baseURL)
            .delete("/api/users/2");

        console.log(response.body);
        expect(response.status).to.equal(204)

    });

    it("TC4 - PUT Update User", async () => {
        const schema = readJsonSchema('put_update_user_schema.json');
        const body = {
            "name": "morpheus",
            "job": "zion resident"
        }
        const response = await supertest(baseURL)
            .put("/api/users/2")
            .send(body);
        
        createdID = response.body.id
        console.log(response.body)
        expect(response.status).to.equal(200)
        expect(response.body.job).to.equal("zion resident")
        expect(response.body.id).to.equal(createdID)

        expect(response.body).to.be.jsonSchema(schema)



    });
});

