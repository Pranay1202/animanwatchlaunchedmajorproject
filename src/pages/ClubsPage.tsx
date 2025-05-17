
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const clubsData = [
  {
    id: 1,
    name: "Shonen Enthusiasts",
    members: 1243,
    description: "Discussion group for fans of shonen anime and manga.",
    image: "https://images.unsplash.com/photo-1560807707-8cc77767d783?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 2,
    name: "Slice of Life Club",
    members: 892,
    description: "For those who enjoy the calm and heartwarming slice of life genre.",
    image: "https://images.unsplash.com/photo-1573521193826-58c7dc2e13e3?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 3,
    name: "Mecha Pilots",
    members: 654,
    description: "Everything related to giant robots and mecha anime.",
    image: "https://images.unsplash.com/photo-1589254066213-a0c9dc853511?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 4,
    name: "Fantasy Worlds",
    members: 1021,
    description: "Discussing anime set in fantasy worlds and magical realms.",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=800",
  },
];

const ClubsPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Anime Clubs</h1>
          <Button className="bg-anime-purple hover:bg-anime-darkpurple">
            Create New Club
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clubsData.map(club => (
            <Card key={club.id}>
              <div className="h-40 w-full overflow-hidden">
                <img 
                  src={club.image} 
                  alt={club.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle>{club.name}</CardTitle>
                <CardDescription>{club.members} members</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{club.description}</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">Join Club</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ClubsPage;
