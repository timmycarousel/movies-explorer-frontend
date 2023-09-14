import React, { useState } from "react";
import AuthForm from "../AuthForm/AuthForm";

function Register({ handleRegister, errorMessage }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = formData;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Вызываем обработчик handleRegister с введенными данными
    handleRegister(name, email, password);
  };

  return (
    <section>
      <AuthForm
        errorMessage={errorMessage}
        isSignUp={true}
        handleSubmit={handleSubmit}
        handleInputChange={handleInputChange}
        values={formData}
        buttonText="Зарегистрироваться"
      />
    </section>
  );
}

export default Register;
