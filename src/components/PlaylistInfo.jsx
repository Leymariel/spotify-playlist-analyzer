// components/PlaylistInfo.js
import React from 'react';

function PlaylistInfo({ playlist }) {
  return (
    <div className="bg-gray-800 p-4 rounded-md">
      <h2 className="text-2xl font-bold mb-2">{playlist?.name}</h2>
      <p className="text-gray-400">Created by: {playlist?.owner?.display_name}</p>
      <p className="text-gray-400">Total tracks: {playlist?.tracks?.total}</p>
    </div>
  );
}

export default PlaylistInfo;