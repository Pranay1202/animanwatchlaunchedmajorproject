
import { useParams } from "react-router-dom";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Video, Calendar, Film, Bookmark, BookmarkPlus, BookmarkMinus } from "lucide-react";
import VideoPlayer from "@/components/VideoPlayer";
import EpisodeCard from "@/components/EpisodeCard";
import { animeData } from "@/data/animeData"; 
import { useWatchlist } from "@/contexts/WatchlistContext";

const AnimeDetail = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("episodes");
  const [selectedVideo, setSelectedVideo] = useState<{ title: string; url: string } | null>(null);
  
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();
  
  // Find anime by id from our centralized data
  const anime = animeData.find(anime => anime.id === Number(id));
  
  if (!anime) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container py-8">
          <h1 className="text-2xl font-bold">Anime not found</h1>
        </div>
      </div>
    );
  }

  const inWatchlist = isInWatchlist(anime.id);

  // Handle opening the video player
  const handleWatchVideo = (video: { title: string; url: string }) => {
    setSelectedVideo(video);
  };

  // Handle closing the video player
  const handleCloseVideo = () => {
    setSelectedVideo(null);
  };

  // Handle watchlist toggle
  const handleWatchlistToggle = () => {
    if (inWatchlist) {
      removeFromWatchlist(anime.id);
    } else {
      addToWatchlist(anime.id);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container py-8">
        {/* Hero Section */}
        <div className="relative rounded-xl overflow-hidden mb-8">
          <div 
            className="w-full h-64 md:h-96 bg-cover bg-center" 
            style={{ backgroundImage: `url(${anime.image})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
          <div className="absolute bottom-0 left-0 w-full p-6">
            <div className="flex items-center gap-4">
              <h1 className="text-3xl md:text-4xl font-bold text-white">{anime.title}</h1>
              {anime.rating && (
                <Badge variant="outline" className="bg-yellow-500/20 border-yellow-500/50 text-yellow-300">
                  ★ {anime.rating}
                </Badge>
              )}
              {anime.type && (
                <Badge variant="outline" className="bg-blue-500/20 border-blue-500/50 text-blue-300">
                  {anime.type}
                </Badge>
              )}
            </div>
            <div className="flex items-center justify-between mt-2">
              <div className="text-gray-300">
                {anime.episodes} Episodes • {anime.year}
              </div>
              <Button
                variant={inWatchlist ? "outline" : "default"}
                size="sm"
                onClick={handleWatchlistToggle}
                className={inWatchlist ? "border-white/50 text-white" : ""}
              >
                {inWatchlist ? (
                  <>
                    <BookmarkMinus className="mr-2" size={16} />
                    Remove from Watchlist
                  </>
                ) : (
                  <>
                    <BookmarkPlus className="mr-2" size={16} />
                    Add to Watchlist
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
        
        {/* Synopsis */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Synopsis</h2>
          <p className="text-muted-foreground">{anime.synopsis}</p>
        </div>
        
        {/* Genres */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Genres</h2>
          <div className="flex flex-wrap gap-2">
            {anime.genres.map((genre, index) => (
              <Badge key={index} variant="outline">
                {genre}
              </Badge>
            ))}
          </div>
        </div>
        
        {/* Tabs */}
        <div className="mb-6">
          <div className="flex border-b">
            <Button 
              variant={activeTab === "episodes" ? "default" : "ghost"} 
              onClick={() => setActiveTab("episodes")}
              className="rounded-none rounded-t-lg"
            >
              <Video className="mr-2" />
              Episodes
            </Button>
            <Button 
              variant={activeTab === "schedule" ? "default" : "ghost"} 
              onClick={() => setActiveTab("schedule")}
              className="rounded-none rounded-t-lg"
            >
              <Calendar className="mr-2" />
              Schedule
            </Button>
            <Button 
              variant={activeTab === "related" ? "default" : "ghost"} 
              onClick={() => setActiveTab("related")}
              className="rounded-none rounded-t-lg"
            >
              <Film className="mr-2" />
              Related
            </Button>
          </div>
        </div>
        
        {/* Content based on active tab */}
        <div className="mb-8">
          {activeTab === "episodes" && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Watch Episodes</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {anime.videos.map((video, index) => (
                  <EpisodeCard
                    key={index}
                    title={video.title}
                    thumbnail={video.thumbnail}
                    onWatch={() => handleWatchVideo(video)}
                  />
                ))}
              </div>
            </div>
          )}
          
          {activeTab === "schedule" && (
            <div>
              <h3 className="text-xl font-semibold mb-4">Upcoming Episodes</h3>
              <p className="text-muted-foreground">No upcoming episodes scheduled at this time.</p>
            </div>
          )}
          
          {activeTab === "related" && (
            <div>
              <h3 className="text-xl font-semibold mb-4">Related Anime</h3>
              <p className="text-muted-foreground">No related anime found.</p>
            </div>
          )}
        </div>
      </main>

      {/* Video Player Modal */}
      {selectedVideo && (
        <VideoPlayer
          isOpen={!!selectedVideo}
          onClose={handleCloseVideo}
          title={selectedVideo.title}
          videoSrc={selectedVideo.url}
        />
      )}
    </div>
  );
};

export default AnimeDetail;
