import React, { useState } from "react";

import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import Main from "../Main/Main";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Footer from "../Footer/Footer";
import * as MainApi from "../../utils/MainApi.js";
// import AllMoviesCardList from "../AllMoviesCardList/AllMoviesCardList";

import Movies from "../Movies/Movies";

import NotFoundPage from "../NotFoundPage/NotFoundPage";

function App() {
  const location = useLocation();
  const [loggedIn, setLoggedIn] = useState(false);
  const showHeaderPaths = ["/", "/movies", "/saved-movies", "/profile"];
  const showFooterPaths = ["/", "/movies", "/saved-movies"];
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const showHeader = showHeaderPaths.includes(location.pathname);
  const showFooter = showFooterPaths.includes(location.pathname);

  // const [imageTooltip, setImageTooltip] = useState("");
  // const [textTooltip, setTextTooltip] = useState("");

  function handleRegister(name, email, password) {
    if (name || email || password) {
      return MainApi.register(name, email, password)
        .then(() => {
          navigate("/signin");
        })
        .catch((error) => {
          setErrorMessage(error.message);
          console.error("Ошибка при регистрации:", error.message);
        });
    }
  }

  function handleLogin(email, password) {
    if (!password || !email) {
      return;
    }
    return MainApi.authorize(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("userEmail", email);
          console.log("User email set in localStorage:", email);

          navigate("/movies");
          setEmailUser(email);
          setLoggedIn(true);
        }
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="app">
      {showHeader && <Header />}
      <main className="content">
        <Routes>
          <Route
            path="/signup"
            element={
              <Register
                handleRegister={handleRegister}
                errorMessage={errorMessage}
              />
            }
          />
          <Route
            path="/signin"
            element={
              <Login handleLogin={handleLogin} errorMessage={errorMessage} />
            }
          />
          <Route path="/movies" element={<Movies />} />
          <Route path="/saved-movies" element={<SavedMovies />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/" element={<Main />} />
        </Routes>
      </main>
      {showFooter && <Footer />}
    </div>
  );
}

export default App;
