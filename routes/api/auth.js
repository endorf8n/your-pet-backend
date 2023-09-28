const express = require("express");

const ctrl = require("../../controllers/auth");

const { validateBody } = require("../../decorators");

const { authenticate, upload } = require("../../middlewares");

const schemas = require("../../schemas/users");

const router = express.Router();

const registerValidateMiddleware = validateBody(schemas.userRegisterSchema);
const loginValidateMiddleware = validateBody(schemas.userLoginSchema);
const editProfileValidateMiddleware = validateBody(
  schemas.userEditProfileSchema
);
router.get("/google", ctrl.googleAuth);

router.get("/google-redirect", ctrl.googleRedirect);

router.post("/register", registerValidateMiddleware, ctrl.register);

router.post("/login", loginValidateMiddleware, ctrl.login);

router.post("/logout", authenticate, ctrl.logout);

router.patch(
  "/edit-profile",
  authenticate,
  editProfileValidateMiddleware,
  upload.single("avatar"),
  ctrl.editProfile
);

router.get("/current", authenticate, ctrl.getCurrent);

router.get("/refresh", ctrl.refreshToken);

module.exports = router;
