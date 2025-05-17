
import { useParams } from "react-router-dom";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Video, Calendar, Film } from "lucide-react";

// Enhanced anime data with more entries and episodes
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
      { title: "Episode 1 - Cruelty", url: "https://example.com/video1" },
      { title: "Episode 2 - Trainer Sakonji Urokodaki", url: "https://example.com/video2" },
      { title: "Episode 3 - Sabito and Makomo", url: "https://example.com/video3" },
      { title: "Episode 4 - Final Selection", url: "https://example.com/video4" },
      { title: "Episode 5 - My Own Steel", url: "https://example.com/video5" },
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
      { title: "Episode 1 - Ryomen Sukuna", url: "https://example.com/jjk1" },
      { title: "Episode 2 - For Myself", url: "https://example.com/jjk2" },
      { title: "Episode 3 - Girl of Steel", url: "https://example.com/jjk3" },
      { title: "Episode 4 - Curse Womb Must Die", url: "https://example.com/jjk4" },
      { title: "Episode 5 - Curse", url: "https://example.com/jjk5" },
    ]
  },
  {
    id: 3,
    title: "Attack on Titan",
    image: "https://images.unsplash.com/photo-1541562232579-512a21360020?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=800",
    rating: 9.2,
    type: "TV",
    episodes: 75,
    synopsis: "In a world overrun by Titans, humanity fights for survival behind enormous walls.",
    videos: [
      { title: "Episode 1 - To You, 2,000 Years From Now", url: "https://example.com/aot1" },
      { title: "Episode 2 - That Day", url: "https://example.com/aot2" },
      { title: "Episode 3 - A Dim Light Amid Despair", url: "https://example.com/aot3" },
      { title: "Episode 4 - The Night of the Closing Ceremony", url: "https://example.com/aot4" },
      { title: "Episode 5 - First Battle", url: "https://example.com/aot5" },
    ]
  },
  {
    id: 4,
    title: "My Hero Academia",
    image: "https://images.unsplash.com/photo-1560707303-4e980ce876ad?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=800",
    rating: 8.5,
    type: "TV",
    episodes: 113,
    synopsis: "A quirkless boy inherits a powerful ability and enrolls in a prestigious hero academy.",
    videos: [
      { title: "Episode 1 - Izuku Midoriya: Origin", url: "https://example.com/mha1" },
      { title: "Episode 2 - What It Takes to Be a Hero", url: "https://example.com/mha2" },
      { title: "Episode 3 - Roaring Muscles", url: "https://example.com/mha3" },
      { title: "Episode 4 - Start Line", url: "https://example.com/mha4" },
      { title: "Episode 5 - What I Can Do for Now", url: "https://example.com/mha5" },
    ]
  },
  {
    id: 5,
    title: "One Punch Man",
    image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=800",
    rating: 8.7,
    type: "TV",
    episodes: 24,
    synopsis: "A superhero who can defeat any opponent with a single punch becomes bored by the absence of challenge.",
    videos: [
      { title: "Episode 1 - The Strongest Man", url: "https://example.com/opm1" },
      { title: "Episode 2 - The Lone Cyborg", url: "https://example.com/opm2" },
      { title: "Episode 3 - The Obsessive Scientist", url: "https://example.com/opm3" },
      { title: "Episode 4 - The Modern Ninja", url: "https://example.com/opm4" },
      { title: "Episode 5 - The Ultimate Teacher", url: "https://example.com/opm5" },
    ]
  },
  {
    id: 6,
    title: "Naruto: Shippuden",
    image: "https://images.unsplash.com/photo-1614583225154-5fcdda07019e?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=800",
    rating: 8.6,
    type: "TV",
    episodes: 500,
    synopsis: "Naruto returns after years of training to face powerful enemies and save his friend from darkness.",
    videos: [
      { title: "Episode 1 - Homecoming", url: "https://example.com/naruto1" },
      { title: "Episode 2 - The Akatsuki Makes Its Move", url: "https://example.com/naruto2" },
      { title: "Episode 3 - The Results of Training", url: "https://example.com/naruto3" },
      { title: "Episode 4 - The Jinchuriki of the Sand", url: "https://example.com/naruto4" },
      { title: "Episode 5 - The Kazekage Stands Tall", url: "https://example.com/naruto5" },
    ]
  },
  {
    id: 7,
    title: "One Piece",
    image: "https://images.unsplash.com/photo-1618336753974-aae8e04506aa?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=800",
    rating: 9.2,
    type: "TV",
    episodes: 1064,
    synopsis: "Monkey D. Luffy and his pirate crew explore the Grand Line in search of the world's ultimate treasure.",
    videos: [
      { title: "Episode 1 - I'm Luffy! The Man Who's Gonna Be King of the Pirates!", url: "https://example.com/op1" },
      { title: "Episode 2 - Enter the Great Swordsman! Pirate Hunter Roronoa Zoro!", url: "https://example.com/op2" },
      { title: "Episode 3 - Morgan versus Luffy! Who's the Strange Young Girl?", url: "https://example.com/op3" },
      { title: "Episode 4 - Luffy's Past! Enter Red-Haired Shanks!", url: "https://example.com/op4" },
      { title: "Episode 5 - A Terrifying Mysterious Power! Captain Buggy, the Clown Pirate!", url: "https://example.com/op5" },
    ]
  },
  {
    id: 8,
    title: "Death Note",
    image: "https://images.unsplash.com/photo-1603794067602-9feaa4f70e0c?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=800",
    rating: 8.6,
    type: "TV",
    episodes: 37,
    synopsis: "A high school student discovers a supernatural notebook that kills anyone whose name is written in it.",
    videos: [
      { title: "Episode 1 - Rebirth", url: "https://example.com/dn1" },
      { title: "Episode 2 - Confrontation", url: "https://example.com/dn2" },
      { title: "Episode 3 - Dealings", url: "https://example.com/dn3" },
      { title: "Episode 4 - Pursuit", url: "https://example.com/dn4" },
      { title: "Episode 5 - Tactics", url: "https://example.com/dn5" },
    ]
  },
  {
    id: 9,
    title: "Fullmetal Alchemist: Brotherhood",
    image: "https://images.unsplash.com/photo-1612178537253-bccd437b730e?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=800",
    rating: 9.1,
    type: "TV",
    episodes: 64,
    synopsis: "Two brothers search for the Philosopher's Stone to restore their bodies after a failed alchemical experiment.",
    videos: [
      { title: "Episode 1 - Fullmetal Alchemist", url: "https://example.com/fma1" },
      { title: "Episode 2 - The First Day", url: "https://example.com/fma2" },
      { title: "Episode 3 - City of Heresy", url: "https://example.com/fma3" },
      { title: "Episode 4 - An Alchemist's Anguish", url: "https://example.com/fma4" },
      { title: "Episode 5 - Rain of Sorrows", url: "https://example.com/fma5" },
    ]
  },
  {
    id: 10,
    title: "Hunter x Hunter",
    image: "https://images.unsplash.com/photo-1530319067432-f2a729c03db5?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=800",
    rating: 9.0,
    type: "TV",
    episodes: 148,
    synopsis: "A young boy takes on the challenge of becoming a Hunter to find his missing father.",
    videos: [
      { title: "Episode 1 - Departure × And × Friends", url: "https://example.com/hxh1" },
      { title: "Episode 2 - Test × Of × Tests", url: "https://example.com/hxh2" },
      { title: "Episode 3 - Rivals × For × Survival", url: "https://example.com/hxh3" },
      { title: "Episode 4 - Hope × And × Ambition", url: "https://example.com/hxh4" },
      { title: "Episode 5 - Hisoka × Is × Sneaky", url: "https://example.com/hxh5" },
    ]
  },
  {
    id: 11,
    title: "Spy x Family",
    image: "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=800",
    rating: 8.7,
    type: "TV",
    episodes: 25,
    synopsis: "A spy, an assassin, and a telepath come together to form a family while hiding their identities from each other.",
    videos: [
      { title: "Episode 1 - Operation Strix", url: "https://example.com/sxf1" },
      { title: "Episode 2 - Secure a Wife", url: "https://example.com/sxf2" },
      { title: "Episode 3 - Prepare for the Interview", url: "https://example.com/sxf3" },
      { title: "Episode 4 - The Prestigious School's Interview", url: "https://example.com/sxf4" },
      { title: "Episode 5 - Will They Pass or Fail?", url: "https://example.com/sxf5" },
    ]
  },
  {
    id: 12,
    title: "Violet Evergarden",
    image: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=800",
    rating: 8.9,
    type: "TV",
    episodes: 13,
    synopsis: "A former soldier becomes an Auto Memory Doll and learns the meaning of love through writing letters for others.",
    videos: [
      { title: "Episode 1 - I Love You and Auto Memory Dolls", url: "https://example.com/ve1" },
      { title: "Episode 2 - Never Coming Back", url: "https://example.com/ve2" },
      { title: "Episode 3 - May You Be an Exemplary Auto Memory Doll", url: "https://example.com/ve3" },
      { title: "Episode 4 - Not Yet Capable of Love", url: "https://example.com/ve4" },
      { title: "Episode 5 - You Write Letters That Bring People Together?", url: "https://example.com/ve5" },
    ]
  },
  {
    id: 13,
    title: "Chainsaw Man",
    image: "https://images.unsplash.com/photo-1571757767119-68b8dbed8c97?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=800",
    rating: 8.7,
    type: "TV",
    episodes: 12,
    synopsis: "A poor young man who made a contract with the Chainsaw Devil becomes a devil hunter to pay off his father's debts.",
    videos: [
      { title: "Episode 1 - Dog & Chainsaw", url: "https://example.com/csm1" },
      { title: "Episode 2 - Arrival in Tokyo", url: "https://example.com/csm2" },
      { title: "Episode 3 - Meowy's Whereabouts", url: "https://example.com/csm3" },
      { title: "Episode 4 - Rescue", url: "https://example.com/csm4" },
      { title: "Episode 5 - Gun Devil", url: "https://example.com/csm5" },
    ]
  },
  {
    id: 14,
    title: "Tokyo Ghoul",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=800",
    rating: 8.0,
    type: "TV",
    episodes: 12,
    synopsis: "A college student becomes a half-ghoul after surviving a deadly encounter with one, blending into both human and ghoul societies.",
    videos: [
      { title: "Episode 1 - Tragedy", url: "https://example.com/tg1" },
      { title: "Episode 2 - Incubation", url: "https://example.com/tg2" },
      { title: "Episode 3 - Dove", url: "https://example.com/tg3" },
      { title: "Episode 4 - Supper", url: "https://example.com/tg4" },
      { title: "Episode 5 - Scars", url: "https://example.com/tg5" },
    ]
  },
  {
    id: 15,
    title: "Sword Art Online",
    image: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=800",
    rating: 7.5,
    type: "TV",
    episodes: 25,
    synopsis: "Players of a VRMMORPG find themselves trapped inside the game with no way to log out, with their deaths in-game meaning real death.",
    videos: [
      { title: "Episode 1 - The World of Swords", url: "https://example.com/sao1" },
      { title: "Episode 2 - Beater", url: "https://example.com/sao2" },
      { title: "Episode 3 - The Red-Nosed Reindeer", url: "https://example.com/sao3" },
      { title: "Episode 4 - The Black Swordsman", url: "https://example.com/sao4" },
      { title: "Episode 5 - Murder in the Safe Zone", url: "https://example.com/sao5" },
    ]
  },
  {
    id: 16,
    title: "Your Lie in April",
    image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=800",
    rating: 8.8,
    type: "TV",
    episodes: 22,
    synopsis: "A piano prodigy who lost his ability to hear the piano meets a free-spirited violinist who helps him return to music.",
    videos: [
      { title: "Episode 1 - Monotone/Colorful", url: "https://example.com/ylia1" },
      { title: "Episode 2 - Friend A", url: "https://example.com/ylia2" },
      { title: "Episode 3 - Inside Spring", url: "https://example.com/ylia3" },
      { title: "Episode 4 - The Journey", url: "https://example.com/ylia4" },
      { title: "Episode 5 - Gray Skies", url: "https://example.com/ylia5" },
    ]
  }
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
