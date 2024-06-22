const chai = require("chai");
const supertest = require("supertest");
const baseURL = "https://api.restful-api.dev"
const chaiJsonSchema = require('chai-json-schema');
const readJsonSchema = require("../helper/helper");

chai.use(chaiJsonSchema)
const expect = chai.expect;

describe("restful-api.dev API Test", () => {
    var createdID;
    it("TC1 - GET Single Object", async () => {
        
        const schema = readJsonSchema('get_single_object_schema.json');
        const response = await supertest(baseURL)
            .get("/objects/7");

        // console.log(response.body);
        expect(response.status).to.equal(200)
        expect(response.body.id).to.equal("7")
        expect(response.body.data.year).to.equal(2019)
        expect(response.body.data['CPU model']).to.contain("Intel")

        expect(response.body).to.be.jsonSchema(schema)
    });
    it("TC2 - POST Object", async () => {
        const body = {
            "name": "Apple MacBook Pro 16",
            "data": {
                "year": 2019,
                "price": 1849.99,
                "CPU model": "Intel Core i9",
                "Hard disk size": "1 TB"
            }
        }
        const response = await supertest(baseURL)
            .post("/objects")
            .send(body);
        
        createdID = response.body.id
    });

    it("TC3 - DELETE Object", async () => {
        console.log(createdID)
        const response = await supertest(baseURL)
            .delete(`/objects/${createdID}`);

        console.log(response.body);
        // expect(response.status).to.equal(200)
        // expect(response.body.id).to.equal("7")
        // expect(response.body.data.year).to.equal(2019)
        // expect(response.body.data['CPU model']).to.contain("Intel")
    });

    it("TC4 - GET Single Object With Invalid Id", async () => {
        const response = await supertest(baseURL)
            .get("/objects/000000000000000");

        console.log(response.body);
        expect(response.status).to.equal(404);
        expect(response.body.error).to.contain("000000000000000");



    });
});

