
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Download, Printer } from "lucide-react";

export type Activity = {
  time: string;
  description: string;
};

export type DayPlan = {
  day: number;
  date: string;
  location: string;
  accommodation: string;
  activities: Activity[];
  meals?: {
    breakfast?: string;
    lunch?: string;
    dinner?: string;
  };
  notes?: string;
};

export type Itinerary = {
  title: string;
  dates: {
    start: string;
    end: string;
  };
  days: DayPlan[];
};

type ItineraryDisplayProps = {
  itinerary: Itinerary | null;
  onExportPDF: () => void;
};

const ItineraryDisplay = ({ itinerary, onExportPDF }: ItineraryDisplayProps) => {
  if (!itinerary) {
    return (
      <div className="flex flex-col h-full items-center justify-center text-center p-8 text-muted-foreground">
        <img 
          src="https://images.unsplash.com/photo-1602424130686-311d5b9a7a65?auto=format&fit=crop&q=80&w=800&ixlib=rb-4.0.3" 
          alt="Kerala Backwaters" 
          className="w-full max-w-md rounded-lg shadow-md mb-6 object-cover h-48"
        />
        <h3 className="text-xl font-heading mb-2">Your Kerala Itinerary</h3>
        <p>Chat with our AI assistant to create your personalized Kerala trip plan.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="bg-kerala-blue p-4 text-white flex justify-between items-center">
        <h2 className="text-xl font-heading">{itinerary.title}</h2>
        <div className="flex space-x-2">
          <Button 
            size="sm" 
            variant="ghost" 
            className="text-white hover:bg-kerala-blue-dark"
            onClick={onExportPDF}
          >
            <Download className="w-4 h-4 mr-1" />
            <span className="hidden sm:inline">Export</span>
          </Button>
          <Button 
            size="sm" 
            variant="ghost" 
            className="text-white hover:bg-kerala-blue-dark"
            onClick={() => window.print()}
          >
            <Printer className="w-4 h-4 mr-1" />
            <span className="hidden sm:inline">Print</span>
          </Button>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4">
        <Card className="mb-4 border-kerala-green border-t-4">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Trip Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <p><span className="font-semibold">Dates:</span> {itinerary.dates.start} to {itinerary.dates.end}</p>
            <p><span className="font-semibold">Duration:</span> {itinerary.days.length} days</p>
          </CardContent>
        </Card>

        {itinerary.days.map((day) => (
          <Card key={day.day} className="mb-4 animate-fade-in" style={{ animationDelay: `${day.day * 100}ms` }}>
            <CardHeader className="pb-2 bg-muted/50">
              <CardTitle className="text-lg">Day {day.day}: {day.location}</CardTitle>
              <p className="text-sm text-muted-foreground">{day.date}</p>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Activities</h4>
                  <ul className="space-y-2">
                    {day.activities.map((activity, index) => (
                      <li key={index} className="flex">
                        <span className="text-sm font-medium text-kerala-blue min-w-[80px]">{activity.time}</span>
                        <span>{activity.description}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {day.meals && (
                  <div>
                    <h4 className="font-medium mb-2">Meals</h4>
                    <ul className="space-y-1">
                      {day.meals.breakfast && (
                        <li className="flex">
                          <span className="text-sm font-medium text-kerala-green min-w-[80px]">Breakfast</span>
                          <span>{day.meals.breakfast}</span>
                        </li>
                      )}
                      {day.meals.lunch && (
                        <li className="flex">
                          <span className="text-sm font-medium text-kerala-green min-w-[80px]">Lunch</span>
                          <span>{day.meals.lunch}</span>
                        </li>
                      )}
                      {day.meals.dinner && (
                        <li className="flex">
                          <span className="text-sm font-medium text-kerala-green min-w-[80px]">Dinner</span>
                          <span>{day.meals.dinner}</span>
                        </li>
                      )}
                    </ul>
                  </div>
                )}
                
                <div>
                  <h4 className="font-medium mb-2">Accommodation</h4>
                  <p>{day.accommodation}</p>
                </div>
                
                {day.notes && (
                  <div>
                    <h4 className="font-medium mb-2">Notes</h4>
                    <p className="text-sm">{day.notes}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ItineraryDisplay;
