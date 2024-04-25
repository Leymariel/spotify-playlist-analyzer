// components/GenreInfo.js
import React from 'react';

function GenreInfo({ genres }) {
  return (
    <div className="bg-gray-800 p-4 rounded-md">
      <h3 className="text-xl font-bold mb-4">Top Genres</h3>
      {genres.length > 0 ? (
        <ul>
          {genres.map((genre) => (
            <li key={genre.name} className="mb-2">
              {genre.name} ({genre.count} tracks)
            </li>
          ))}
        </ul>
      ) : (
        <p>No genre information available for this playlist.</p>
      )}
    </div>
  );
}

export default GenreInfo;