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
  image?: string;
  problemStatement?: string;
  technicalApproach?: string;
  whatILearned?: string;
}

export interface Experience {
  company: string;
  role: string;
  location: string;
  start: string;
  end: string;
  impact: string;
  highlights: string[];
  responsibilities?: string[];
  logo?: string;
  website?: string;
}