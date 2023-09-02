import React from "react";

import SearchForm from "./SearchForm/SearchForm";
import AllMoviesCardList from "./MoviesCardList/MoviesCardList";

export default function Movies() {
  return (
    <section className="movies">
      <SearchForm />
      <AllMoviesCardList />
    </section>
  );
}
