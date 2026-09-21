import * as React from "react";

declare module "lucide-react" {
  export interface LucideProps extends React.SVGProps<SVGSVGElement> {
    size?: string | number;
    color?: string;
    strokeWidth?: string | number;
    absoluteStrokeWidth?: boolean;
    className?: string;
  }
  export type LucideIcon = (props: LucideProps) => React.ReactNode;

  export const Download: LucideIcon;
  export const ExternalLink: LucideIcon;
  export const Copy: LucideIcon;
  export const Check: LucideIcon;
  export const Printer: LucideIcon;
  export const Moon: LucideIcon;
  export const Sun: LucideIcon;
  export const FileText: LucideIcon;
  export const Layout: LucideIcon;
  export const Briefcase: LucideIcon;
  export const GraduationCap: LucideIcon;
  export const Award: LucideIcon;
  export const Code: LucideIcon;
  export const Mail: LucideIcon;
  export const Phone: LucideIcon;
  export const MapPin: LucideIcon;
  export const Linkedin: LucideIcon;
  export const Github: LucideIcon;
  export const ArrowDown: LucideIcon;
  export const ArrowUpRight: LucideIcon;
  export const Menu: LucideIcon;
  export const X: LucideIcon;
  export const Quote: LucideIcon;
  export const ChevronUp: LucideIcon;
  export const ChevronDown: LucideIcon;
  export const Star: LucideIcon;
  export const Trophy: LucideIcon;
  export const Sparkles: LucideIcon;
  export const Terminal: LucideIcon;
  export const Server: LucideIcon;
  export const Shield: LucideIcon;
  export const Cpu: LucideIcon;
  export const Database: LucideIcon;
  export const Cloud: LucideIcon;
}
