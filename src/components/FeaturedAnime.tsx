
import AnimeCard from "./AnimeCard";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Link } from "react-router-dom";

interface Anime {
  id: number;
  title: string;
  image: string;
  rating?: number;
  type?: string;
  episodes?: number;
  progress?: number;
}

interface FeaturedAnimeProps {
  title: string;
  animes: Anime[];
  viewAllLink?: string;
}

const FeaturedAnime: React.FC<FeaturedAnimeProps> = ({ 
  title, 
  animes, 
  viewAllLink = "/anime-list" 
}) => {
  return (
    <div className="py-8">
      <div className="container">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">{title}</h2>
          <Link to={viewAllLink} className="text-anime-purple hover:underline text-sm">
            View all
          </Link>
        </div>
        
        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex space-x-4 pb-4">
            {animes.map((anime) => (
              <div key={anime.id} className="w-[180px] md:w-[200px] shrink-0">
                <AnimeCard {...anime} />
              </div>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </div>
  );
};

export default FeaturedAnime;
