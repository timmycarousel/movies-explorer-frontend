import React, { useState } from "react";
import AuthForm from "../AuthForm/AuthForm";

function Login({ handleLogin, errorMessage }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(email, password);
  };

  return (
    <section>
      <AuthForm
        errorMessage={errorMessage}
        isSignUp={false}
        handleSubmit={handleSubmit}
        handleInputChange={handleInputChange}
        values={formData}
        buttonText="Войти"
      />
    </section>
  );
}

export default Login;
