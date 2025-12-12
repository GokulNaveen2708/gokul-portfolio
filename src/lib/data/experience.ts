import type { Experience } from "../types";

export const experiences: Experience[] = [
  {
    company: "Rochester Institute of Technology",
    role: "Graduate Assistant",
    location: "Rochester, USA",
    start: "Jan 2025",
    end: "Jul 2025",
    logo: "/logos/RIT.png",
    website: "https://www.rit.edu",
    impact: "160+ req/sec • 99.9% uptime • 5s → <1s latency",
    highlights: [
      "Spring Boot microservices for event platform",
      "AWS EC2 & Lambda deployment optimization",
      "Load balancing & fault-tolerant API design",
    ],
  },
  {
    company: "Accenture",
    role: "Software Engineer",
    location: "Hyderabad, India",
    start: "Jul 2021",
    end: "Jul 2023",
    logo: "/logos/Accenture-Logo.png",
    website: "https://www.accenture.com",
    impact: "65% latency reduction • 10M+ daily transactions • 40% faster turnaround",
    highlights: [
      "AI microservices platform (Python, gRPC, Kafka)",
      "Real-time risk assessment pipeline on GCP",
      "16% reduction in fraud detection false positives",
    ],
  },
];
