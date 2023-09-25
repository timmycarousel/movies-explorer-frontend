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
import * as moviesApi from "../../utils/MoviesApi.js";
import Movies from "../Movies/Movies";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import { CurrentUserContext } from "../../components/contexts/CurrentUserContext";
import { MoviesUserContext } from "../contexts/MoviesUserContext";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

function App() {
  const location = useLocation();
  const [loggedIn, setLoggedIn] = useState(true);
  const showHeaderPaths = ["/", "/movies", "/saved-movies", "/profile"];
  const showFooterPaths = ["/", "/movies", "/saved-movies"];
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [userMovies, setUserMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [moviesList, setMoviesList] = useState([]);

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
          handleChangeProfile(name, email);

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
        setLoggedIn(true);
        navigate("/movies");

        getUserData();
      })
      .catch(handleError);
  }

  function handleChangeProfile(name, email) {
    console.log(name, email);
    MainApi.changeUserData(name, email)
      .then((data) => {
        setCurrentUser(data);
        getUserData();
      })
      .catch(handleError);
  }

  function handleLogout() {
    setLoggedIn(false);
    localStorage.clear();
    navigate("/");
  }
  function getMovies() {
    return moviesApi
      .getMovies()
      .then((data) => {
        setMoviesList(data);
        setIsLoading(false);
        console.log("получаем фильмы с сервера большого", data);
        return data;
      })
      .catch((error) => {
        console.error("Ошибка при загрузке фильмов:", error);
        setIsLoading(false);
        return Promise.reject(error);
      });
  }

  function getUserMovies() {
    MainApi.getMovies()
      .then((data) => {
        setUserMovies(data);
        console.log("ПОЛУЧАЕМ ФИЛЬМЫ", data);
      })
      .catch(handleError);
  }

  return (
    <div className="app">
      <MoviesUserContext.Provider value={{ userMovies, setUserMovies }}>
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
                  <Login
                    handleLogin={handleLogin}
                    errorMessage={errorMessage}
                  />
                }
              />
              <Route
                path="/movies"
                element={
                  <ProtectedRoute
                    element={Movies}
                    getMovies={getMovies}
                    moviesList={moviesList}
                    isLoading={isLoading}
                    loggedIn={loggedIn}
                    getUserMovies={getUserMovies}
                  />
                }
              />
              <Route
                path="/saved-movies"
                element={
                  <ProtectedRoute
                    element={SavedMovies}
                    loggedIn={loggedIn}
                    getMovies={getUserMovies}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute
                    element={Profile}
                    loggedIn={loggedIn}
                    save={handleChangeProfile}
                    onLogOut={handleLogout}
                    errorMessage={errorMessage}
                  />
                }
              />
              <Route path="*" element={<NotFoundPage />} />
              <Route path="/" element={<Main />} />
            </Routes>
          </main>
          {showFooter && <Footer />}
        </CurrentUserContext.Provider>
      </MoviesUserContext.Provider>
    </div>
  );
}

export default App;
