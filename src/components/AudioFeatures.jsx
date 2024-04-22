// components/AudioFeatures.js
import React from 'react';

function AudioFeatures({ features }) {
  return (
    <div className="bg-gray-800 p-4 rounded-md">
      <h3 className="text-xl font-bold mb-4">Audio Features</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <p className="text-gray-400">Danceability</p>
          <p className="text-2xl font-bold">{features?.danceability?.toFixed(2) || 'N/A'}</p>
        </div>
        <div>
          <p className="text-gray-400">Energy</p>
          <p className="text-2xl font-bold">{features?.energy?.toFixed(2) || 'N/A'}</p>
        </div>
        <div>
          <p className="text-gray-400">Valence</p>
          <p className="text-2xl font-bold">{features?.valence?.toFixed(2) || 'N/A'}</p>
        </div>
      </div>
    </div>
  );
}

export default AudioFeatures;