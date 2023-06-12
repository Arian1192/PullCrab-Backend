const sinon = require("sinon");
const { faker } = require("@faker-js/faker");
const { expect } = require("chai");
const islandModel = require("../models/islandModel");

const crudService = require("../services/crudService");

describe("TEST crudService", function () {
  
  // DATA MOCK
  const stubValue = {
    workSpaceName: faker.company.name(),
    repositories: [faker.internet.url()],
    squad: [faker.database.mongodbObjectId()],
  };

  describe("newItemService", function () {
    it("should add the new island to the db", async function () {
      const stub = sinon.stub(crudService, "newItemService").returns(stubValue);
      const island = await crudService.newItemService({
        islandModel,
        stubValue,
      });
      expect(stub.calledOnce).to.be.true;
      expect(island.workSpaceName).to.equal(stubValue.workSpaceName);
      expect(island.repositories).to.equal(stubValue.repositories);
      expect(island.squad).to.equal(stubValue.squad);
    });
  });

  describe("getAllItemsService", function () {
    it("should get all island on the db", async function () {
      const stub = sinon
        .stub(crudService, "getAllItemsService")
        .returns([stubValue]);
      const allIslands = await crudService.getAllItemsService({
        islandModel,
      });
      expect(stub.calledOnce).to.be.true;
      expect(allIslands).to.be.an("array").that.is.not.empty;
    });
  });



  //TODO: hacer los test que falten del crudService

});
