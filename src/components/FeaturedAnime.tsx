
import AnimeCard from "./AnimeCard";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

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
}

const animeData: Anime[] = [
  {
    id: 1,
    title: "One Piece",
    image: "https://images.unsplash.com/photo-1618336753974-aae8e04506aa?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=800",
    rating: 9.2,
    type: "TV",
    episodes: 1064,
  },
  {
    id: 2,
    title: "Jujutsu Kaisen",
    image: "https://images.unsplash.com/photo-1601850494422-3cf14624b0b3?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=800",
    rating: 8.8,
    type: "TV",
    episodes: 24,
  },
  {
    id: 3,
    title: "Chainsaw Man",
    image: "https://images.unsplash.com/photo-1571757767119-68b8dbed8c97?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=800",
    rating: 8.7,
    type: "TV",
    episodes: 12,
  },
  {
    id: 4,
    title: "Fullmetal Alchemist: Brotherhood",
    image: "https://images.unsplash.com/photo-1612178537253-bccd437b730e?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=800",
    rating: 9.1,
    type: "TV",
    episodes: 64,
  },
  {
    id: 5,
    title: "Hunter x Hunter",
    image: "https://images.unsplash.com/photo-1530319067432-f2a729c03db5?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=800",
    rating: 9.0,
    type: "TV",
    episodes: 148,
  },
  {
    id: 6,
    title: "Death Note",
    image: "https://images.unsplash.com/photo-1603794067602-9feaa4f70e0c?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=800",
    rating: 8.6,
    type: "TV",
    episodes: 37,
  },
];

const FeaturedAnime: React.FC<FeaturedAnimeProps> = ({ title, animes = animeData }) => {
  return (
    <div className="py-8">
      <div className="container">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">{title}</h2>
          <a href="#" className="text-anime-purple hover:underline text-sm">
            View all
          </a>
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
