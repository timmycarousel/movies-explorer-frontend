import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile.";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Footer from "../Footer/Footer";

import "./App.css";
import AllMoviesCardList from "../AllMoviesCardList/AllMoviesCardList";

function App() {
  const location = useLocation();

  // Определите, нужно ли отображать футер на текущей странице
  const showFooter =
    !location.pathname.includes("/profile") &&
    !location.pathname.includes("/sign-up") &&
    !location.pathname.includes("/sign-in") &&
    !location.pathname.includes("/profile/edit");

  return (
    <div className="app">
      <Header />
      <div className="content">
        <Routes>
          <Route path="/sign-up" element={<Register />} />
          <Route path="/sign-in" element={<Login />} />
          <Route path="/" element={<Main />} />
          <Route path="/movies" element={<AllMoviesCardList />} />
          <Route path="/saved-movies" element={<SavedMovies />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
      {showFooter && <Footer />}
    </div>
  );
}

export default App;
