const express = require("express");

const ctrl = require("../../controllers/pets");

const { validateBody } = require("../../decorators");

const { authenticate, upload, isValidPetId } = require("../../middlewares");

const schemas = require("../../schemas/pets");

const router = express.Router();

const addPetValidateMiddleware = validateBody(schemas.addPetSchema);

router.use(authenticate);

router.post(
  "/",
  upload.single("petImage"),
  addPetValidateMiddleware,
  ctrl.addPet
);
router.delete("/:petId", isValidPetId, ctrl.deleteById);

module.exports = router;
