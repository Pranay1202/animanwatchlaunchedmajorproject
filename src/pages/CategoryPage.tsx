
import { useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import AnimeCard from "@/components/AnimeCard";

// Sample anime data for different categories
const categoryAnimes = {
  all: [
    {
      id: 1,
      title: "Demon Slayer: Kimetsu no Yaiba",
      image: "https://images.unsplash.com/photo-1578632767115-351597cf2477?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=800",
      rating: 9.0,
      type: "TV",
      episodes: 24,
    },
    {
      id: 2,
      title: "Jujutsu Kaisen",
      image: "https://images.unsplash.com/photo-1601850494422-3cf14624b0b3?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=800",
      rating: 8.8,
      type: "TV",
      episodes: 24,
    },
    {
      id: 3,
      title: "Attack on Titan",
      image: "https://images.unsplash.com/photo-1541562232579-512a21360020?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=800",
      rating: 9.2,
      type: "TV",
      episodes: 75,
    },
    {
      id: 4,
      title: "My Hero Academia",
      image: "https://images.unsplash.com/photo-1560707303-4e980ce876ad?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=800",
      rating: 8.5,
      type: "TV",
      episodes: 113,
    },
    {
      id: 5,
      title: "One Punch Man",
      image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=800",
      rating: 8.7,
      type: "TV",
      episodes: 24,
    },
    {
      id: 6,
      title: "Naruto: Shippuden",
      image: "https://images.unsplash.com/photo-1614583225154-5fcdda07019e?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=800",
      rating: 8.6,
      type: "TV",
      episodes: 500,
    },
  ],
  watching: [
    {
      id: 1,
      title: "Demon Slayer: Kimetsu no Yaiba",
      image: "https://images.unsplash.com/photo-1578632767115-351597cf2477?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=800",
      rating: 9.0,
      type: "TV",
      episodes: 24,
      progress: 12,
    },
    {
      id: 7,
      title: "One Piece",
      image: "https://images.unsplash.com/photo-1618336753974-aae8e04506aa?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=800",
      rating: 9.2,
      type: "TV",
      episodes: 1064,
      progress: 950,
    },
    {
      id: 11,
      title: "Spy x Family",
      image: "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=800",
      rating: 8.7,
      type: "TV",
      episodes: 25,
      progress: 15,
    },
  ],
  completed: [
    {
      id: 8,
      title: "Death Note",
      image: "https://images.unsplash.com/photo-1603794067602-9feaa4f70e0c?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=800",
      rating: 8.6,
      type: "TV",
      episodes: 37,
      progress: 37,
    },
    {
      id: 12,
      title: "Violet Evergarden",
      image: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=800",
      rating: 8.9,
      type: "TV",
      episodes: 13,
      progress: 13,
    },
  ],
  "on-hold": [
    {
      id: 3,
      title: "Attack on Titan",
      image: "https://images.unsplash.com/photo-1541562232579-512a21360020?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=800",
      rating: 9.2,
      type: "TV",
      episodes: 75,
      progress: 24,
    },
  ],
  dropped: [
    {
      id: 6,
      title: "Naruto: Shippuden",
      image: "https://images.unsplash.com/photo-1614583225154-5fcdda07019e?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=800",
      rating: 8.6,
      type: "TV",
      episodes: 500,
      progress: 220,
    },
  ],
  "plan-to-watch": [
    {
      id: 2,
      title: "Jujutsu Kaisen",
      image: "https://images.unsplash.com/photo-1601850494422-3cf14624b0b3?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=800",
      rating: 8.8,
      type: "TV",
      episodes: 24,
    },
    {
      id: 9,
      title: "Fullmetal Alchemist: Brotherhood",
      image: "https://images.unsplash.com/photo-1612178537253-bccd437b730e?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=800",
      rating: 9.1,
      type: "TV",
      episodes: 64,
    },
    {
      id: 10,
      title: "Hunter x Hunter",
      image: "https://images.unsplash.com/photo-1530319067432-f2a729c03db5?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=800",
      rating: 9.0,
      type: "TV",
      episodes: 148,
    },
  ],
};

const categoryTitles = {
  all: "All Anime",
  watching: "Currently Watching",
  completed: "Completed",
  "on-hold": "On Hold",
  dropped: "Dropped",
  "plan-to-watch": "Plan to Watch",
};

const categoryDescriptions = {
  all: "Browse our complete collection of anime series and movies.",
  watching: "Shows you're currently watching. Track your progress.",
  completed: "Series and films you've finished watching.",
  "on-hold": "Shows you've temporarily paused watching.",
  dropped: "Series you've decided not to continue watching.",
  "plan-to-watch": "Your watchlist of shows to start in the future.",
};

const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  const normalizedCategory = category || "all";
  
  const animes = categoryAnimes[normalizedCategory as keyof typeof categoryAnimes] || [];
  const categoryTitle = categoryTitles[normalizedCategory as keyof typeof categoryTitles] || "All Anime";
  const categoryDescription = categoryDescriptions[normalizedCategory as keyof typeof categoryDescriptions] || "";

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{categoryTitle}</h1>
          <p className="text-muted-foreground">{categoryDescription}</p>
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
          <div className="text-center py-16">
            <h3 className="text-xl font-medium mb-2">No anime in this category yet</h3>
            <p className="text-muted-foreground mb-8">
              {normalizedCategory === "all"
                ? "Looks like our database is empty. Check back soon!"
                : `You haven't added any anime to your ${categoryTitle.toLowerCase()} list yet.`}
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

export default CategoryPage;
