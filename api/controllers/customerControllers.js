const Customer = require("../models/customerModel");

const showAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving customers", error });
  }
};

const addCustomer = async (req, res) => {
  const { name, phone, address, city } = req.body;

  const newCustomer = new Customer({
    name,
    phone,
    address,
    city,
  });

  try {
    const savedCustomer = await newCustomer.save();
    res.status(201).json(savedCustomer);
  } catch (error) {
    res.status(400).json({ message: "Error adding customer", error });
  }
};

const deleteCustomer = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedCustomer = await Customer.findByIdAndDelete(id);
    if (!deletedCustomer) {
      return next(new AppError("Customer does not found", 400));
    }
    res.status(200).json({ message: "Customer deleted successfully" });
  } catch (error) {
    return next(new AppError("Internal server error", 500));
  }
};

module.exports = {
  showAllCustomers,
  addCustomer,
  deleteCustomer,
};
