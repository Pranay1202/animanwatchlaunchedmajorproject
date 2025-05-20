
import { useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import AnimeCard from "@/components/AnimeCard";
import { useEffect, useState } from "react";

// Import anime data from a centralized location
import { animeData } from "@/data/animeData";

const GenrePage = () => {
  const { genre } = useParams<{ genre: string }>();
  const [filteredAnime, setFilteredAnime] = useState<any[]>([]);
  
  useEffect(() => {
    if (genre) {
      // Filter anime based on the genre parameter
      const filtered = animeData.filter(anime => 
        anime.genres && anime.genres.some(g => 
          g.toLowerCase() === genre.toLowerCase()
        )
      );
      setFilteredAnime(filtered);
    }
  }, [genre]);
  
  const formattedGenre = genre ? genre.charAt(0).toUpperCase() + genre.slice(1) : '';

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container py-8">
        <h1 className="text-3xl font-bold mb-8">{formattedGenre} Anime</h1>
        
        {filteredAnime.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 mb-8">
            {filteredAnime.map((anime) => (
              <AnimeCard
                key={anime.id}
                id={anime.id}
                title={anime.title}
                image={anime.image}
                rating={anime.rating}
                type={anime.type}
                episodes={anime.episodes}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-lg text-muted-foreground">
              No anime found in this genre.
            </p>
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

export default GenrePage;
