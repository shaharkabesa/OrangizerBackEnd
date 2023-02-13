const Joi = require('@hapi/joi');



// Register validation
const registarValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(4).required(),
    email: Joi.string().min(6).email().required(),
    password: Joi.string().min(6).required(),
    container: Joi.number().required()
  })
  return schema.validate(data);
}
const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).email().required(),
    password: Joi.string().min(6).required()
  })
  return schema.validate(data);
}

const customerValidation = (data) => {
  const schema = Joi.object({
    CustomerName: Joi.string().required(),
    CustomerFamily: Joi.string().required(),
    CustomerCity: Joi.string().required(),
    CustomerStreet: Joi.string().required(),
    CustomerApartment: Joi.string().required(),
    CustomerFloor: Joi.string().required(),
    CustomerStatus: Joi.string().required(),
    Container: Joi.required(),
    ClientNum: Joi.number().required()
  })
  return schema.validate(data);

}
const MeetingValidation = (data) => {
  const schema = Joi.object({
    CustomerFullName: Joi.string().required(),
    MeetingTheme: Joi.string().required(),
    MeetingDate: Joi.string().required(),
    MeetingSummary: Joi.string().required(),
    MeetingStatus: Joi.string().required(),
    Container: Joi.string().required(),
    ClientNum: Joi.string().required(),
    MeetingNum: Joi.string()
  })
  return schema.validate(data);
}

const FileValidation = (data) => {
  const schema = Joi.object({
    url: Joi.string().required(),
    filename: Joi.string().required(),
    description: Joi.string().required(),
    clientNum: Joi.string().required(),
    container: Joi.string().required()
  })
  return schema.validate(data);
}




module.exports.registarValidation = registarValidation;
module.exports.loginValidation = loginValidation;
module.exports.customerValidation = customerValidation;
module.exports.MeetingValidation = MeetingValidation;
module.exports.FileValidation = FileValidation;