// src/components/MovieCatalog.js
import React, { useState, useEffect } from 'react';

// Componente funcional
const MovieCatalog = () => {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

// La base URL para las imágenes en TMDb
    const imageBaseUrl = "https://image.tmdb.org/t/p/w500";


// Imagen por defecto si no hay póster
  const defaultImage = "https://via.placeholder.com/500x750?text=No+Image";

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
            <img
              src={movie.poster_path ? `${imageBaseUrl}${movie.poster_path}` : defaultImage}
              alt={movie.title}
              style={{ width: "200px", borderRadius: "8px" }}
            />
            <p>{movie.overview}</p>
            <p><strong>Fecha de lanzamiento:</strong> {movie.release_date}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieCatalog;
