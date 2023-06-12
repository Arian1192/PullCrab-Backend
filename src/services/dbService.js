const modelAndEntityCheck = ({ model, entity }) => {
  if (!model || !entity) throw new Error("Model and entity are required");
  return;
};

const modelAndDataCheck = ({ model, data }) => {
  if (!model || !data) throw new Error("Model and data are required");
  return;
};

const modelAndIdCheck = ({ model, id }) => {
  if (!model || !id) throw new Error("Model and id are required");
  return;
};

const findAllService = ({
  params = {},
  model,
  populationFields = [],
  entity,
}) => {
  modelAndEntityCheck({ model, entity });
  let findOperation = model.find(params);
  if (populationFields.length > 0) {
    populationFields.forEach((field) => {
      findOperation = findOperation.populate(field);
    });
  }
  return findOperation.exec();
};

const findOneService = ({ id, model, populationFields = [], entity }) => {
  modelAndEntityCheck({ model, entity });
  let findOperation = model.findById(id);
  if (populationFields.length > 0) {
    populationFields.forEach((field) => {
      findOperation = findOperation.populate(field);
    });
  }
  return findOperation.exec();
};

const createOneService = ({ data, model }) => {
  modelAndDataCheck({ model, data });
  const newEntity = new model(data);
  return newEntity.save();
};

const updateOneService = ({ id, data, model }) => {
  modelAndDataCheck({ model, data });
  if (!id) throw new Error("Id is required");
  return model.findByIdAndUpdate(id, data, { new: true }).exec();
};

const deleteOneService = ({ id, model }) => {
  console.log(id)
  modelAndIdCheck({ model, id });
  return model.findByIdAndDelete(id).exec();
};

module.exports = {
  findAllService,
  findOneService,
  createOneService,
  updateOneService,
  deleteOneService,
};
