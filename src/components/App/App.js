import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Header from "../Header/Header";
import Main from "../Main/Main";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Footer from "../Footer/Footer";
// import AllMoviesCardList from "../AllMoviesCardList/AllMoviesCardList";

import Movies from "../Movies/Movies";

import NotFoundPage from "../NotFoundPage/NotFoundPage";

function App() {
  const location = useLocation();

  const showHeaderPaths = ["/", "/movies", "/saved-movies", "/profile"];
  const showFooterPaths = ["/", "/movies", "/saved-movies"];

  const showHeader = showHeaderPaths.includes(location.pathname);
  const showFooter = showFooterPaths.includes(location.pathname);

  return (
    <div className="app">
      {showHeader && <Header />}
      <main className="content">
        <Routes>
          <Route path="/signup" element={<Register />} />
          <Route path="/signin" element={<Login />} />
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
