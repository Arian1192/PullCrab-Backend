const {
  createOneService,
  deleteOneService,
  findAllService,
  findOneService,
  updateOneService,
} = require("./dbService");

const getAllItemsService = ({ model, populationFields = [], entity }) => {
  return async () => {
    try {
      const allEntities = await findAllService({
        model,
        populationFields,
        entity,
      });
      return allEntities;
    } catch (err) {
      throw new Error(err.message);
    }
  };
};

const newItemService = ({ model, data }) => {
  return async () => {
    try {
      const newItem = await createOneService({ model, data });
      return newItem;
    } catch (err) {
      throw new Error(err.message);
    }
  };
};

const getItemById = ({ id, model, populationFields = [], entity }) => {
  return async () => {
    try {
      const itemFound = await findOneService({
        model,
        populationFields,
        entity,
        id,
      });
      console.log(itemFound);
      return itemFound;
    } catch (err) {
      throw new Error(err.message);
    }
  };
};

const updateItemById = ({ id, model, data }) => {
  return async () => {
    try {
      const updatedItem = await updateOneService({ id, model, data });
      console.log(updatedItem);
      return updatedItem;
    } catch (err) {
      throw new Error(err.message);
    }
  };
};

const deleteItemById = ({ id, model }) => {
  console.log(id);
  return async () => {
    try {
      const deletedItem = await deleteOneService({ id, model });
      console.log(console.log(deletedItem));
      return deletedItem;
    } catch (err) {
      throw new Error(err.message);
    }
  };
};

module.exports = {
  getAllItemsService,
  newItemService,
  getItemById,
  updateItemById,
  deleteItemById,
};
