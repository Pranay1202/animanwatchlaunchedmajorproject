
import Navbar from "@/components/Navbar";
import AnimeCard from "@/components/AnimeCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

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
  },
  {
    id: 11,
    title: "Spy x Family",
    image: "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=800",
    rating: 8.7,
    type: "TV",
    episodes: 25,
    genres: ["Action", "Comedy"],
    year: 2022,
  },
  {
    id: 12,
    title: "Violet Evergarden",
    image: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=800",
    rating: 8.9,
    type: "TV",
    episodes: 13,
    genres: ["Drama", "Fantasy"],
    year: 2018,
  },
];

const AnimeList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterGenre, setFilterGenre] = useState("");
  const [filterYear, setFilterYear] = useState("");
  const [filterType, setFilterType] = useState("");
  
  // Extract unique genres, years and types for filter dropdowns
  const genres = Array.from(new Set(allAnimes.flatMap((anime) => anime.genres)));
  const years = Array.from(new Set(allAnimes.map((anime) => anime.year))).sort((a, b) => b - a);
  const types = Array.from(new Set(allAnimes.map((anime) => anime.type)));
  
  // Filter animes based on search and filters
  const filteredAnimes = allAnimes.filter((anime) => {
    const matchesSearch = anime.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenre = filterGenre === "" || anime.genres.includes(filterGenre);
    const matchesYear = filterYear === "" || anime.year === Number(filterYear);
    const matchesType = filterType === "" || anime.type === filterType;
    
    return matchesSearch && matchesGenre && matchesYear && matchesType;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container py-8">
        <h1 className="text-3xl font-bold mb-8">Anime List</h1>
        
        {/* Search and filters */}
        <div className="bg-card rounded-lg p-6 mb-8 shadow-sm">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <label htmlFor="search" className="text-sm font-medium mb-2 block">
                Search
              </label>
              <Input
                id="search"
                placeholder="Search anime..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div>
              <label htmlFor="genre" className="text-sm font-medium mb-2 block">
                Genre
              </label>
              <Select value={filterGenre} onValueChange={setFilterGenre}>
                <SelectTrigger>
                  <SelectValue placeholder="All Genres" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all_genres">All Genres</SelectItem>
                  {genres.map((genre) => (
                    <SelectItem key={genre} value={genre}>
                      {genre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label htmlFor="year" className="text-sm font-medium mb-2 block">
                Year
              </label>
              <Select value={filterYear} onValueChange={setFilterYear}>
                <SelectTrigger>
                  <SelectValue placeholder="All Years" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all_years">All Years</SelectItem>
                  {years.map((year) => (
                    <SelectItem key={year} value={year.toString()}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label htmlFor="type" className="text-sm font-medium mb-2 block">
                Type
              </label>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger>
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all_types">All Types</SelectItem>
                  {types.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="mt-4 flex justify-end">
            <Button
              variant="outline"
              className="mr-2"
              onClick={() => {
                setSearchTerm("");
                setFilterGenre("");
                setFilterYear("");
                setFilterType("");
              }}
            >
              Reset
            </Button>
          </div>
        </div>
        
        {/* Results */}
        <div>
          <div className="mb-4 flex justify-between items-center">
            <h2 className="text-xl font-semibold">Results ({filteredAnimes.length})</h2>
            <Select defaultValue="popularity">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popularity">Popularity</SelectItem>
                <SelectItem value="rating">Rating (High to Low)</SelectItem>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="title">Title (A-Z)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {filteredAnimes.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 mb-8">
              {filteredAnimes.map((anime) => (
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
              <p className="text-lg text-muted-foreground">No anime found matching your criteria.</p>
              <Button
                className="mt-4"
                onClick={() => {
                  setSearchTerm("");
                  setFilterGenre("");
                  setFilterYear("");
                  setFilterType("");
                }}
              >
                Reset Filters
              </Button>
            </div>
          )}
        </div>
      </main>
      
      <footer className="bg-anime-darkblue text-gray-300 py-8">
        <div className="container text-center">
          <p>&copy; {new Date().getFullYear()} AniManga Watch. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default AnimeList;
