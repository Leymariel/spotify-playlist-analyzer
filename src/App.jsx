import React, { useState } from 'react';
import Header from './components/Header';
import SearchBar from './components/Searchbar';
import PlaylistInfo from './components/PlaylistInfo';
import ArtistInfo from './components/ArtistInfo';
import GenreInfo from './components/GenreInfo';
import AudioFeatures from './components/AudioFeatures';
import { getPlaylistData, getArtistData, getGenreData, getAudioFeaturesData } from './utils/spotifyAPI';

function App() {
  const [playlistData, setPlaylistData] = useState(null);
  const [artistData, setArtistData] = useState([]);
  const [genreData, setGenreData] = useState([]);
  const [audioFeaturesData, setAudioFeaturesData] = useState({});

  const handleSearch = async (url) => {
    try {
      const playlist = await getPlaylistData(url);
      setPlaylistData(playlist);

      const artists = await getArtistData(playlist.tracks.items);
      setArtistData(artists);

      const genres = await getGenreData(artists);
      setGenreData(genres);

      const audioFeatures = await getAudioFeaturesData(playlist.tracks.items);
      setAudioFeaturesData(audioFeatures);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Header />
        <SearchBar onSearch={handleSearch} />
        {playlistData && (
          <div className="mt-8">
            <PlaylistInfo playlist={playlistData} />
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              <ArtistInfo artists={artistData} />
              <GenreInfo genres={genreData} />
            </div>
            <div className="mt-8">
              <AudioFeatures features={audioFeaturesData} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;