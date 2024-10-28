const express = require("express");
const {
  showAllCustomers,
  addCustomer,
  deleteCustomer,
} = require("../controllers/customerControllers");
const router = express.Router();

router.get("/", showAllCustomers);
router.post("/", addCustomer);
router.delete("/:id", deleteCustomer);

module.exports = router;
