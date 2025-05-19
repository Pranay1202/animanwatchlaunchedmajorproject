
import React from "react";
import { Button } from "@/components/ui/button";
import { Play, Video } from "lucide-react";

interface EpisodeCardProps {
  title: string;
  thumbnail?: string;
  onWatch: () => void;
}

const EpisodeCard: React.FC<EpisodeCardProps> = ({ title, thumbnail, onWatch }) => {
  return (
    <div className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative aspect-video bg-gray-900">
        {thumbnail && (
          <img 
            src={thumbnail} 
            alt={title} 
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
          <Button 
            variant="outline"
            className="border-white text-white hover:bg-white/20 hover:text-white"
            onClick={onWatch}
          >
            <Play className="mr-2" size={16} />
            Play
          </Button>
        </div>
      </div>
      <div className="p-3">
        <h4 className="font-medium line-clamp-1">{title}</h4>
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full mt-2"
          onClick={onWatch}
        >
          <Video className="mr-2" size={16} />
          Watch Now
        </Button>
      </div>
    </div>
  );
};

export default EpisodeCard;
