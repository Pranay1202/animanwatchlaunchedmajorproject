
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";

// Sample anime release data
const animeReleases = [
  { date: new Date(2025, 4, 18), title: "Demon Slayer S4 Ep 8", time: "18:00" },
  { date: new Date(2025, 4, 19), title: "My Hero Academia S7 Ep 5", time: "17:30" },
  { date: new Date(2025, 4, 20), title: "Attack on Titan Final Season", time: "19:00" },
  { date: new Date(2025, 4, 22), title: "Jujutsu Kaisen S2 Ep 12", time: "18:00" },
  { date: new Date(2025, 4, 25), title: "One Piece Ep 1115", time: "09:00" },
];

const CalendarPage = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  // Get releases for the selected date
  const selectedDateReleases = animeReleases.filter(
    release => date && release.date.toDateString() === date.toDateString()
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container py-8">
        <h1 className="text-3xl font-bold mb-8">Anime Release Calendar</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Select Date</CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
              />
            </CardContent>
          </Card>
          
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>
                  {date ? date.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  }) : 'No date selected'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {selectedDateReleases.length > 0 ? (
                  <div className="space-y-4">
                    {selectedDateReleases.map((release, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent/50">
                        <div>
                          <h3 className="font-medium">{release.title}</h3>
                        </div>
                        <div className="text-muted-foreground">
                          {release.time}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No anime releases scheduled for this date.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CalendarPage;
