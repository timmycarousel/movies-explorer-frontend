import React, { useState } from "react";
import AuthForm from "../AuthForm/AuthForm";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <AuthForm
        isSignUp={true}
        handleSubmit={handleSubmit}
        handleInputChange={handleInputChange}
        values={formData}
        buttonText="Зарегистрироваться"
      />
    </div>
  );
}

export default Register;
