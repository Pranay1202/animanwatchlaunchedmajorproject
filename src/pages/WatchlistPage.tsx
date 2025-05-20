
import Navbar from "@/components/Navbar";
import { useWatchlist } from "@/contexts/WatchlistContext";
import { animeData } from "@/data/animeData";
import AnimeCard from "@/components/AnimeCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const WatchlistPage = () => {
  const { watchlist, removeFromWatchlist } = useWatchlist();
  
  // Get anime details for watchlist items
  const watchlistItems = animeData.filter(anime => watchlist.includes(anime.id));

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container py-8">
        <h1 className="text-3xl font-bold mb-8">My Watchlist</h1>
        
        {watchlistItems.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-8">
              {watchlistItems.map((anime) => (
                <div key={anime.id} className="relative group">
                  <AnimeCard
                    id={anime.id}
                    title={anime.title}
                    image={anime.image}
                    rating={anime.rating}
                    type={anime.type}
                    episodes={anime.episodes}
                  />
                  <Button 
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      removeFromWatchlist(anime.id);
                    }}
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-16 bg-muted/30 rounded-lg">
            <h3 className="text-xl font-medium mb-2">Your watchlist is empty</h3>
            <p className="text-muted-foreground mb-6">
              Add some anime series to your watchlist to keep track of what you want to watch.
            </p>
            <Link to="/anime-list">
              <Button>Browse Anime</Button>
            </Link>
          </div>
        )}
      </main>
      
      <footer className="bg-anime-darkblue text-gray-300 py-8">
        <div className="container text-center">
          <p>&copy; {new Date().getFullYear()} AniManga Watch. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default WatchlistPage;
