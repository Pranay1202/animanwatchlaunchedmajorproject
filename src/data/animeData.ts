
// List of video sources from Google's sample videos
const sampleVideos = [
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4"
];

export type Anime = {
  id: number;
  title: string;
  image: string;
  rating: number;
  type: string;
  episodes: number;
  synopsis: string;
  genres: string[];
  year: number;
  videos: {
    title: string;
    url: string;
    thumbnail?: string;
  }[];
};

// Generate 10 episodes for an anime
const generateEpisodes = (anime: { id: number, title: string, image: string }) => {
  return Array.from({ length: 10 }, (_, index) => {
    const episodeNumber = index + 1;
    let episodeTitle = "";
    
    // Custom episode titles based on anime
    switch (anime.id) {
      case 1: // Demon Slayer
        const dsTitles = [
          "Cruelty", "Trainer Sakonji Urokodaki", "Sabito and Makomo", 
          "Final Selection", "My Own Steel", "Swordsman Accompanying a Demon",
          "Muzan Kibutsuji", "The Smell of Enchanting Blood", "Temari Demon and Arrow Demon",
          "Together Forever"
        ];
        episodeTitle = dsTitles[index];
        break;
      case 2: // Jujutsu Kaisen
        const jkTitles = [
          "Ryomen Sukuna", "For Myself", "Girl of Steel", 
          "Curse Womb Must Die", "Curse", "After Rain", 
          "Assault", "Boredom", "Small Fry and Reverse Retribution", 
          "Idle Transfiguration"
        ];
        episodeTitle = jkTitles[index];
        break;
      default:
        episodeTitle = `Episode ${episodeNumber}`;
    }
    
    return {
      title: `Episode ${episodeNumber} - ${episodeTitle}`,
      url: sampleVideos[index % sampleVideos.length],
      thumbnail: anime.image
    };
  });
};

