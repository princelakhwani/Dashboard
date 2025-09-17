import { Header } from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Clock, User, MapPin } from "lucide-react";
import { useState } from "react";

const appointments = [
  { id: 1, time: "09:00 AM", patient: "Alice Williams", type: "Checkup", doctor: "Dr. King", location: "Room 203" },
  { id: 2, time: "10:30 AM", patient: "Bob Johnson", type: "Consultation", doctor: "Dr. Smith", location: "Room 105" },
  { id: 3, time: "02:00 PM", patient: "Carol Davis", type: "Follow-up", doctor: "Dr. Johnson", location: "Room 301" },
  { id: 4, time: "03:30 PM", patient: "David Miller", type: "Lab Review", doctor: "Dr. Garcia", location: "Lab 2" },
];

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const dates = [25, 26, 27, 28, 29, 30, 31];

export default function Calendar() {
  const [selectedDate, setSelectedDate] = useState(27);

  return (
    <div className="min-h-screen bg-background">
      <Header title="Calendar" />
      
      <div className="p-6 max-w-7xl mx-auto">
        {/* Calendar Header */}
        <Card className="p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-card-foreground">January 2024</h2>
            <div className="flex gap-2">
              <Button variant="outline" size="icon">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Week View */}
          <div className="grid grid-cols-7 gap-4">
            {weekDays.map((day, index) => (
              <div key={day} className="text-center">
                <p className="text-sm text-muted-foreground mb-2">{day}</p>
                <button
                  onClick={() => setSelectedDate(dates[index])}
                  className={`w-12 h-12 rounded-lg font-medium transition-all ${
                    selectedDate === dates[index]
                      ? 'bg-primary text-primary-foreground shadow-md'
                      : 'hover:bg-secondary'
                  }`}
                >
                  {dates[index]}
                </button>
              </div>
            ))}
          </div>
        </Card>

        {/* Appointments */}
        <div>
          <h3 className="text-xl font-semibold text-foreground mb-4">Today's Schedule</h3>
          <div className="grid gap-4">
            {appointments.map((appointment) => (
              <Card key={appointment.id} className="p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-20">
                      <p className="text-sm font-medium text-primary">{appointment.time}</p>
                    </div>
                    
                    <div className="h-12 w-1 bg-gradient-primary rounded-full" />
                    
                    <div className="space-y-1">
                      <h4 className="font-semibold text-card-foreground">{appointment.patient}</h4>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {appointment.type}
                        </span>
                        <span className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          {appointment.doctor}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {appointment.location}
                        </span>
                      </div>
                    </div>
                  </div>

                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}