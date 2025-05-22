
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

interface HeroAnime {
  id: number;
  title: string;
  description: string;
  image: string;
}

const heroAnimes: HeroAnime[] = [
  {
    id: 1,
    title: "Demon Slayer",
    description: "A family is attacked by demons and only two members survive - Tanjiro and his sister Nezuko, who is turning into a demon slowly. Tanjiro sets out to become a demon slayer to avenge his family and cure his sister.",
    image: "https://images.unsplash.com/photo-1578632767115-351597cf2477?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=1920",
  },
  {
    id: 2,
    title: "Attack on Titan",
    description: "In a world where humanity lives behind walls protecting them from giant humanoid creatures, a young boy vows revenge against these Titans after they destroy his hometown and kill his mother.",
    image: "https://images.unsplash.com/photo-1541562232579-512a21360020?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=1920",
  },
  {
    id: 3,
    title: "My Hero Academia",
    description: "A superhero-loving boy without any powers is determined to enroll in a prestigious hero academy and learn what it really means to be a hero.",
    image: "https://images.unsplash.com/photo-1560707303-4e980ce876ad?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=1920",
  }
];

const HeroSection = () => {
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
  const currentHero = heroAnimes[currentHeroIndex];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroIndex((prevIndex) => (prevIndex + 1) % heroAnimes.length);
    }, 8000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-[70vh] min-h-[500px] w-full overflow-hidden">
      {/* Background image with overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out transform scale-110"
        style={{ backgroundImage: `url(${currentHero.image})` }}
      >
        <div className="absolute inset-0 bg-hero-pattern"></div>
      </div>
      
      {/* Content */}
      <div className="container relative z-10 flex h-full flex-col justify-center">
        <div className="max-w-xl animate-fade-in">
          <h1 className="text-3xl font-bold text-white sm:text-4xl md:text-5xl lg:text-6xl">
            {currentHero.title}
          </h1>
          
          <p className="mt-4 text-lg text-gray-200">
            {currentHero.description}
          </p>
          
          <div className="mt-8 flex space-x-4">
            <Link to={`/anime/${currentHero.id}`}>
              <Button size="lg" className="bg-anime-purple hover:bg-anime-darkpurple">
                Watch Now
              </Button>
            </Link>
            <Link to="/watchlist">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/20">
                Add to List
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Navigation dots */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-2">
          {heroAnimes.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentHeroIndex(index)}
              className={`h-2 w-2 rounded-full transition-all ${
                index === currentHeroIndex
                  ? "bg-white w-6"
                  : "bg-white/50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
