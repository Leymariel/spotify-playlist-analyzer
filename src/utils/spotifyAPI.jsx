// utils/spotifyAPI.js
const CLIENT_ID = '57bf69ab47f0445886ce29447d141412';
const CLIENT_SECRET = 'b8df1f1b94034b9daae886d5daec00fc';

async function getAccessToken() {
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)}`,
    },
    body: 'grant_type=client_credentials',
  });
  const data = await response.json();
  return data.access_token;
}

async function getPlaylistData(url) {
  const playlistId = url.split('/').pop();
  const accessToken = await getAccessToken();
  const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const data = await response.json();
  return data;
}

async function getArtistData(tracks) {
  const artistCount = {};
  tracks.forEach((track) => {
    track.track.artists.forEach((artist) => {
      if (artistCount[artist.id]) {
        artistCount[artist.id].count++;
      } else {
        artistCount[artist.id] = {
          id: artist.id,
          name: artist.name,
          count: 1,
        };
      }
    });
  });
  return Object.values(artistCount).sort((a, b) => b.count - a.count);
}

async function getGenreData(artists) {
  const genreCount = {};
  const accessToken = await getAccessToken();
  const artistIds = artists.map((artist) => artist.id);
  const response = await fetch(`https://api.spotify.com/v1/artists?ids=${artistIds.join(',')}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const data = await response.json();

  if (data.artists) {
    data.artists.forEach((artist) => {
      if (artist.genres) {
        artist.genres.forEach((genre) => {
          if (genreCount[genre]) {
            genreCount[genre]++;
          } else {
            genreCount[genre] = 1;
          }
        });
      }
    });
  }

  return Object.entries(genreCount)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

async function getAudioFeaturesData(tracks) {
  const accessToken = await getAccessToken();
  const trackIds = tracks.map((track) => track.track.id);
  const response = await fetch(`https://api.spotify.com/v1/audio-features?ids=${trackIds.join(',')}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const data = await response.json();
  const features = data.audio_features.reduce(
    (acc, cur) => {
      acc.danceability += cur.danceability;
      acc.energy += cur.energy;
      acc.valence += cur.valence;
      return acc;
    },
    { danceability: 0, energy: 0, valence: 0 }
  );
  features.danceability /= data.audio_features.length;
  features.energy /= data.audio_features.length;
  features.valence /= data.audio_features.length;
  return features;
}

export { getPlaylistData, getArtistData, getGenreData, getAudioFeaturesData };