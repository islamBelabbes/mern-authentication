const yup = require("yup");
const SchemaReg = require("./SchemaReg");
const loginSchema = yup.object({
  email: yup
    .string()
    .email("Please provide a valid email")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});
const registerSchema = yup.object({
  email: yup
    .string()
    .email("Please provide a valid email")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
  phone: yup
    .string()
    .matches(SchemaReg.phoneRegExp, "Phone number is not valid"),
});

module.exports = {
  loginSchema,
  registerSchema,
};
