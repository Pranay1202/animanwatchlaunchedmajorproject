
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const ResourcesPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container py-8">
        <h1 className="text-3xl font-bold mb-8">Anime Resources</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardHeader>
              <CardTitle>Streaming Platforms</CardTitle>
              <CardDescription>Where to watch your favorite anime</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {[
                  { name: "Crunchyroll", url: "https://www.crunchyroll.com/" },
                  { name: "Funimation", url: "https://www.funimation.com/" },
                  { name: "Netflix", url: "https://www.netflix.com/" },
                  { name: "Hulu", url: "https://www.hulu.com/" },
                  { name: "Amazon Prime Video", url: "https://www.primevideo.com/" }
                ].map((platform, i) => (
                  <li key={i} className="flex justify-between items-center">
                    <span>{platform.name}</span>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => window.open(platform.url, '_blank')}
                    >
                      Visit
                    </Button>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>News & Information</CardTitle>
              <CardDescription>Stay up-to-date with anime news</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {[
                  { name: "MyAnimeList", url: "https://myanimelist.net/" },
                  { name: "Anime News Network", url: "https://www.animenewsnetwork.com/" },
                  { name: "Crunchyroll News", url: "https://www.crunchyroll.com/news" },
                  { name: "AniList", url: "https://anilist.co/" },
                  { name: "Reddit r/anime", url: "https://www.reddit.com/r/anime/" }
                ].map((resource, i) => (
                  <li key={i} className="flex justify-between items-center">
                    <span>{resource.name}</span>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => window.open(resource.url, '_blank')}
                    >
                      Visit
                    </Button>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
        
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Beginner's Guide to Anime</h2>
          
          <div className="bg-card p-6 rounded-lg border">
            <h3 className="text-xl font-semibold mb-4">Getting Started with Anime</h3>
            <p className="text-muted-foreground mb-6">
              New to anime? Here are some tips to help you get started on your anime journey:
            </p>
            
            <ol className="list-decimal list-inside space-y-3 text-muted-foreground">
              <li><strong>Start with popular titles</strong> - Begin with highly-rated shows like "Death Note", "Attack on Titan", or "Fullmetal Alchemist: Brotherhood".</li>
              <li><strong>Explore different genres</strong> - Anime spans countless genres. Try a variety to find what you enjoy.</li>
              <li><strong>Check episode counts</strong> - Some series have hundreds of episodes; others are just 12-24 episodes.</li>
              <li><strong>Sub vs. Dub</strong> - Try both subbed (original Japanese audio with subtitles) and dubbed (English voice acting) to see what you prefer.</li>
              <li><strong>Seasonal releases</strong> - New anime release in seasons (Winter, Spring, Summer, Fall). Track new releases to stay current.</li>
            </ol>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ResourcesPage;
