import React, { useState } from "react";
import AuthForm from "../AuthForm/AuthForm";

function Login() {
  const [formData, setFormData] = useState({
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
    // логика для входа
  };

  return (
    <div>
      <AuthForm
        isSignUp={false}
        handleSubmit={handleSubmit}
        handleInputChange={handleInputChange}
        values={formData}
        buttonText="Войти"
      />
    </div>
  );
}

export default Login;
