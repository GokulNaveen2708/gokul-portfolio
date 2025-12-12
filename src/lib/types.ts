export type ProjectCategory = string;

export interface Project {
  slug: string;
  title: string;
  subtitle?: string;
  tags: string[];
  timeframe?: string;
  summary: string;
  highlightBullets: string[];
  category: ProjectCategory;
  githubUrl?: string;
  liveUrl?: string;
  image?: string;       // hero image path (optional)
}

export interface Experience {
  company: string;
  role: string;
  location: string;
  start: string;
  end: string;
  impact: string;     // concise impact metric/headline
  highlights: string[]; // array of 3 short highlight bullets
  logo?: string;      // path to logo image in /public
  website?: string;   // optional link to company site
}