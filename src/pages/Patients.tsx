import { Header } from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Plus, Search, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";

const patients = [
  { id: 1, name: "Alice Williams", age: 32, lastVisit: "2024-01-16", status: "Active" },
  { id: 2, name: "Bob Johnson", age: 45, lastVisit: "2024-01-15", status: "Active" },
  { id: 3, name: "Carol Davis", age: 28, lastVisit: "2024-01-14", status: "Inactive" },
  { id: 4, name: "David Miller", age: 67, lastVisit: "2024-01-13", status: "Active" },
  { id: 5, name: "Eva Martinez", age: 51, lastVisit: "2024-01-12", status: "Active" },
  { id: 6, name: "Frank Wilson", age: 39, lastVisit: "2024-01-11", status: "Active" },
];

export default function Patients() {
  return (
    <div className="min-h-screen bg-background">
      <Header title="Patients" />
      
      <div className="p-6 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4 flex-1 max-w-md">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search patients..."
                className="pl-10"
              />
            </div>
          </div>
          
          <Button className="bg-primary hover:bg-primary-hover">
            <Plus className="mr-2 h-4 w-4" />
            Add Patient
          </Button>
        </div>

        <div className="grid gap-4">
          {patients.map((patient) => (
            <Card key={patient.id} className="p-4 hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {patient.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div>
                    <h3 className="font-semibold text-card-foreground">{patient.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      Age: {patient.age} • Last visit: {patient.lastVisit}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    patient.status === 'Active' 
                      ? 'bg-medical-imaging/10 text-medical-imaging' 
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    {patient.status}
                  </span>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}