
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Video, Bookmark } from "lucide-react";
import { useWatchlist } from "@/contexts/WatchlistContext";

interface AnimeCardProps {
  id: number;
  title: string;
  image: string;
  rating?: number;
  type?: string;
  episodes?: number;
  progress?: number;
}

const AnimeCard: React.FC<AnimeCardProps> = ({
  id,
  title,
  image,
  rating,
  type,
  episodes,
  progress,
}) => {
  const { isInWatchlist } = useWatchlist();
  const inWatchlist = isInWatchlist(id);
  
  return (
    <Link to={`/anime/${id}`} className="block">
      <div className="group overflow-hidden rounded-xl transition-all duration-200 hover:shadow-lg">
        <div className="relative aspect-[2/3]">
          {/* Watchlist indicator */}
          {inWatchlist && (
            <div className="absolute top-2 right-2 z-10 bg-anime-purple rounded-full p-1">
              <Bookmark size={16} className="text-white" />
            </div>
          )}
          
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-4 flex flex-col justify-end">
            <h3 className="font-semibold text-sm md:text-base text-white line-clamp-2 mb-1">{title}</h3>
            
            <div className="flex items-center justify-between text-xs">
              <div className="flex gap-2 items-center">
                {rating && (
                  <Badge variant="outline" className="bg-yellow-500/20 border-yellow-500/50 text-yellow-300 text-xs">
                    ★ {rating}
                  </Badge>
                )}
                {type && (
                  <Badge variant="outline" className="bg-blue-500/20 border-blue-500/50 text-blue-300 text-xs">
                    {type}
                  </Badge>
                )}
              </div>
              
              {episodes && (
                <div className="flex items-center text-gray-300 text-xs">
                  <Video className="mr-1" size={12} />
                  {progress !== undefined ? `${progress}/${episodes}` : `${episodes} eps`}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default AnimeCard;
