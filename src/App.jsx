import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserForm from "./Components/UserForm";
import Home from "./Components/Home";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<UserForm />} />
        <Route path="/edit/:id" element={<UserForm isEditing={true} />} />
      </Routes>
    </Router>
  );
};

export default App;
