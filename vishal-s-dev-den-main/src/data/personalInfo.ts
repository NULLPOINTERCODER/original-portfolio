export interface PersonalInfo {
  name: string;
  role: string;
  taglines: string[];
  education: {
    degree: string;
    field: string;
    institution: string;
    semester: string;
    cgpa: string;
    location: string;
  };
  contact: {
    email: string;
    whatsapp: string;
    phone: string;
    location: string;
    instagram: string;
    linkedin: string;
    github: string;
    resumeUrl: string;
  };
  stats: {
    leetcodeRating: string;
    codechefRating: string;
    problemsSolved: string;
    cgpa: string;
  };
  skills: {
    languages: string[];
    frameworks: string[];
    databases: string[];
    tools: string[];
    ai_ml: string[];
  };
  projects: Array<{
    title: string;
    description: string;
    techStack: string[];
    github?: string;
    live?: string;
    date: string;
    highlights: string;
  }>;
  certifications: Array<{
    title: string;
    issuer: string;
    date: string;
    description: string;
    link?: string;
  }>;
  achievements: Array<{
    title: string;
    subtitle: string;
    description: string;
    date: string;
    tag: string;
  }>;
  bio: string;
  faqs: Array<{
    questions: string[];
    answer: string;
  }>;
}

export const personalInfo: PersonalInfo = {
  name: "Vishal Choudhary",
  role: "Full Stack Developer & Machine Learning Engineer",
  taglines: [
    "Full Stack Developer",
    "UI/UX Designer",
    "Frontend Specialist",
    "Backend Engineer",
    "Problem Solver",
    "ML Engineer",
    "Tech Enthusiast"
  ],
  education: {
    degree: "B.Tech",
    field: "Computer Science and Engineering (CSE)",
    institution: "Parul Institute of Technology, Parul University",
    semester: "5th Semester",
    cgpa: "8.45",
    location: "Vadodara, Gujarat, India"
  },
  contact: {
    email: "vpatel914235@gmail.com",
    whatsapp: "+91 9142359287",
    phone: "+91 9142359287",
    location: "Vadodara, Gujarat, India",
    instagram: "https://www.instagram.com/i_m_v_patel?utm_source=qr&igsh=MXRncjQzbGh2Nmsydw==",
    linkedin: "https://www.linkedin.com/in/vishal-choudhary-45a931344",
    github: "https://github.com/NULLPOINTERCODER",
    resumeUrl: "https://drive.google.com/file/d/16ptIYRLHJXm-wGDxf9CepucBl5ZaHYJG/view?usp=drivesdk"
  },
  stats: {
    leetcodeRating: "1720",
    codechefRating: "1177",
    problemsSolved: "450+",
    cgpa: "8.45"
  },
  skills: {
    languages: ["Java", "Python", "C/C++", "JavaScript", "Kotlin"],
    frameworks: ["React", "Node.js", "Express.js", "Django", "Flask", "Streamlit"],
    databases: ["MySQL", "MongoDB", "PostgreSQL", "SQLite"],
    tools: ["Git", "GitHub", "Docker", "AWS", "Linux", "VS Code", "Android Studio", "IntelliJ", "Jupyter"],
    ai_ml: ["Scikit-Learn", "TensorFlow", "OpenCV", "NumPy", "Pandas", "NLP", "TF-IDF", "Machine Learning"]
  },
  projects: [
    {
      title: "AI-Powered Crop Yield Prediction",
      description: "Developed an AI-powered Django web platform for crop yield prediction using real-world agricultural datasets. Implemented regression and ensemble machine learning models to analyze soil, rainfall, and climatic factors.",
      techStack: ["Python", "Django", "HTML/CSS", "JavaScript", "Scikit-learn", "Pandas", "NumPy", "Matplotlib"],
      github: "https://github.com/NULLPOINTERCODER/Crop_Yield",
      date: "Sep – Oct 2025",
      highlights: "Trained regression and ensemble ML models to analyze soil, rainfall, and climate parameters to predict accurate crop yields."
    },
    {
      title: "Movie Recommender System",
      description: "Built a content-based movie recommendation system using cosine similarity on preprocessed datasets with an interactive Streamlit interface and TMDB API integration.",
      techStack: ["Python", "Streamlit", "Machine Learning", "Pandas", "NumPy", "Pickle", "TMDB API"],
      github: "https://github.com/NULLPOINTERCODER/movie-recommened",
      date: "Jan 2026",
      highlights: "Employs Cosine Similarity & TMDB API with Pickle caching for fast, accurate movie recommendations."
    },
    {
      title: "Wanderlust – Airbnb Clone",
      description: "Full-stack Airbnb-inspired web application with user authentication (Passport.js), Cloudinary image uploads, and full CRUD operations for property listings & bookings.",
      techStack: ["Node.js", "Express.js", "MongoDB", "Mongoose", "EJS", "Passport.js", "Multer", "Cloudinary"],
      github: "https://github.com/NULLPOINTERCODER/local-connect.git",
      live: "https://local-connect-blue.vercel.app/",
      date: "2025",
      highlights: "Responsive full-stack Airbnb clone with secure authentication, property listing management, reviews, and cloud media storage."
    },
    {
      title: "ContractConnect – Labour Job Platform",
      description: "Built during the Trojan_Coders Hackathon. A platform connecting daily wage labourers with employers across India via location-based matching with AI matching and SMS/IVR accessibility.",
      techStack: ["React", "Next.js", "Node.js", "Express", "Flask", "PostgreSQL", "MongoDB"],
      github: "https://github.com/NULLPOINTERCODER/contractconnect.git",
      date: "Hackathon 2025",
      highlights: "Location-based job matching designed for grassroots workers with multilingual and SMS/IVR capability."
    },
    {
      title: "Credit Card Fraud Detection System",
      description: "Fraud detection system built using Random Forest and SMOTE handling class imbalance on transactions. Achieved ~99.96% accuracy and ~0.9545 ROC-AUC.",
      techStack: ["Python", "Scikit-learn", "Pandas", "NumPy", "SMOTE", "Random Forest", "Pickle"],
      github: "https://github.com/NULLPOINTERCODER/creadit-card-fraud-detection-system.git",
      date: "2025",
      highlights: "Solves extreme class imbalance with SMOTE, achieving 99.96% accuracy and 0.9545 ROC-AUC score."
    },
    {
      title: "Mail Spam Detection System",
      description: "Interactive machine learning web application that classifies emails as spam or ham using NLP preprocessing and TF-IDF vectorization.",
      techStack: ["Python", "Scikit-learn", "NLP", "TF-IDF", "Pandas", "NumPy", "Streamlit"],
      github: "https://github.com/NULLPOINTERCODER/Mail-spam-classifier.git",
      live: "https://mail-spam-classifier.vercel.app",
      date: "2025",
      highlights: "Real-time email spam detection deployed live on Streamlit/Vercel."
    }
  ],
  certifications: [
    {
      title: "Building Agentic AI Applications with Large Language Models",
      issuer: "NVIDIA",
      date: "Sep 2026",
      description: "Certificate of Competency awarded by Howard Wright (Vice President, NVIDIA) for demonstrating competence in building autonomous Agentic AI applications using LLMs.",
      link: "https://learn.nvidia.com/certificates?id=kiP-BDBuSaye11OPrF4KWg"
    },
    {
      title: "Machine Learning, Data Science, DL and NLP",
      issuer: "Udemy",
      date: "Jan 2026",
      description: "Supervised and unsupervised learning, deep learning, NLP, and practical machine learning in Python.",
      link: "https://udemy-certificate.s3.amazonaws.com/pdf/UC-137dd086-3706-4288-bc0f-da0dd56be077.pdf"
    },
    {
      title: "AWS Academy Cloud Foundations Graduate",
      issuer: "AWS Academy",
      date: "Aug 2025",
      description: "Foundational understanding of AWS Cloud architecture, services, security, and cloud computing fundamentals.",
      link: "https://www.credly.com/badges/206b6097-886d-48f8-9f1a-985c39553f4d/public_url"
    },
    {
      title: "Smart Coder – Silver Certificate",
      issuer: "Smart Interviews",
      date: "July 2025",
      description: "Recognition for excellence in problem-solving and Data Structures & Algorithms.",
      link: "https://smartinterviews.in/certificate/6e9216cb"
    },
    {
      title: "Artificial Intelligence Fundamentals",
      issuer: "IBM SkillsBuilder",
      date: "July 2025",
      description: "AI concepts, algorithms, and practical applications in real-world scenarios.",
      link: "https://www.credly.com/badges/44c97203-a982-4477-939f-0de130ae29ed/public_url"
    },
    {
      title: "Computer Networks And Internet Protocol",
      issuer: "NPTEL",
      date: "July 2025",
      description: "In-depth understanding of computer networks, OSI models, and IP protocols."
    }
  ],
  achievements: [
    {
      title: "Smart India Hackathon (SIH) 2025",
      subtitle: "Institute-level Qualifier",
      description: "Qualified at the institute level at Parul Institute of Technology, competing against top engineering teams.",
      date: "Sep 2025",
      tag: "Hackathon"
    },
    {
      title: "Ignita Startup Fest 2025",
      subtitle: "Top 25 Startup Pitcher",
      description: "Recognized among Top 25 Startup Pitchers for entrepreneurial innovation and pitching to industry investors.",
      date: "Sep 2025",
      tag: "Startup"
    },
    {
      title: "PU Code Hackathon 2.0 & 3.0",
      subtitle: "Grand Finale Qualifier",
      description: "Selected for Grand Finale in both editions 2.0 and 3.0, proving time-pressured coding and problem solving expertise.",
      date: "Jan 2025 & Jan 2026",
      tag: "Hackathon"
    }
  ],
  bio: "I am Vishal Choudhary, a 5th-semester B.Tech Computer Science student at Parul Institute of Technology with an 8.45 CGPA. I specialize in Full Stack Web Development (React, Node.js, Express, Django, Flask) and Machine Learning. I am also an avid competitive programmer with 450+ solved problems across LeetCode (1720 rating) and CodeChef (1177 rating).",
  faqs: [
    {
      questions: ["who are you", "who is vishal", "tell me about yourself", "introduce yourself", "about"],
      answer: "Hi there! 👋 I am Vishal Choudhary's AI portfolio assistant. Vishal is a passionate Full Stack Developer and Machine Learning Engineer currently pursuing his B.Tech in CSE at Parul Institute of Technology (8.45 CGPA). He builds high-performance web apps, solves complex DSA problems (450+ solved, 1720 LeetCode rating), and develops intelligent ML solutions!"
    },
    {
      questions: ["skills", "tech stack", "technologies", "what do you know", "programming languages"],
      answer: "Vishal's tech stack includes:\n• **Languages:** Java, Python, C/C++, JavaScript, Kotlin\n• **Frontend & Backend:** React, Node.js, Express.js, Django, Flask, Streamlit\n• **Databases:** MySQL, MongoDB, PostgreSQL, SQLite\n• **AI/ML:** Scikit-Learn, TensorFlow, OpenCV, NumPy, Pandas, NLP\n• **Tools:** Git/GitHub, Docker, AWS Cloud, Linux, VS Code"
    },
    {
      questions: ["projects", "what have you built", "portfolio projects", "work"],
      answer: "Here are some of Vishal's key projects:\n1. **AI-Powered Crop Yield Prediction**: ML platform using Django & ensemble models.\n2. **Movie Recommender System**: Content-based recommendation with Streamlit & TMDB API.\n3. **Wanderlust (Airbnb Clone)**: Full-stack MERN/EJS property booking app with live demo.\n4. **ContractConnect**: Hackathon-winning daily wage labour job platform with location matching.\n5. **Credit Card Fraud Detection**: 99.96% accuracy fraud detection using Random Forest & SMOTE.\n6. **Mail Spam Classifier**: NLP spam detection web app."
    },
    {
      questions: ["contact", "email", "phone", "whatsapp", "hire", "reach you", "touch"],
      answer: "You can easily reach Vishal through:\n• **Email:** vpatel914235@gmail.com\n• **WhatsApp / Call:** +91 9142359287\n• **LinkedIn:** linkedin.com/in/vishal-choudhary-45a931344\n• **Instagram:** @i_m_v_patel\n• Or drop a message directly using the contact form on this website!"
    },
    {
      questions: ["resume", "cv", "download resume", "download cv"],
      answer: "You can view and download Vishal's CV directly from this link: [Download Vishal's CV](https://drive.google.com/file/d/16ptIYRLHJXm-wGDxf9CepucBl5ZaHYJG/view?usp=drivesdk)"
    },
    {
      questions: ["education", "college", "university", "degree", "cgpa", "marks"],
      answer: "Vishal is pursuing his **B.Tech in Computer Science and Engineering** at Parul Institute of Technology (Parul University), currently in his 5th semester maintaining an impressive **8.45 CGPA**."
    },
    {
      questions: ["leetcode", "codechef", "dsa", "competitive programming", "rating", "problems"],
      answer: "Vishal has a strong passion for competitive programming and DSA in Java and C++:\n• **LeetCode Rating:** 1720\n• **CodeChef Rating:** 1177\n• **Problems Solved:** 450+ problems solved across various coding platforms\n• **Smart Coder Silver Certificate** from Smart Interviews"
    },
    {
      questions: ["certifications", "certificates", "courses", "nvidia"],
      answer: "Vishal holds several top industry certifications:\n• **Building Agentic AI Applications with LLMs** (NVIDIA - Sep 2026)\n• **Machine Learning, Data Science, DL and NLP** (Udemy - Jan 2026)\n• **AWS Academy Cloud Foundations Graduate** (AWS / Credly - Aug 2025)\n• **Smart Coder – Silver Certificate** (Smart Interviews - July 2025)\n• **Artificial Intelligence Fundamentals** (IBM SkillsBuilder - July 2025)\n• **Computer Networks and IP** (NPTEL - July 2025)"
    },
    {
      questions: ["achievements", "hackathons", "awards", "recognition"],
      answer: "Key achievements include:\n• 🏆 **Smart India Hackathon (SIH) 2025** — Institute-level Qualifier\n• 🚀 **Ignita Startup Fest 2025** — Top 25 Startup Pitcher\n• ⚡ **PU Code Hackathon 2.0 & 3.0** — Grand Finale Qualifier in both editions"
    },
    {
      questions: ["available", "freelance", "job", "internship", "hire you", "looking for work"],
      answer: "Yes! Vishal is currently open to full-time roles, internships, and freelance projects in Full Stack Web Development, Backend Engineering, and AI/ML applications. Feel free to contact him at vpatel914235@gmail.com or on WhatsApp at +91 9142359287."
    }
  ]
};
