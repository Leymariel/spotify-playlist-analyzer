// components/GenreInfo.js
import React from 'react';

function GenreInfo({ genres }) {
  return (
    <div className="bg-gray-800 p-4 rounded-md">
      <h3 className="text-xl font-bold mb-4">Top Genres</h3>
      <ul>
        {genres.map((genre) => (
          <li key={genre.name} className="mb-2">
            {genre.name} ({genre.count} tracks)
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GenreInfo;