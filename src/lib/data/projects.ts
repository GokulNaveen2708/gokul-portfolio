import type { Project } from "../types";

export const projects: Project[] = [
  {
    slug: "structura-agentic-architect",
    title: "Structura: Agentic System Architect",
    subtitle: "LangGraph • Multi-Agent AI • React Flow • FastAPI",
    category: "AI / Agentic Systems",
    tags: ["LangGraph", "LangChain", "Multi-Agent", "FastAPI", "React", "React Flow", "Gemini", "Python"],
    summary:
      "An agentic system design workbench that autonomously researches, drafts, and visualizes technical architecture content using a hierarchical multi-agent pipeline powered by LangGraph.",
    highlightBullets: [
      "Designed a hierarchical agentic workflow with 4 specialized AI agents: Orchestrator, Analyst (deep research), Text Writer (content synthesis), and Visualizer (architecture diagrams).",
      "Built a persistent GraphState pipeline using LangGraph, enabling agents to pass verified fact-chains between stages with anti-hallucination grounding.",
      "Implemented an Analyst Agent that performs semantic search, constructs atomic verifiable claims with source URLs, and identifies architectural components (nodes/edges).",
      "Engineered the Visualizer Agent to transform component lists into React Flow-compatible DiagramJSON schemas with typed visual nodes (hero, database, queue).",
      "Created a full-stack application with FastAPI backend and React frontend, featuring real-time pipeline progress tracking and interactive diagram editing.",
    ],
    problemStatement:
      "Creating high-quality system design content requires deep research, accurate technical writing, and clear architectural visualizations — a process that typically takes hours of manual work per topic.",
    technicalApproach:
      "The system uses LangGraph's state machine to orchestrate a DAG of AI agents. The Orchestrator initializes state and assigns personas (Senior Architect, Tech Lead). The Analyst performs Tavily-powered research and builds fact-chains. The Text Writer grounds every sentence in verified claims. The Visualizer renders Mermaid/React Flow diagrams from extracted components.",
    whatILearned:
      "Gained deep experience with agentic AI architectures, particularly LangGraph's state management and agent orchestration patterns. Learned how to implement anti-hallucination mechanisms by grounding LLM outputs in verified fact-chains, and how to design agent interfaces that maintain coherent state across a multi-step pipeline.",
    githubUrl: "https://github.com/GokulNaveen2708/AI_Creator",
  },
  {
    slug: "textmark",
    title: "TextMark: Lightweight Watermarking for LLMs",
    subtitle: "LLM Governance • Trustworthy AI • NLP • FastAPI",
    category: "LLM Governance",
    tags: ["LLM", "Watermarking", "Trustworthy AI", "FastAPI", "Python", "NLP", "BERT"],
    summary:
      "A high-accuracy watermarking system for GPT-based text generation enabling provenance tracking and AI safety, robust to paraphrasing and edits.",
    highlightBullets: [
      "Designed a token-bias watermarking algorithm inspired by Kirchenbauer et al., achieving 98.7% detection accuracy and 87–82% robustness under paraphrasing and transformation attacks.",
      "Engineered an automated BERT-based black-box detector and z-score hypothesis testing pipeline for high-confidence verification.",
      "Implemented a FastAPI microservice with scalable endpoints for embedding and detection, supporting batch processing of documents.",
      "Optimized the method using a secret-key vocabulary permutation, increasing resistance to surface-level edits and adversarial removal attempts.",
    ],
    problemStatement:
      "As LLMs generate increasingly human-like text, there's a critical need for invisible watermarking systems that can verify AI-generated content provenance without degrading text quality.",
    technicalApproach:
      "The system modifies the token sampling distribution during generation by biasing toward a pseudorandom 'green list' derived from a secret key. Detection uses z-score analysis of green-list token frequency, combined with a BERT-based black-box classifier for scenarios where the original model is unavailable.",
    whatILearned:
      "Deepened understanding of LLM decoding strategies, token-level manipulation, and statistical hypothesis testing. Learned to balance watermark detectability against text quality degradation, and how adversarial attacks (paraphrasing, word substitution) affect watermark robustness.",
    githubUrl: "https://github.com/GokulNaveen2708/Token-Level-Lightweight-Watermarking-for-LLMs",
    image: "/projects/images/Architecture.drawio.png",
  },
  {
    slug: "diet-analytics-platform",
    title: "Event-Driven Nutrition & Coaching Platform",
    subtitle: "AWS Serverless • Next.js • Terraform • DynamoDB",
    category: "Cloud & Distributed Systems",
    tags: ["AWS Lambda", "EventBridge", "API Gateway", "DynamoDB", "Terraform", "Next.js", "Docker", "ECS Fargate"],
    summary:
      "A fully serverless nutrition-logging and coaching platform that ingests food logs in real time, aggregates macro analytics, and enables trainer-client collaboration at scale.",
    highlightBullets: [
      "Designed an event-driven architecture using AWS Lambda, API Gateway, SNS, and EventBridge to enable low-latency ingestion and automated macro-summary generation.",
      "Built a Dockerized Next.js frontend deployed to AWS ECS Fargate via Terraform, using ECR + ALB + autoscaling for seamless horizontal scaling.",
      "Implemented domain-driven backend modules for users, trainers, diet logs, search, summaries, and messaging, improving maintainability and isolation.",
      "Provisioned all compute, IAM, and database resources through Terraform, ensuring reproducibility and environment parity.",
      "Enabled real-time analytics by streaming food logs through event pipelines and aggregating daily + weekly nutritional summaries.",
    ],
    problemStatement:
      "Existing nutrition tracking apps lack real-time event-driven data pipelines for aggregating nutritional data, and don't support the trainer-client collaboration model needed for professional coaching.",
    technicalApproach:
      "Used an event-driven microservices architecture on AWS. Food log submissions trigger Lambda functions via API Gateway, which publish events to EventBridge for fan-out processing. DynamoDB stores all data with GSI-optimized query patterns. The frontend is containerized and deployed to ECS Fargate with Terraform-managed infrastructure.",
    whatILearned:
      "Gained hands-on experience with serverless event-driven architectures on AWS, Terraform IaC practices, and the trade-offs between DynamoDB's single-table design vs. multi-table approaches for complex query patterns.",
    githubUrl: "https://github.com/GokulNaveen2708/Diet_Logging",
    image: "/projects/images/Diet-Logging.png",
  },
  {
    slug: "meta-kaggle-insights",
    title: "Kaggle Competition Metadata Analytics",
    subtitle: "Big Data • Relational Modeling • NoSQL • ETL • Itemset Mining",
    category: "Data Engineering",
    tags: ["SQL", "ETL", "Data Modeling", "NoSQL", "Association Mining", "Pandas", "Python"],
    summary:
      "End-to-end data engineering, modeling, and analytics on Meta-Kaggle's 127M+ record dataset to uncover global patterns across competitions, users, and datasets.",
    highlightBullets: [
      "Designed a comprehensive relational schema (Users, Datasets, Competitions, Submissions, Teams, Achievements) and ingested 127M+ rows with chunked ETL pipelines.",
      "Built a document-oriented NoSQL model to compare query patterns and performance against relational joins for hierarchical structures.",
      "Cleaned and validated data with automated checks for missing values, type enforcement, PK-FK integrity, and removal of invalid references.",
      "Applied Apriori itemset mining to extract high-lift association rules across competition topics, tags, and dataset categories.",
      "Generated insights on user engagement, competition difficulty, submission behavior, and dataset popularity across Kaggle's ecosystem.",
    ],
    problemStatement:
      "Meta-Kaggle contains 127M+ records across dozens of interconnected tables, requiring thoughtful schema design and efficient ETL pipelines to extract meaningful analytical insights.",
    technicalApproach:
      "Designed normalized schemas and built chunked ETL pipelines using Pandas for memory-efficient ingestion. Compared relational (PostgreSQL) vs. document (MongoDB) query patterns. Applied Apriori algorithm for association rule mining to discover hidden correlations between competition categories and skill sets.",
    whatILearned:
      "Deepened skills in large-scale data modeling, ETL pipeline engineering, and the trade-offs between relational and NoSQL storage for analytical workloads. Gained experience with association rule mining for extracting non-obvious patterns from high-dimensional datasets.",
    githubUrl: "https://github.com/GokulNaveen2708/Meta-Kaggle-Insights",
    image: "/projects/images/Kaggle.png",
  },
  {
    slug: "jobsync-ai-tracker",
    title: "JobSync: Agentic Job Tracker",
    subtitle: "AI-powered dashboard • Gemini 2.5 • Gmail API",
    category: "AI / Agentic Systems",
    tags: ["Gemini 2.5", "Gmail API", "Next.js", "AI Agent", "OAuth 2.0"],
    summary:
      "AI-powered dashboard that reads your Gmail, classifies emails with Gemini 2.5, and automatically tracks your job hunt progress.",
    highlightBullets: [
      "Built an AI-powered dashboard that automatically tracks job applications by reading and classifying emails.",
      "Integrated Gmail API with Google OAuth for multi-account support and daily email fetching.",
      "Utilized Gemini 2.5 API for intelligent email classification (Rejection, Interview, Offer, etc.).",
      "Designed a daily email digest dashboard with visual analytics for job hunt tracking.",
    ],
    problemStatement:
      "Tracking job applications across hundreds of emails is a tedious, manual process that leads to missed interviews and disorganized job hunts.",
    technicalApproach:
      "The application securely authenticates with Google via OAuth, fetches recent emails using the Gmail API, and passes them to a Gemini 2.5 classification agent. The agent extracts structured data (Company, Role, Status) which is then visualized in a Next.js dashboard.",
    whatILearned:
      "Gained experience building agentic workflows that interact with real-world APIs (Gmail), prompt engineering for structured data extraction, and handling OAuth flows in Next.js.",
    githubUrl: "https://github.com/GokulNaveen2708/ai-job-tracker",
  },
  {
    slug: "visa-sponsorship-detector",
    title: "Visa Sponsorship Detector",
    subtitle: "Chrome Extension • NLP Pattern Matching • Browser Automation",
    category: "Developer Tools",
    tags: ["Chrome Extension", "JavaScript", "NLP", "Regex", "Browser API", "LinkedIn", "Indeed"],
    summary:
      "A Chrome extension that instantly detects visa sponsorship status on LinkedIn, Indeed & Greenhouse job postings, saving international job seekers hours of manual screening.",
    highlightBullets: [
      "Built a multi-layer detection engine combining regex-based NLP scanning, known H-1B sponsor database lookups, and contextual heuristics for 95%+ accuracy.",
      "Engineered sub-150ms page analysis by extracting job metadata (title, company, date) and full JD text without blocking the main thread.",
      "Designed a vibrant floating badge UI with expandable detail panels showing tech stack extraction, job freshness indicators, and JD previews.",
      "Implemented zero-server architecture — all processing happens client-side with no API calls, ensuring complete data privacy.",
      "Added customizable keyword detection allowing users to extend sponsor lists and sponsorship phrase patterns.",
    ],
    problemStatement:
      "International students on F-1 visas spend countless hours manually scanning job descriptions for sponsorship language. Many postings bury this information or omit it entirely, wasting valuable application time.",
    technicalApproach:
      "The extension uses a 3-tier detection pipeline: (1) regex pattern matching against 100+ positive/negative sponsorship phrases, (2) fuzzy matching against a curated database of 1000+ known H-1B sponsor companies, and (3) tech stack keyword extraction using NLP tokenization. All analysis runs in content scripts injected via Chrome's Manifest V3 API.",
    whatILearned:
      "Learned the nuances of Chrome extension development with Manifest V3, including service worker lifecycle management, content script injection timing, and cross-origin messaging. Also gained deep experience with regex optimization for NLP tasks running in performance-constrained browser environments.",
    githubUrl: "https://github.com/GokulNaveen2708/visa-sponsorship-detector",
  },
  {
    slug: "trust-federated-learning",
    title: "Trust-Aware Federated Learning Framework",
    subtitle: "Federated Learning • Security • Flower FL • Robust Aggregation",
    category: "AI Security",
    tags: ["Federated Learning", "Flower FL", "Security", "Robust Aggregation", "Python", "Adversarial ML"],
    summary:
      "A federated learning framework that incorporates dynamic trust and reputation scoring to defend against model poisoning, unreliable clients, and non-IID drift.",
    highlightBullets: [
      "Extended FedAvg with a reputation-weighted aggregation mechanism, reducing the influence of adversarial clients based on gradient deviation metrics.",
      "Implemented trust decay, anomaly scoring, and adaptive client exclusion to improve robustness under malicious and noisy update distributions.",
      "Simulated label-flipping and parameter-poisoning attacks on PathMNIST to measure stability via accuracy, convergence curves, and trust trajectories.",
      "Integrated Flower FL with modular strategy hooks for experimenting with trust scoring, exclusion policies, and attack types.",
      "Achieved significantly more stable convergence under non-IID partitioning compared to baseline federated averaging.",
    ],
    problemStatement:
      "Standard federated learning algorithms like FedAvg are vulnerable to model poisoning attacks where malicious clients submit corrupted gradients to degrade the global model.",
    technicalApproach:
      "Each client receives a dynamic trust score based on gradient similarity to the global model and historical contribution quality. Aggregation weights are proportional to trust scores, with automatic exclusion of clients below a threshold. The system uses exponential decay for trust recovery and anomaly detection for identifying coordinated attacks.",
    whatILearned:
      "Learned the fundamentals of federated learning, Byzantine fault tolerance in distributed ML, and how to design reputation systems that balance security with convergence speed under heterogeneous data distributions.",
    githubUrl: "https://github.com/GokulNaveen2708/Distributed-Trust-Aware-Federated-Learning",
    image: "/projects/images/FL.jpg",
  },
  {
    slug: "uda-bert-text-classification",
    title: "Text Classification with UDA and BERT",
    subtitle: "Semi-Supervised Learning • NLP • BERT • PyTorch",
    category: "Machine Learning",
    tags: ["NLP", "BERT", "UDA", "Text Classification", "Semi-Supervised Learning", "Python", "PyTorch"],
    summary:
      "A semi-supervised text classification pipeline using Unsupervised Data Augmentation (UDA) and BERT, significantly improving label efficiency and model generalization.",
    highlightBullets: [
      "Built a UDA training loop combining supervised loss with augmented-consistency loss using noise injection and back-translation.",
      "Fine-tuned BERT for downstream classification with confidence-based filtering of pseudo-labeled samples.",
      "Generated high-quality augmentations using n-gram masking, word swaps, and controlled perturbations to improve robustness.",
      "Achieved higher accuracy under limited labeled data compared to standard BERT fine-tuning baselines.",
      "Evaluated model performance across increasing unlabeled-data volumes to measure generalization gains from UDA.",
    ],
    problemStatement:
      "Labeled data is expensive and scarce in many NLP domains. Standard supervised fine-tuning of BERT requires large labeled datasets to achieve good performance, limiting applicability in low-resource settings.",
    technicalApproach:
      "Combined supervised cross-entropy loss on labeled data with a consistency regularization loss that enforces agreement between the model's predictions on original and augmented versions of unlabeled data. Used back-translation and n-gram masking for augmentation, with confidence-based pseudo-label filtering to reduce noise.",
    whatILearned:
      "Learned the theory and practice of semi-supervised learning, particularly how consistency regularization exploits the smoothness assumption. Gained experience with data augmentation strategies for NLP and the balance between augmentation diversity and semantic preservation.",
    githubUrl: "https://github.com/GokulNaveen2708/Text-Classification-with-UDA-and-BERT",
    image: "/projects/images/TC.jpeg",
  },
];
