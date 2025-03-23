// src/components/MovieCatalog.js
import React, { useState, useEffect } from 'react';

// Componente funcional
const MovieCatalog = () => {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Función que carga las películas de la API
  useEffect(() => {
    fetch("https://api.themoviedb.org/3/movie/popular?api_key=ee47c662e9f86c6eae463f09d0c72bb5")
      .then((response) => response.json())
      .then((data) => setMovies(data.results));
  }, []);

  // Filtrar las películas por nombre
  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <h1>Catálogo de Películas</h1>
      <input
        type="text"
        placeholder="Buscar película..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div className="movie-list">
        {filteredMovies.map((movie) => (
          <div className="movie-card" key={movie.id}>
            <h2>{movie.title}</h2>
            <p>{movie.overview}</p>
            <p><strong>Fecha de lanzamiento:</strong> {movie.release_date}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieCatalog;
