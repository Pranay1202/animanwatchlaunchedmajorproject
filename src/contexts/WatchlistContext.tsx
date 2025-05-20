
import { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { toast } from "sonner";

type WatchlistContextType = {
  watchlist: number[];
  addToWatchlist: (animeId: number) => void;
  removeFromWatchlist: (animeId: number) => void;
  isInWatchlist: (animeId: number) => boolean;
};

const WatchlistContext = createContext<WatchlistContextType | undefined>(undefined);

export const useWatchlist = () => {
  const context = useContext(WatchlistContext);
  if (!context) {
    throw new Error('useWatchlist must be used within a WatchlistProvider');
  }
  return context;
};

type WatchlistProviderProps = {
  children: ReactNode;
};

export const WatchlistProvider = ({ children }: WatchlistProviderProps) => {
  const [watchlist, setWatchlist] = useState<number[]>([]);

  // Load watchlist from localStorage on initial render
  useEffect(() => {
    const savedWatchlist = localStorage.getItem('anime-watchlist');
    if (savedWatchlist) {
      try {
        setWatchlist(JSON.parse(savedWatchlist));
      } catch (error) {
        console.error('Failed to parse watchlist from localStorage:', error);
        localStorage.removeItem('anime-watchlist');
      }
    }
  }, []);

  // Save watchlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('anime-watchlist', JSON.stringify(watchlist));
  }, [watchlist]);

  const addToWatchlist = (animeId: number) => {
    if (!watchlist.includes(animeId)) {
      setWatchlist([...watchlist, animeId]);
      toast.success('Added to your watchlist');
    }
  };

  const removeFromWatchlist = (animeId: number) => {
    setWatchlist(watchlist.filter(id => id !== animeId));
    toast.info('Removed from your watchlist');
  };

  const isInWatchlist = (animeId: number) => {
    return watchlist.includes(animeId);
  };

  const value = {
    watchlist,
    addToWatchlist,
    removeFromWatchlist,
    isInWatchlist,
  };

  return (
    <WatchlistContext.Provider value={value}>
      {children}
    </WatchlistContext.Provider>
  );
};
