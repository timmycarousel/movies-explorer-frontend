import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
// import Movies from "../Movies/Movies";
// import SavedMovies from '../SavedMovies/SavedMovies';
// import Profile from '../Profile/Profile.';
// import Register from '../Register/Register';
import Login from "../Login/Login";

import "./App.css";

function App() {
  return (
    <div className="app">
      <Header />
      <Routes>
        {/* <Route path="/sign-up" element={<Register />} /> */}
        <Route path="/sign-in" element={<Login />} />
        <Route path="/" element={<Main />} />
        {/* <Route path="/movies" element={<Movies />} />
      <Route path="/saved-movies" element={<SavedMovies />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="*" element={<Navigate to="/" replace />} /> */}
      </Routes>
    </div>
  );
}

export default App;
