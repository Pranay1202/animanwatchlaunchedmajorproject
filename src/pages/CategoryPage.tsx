
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import AnimeCard from "@/components/AnimeCard";

// Sample anime data
const allAnimes = [
  {
    id: 1,
    title: "Demon Slayer: Kimetsu no Yaiba",
    image: "https://images.unsplash.com/photo-1578632767115-351597cf2477?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=800",
    rating: 9.0,
    type: "TV",
    episodes: 24,
    genres: ["Action", "Fantasy"],
    year: 2019,
    status: "watching",
    progress: 12,
  },
  {
    id: 2,
    title: "Jujutsu Kaisen",
    image: "https://images.unsplash.com/photo-1601850494422-3cf14624b0b3?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=800",
    rating: 8.8,
    type: "TV",
    episodes: 24,
    genres: ["Action", "Fantasy"],
    year: 2020,
    status: "completed",
    progress: 24,
  },
  {
    id: 3,
    title: "Attack on Titan",
    image: "https://images.unsplash.com/photo-1541562232579-512a21360020?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=800",
    rating: 9.2,
    type: "TV",
    episodes: 75,
    genres: ["Action", "Drama"],
    year: 2013,
    status: "on-hold",
    progress: 35,
  },
  {
    id: 4,
    title: "My Hero Academia",
    image: "https://images.unsplash.com/photo-1560707303-4e980ce876ad?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=800",
    rating: 8.5,
    type: "TV",
    episodes: 113,
    genres: ["Action", "Comedy"],
    year: 2016,
    status: "dropped",
    progress: 45,
  },
  {
    id: 5,
    title: "One Punch Man",
    image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=800",
    rating: 8.7,
    type: "TV",
    episodes: 24,
    genres: ["Action", "Comedy"],
    year: 2015,
    status: "watching",
    progress: 14,
  },
  {
    id: 6,
    title: "Naruto: Shippuden",
    image: "https://images.unsplash.com/photo-1614583225154-5fcdda07019e?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=800",
    rating: 8.6,
    type: "TV",
    episodes: 500,
    genres: ["Action", "Adventure"],
    year: 2007,
    status: "completed",
    progress: 500,
  },
  {
    id: 7,
    title: "One Piece",
    image: "https://images.unsplash.com/photo-1618336753974-aae8e04506aa?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=800",
    rating: 9.2,
    type: "TV",
    episodes: 1064,
    genres: ["Action", "Adventure"],
    year: 1999,
    status: "watching",
    progress: 950,
  },
  {
    id: 8,
    title: "Death Note",
    image: "https://images.unsplash.com/photo-1603794067602-9feaa4f70e0c?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=800",
    rating: 8.6,
    type: "TV",
    episodes: 37,
    genres: ["Mystery", "Thriller"],
    year: 2006,
    status: "completed",
    progress: 37,
  },
  {
    id: 9,
    title: "Fullmetal Alchemist: Brotherhood",
    image: "https://images.unsplash.com/photo-1612178537253-bccd437b730e?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=800",
    rating: 9.1,
    type: "TV",
    episodes: 64,
    genres: ["Action", "Adventure"],
    year: 2009,
    status: "plan-to-watch",
    progress: 0,
  },
  {
    id: 10,
    title: "Hunter x Hunter",
    image: "https://images.unsplash.com/photo-1530319067432-f2a729c03db5?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=800",
    rating: 9.0,
    type: "TV",
    episodes: 148,
    genres: ["Action", "Adventure"],
    year: 2011,
    status: "on-hold",
    progress: 70,
  },
];

interface CategoryData {
  title: string;
  description: string;
  emptyMessage: string;
}

const categoryData: Record<string, CategoryData> = {
  all: {
    title: "All Anime",
    description: "Browse our complete collection of anime series and movies.",
    emptyMessage: "No anime in your collection yet. Start exploring to add some!",
  },
  watching: {
    title: "Currently Watching",
    description: "Track your progress on the anime series you're currently following.",
    emptyMessage: "You're not currently watching any anime. Find something to start!",
  },
  completed: {
    title: "Completed Series",
    description: "Anime series and films you've finished watching.",
    emptyMessage: "You haven't completed any anime yet.",
  },
  "on-hold": {
    title: "On Hold",
    description: "Shows you're taking a break from but plan to continue later.",
    emptyMessage: "You don't have any anime on hold.",
  },
  dropped: {
    title: "Dropped Series",
    description: "Anime you've decided not to continue watching.",
    emptyMessage: "You haven't dropped any anime.",
  },
  "plan-to-watch": {
    title: "Plan to Watch",
    description: "Your watchlist of shows to start in the future.",
    emptyMessage: "Your watchlist is empty. Start adding series you want to watch!",
  },
};

const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  const [animes, setAnimes] = useState<typeof allAnimes>([]);
  
  useEffect(() => {
    // In a real app, this would be an API call
    if (category === "all") {
      setAnimes(allAnimes);
    } else {
      setAnimes(allAnimes.filter(anime => anime.status === category));
    }
  }, [category]);
  
  const categoryInfo = categoryData[category || "all"] || categoryData.all;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">{categoryInfo.title}</h1>
          <p className="text-muted-foreground mt-2">{categoryInfo.description}</p>
        </div>
        
        {animes.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {animes.map((anime) => (
              <AnimeCard
                key={anime.id}
                id={anime.id}
                title={anime.title}
                image={anime.image}
                rating={anime.rating}
                type={anime.type}
                episodes={anime.episodes}
                progress={anime.progress}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-lg text-muted-foreground">{categoryInfo.emptyMessage}</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default CategoryPage;
