
import { Itinerary, DayPlan } from "@/components/ItineraryDisplay";
import { Message } from "@/components/ChatInterface";

// This is a mock implementation for demo purposes
// In a real application, this would call the OpenAI API
export const processUserMessage = async (messages: Message[]): Promise<{ 
  responseMessage: string, 
  updatedItinerary: Itinerary | null 
}> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const lastUserMessage = messages
    .filter(m => m.sender === 'user')
    .pop()?.content.toLowerCase() || '';
  
  // Check if the message contains keywords for starting a trip
  if (
    lastUserMessage.includes('hello') || 
    lastUserMessage.includes('hi') || 
    lastUserMessage.includes('start') ||
    messages.length <= 1
  ) {
    return {
      responseMessage: "Welcome to the Kerala Trip Planner! I'm your AI travel assistant. I can help you plan your perfect trip to Kerala, God's Own Country. To get started, could you tell me when you'd like to visit and for how many days?",
      updatedItinerary: null
    };
  }
  
  // Check if message includes dates or duration
  if (
    lastUserMessage.includes('day') || 
    lastUserMessage.includes('week') ||
    lastUserMessage.includes('january') ||
    lastUserMessage.includes('february') ||
    lastUserMessage.includes('march') ||
    lastUserMessage.includes('april') ||
    lastUserMessage.includes('may') ||
    lastUserMessage.includes('june') ||
    lastUserMessage.includes('july') ||
    lastUserMessage.includes('august') ||
    lastUserMessage.includes('september') ||
    lastUserMessage.includes('october') ||
    lastUserMessage.includes('november') ||
    lastUserMessage.includes('december')
  ) {
    return {
      responseMessage: "Great! Kerala has diverse attractions including beautiful beaches, serene backwaters, lush hill stations, and rich wildlife. What are you most interested in experiencing? For example: beaches, backwaters, wildlife, culture, or adventure activities?",
      updatedItinerary: null
    };
  }
  
  // Check if message includes preferences
  if (
    lastUserMessage.includes('beach') || 
    lastUserMessage.includes('backwater') ||
    lastUserMessage.includes('wildlife') ||
    lastUserMessage.includes('culture') ||
    lastUserMessage.includes('adventure') ||
    lastUserMessage.includes('nature') ||
    lastUserMessage.includes('food') ||
    lastUserMessage.includes('ayurveda')
  ) {
    // Generate a sample 5-day itinerary
    const days: DayPlan[] = [
      {
        day: 1,
        date: "2024-06-01",
        location: "Kochi",
        accommodation: "Heritage Hotel in Fort Kochi",
        activities: [
          {
            time: "9:00 AM",
            description: "Arrival at Cochin International Airport"
          },
          {
            time: "12:00 PM",
            description: "Check-in at hotel and lunch"
          },
          {
            time: "3:00 PM",
            description: "Fort Kochi walking tour - visit Chinese Fishing Nets, St. Francis Church, and Dutch Palace"
          },
          {
            time: "7:00 PM",
            description: "Kathakali dance performance followed by dinner"
          }
        ],
        meals: {
          lunch: "Traditional Kerala thali at a local restaurant",
          dinner: "Seafood dinner at a waterfront restaurant"
        }
      },
      {
        day: 2,
        date: "2024-06-02",
        location: "Alleppey (Alappuzha)",
        accommodation: "Houseboat on the backwaters",
        activities: [
          {
            time: "8:00 AM",
            description: "Breakfast at hotel"
          },
          {
            time: "9:30 AM",
            description: "Drive to Alleppey (2 hours)"
          },
          {
            time: "12:00 PM",
            description: "Board houseboat and begin backwater cruise"
          },
          {
            time: "3:00 PM",
            description: "Pass through small villages and observe local life"
          },
          {
            time: "5:30 PM",
            description: "Sunset views from the houseboat"
          }
        ],
        meals: {
          breakfast: "Hotel breakfast",
          lunch: "Traditional Kerala lunch served on the houseboat",
          dinner: "Fresh seafood dinner prepared on the houseboat"
        },
        notes: "The tranquil backwaters of Alleppey offer a unique experience of Kerala's natural beauty."
      },
      {
        day: 3,
        date: "2024-06-03",
        location: "Thekkady",
        accommodation: "Jungle Resort near Periyar Tiger Reserve",
        activities: [
          {
            time: "8:00 AM",
            description: "Breakfast and disembark from houseboat"
          },
          {
            time: "9:30 AM",
            description: "Drive to Thekkady (4 hours) through scenic spice plantations"
          },
          {
            time: "2:00 PM",
            description: "Check-in at resort and lunch"
          },
          {
            time: "4:00 PM",
            description: "Spice plantation tour and tea tasting"
          },
          {
            time: "7:00 PM",
            description: "Kalaripayattu (martial arts) show"
          }
        ],
        meals: {
          breakfast: "Breakfast on the houseboat",
          lunch: "Lunch at a spice garden restaurant",
          dinner: "Dinner at resort with Kerala specialties"
        }
      },
      {
        day: 4,
        date: "2024-06-04",
        location: "Thekkady",
        accommodation: "Jungle Resort near Periyar Tiger Reserve",
        activities: [
          {
            time: "6:30 AM",
            description: "Early morning boat safari in Periyar Lake"
          },
          {
            time: "10:00 AM",
            description: "Breakfast at resort"
          },
          {
            time: "12:00 PM",
            description: "Guided nature walk in Periyar Tiger Reserve"
          },
          {
            time: "3:00 PM",
            description: "Visit to Elephant Junction for elephant safari and interaction"
          },
          {
            time: "7:00 PM",
            description: "Dinner and relaxation at resort"
          }
        ],
        meals: {
          breakfast: "Late breakfast at resort after safari",
          lunch: "Packed lunch during nature walk",
          dinner: "BBQ dinner at resort"
        },
        notes: "Wildlife sightings depend on season and luck, but the scenery is always beautiful."
      },
      {
        day: 5,
        date: "2024-06-05",
        location: "Munnar",
        accommodation: "Tea Plantation Resort",
        activities: [
          {
            time: "8:00 AM",
            description: "Breakfast at resort"
          },
          {
            time: "9:30 AM",
            description: "Drive to Munnar (3 hours) through spectacular mountain scenery"
          },
          {
            time: "1:00 PM",
            description: "Check-in at tea plantation resort and lunch"
          },
          {
            time: "3:00 PM",
            description: "Visit to Tea Museum and plantation tour"
          },
          {
            time: "5:30 PM",
            description: "Sunset viewpoint at Top Station"
          }
        ],
        meals: {
          breakfast: "Resort breakfast",
          lunch: "Lunch with panoramic mountain views",
          dinner: "Dinner at resort restaurant"
        },
        notes: "Munnar's cool climate is a welcome change after the warmer lowlands."
      }
    ];

    const itinerary: Itinerary = {
      title: "5-Day Kerala Highlights Tour",
      dates: {
        start: "June 1, 2024",
        end: "June 5, 2024"
      },
      days: days
    };

    return {
      responseMessage: "Based on your preferences, I've created a 5-day itinerary that includes cultural experiences in Kochi, a backwater cruise in Alleppey, wildlife viewing in Thekkady, and the beautiful hill station of Munnar. You can review the itinerary on the right side and make any adjustments. Would you like to modify anything specific?",
      updatedItinerary: itinerary
    };
  }
  
  // Default response
  return {
    responseMessage: "I've noted your preferences. Is there anything specific you'd like to know about Kerala or any adjustments to the itinerary?",
    updatedItinerary: null
  };
};
