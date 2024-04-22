// components/ArtistInfo.js
import React from 'react';

function ArtistInfo({ artists }) {
  return (
    <div className="bg-gray-800 p-4 rounded-md">
      <h3 className="text-xl font-bold mb-4">Top Artists</h3>
      <ul>
        {artists.map((artist) => (
          <li key={artist.id} className="mb-2">
            {artist.name} ({artist.count} tracks)
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ArtistInfo;