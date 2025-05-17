
import { useParams } from "react-router-dom";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Video, Calendar, Film } from "lucide-react";

// Sample anime data - this would come from an API in a real app
const animeData = [
  {
    id: 1,
    title: "Demon Slayer: Kimetsu no Yaiba",
    image: "https://images.unsplash.com/photo-1578632767115-351597cf2477?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=800",
    rating: 9.0,
    type: "TV",
    episodes: 24,
    synopsis: "A young boy hunts demons to avenge his family and cure his sister.",
    videos: [
      { title: "Episode 1", url: "https://example.com/video1" },
      { title: "Episode 2", url: "https://example.com/video2" },
    ]
  },
  {
    id: 2,
    title: "Jujutsu Kaisen",
    image: "https://images.unsplash.com/photo-1601850494422-3cf14624b0b3?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=800",
    rating: 8.8,
    type: "TV",
    episodes: 24,
    synopsis: "A high school student joins a secret organization to fight curses.",
    videos: [
      { title: "Episode 1", url: "https://example.com/jjk1" },
      { title: "Episode 2", url: "https://example.com/jjk2" },
    ]
  },
  // More anime data would be here
];

const AnimeDetail = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("episodes");
  
  // Find anime by id from our sample data
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
            <div className="text-gray-300 mt-2">
              {anime.episodes} Episodes
            </div>
          </div>
        </div>
        
        {/* Synopsis */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Synopsis</h2>
          <p className="text-muted-foreground">{anime.synopsis}</p>
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
                  <div key={index} className="border rounded-lg p-4 hover:bg-accent transition-colors">
                    <h4 className="font-medium mb-2">{video.title}</h4>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full"
                      onClick={() => window.open(video.url, '_blank')}
                    >
                      <Video className="mr-2" size={16} />
                      Watch Now
                    </Button>
                  </div>
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
    </div>
  );
};

export default AnimeDetail;
