export const PERSONAL_INFO = {
  name: "Sri Sarvesh R",
  role: "Software Engineer",
  location: "Tamil Nadu, India",
  education: {
    degree: "B.E Computer Science and Engineering",
    college: "Dhanalakshmi Srinivasan Engineering College",
    cgpa: "8.0",
  },
  roles: [
    "Software Engineer",
    "Full Stack Developer",
    "Java Developer",
    "Problem Solver",
    "CS Undergraduate",
  ],
  social: {
    github: "https://github.com/sarvesh-3112",
    linkedin: "https://www.linkedin.com/in/srisarveshr/",
    leetcode: "https://leetcode.com/u/srisarveshr/",
  },
};

export const SKILLS = [
  {
    category: "Languages",
    color: "#6C63FF",
    items: ["Java", "Python", "C"],
  },
  {
    category: "Frontend",
    color: "#00E5FF",
    items: ["HTML", "CSS", "JavaScript", "Next.js"],
  },
  {
    category: "Backend",
    color: "#a855f7",
    items: ["FastAPI", "REST API"],
  },
  {
    category: "Database",
    color: "#f59e0b",
    items: ["MySQL", "JDBC"],
  },
  {
    category: "Tools",
    color: "#10b981",
    items: ["Git", "GitHub", "VS Code", "Render", "Vercel", "Chart.js", "Arduino"],
  },
];

export const PROJECTS = [
  {
    id: 1,
    title: "HealthAI",
    subtitle: "Full Stack AI Healthcare Prediction Platform",
    description:
      "AI-powered healthcare platform featuring Patient, Hospital, and Admin dashboards. Integrates machine learning for disease prediction, role-based authentication, and comprehensive REST APIs with a fully responsive design.",
    tech: ["Next.js", "FastAPI", "Python", "Scikit-learn", "Render", "Vercel"],
    github: "https://github.com/srisarvesh",
    live: "https://healthai-patient.vercel.app/",
    color: "#6C63FF",
    gradient: "from-purple-600/20 to-blue-600/20",
    featured: true,
  },
  {
    id: 2,
    title: "Smart Expense Manager",
    subtitle: "Intelligent Budget Tracking Application",
    description:
      "Feature-rich expense tracking application with real-time budget monitoring, interactive charts, CSV export functionality, dark mode support, and full CRUD operations with local storage persistence.",
    tech: ["HTML", "CSS", "JavaScript", "Chart.js", "Local Storage"],
    github: "https://github.com/sarvesh-3112/smart-expense-manager",
    live: "https://smart-expense-manager-sooty.vercel.app/",
    color: "#00E5FF",
    gradient: "from-cyan-600/20 to-teal-600/20",
    featured: false,
  },
];

export const CERTIFICATIONS = [
  { title: "Full Stack Development", issuer: "Edu Tantr", year: "2024", color: "#f59e0b" },
  { title: "Python for Data Science", issuer: "NPTEL", year: "2024", color: "#6C63FF" },
  { title: "Machine Learning", issuer: "NPTEL", year: "2024", color: "#00E5FF" },
  { title: "Cyber Security", issuer: "NPTEL", year: "2024", color: "#a855f7" },
];

export const EXPERIENCE = [
  {
    role: "Full Stack Developer Trainee",
    company: "Edu Tantr",
    period: "August 2024 – October 2024",
    description:
      "Built and deployed full-stack web applications using modern frameworks. Developed RESTful APIs, integrated databases, and implemented responsive UI components.",
    achievements: [
      "Developed production-ready Next.js applications",
      "Integrated FastAPI backend with React frontend",
      "Implemented authentication and role-based access control",
      "Collaborated on 3 real-world client projects",
    ],
    color: "#6C63FF",
  },
];

export const NAV_LINKS = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
];
