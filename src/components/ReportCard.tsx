import { MoreVertical, Download, Eye, Share2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { 
  FileText, 
  Microscope, 
  Heart, 
  MessageSquare,
  User,
  Activity
} from "lucide-react";

interface ReportCardProps {
  title: string;
  category: string;
  department: string;
  doctor: string;
  date?: string;
  status?: string;
  onClick?: () => void;
}

const categoryConfig = {
  imaging: {
    icon: FileText,
    bgColor: "bg-medical-imaging-bg",
    iconColor: "text-medical-imaging",
  },
  laboratory: {
    icon: Microscope,
    bgColor: "bg-medical-laboratory-bg",
    iconColor: "text-medical-laboratory",
  },
  cardiology: {
    icon: Heart,
    bgColor: "bg-medical-cardiology-bg",
    iconColor: "text-medical-cardiology",
  },
  consultation: {
    icon: MessageSquare,
    bgColor: "bg-medical-consultation-bg",
    iconColor: "text-medical-consultation",
  },
  general: {
    icon: User,
    bgColor: "bg-medical-general-bg",
    iconColor: "text-medical-general",
  },
  vitals: {
    icon: Activity,
    bgColor: "bg-medical-vitals-bg",
    iconColor: "text-medical-vitals",
  },
};

export function ReportCard({
  title,
  category,
  department,
  doctor,
  date,
  status,
  onClick,
}: ReportCardProps) {
  const config = categoryConfig[category as keyof typeof categoryConfig] || categoryConfig.general;
  const Icon = config.icon;

  return (
    <div
      className={cn(
        "group relative bg-card rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer",
        "hover:-translate-y-1 hover:border-primary/20 border border-border"
      )}
      onClick={onClick}
    >
      {/* Category Icon */}
      <div className={cn("w-14 h-14 rounded-xl flex items-center justify-center mb-4", config.bgColor)}>
        <Icon className={cn("h-6 w-6", config.iconColor)} />
      </div>

      {/* Content */}
      <div className="space-y-2">
        <h3 className="font-semibold text-card-foreground text-lg group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground">{department}</p>
        <p className="text-sm font-medium text-card-foreground">{doctor}</p>
        {date && (
          <p className="text-xs text-muted-foreground mt-2">{date}</p>
        )}
      </div>

      {/* Status Badge */}
      {status && (
        <div className={cn(
          "absolute top-4 right-4 px-2 py-1 rounded-full text-xs font-medium",
          status === "completed" && "bg-medical-imaging/10 text-medical-imaging",
          status === "monitoring" && "bg-medical-laboratory/10 text-medical-laboratory",
          status === "active" && "bg-medical-vitals/10 text-medical-vitals"
        )}>
          {status}
        </div>
      )}

      {/* Actions Menu */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={(e) => e.stopPropagation()}
          >
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem className="cursor-pointer">
            <Eye className="mr-2 h-4 w-4" />
            View Report
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            <Download className="mr-2 h-4 w-4" />
            Download
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}