import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Calendar, Droplet, Ruler, Weight, Phone, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ProfileSummaryProps {
  patient: {
    name: string;
    age: number;
    gender: string;
    avatar?: string;
    dateOfBirth: string;
    bloodType: string;
    height: string;
    weight: string;
    allergies: string[];
    emergencyContact: string;
  };
}

export function ProfileSummary({ patient }: ProfileSummaryProps) {
  return (
    <Card className="p-6 bg-gradient-card border-border">
      <div className="flex items-start gap-4 mb-6">
        <Avatar className="h-16 w-16 border-2 border-primary/20">
          <AvatarFallback className="bg-primary/10 text-primary text-lg font-semibold">
            {patient.name.split(' ').map(n => n[0]).join('')}
          </AvatarFallback>
        </Avatar>
        
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-card-foreground">{patient.name}</h2>
          <p className="text-muted-foreground">
            {patient.age} years old • {patient.gender}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-card-foreground">{patient.dateOfBirth}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Droplet className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-card-foreground">Blood Type: {patient.bloodType}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Ruler className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-card-foreground">Height: {patient.height}</span>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Weight className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-card-foreground">Weight: {patient.weight}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-card-foreground">{patient.emergencyContact}</span>
          </div>
        </div>
      </div>

      {patient.allergies.length > 0 && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle className="h-4 w-4 text-medical-cardiology" />
            <span className="text-sm font-medium text-card-foreground">Allergies</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {patient.allergies.map((allergy) => (
              <Badge key={allergy} variant="destructive" className="bg-medical-cardiology/10 text-medical-cardiology border-medical-cardiology/20">
                {allergy}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
}