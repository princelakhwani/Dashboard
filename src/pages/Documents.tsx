import { Header } from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, Eye, Upload, Filter } from "lucide-react";

const documents = [
  { id: 1, name: "MRI_Scan_Results.pdf", size: "2.3 MB", date: "2024-01-15", type: "Imaging" },
  { id: 2, name: "Blood_Test_Report.pdf", size: "845 KB", date: "2024-01-14", type: "Laboratory" },
  { id: 3, name: "ECG_Report.pdf", size: "1.1 MB", date: "2024-01-13", type: "Cardiology" },
  { id: 4, name: "Prescription_Jan_2024.pdf", size: "234 KB", date: "2024-01-10", type: "Prescription" },
  { id: 5, name: "Insurance_Form.pdf", size: "567 KB", date: "2024-01-09", type: "Administrative" },
  { id: 6, name: "Vaccination_Record.pdf", size: "890 KB", date: "2024-01-08", type: "Immunization" },
];

const typeColors: Record<string, string> = {
  Imaging: "bg-medical-imaging/10 text-medical-imaging",
  Laboratory: "bg-medical-laboratory/10 text-medical-laboratory",
  Cardiology: "bg-medical-cardiology/10 text-medical-cardiology",
  Prescription: "bg-medical-consultation/10 text-medical-consultation",
  Administrative: "bg-medical-general/10 text-medical-general",
  Immunization: "bg-medical-vitals/10 text-medical-vitals",
};

export default function Documents() {
  return (
    <div className="min-h-screen bg-background">
      <Header title="Documents" />
      
      <div className="p-6 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex gap-2">
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </div>
          
          <Button className="bg-primary hover:bg-primary-hover">
            <Upload className="mr-2 h-4 w-4" />
            Upload Document
          </Button>
        </div>

        <div className="grid gap-4">
          {documents.map((doc) => (
            <Card key={doc.id} className="p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-card-foreground">{doc.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {doc.size} • {doc.date}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${typeColors[doc.type]}`}>
                    {doc.type}
                  </span>
                  
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}