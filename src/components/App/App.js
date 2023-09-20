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
import Movies from "../Movies/Movies";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import { CurrentUserContext } from "../../components/contexts/CurrentUserContext";

function App() {
  const location = useLocation();
  const [loggedIn, setLoggedIn] = useState(true);
  const showHeaderPaths = ["/", "/movies", "/saved-movies", "/profile"];
  const showFooterPaths = ["/", "/movies", "/saved-movies"];
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);
  const [currentUser, setCurrentUser] = useState({});

  const showHeader = showHeaderPaths.includes(location.pathname);
  const showFooter = showFooterPaths.includes(location.pathname);

  useEffect(() => {
    tokenCheck();
  }, []);

  useEffect(() => {
    if (loggedIn) {
      getUserData();
    }
  }, [loggedIn]);

  const handleError = (err) => {
    setErrorMessage(err);
  };

  function tokenCheck() {
    const token = localStorage.getItem("token");
    if (token) {
      MainApi.checkToken()
        .then(() => {
          setLoggedIn(true);
        })
        .catch(handleError);
    } else {
      setLoggedIn(false);
    }
  }

  function getUserData() {
    MainApi.getUserData()
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch(handleError);
  }

  function handleRegister(name, email, password) {
    if (name || email || password) {
      return MainApi.register(name, email, password)
        .then(() => {
          // Обновляем данные пользователя после успешной регистрации
          handleChangeProfile(name, email);

          // Затем вызываем авторизацию
          handleLogin(email, password);
        })
        .catch(handleError);
    }
  }

  function handleLogin(email, password) {
    if (!password || !email) {
      return;
    }
    return MainApi.authorize(email, password)
      .then((data) => {
        localStorage.setItem("token", data.token);
        navigate("/movies");
        // Обновляем данные пользователя после успешной авторизации
        getUserData();
      })
      .catch(handleError);
  }

  function handleChangeProfile(name, email) {
    console.log(name, email);
    MainApi.changeUserData(name, email)
      .then((data) => {
        setCurrentUser(data);
      })
      .catch(handleError);
  }

  function handleLogout() {
    setLoggedIn(false);
    localStorage.clear();
    navigate("/");
  }

  return (
    <div className="app">
      <CurrentUserContext.Provider value={currentUser}>
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
                  save={handleChangeProfile}
                  onLogOut={handleLogout}
                />
              }
            />
            <Route path="*" element={<NotFoundPage />} />
            <Route path="/" element={<Main />} />
          </Routes>
        </main>
        {showFooter && <Footer />}
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
