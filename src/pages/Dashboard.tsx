import { useState } from "react";
import { Header } from "@/components/Header";
import { PatientModelViewer } from "@/components/PatientModelViewer";
import { ProfileSummary } from "@/components/ProfileSummary";
import { ReportCard } from "@/components/ReportCard";
import mockData from "@/data/mockReports.json";
import { toast } from "@/components/ui/use-toast";

export default function Dashboard() {
  const [selectedReports, setSelectedReports] = useState<string[]>([]);
  const [filterCategory, setFilterCategory] = useState<string | null>(null);

  const handleBodyPartClick = (bodyPartId: string, relatedReportIds: string[]) => {
    if (relatedReportIds.length > 0) {
      setSelectedReports(relatedReportIds);
      toast({
        title: `Viewing ${bodyPartId} reports`,
        description: `Found ${relatedReportIds.length} related report(s)`,
      });
    } else {
      setSelectedReports([]);
      toast({
        title: `No reports for ${bodyPartId}`,
        description: "No medical reports found for this body part",
      });
    }
  };

  const handleReportClick = (reportId: string) => {
    toast({
      title: "Opening Report",
      description: `Viewing report ${reportId}`,
    });
  };

  const filteredReports = mockData.reports.filter((report) => {
    if (selectedReports.length > 0 && !selectedReports.includes(report.id)) {
      return false;
    }
    if (filterCategory && report.category !== filterCategory) {
      return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header showSearch title="Patient Records" />
      
      <div className="flex gap-6 p-6 max-w-[1600px] mx-auto">
        {/* Left Column - 3D Model */}
        <div className="w-[45%] space-y-6">
          <PatientModelViewer
            onBodyPartClick={handleBodyPartClick}
            className="h-[600px] sticky top-24"
          />
        </div>

        {/* Right Column - Patient Info and Reports */}
        <div className="flex-1 space-y-6">
          {/* Patient Summary */}
          <ProfileSummary patient={mockData.patient} />

          {/* Reports Section */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-foreground">Reports</h3>
              {selectedReports.length > 0 && (
                <button
                  onClick={() => setSelectedReports([])}
                  className="text-sm text-primary hover:underline"
                >
                  Clear filter
                </button>
              )}
            </div>

            {/* Reports Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredReports.map((report) => (
                <ReportCard
                  key={report.id}
                  title={report.title}
                  category={report.category}
                  department={report.department}
                  doctor={report.doctor}
                  date={report.date}
                  status={report.status}
                  onClick={() => handleReportClick(report.id)}
                />
              ))}
            </div>

            {filteredReports.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                No reports found for the selected criteria
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}