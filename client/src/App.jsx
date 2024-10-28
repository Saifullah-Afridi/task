import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignupForm from "./components/SignupForm";
import LoginForm from "./components/LoginForm ";
import Dashboard2 from "./components/Dashboard2";
import AddCustomer from "./components/AddCustomer";
import ShowCustomers from "./components/ShowCustomers";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignupForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/dashboard2" element={<Dashboard2 />}>
          <Route index element={<AddCustomer />} />
          <Route path="add-customer" element={<AddCustomer />} />
          <Route path="show-customers" element={<ShowCustomers />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
