import type { Experience } from "../types";

export const experiences: Experience[] = [
  {
    company: "Reliable Software",
    role: "Software Engineer",
    location: "Seattle, WA",
    start: "Oct 2025",
    end: "Present",
    logo: "/logos/ReliableSoftware.png", // add this logo file to /public/logos
    website: "https://www.reliablesoftware.com", // verify your employer's actual URL
    impact: "1M+ jobs/month • 88% → 92% reliability • p95 <300ms",
    highlights: [
      "Kafka/Redis job orchestration platform (1M+ jobs/month)",
      "Event-driven migration from legacy cron systems",
      "ELK/Grafana observability & anomaly detection",
      "Circuit-breaker patterns, -25% incidents",
      "CI/CD automation, 3x faster deploys",
    ],
    responsibilities: [
      "Built and own a distributed job-orchestration platform in Python, Kafka, and Redis, automating 1M+ recurring jobs monthly for 40+ engineering teams and replacing legacy cron systems.",
      "Migrated cron-based scheduling to a scalable, event-driven architecture using Kafka and Redis, lifting pipeline reliability from 88% to 92%.",
      "Optimized the task-scheduling engine with priority-aware queues and Kafka consumer batching, cutting average job completion from 3.2s to 2.6s with p95 latency under 300ms.",
      "Built real-time observability dashboards and anomaly detection with ELK and Grafana, reducing mean time to detect (MTTD) by 40%.",
      "Hardened production reliability with circuit-breaker patterns and automated CI/CD pipelines, reducing incidents by 25% and enabling 3x faster deployment cycles.",
    ],
  },
  {
    company: "Rochester Institute of Technology",
    role: "Graduate Assistant — Software Engineer",
    location: "Rochester, NY",
    start: "Jan 2025",
    end: "Jul 2025",
    logo: "/logos/RIT.png",
    website: "https://www.rit.edu",
    impact: "160+ req/sec • 99.9% uptime • 5s → <1s latency",
    highlights: [
      "Spring Boot microservices for campus event platform",
      "AWS EC2 & Lambda deployment optimization",
      "Load balancing & fault-tolerant API design",
      "Redis caching, 5s → <1s latency",
      "GitHub Actions CI/CD, blue-green deploys",
    ],
    responsibilities: [
      "Designed and built Spring Boot microservices powering the campus event management platform, serving 5000+ students with 160+ requests/sec throughput.",
      "Optimized AWS EC2 and Lambda deployments with auto-scaling policies and CloudWatch alarms, achieving 99.9% uptime SLA.",
      "Reduced API response latency from 5s to under 1s by implementing Redis caching, query optimization, and connection pooling.",
      "Built fault-tolerant REST APIs with circuit breakers, retry logic, and graceful degradation for third-party service dependencies.",
      "Set up CI/CD pipelines using GitHub Actions for automated testing, Docker builds, and zero-downtime blue-green deployments.",
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
    impact: "65% latency reduction • 10M+ daily transactions • 16% fewer false positives",
    highlights: [
      "AI microservices platform (Python, gRPC, Kafka)",
      "Real-time risk assessment pipeline on GCP",
      "16% reduction in fraud detection false positives",
      "Kafka exactly-once semantics, 50K msg/sec",
      "Prometheus & Grafana observability, -40% MTTD",
    ],
    responsibilities: [
      "Architected and deployed an AI-powered microservices platform using Python, gRPC, and Kafka, processing 10M+ daily transactions for a major financial services client.",
      "Built real-time risk assessment pipelines on GCP using Cloud Functions, Pub/Sub, and BigQuery, reducing fraud detection latency by 65%.",
      "Reduced fraud detection false positives by 16% by implementing ensemble ML models with feature engineering pipelines and automated retraining workflows.",
      "Designed event-driven data ingestion pipelines using Apache Kafka with exactly-once semantics, handling peak loads of 50K messages/sec.",
      "Led cross-functional collaboration with data scientists, QA, and DevOps teams to ship 3 major product releases on schedule.",
      "Implemented comprehensive observability using Prometheus, Grafana, and structured logging, reducing mean time to detection (MTTD) by 40%.",
    ],
  },
];
