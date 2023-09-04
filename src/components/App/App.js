import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Header from "../Header/Header";
import Main from "../Main/Main";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile.";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Footer from "../Footer/Footer";
import AllMoviesCardList from "../AllMoviesCardList/AllMoviesCardList";

import NotFoundPage from "../NotFoundPage/NotFoundPage";

function App() {
  const location = useLocation();

  const showHeaderPaths = ["/", "/movies", "/saved-movies", "/profile"];
  const showFooterPaths = ["/", "/movies", "/saved-movies", "/profile"];

  const showHeader = showHeaderPaths.includes(location.pathname);
  const showFooter = showFooterPaths.includes(location.pathname);

  return (
    <div className="app">
      {showHeader && <Header />}
      <div className="content">
        <Routes>
          <Route path="/sign-up" element={<Register />} />
          <Route path="/sign-in" element={<Login />} />
          <Route path="/" element={<Main />} />
          <Route path="/movies" element={<AllMoviesCardList />} />
          <Route path="/saved-movies" element={<SavedMovies />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/edit" element={<Profile />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
      {showFooter && <Footer />}
    </div>
  );
}

export default App;
