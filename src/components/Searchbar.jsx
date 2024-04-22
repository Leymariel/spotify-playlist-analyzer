// components/SearchBar.js
import React, { useState } from 'react';

function SearchBar({ onSearch }) {
  const [url, setUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(url);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8">
      <div className="flex">
        <input
          type="text"
          placeholder="Enter Spotify playlist URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="flex-1 px-4 py-2 rounded-l-md bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Analyze
        </button>
      </div>
    </form>
  );
}

export default SearchBar;