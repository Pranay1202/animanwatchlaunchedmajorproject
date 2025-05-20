
import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";
import FeaturedAnime from "@/components/FeaturedAnime";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { animeData } from "@/data/animeData";

// Get unique genres from anime data
const allGenres = Array.from(
  new Set(animeData.flatMap((anime) => anime.genres))
).slice(0, 8);

// Sort anime by rating for trending and most popular sections
const trending = animeData
  .slice()
  .sort((a, b) => b.rating - a.rating)
  .slice(0, 5);

const popular = animeData
  .slice()
  .sort((a, b) => b.year - a.year)
  .slice(0, 5);

// Select a few popular genres with some anime to display
const categories = [
  { 
    name: "Action", 
    image: "https://images.unsplash.com/photo-1535223289827-42f1e9919769?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=800" 
  },
  { 
    name: "Fantasy", 
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=800" 
  },
  { 
    name: "Romance", 
    image: "https://images.unsplash.com/photo-1516589091380-5d8e87df6999?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=800" 
  },
  { 
    name: "Comedy", 
    image: "https://images.unsplash.com/photo-1543584756-31dc84f636d7?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=800" 
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        
        <FeaturedAnime title="Trending Now" animes={trending} />
        <FeaturedAnime title="Most Popular" animes={popular} />
        
        {/* Categories Section */}
        <div className="container py-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Browse by Genre</h2>
            <Link to="/anime-list" className="text-anime-purple hover:underline text-sm">
              View all genres
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category, index) => (
              <Link 
                key={index} 
                to={`/genre/${category.name.toLowerCase()}`}
                className="relative overflow-hidden rounded-xl aspect-video bg-cover bg-center"
                style={{ backgroundImage: `url(${category.image})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-4">
                  <h3 className="text-white font-semibold">{category.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
        
        {/* Features Section */}
        <div className="bg-gradient-to-r from-anime-darkblue to-anime-darkpurple py-16">
          <div className="container">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-white mb-4">Track Your Anime Journey</h2>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Keep track of your favorite anime, discover new series, and join communities of fans who share your passion.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: "Track Progress", desc: "Never lose track of which episode you're on across multiple series." },
                { title: "Join Clubs", desc: "Discuss your favorite shows with like-minded anime enthusiasts." },
                { title: "Get Recommendations", desc: "Discover new anime based on your watching history and preferences." }
              ].map((feature, i) => (
                <div key={i} className="bg-white/10 backdrop-blur-sm p-6 rounded-xl text-center">
                  <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-300">{feature.desc}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <Link to="/watchlist">
                <Button size="lg" className="bg-anime-purple hover:bg-anime-darkpurple">
                  Create Your Watchlist
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-anime-darkblue text-gray-300 py-12">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold text-white mb-4">Navigation</h3>
              <ul className="space-y-2">
                <li><Link to="/" className="hover:text-anime-purple">Home</Link></li>
                <li><Link to="/anime-list" className="hover:text-anime-purple">Anime List</Link></li>
                <li><Link to="/clubs" className="hover:text-anime-purple">Clubs</Link></li>
                <li><Link to="/calendar" className="hover:text-anime-purple">Calendar</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-4">Categories</h3>
              <ul className="space-y-2">
                <li><Link to="/anime-list" className="hover:text-anime-purple">All</Link></li>
                <li><Link to="/watchlist" className="hover:text-anime-purple">My Watchlist</Link></li>
                <li><Link to="/category/completed" className="hover:text-anime-purple">Completed</Link></li>
                <li><Link to="/category/plan-to-watch" className="hover:text-anime-purple">Plan to Watch</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><Link to="/resources" className="hover:text-anime-purple">Help Center</Link></li>
                <li><Link to="/resources" className="hover:text-anime-purple">About Us</Link></li>
                <li><Link to="/resources" className="hover:text-anime-purple">Contact</Link></li>
                <li><Link to="/resources" className="hover:text-anime-purple">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-4">Genres</h3>
              <ul className="space-y-2">
                {allGenres.slice(0, 4).map((genre, index) => (
                  <li key={index}>
                    <Link to={`/genre/${genre.toLowerCase()}`} className="hover:text-anime-purple">
                      {genre}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p>&copy; {new Date().getFullYear()} AniManga Watch. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
