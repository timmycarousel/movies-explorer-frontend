import React, { useState, useEffect } from "react";

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
  const [loggedIn, setLoggedIn] = useState(true);
  const showHeaderPaths = ["/", "/movies", "/saved-movies", "/profile"];
  const showFooterPaths = ["/", "/movies", "/saved-movies"];
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [infoUser, setInfoUser] = useState({});

  const showHeader = showHeaderPaths.includes(location.pathname);
  const showFooter = showFooterPaths.includes(location.pathname);

  useEffect(() => {
    handleTokenCheck();
  }, []);

  useEffect(() => {
    if (loggedIn) {
      getUserData();
    }
  }, [loggedIn]);

  const handleError = (err) => {
    setErrorMessage(err);
  };

  //** проверка валидности токена */
  function handleTokenCheck() {
    const token = localStorage.getItem("token");

    if (token) {
      MainApi.checkToken()
        .then(() => {
          setLoggedIn(true);
        })
        .catch(handleError);
    } else {
      setLoggedIn(false); // Устанавливаем loggedIn в false, если токен отсутствует
    }
  }

  function handleRegister(name, email, password) {
    if (name || email || password) {
      return MainApi.register(name, email, password)
        .then(() => {
          // После успешной регистрации вызываем handleLogin
          handleLogin(email, password);
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
          handleTokenCheck();
          localStorage.setItem("token", data.token);
          localStorage.setItem("userEmail", email);
          MainApi.getUserData()
            .then((userData) => {
              localStorage.setItem("userName", userData.name);
            })
            .catch((error) => {
              setErrorMessage(error.message);
              console.error(
                "Ошибка при получении имени пользователя:",
                error.message
              );
            });

          navigate("/movies");
          setEmailUser(email);
        }
      })
      .catch((error) => {
        setErrorMessage(error.message);
        console.error("Ошибка при авторизации:", error.message);
      });
  }

  function getUserData() {
    MainApi.getUserData()
      .then((userData) => {
        setInfoUser(userData);
      })
      .catch(handleError);
  }

  function handleChangeProfile({ name, email }) {
    MainApi.changeUserData({ name, email })
      .then((data) => setInfoUser(data))
      .catch(handleError);
  }

  function handleLogout() {
    setLoggedIn(false);
    localStorage.clear();
    navigate("/");
  }

  return (
    <div className="app">
      {showHeader && <Header loggedIn={loggedIn} />}
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
          <Route
            path="/profile"
            element={
              <Profile
                loggedIn={loggedIn}
                onLogOut={handleLogout}
                onSave={handleChangeProfile}
              />
            }
          />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/" element={<Main />} />
        </Routes>
      </main>
      {showFooter && <Footer />}
    </div>
  );
}

export default App;