export const animeData: Anime[] = [
  {
    id: 1,
    title: "Demon Slayer: Kimetsu no Yaiba",
    image: "https://images.unsplash.com/photo-1578632767115-351597cf2477?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=800",
    rating: 9.0,
    type: "TV",
    episodes: 10,
    synopsis: "A young boy hunts demons to avenge his family and cure his sister.",
    genres: ["Action", "Fantasy", "Supernatural"],
    year: 2019,
    videos: generateEpisodes({
      id: 1,
      title: "Demon Slayer: Kimetsu no Yaiba",
      image: "https://images.unsplash.com/photo-1578632767115-351597cf2477?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=800"
    })
  },
  {
    id: 2,
    title: "Jujutsu Kaisen",
    image: "https://images.unsplash.com/photo-1601850494422-3cf14624b0b3?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=800",
    rating: 8.8,
    type: "TV",
    episodes: 10,
    synopsis: "A high school student joins a secret organization to fight curses.",
    genres: ["Action", "Fantasy", "Horror"],
    year: 2020,
    videos: generateEpisodes({
      id: 2,
      title: "Jujutsu Kaisen",
      image: "https://images.unsplash.com/photo-1601850494422-3cf14624b0b3?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=800"
    })
  },
  {
    id: 3,
    title: "Attack on Titan",
    image: "https://images.unsplash.com/photo-1541562232579-512a21360020?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=800",
    rating: 9.2,
    type: "TV",
    episodes: 10,
    synopsis: "In a world overrun by Titans, humanity fights for survival behind enormous walls.",
    genres: ["Action", "Drama", "Fantasy", "Horror"],
    year: 2013,
    videos: generateEpisodes({
      id: 3,
      title: "Attack on Titan",
      image: "https://images.unsplash.com/photo-1541562232579-512a21360020?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=800"
    })
  },
  {
    id: 4,
    title: "My Hero Academia",
    image: "https://images.unsplash.com/photo-1560707303-4e980ce876ad?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=800",
    rating: 8.5,
    type: "TV",
    episodes: 10,
    synopsis: "A quirkless boy inherits a powerful ability and enrolls in a prestigious hero academy.",
    genres: ["Action", "Comedy", "School", "Shounen"],
    year: 2016,
    videos: generateEpisodes({
      id: 4,
      title: "My Hero Academia",
      image: "https://images.unsplash.com/photo-1560707303-4e980ce876ad?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=800"
    })
  },
  {
    id: 5,
    title: "One Punch Man",
    image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=800",
    rating: 8.7,
    type: "TV",
    episodes: 10,
    synopsis: "A superhero who can defeat any opponent with a single punch becomes bored by the absence of challenge.",
    genres: ["Action", "Comedy", "Superhero", "Parody"],
    year: 2015,
    videos: generateEpisodes({
      id: 5,
      title: "One Punch Man",
      image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=800"
    })
  },
  {
    id: 6,
    title: "Naruto: Shippuden",
    image: "https://images.unsplash.com/photo-1614583225154-5fcdda07019e?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=800",
    rating: 8.6,
    type: "TV",
    episodes: 10,
    synopsis: "Naruto returns after years of training to face powerful enemies and save his friend from darkness.",
    genres: ["Action", "Adventure", "Shounen", "Martial Arts"],
    year: 2007,
    videos: generateEpisodes({
      id: 6,
      title: "Naruto: Shippuden",
      image: "https://images.unsplash.com/photo-1614583225154-5fcdda07019e?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=800"
    })
  },
  {
    id: 7,
    title: "One Piece",
    image: "https://images.unsplash.com/photo-1618336753974-aae8e04506aa?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=800",
    rating: 9.2,
    type: "TV",
    episodes: 10,
    synopsis: "Monkey D. Luffy and his pirate crew explore the Grand Line in search of the world's ultimate treasure.",
    genres: ["Action", "Adventure", "Comedy", "Fantasy"],
    year: 1999,
    videos: generateEpisodes({
      id: 7,
      title: "One Piece",
      image: "https://images.unsplash.com/photo-1618336753974-aae8e04506aa?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=800"
    })
  },
  {
    id: 8,
    title: "Death Note",
    image: "https://images.unsplash.com/photo-1603794067602-9feaa4f70e0c?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=800",
    rating: 8.6,
    type: "TV",
    episodes: 10,
    synopsis: "A high school student discovers a supernatural notebook that kills anyone whose name is written in it.",
    genres: ["Mystery", "Thriller", "Psychological", "Supernatural"],
    year: 2006,
    videos: generateEpisodes({
      id: 8,
      title: "Death Note",
      image: "https://images.unsplash.com/photo-1603794067602-9feaa4f70e0c?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=800"
    })
  },
  {
    id: 9,
    title: "Fullmetal Alchemist: Brotherhood",
    image: "https://images.unsplash.com/photo-1612178537253-bccd437b730e?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=800",
    rating: 9.1,
    type: "TV",
    episodes: 10,
    synopsis: "Two brothers search for the Philosopher's Stone to restore their bodies after a failed alchemical experiment.",
    genres: ["Action", "Adventure", "Drama", "Fantasy"],
    year: 2009,
    videos: generateEpisodes({
      id: 9,
      title: "Fullmetal Alchemist: Brotherhood",
      image: "https://images.unsplash.com/photo-1612178537253-bccd437b730e?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=800"
    })
  },
  {
    id: 10,
    title: "Hunter x Hunter",
    image: "https://images.unsplash.com/photo-1530319067432-f2a729c03db5?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=800",
    rating: 9.0,
    type: "TV",
    episodes: 10,
    synopsis: "A young boy takes on the challenge of becoming a Hunter to find his missing father.",
    genres: ["Action", "Adventure", "Fantasy", "Shounen"],
    year: 2011,
    videos: generateEpisodes({
      id: 10,
      title: "Hunter x Hunter",
      image: "https://images.unsplash.com/photo-1530319067432-f2a729c03db5?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=800"
    })
  },
  {
    id: 11,
    title: "Spy x Family",
    image: "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=800",
    rating: 8.7,
    type: "TV",
    episodes: 10,
    synopsis: "A spy, an assassin, and a telepath come together to form a family while hiding their identities from each other.",
    genres: ["Action", "Comedy", "Spy", "Family"],
    year: 2022,
    videos: generateEpisodes({
      id: 11,
      title: "Spy x Family",
      image: "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=800"
    })
  },
  {
    id: 12,
    title: "Violet Evergarden",
    image: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=800",
    rating: 8.9,
    type: "TV",
    episodes: 10,
    synopsis: "A former soldier becomes an Auto Memory Doll and learns the meaning of love through writing letters for others.",
    genres: ["Drama", "Fantasy", "Slice of Life", "Romance"],
    year: 2018,
    videos: generateEpisodes({
      id: 12,
      title: "Violet Evergarden",
      image: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=800"
    })
  },
  {
    id: 13,
    title: "Chainsaw Man",
    image: "https://images.unsplash.com/photo-1571757767119-68b8dbed8c97?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=800",
    rating: 8.7,
    type: "TV",
    episodes: 10,
    synopsis: "A poor young man who made a contract with the Chainsaw Devil becomes a devil hunter to pay off his father's debts.",
    genres: ["Action", "Horror", "Supernatural", "Gore"],
    year: 2022,
    videos: generateEpisodes({
      id: 13,
      title: "Chainsaw Man",
      image: "https://images.unsplash.com/photo-1571757767119-68b8dbed8c97?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=800"
    })
  },
  {
    id: 14,
    title: "Tokyo Ghoul",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=800",
    rating: 8.0,
    type: "TV",
    episodes: 10,
    synopsis: "A college student becomes a half-ghoul after surviving a deadly encounter with one, blending into both human and ghoul societies.",
    genres: ["Action", "Horror", "Psychological", "Supernatural"],
    year: 2014,
    videos: generateEpisodes({
      id: 14,
      title: "Tokyo Ghoul",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=800"
    })
  },
  {
    id: 15,
    title: "Sword Art Online",
    image: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=800",
    rating: 7.5,
    type: "TV",
    episodes: 10,
    synopsis: "Players of a VRMMORPG find themselves trapped inside the game with no way to log out, with their deaths in-game meaning real death.",
    genres: ["Action", "Adventure", "Fantasy", "Romance"],
    year: 2012,
    videos: generateEpisodes({
      id: 15,
      title: "Sword Art Online",
      image: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=800"
    })
  },
  {
    id: 16,
    title: "Your Lie in April",
    image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=800",
    rating: 8.8,
    type: "TV",
    episodes: 10,
    synopsis: "A piano prodigy who lost his ability to hear the piano meets a free-spirited violinist who helps him return to music.",
    genres: ["Drama", "Music", "Romance", "School"],
    year: 2014,
    videos: generateEpisodes({
      id: 16,
      title: "Your Lie in April",
      image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=800"
    })
  }
];
