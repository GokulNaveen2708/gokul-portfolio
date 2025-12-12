import type { Project } from "../types";

export const projects: Project[] = [
  {
    slug: "textmark",
    title: "TextMark — Lightweight Watermarking for Large Language Models",
    subtitle: "LLM Governance • Trustworthy AI • NLP • FastAPI",
    category: "LLM Governance",
    tags: ["LLM", "Watermarking", "Trustworthy AI", "FastAPI", "Python", "NLP"],
    summary:
      "Built a high-accuracy watermarking system for GPT-based text generation to enable provenance tracking and AI safety, robust to paraphrasing and edits.",
    highlightBullets: [
      "Designed a token-bias watermarking algorithm inspired by Kirchenbauer et al., achieving 98.7% detection accuracy and maintaining 87–82% robustness under paraphrasing and transformation attacks.",
      "Engineered an automated BERT-based black-box detector and z-score hypothesis testing pipeline for high-confidence verification.",
      "Implemented a FastAPI microservice with scalable endpoints for embedding and detection.",
      "Optimized the method using a secret-key vocabulary permutation, increasing resistance to surface-level edits.",
    ],
    githubUrl: "https://github.com/GokulNaveen2708/Token-Level-Lightweight-Watermarking-for-LLMs",                
    image: "/projects/images/Architecture.drawio.png", 
  },
  // diet-analytics, trust-fl, meta-kaggle-analytics...
  {
  slug: "diet-analytics-platform",
  title: "Event-Driven Diet Analytics & Coaching Platform",
  subtitle: "AWS Serverless • Next.js • Terraform • DynamoDB • Real-Time Analytics",
  category: "Cloud & Distributed Systems",
  tags: [
    "AWS Lambda",
    "EventBridge",
    "API Gateway",
    "DynamoDB",
    "Terraform",
    "Next.js",
    "Docker",
    "ECS Fargate"
  ],
  summary:
    "A fully serverless nutrition-logging and coaching platform that ingests food logs in real time, aggregates macro analytics, and enables trainer-client collaboration at scale.",
  highlightBullets: [
    "Designed an event-driven architecture using AWS Lambda, API Gateway, SNS, and EventBridge to enable low-latency ingestion and automated macro-summary generation.",
    "Built a Dockerized Next.js frontend deployed to AWS ECS Fargate via Terraform, using ECR + ALB + autoscaling for seamless horizontal scaling.",
    "Implemented domain-driven backend modules for users, trainers, diet logs, search, summaries, and messaging, improving maintainability and isolation.",
    "Provisioned all compute, IAM, and database resources through Terraform, ensuring reproducibility and environment parity.",
    "Enabled real-time analytics by streaming food logs through event pipelines and aggregating daily + weekly nutritional summaries."
  ],
  githubUrl: "https://github.com/GokulNaveen2708/Diet_Logging",
  image: "/projects/images/diet-logging-architecture.png"
},

{
  slug: "trust-federated-learning",
  title: "Trust-Aware Federated Learning Framework",
  subtitle: "Federated Learning • Security • Python • Flower FL • Robust Aggregation",
  category: "AI Security",
  tags: [
    "Federated Learning",
    "Flower FL",
    "Security",
    "Robust Aggregation",
    "Python",
    "Adversarial ML"
  ],
  summary:
    "A federated learning framework that incorporates dynamic trust and reputation scoring to defend against model poisoning, unreliable clients, and non-IID drift.",
  highlightBullets: [
    "Extended FedAvg with a reputation-weighted aggregation mechanism, reducing the influence of adversarial clients based on gradient deviation metrics.",
    "Implemented trust decay, anomaly scoring, and adaptive client exclusion to improve robustness under malicious + noisy update distributions.",
    "Simulated label-flipping and parameter-poisoning attacks on PathMNIST to measure stability via accuracy, convergence curves, and trust trajectories.",
    "Integrated Flower FL with modular strategy hooks for experimenting with trust scoring, exclusion policies, and poisoning attack types.",
    "Achieved significantly more stable convergence under non-IID partitioning compared to baseline federated averaging."
  ],
  githubUrl: "https://github.com/GokulNaveen2708/Distributed-Trust-Aware-Federated-Learning",
  image: "/projects/images/trust-fl-architecture.png"
},

{
  slug: "meta-kaggle-insights",
  title: "Meta-Kaggle Analytics & Large-Scale Data Insights",
  subtitle: "Big Data • Relational Modeling • NoSQL • ETL • Itemset Mining",
  category: "Data Engineering",
  tags: [
    "SQL",
    "ETL",
    "Data Modeling",
    "NoSQL",
    "Association Mining",
    "Pandas"
  ],
  summary:
    "Performed end-to-end data engineering, modeling, and analytics on Meta-Kaggle’s 127M+ record dataset to uncover global patterns across competitions, users, and datasets.",
  highlightBullets: [
    "Designed a comprehensive relational schema (Users, Datasets, Competitions, Submissions, Teams, Achievements) and ingested 127M+ rows with chunked ETL pipelines.",
    "Built a document-oriented NoSQL model to compare query patterns and performance against relational joins for hierarchical competition–user structures.",
    "Cleaned and validated data with automated checks for missing values, type enforcement, PK-FK integrity, and removal of invalid references.",
    "Applied Apriori itemset mining to extract high-lift association rules across competition topics, tags, and dataset categories.",
    "Generated insights on user engagement, competition difficulty, submission behavior, and dataset popularity."
  ],
  githubUrl: "https://github.com/GokulNaveen2708/Meta-Kaggle-Insights",
  image: "/projects/images/meta-kaggle-dashboard.png"
},

{
  slug: "uda-bert-text-classification",
  title: "Text Classification with UDA and BERT",
  subtitle: "Semi-Supervised Learning • NLP • BERT • Unsupervised Data Augmentation",
  category: "Machine Learning",
  tags: [
    "NLP",
    "BERT",
    "UDA",
    "Text Classification",
    "Semi-Supervised Learning",
    "Python",
    "PyTorch"
  ],
  summary:
    "Implemented a semi-supervised text classification pipeline using Unsupervised Data Augmentation (UDA) and BERT, improving label efficiency and model generalization.",
  highlightBullets: [
    "Built a UDA training loop combining supervised loss with augmented-consistency loss using noise injection and back-translation.",
    "Fine-tuned BERT for downstream classification with confidence-based filtering of pseudo-labeled samples.",
    "Generated high-quality augmentations using n-gram masking, word swaps, and controlled perturbations to improve robustness.",
    "Achieved higher accuracy under limited labeled data compared to standard BERT fine-tuning baselines.",
    "Evaluated model performance across increasing unlabeled-data volumes to measure generalization gains from UDA."
  ],
  githubUrl: "https://github.com/GokulNaveen2708/Text-Classification-with-UDA-and-BERT",
  image: "/projects/images/uda-bert-flow.png"
}

];
