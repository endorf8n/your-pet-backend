const express = require("express");

const ctrl = require("../../controllers/auth");

const { validateBody } = require("../../decorators");

const schemas = require("../../schemas/users");

const router = express.Router();

const registerValidateMiddleware = validateBody(schemas.userRegisterSchema);
const loginValidateMiddleware = validateBody(schemas.userLoginSchema);

router.post("/register", registerValidateMiddleware, ctrl.register);

router.post("/login", loginValidateMiddleware, ctrl.login);

module.exports = router;
