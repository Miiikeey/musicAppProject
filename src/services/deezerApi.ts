const DEEZER_API_BASE = 'https://api.deezer.com';

export interface DeezerTrack {
  id: number;
  title: string;
  artist: {
    name: string;
    picture_medium: string;
  };
  album: {
    title: string;
    cover_medium: string;
  };
  preview: string; // 30-second preview URL
  duration: number;
}

export interface DeezerPlaylist {
  id: number;
  title: string;
  picture_medium: string;
  nb_tracks: number;
}

export interface DeezerAlbum {
  id: number;
  title: string;
  cover_medium: string;
  artist: {
    name: string;
  };
}

export const deezerApi = {
  // Search tracks
  searchTracks: async (query: string): Promise<DeezerTrack[]> => {
    try {
      const response = await fetch(
        `${DEEZER_API_BASE}/search?q=${encodeURIComponent(query)}`,
      );
      const data = await response.json();
      return data.data || [];
    } catch (error) {
      console.error('Error searching tracks:', error);
      return [];
    }
  },

  // Get top tracks
  getTopTracks: async (): Promise<DeezerTrack[]> => {
    try {
      const response = await fetch(`${DEEZER_API_BASE}/chart/0/tracks`);
      const data = await response.json();
      return data.data || [];
    } catch (error) {
      console.error('Error fetching top tracks:', error);
      return [];
    }
  },

  // Get track details
  getTrackDetails: async (trackId: number): Promise<DeezerTrack | null> => {
    try {
      const response = await fetch(`${DEEZER_API_BASE}/track/${trackId}`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching track details:', error);
      return null;
    }
  },

  // Get user's playlists (demo - using chart playlists)
  getPlaylists: async (): Promise<DeezerPlaylist[]> => {
    try {
      const response = await fetch(`${DEEZER_API_BASE}/chart/0/playlists`);
      const data = await response.json();
      return data.data || [];
    } catch (error) {
      console.error('Error fetching playlists:', error);
      return [];
    }
  },

  // Get user's favorite tracks (demo - using chart tracks)
  getFavorites: async (): Promise<DeezerTrack[]> => {
    try {
      const response = await fetch(`${DEEZER_API_BASE}/chart/0/tracks`);
      const data = await response.json();
      return data.data || [];
    } catch (error) {
      console.error('Error fetching favorites:', error);
      return [];
    }
  },

  // Get user's albums (demo - using chart albums)
  getAlbums: async (): Promise<DeezerAlbum[]> => {
    try {
      const response = await fetch(`${DEEZER_API_BASE}/chart/0/albums`);
      const data = await response.json();
      return data.data || [];
    } catch (error) {
      console.error('Error fetching albums:', error);
      return [];
    }
  },

  getUserPlaylists: async (userId: string) => {
    try {
      const response = await fetch(`https://api.deezer.com/user/${userId}/playlists`);
      const data = await response.json();
      return data.data || [];
    } catch (error) {
      console.error('Error fetching user playlists:', error);
      return [];
    }
  },

  getPlaylistTracks: async (playlistId: number): Promise<DeezerTrack[]> => {
    try {
      const response = await fetch(`${DEEZER_API_BASE}/playlist/${playlistId}/tracks`);
      const data = await response.json();
      return data.data || [];
    } catch (error) {
      console.error('Error fetching playlist tracks:', error);
      return [];
    }
  },
}; 