
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

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
  return (
    <Link to={`/anime/${id}`}>
      <div className="anime-card group">
        <div className="relative h-full">
          <img
            src={image}
            alt={title}
            className="anime-card-image"
          />
          
          <div className="anime-card-overlay">
            <h3 className="font-semibold text-sm md:text-base line-clamp-2 mb-1">{title}</h3>
            
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
                <span className="text-gray-300 text-xs">
                  {progress ? `${progress}/${episodes}` : `${episodes} eps`}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default AnimeCard;
