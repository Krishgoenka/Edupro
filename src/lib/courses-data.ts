export type Course = {
  id: string;
  title: string;
  description: string;
  image: string;
  price: number;
  dataAiHint: string;
  domain: "Computer Science" | "Commerce" | "Arts & Humanities" | "UPSC" | "Soft Skills" | "MBA Prep" | "Government Exams";
  category: string;
};

export const domains = [
  "Computer Science",
  "Commerce",
  "Arts & Humanities",
  "UPSC",
  "Soft Skills",
  "MBA Prep",
  "Government Exams",
] as const;

export type Domain = typeof domains[number];

export const categoriesByDomain: Record<Domain, string[]> = {
    "Computer Science": ["Web Development", "AI & ML", "Cyber Security", "Data Structures & Algorithms", "Databases", "Operating Systems"],
    "Commerce": ["Accounting", "Taxation", "Finance Tools", "Business Law"],
    "Arts & Humanities": ["Public Speaking", "Communication", "Psychology", "History"],
    "UPSC": ["Indian Polity", "Geography", "Current Affairs", "Ethics & Essay"],
    "Soft Skills": ["Confidence Building", "Interview Prep", "Resume Writing", "Professional Communication"],
    "MBA Prep": ["Quantitative Aptitude", "Verbal Ability", "Data Interpretation"],
    "Government Exams": ["Logical Reasoning", "General Knowledge", "Quantitative Aptitude"],
};

export const courses: Course[] = [
    // Computer Science
    {
        id: 'web-development-bootcamp',
        title: 'Web Development Bootcamp',
        description: 'Master HTML, CSS, JavaScript, React, and Node.js. Build real-world projects from scratch.',
        image: 'https://placehold.co/600x400.png',
        price: 499,
        dataAiHint: "code editor",
        domain: "Computer Science",
        category: "Web Development"
    },
    {
        id: 'ai-a-z',
        title: 'Artificial Intelligence A-Z',
        description: 'Dive into the world of AI. Learn about machine learning, data science, and neural networks.',
        image: 'https://placehold.co/600x400.png',
        price: 599,
        dataAiHint: "robot brain",
        domain: "Computer Science",
        category: "AI & ML"
    },
    {
        id: 'cyber-security-essentials',
        title: 'Cyber Security Essentials',
        description: 'Protect systems from digital attacks. Learn ethical hacking, cryptography, and network security.',
        image: 'https://placehold.co/600x400.png',
        price: 599,
        dataAiHint: "digital lock",
        domain: "Computer Science",
        category: "Cyber Security"
    },
    {
        id: 'dsa-in-c-plus-plus',
        title: 'DSA in C++',
        description: 'Master Data Structures and Algorithms using C++ for competitive programming and interviews.',
        image: 'https://placehold.co/600x400.png',
        price: 499,
        dataAiHint: "algorithm flowchart",
        domain: "Computer Science",
        category: "Data Structures & Algorithms"
    },
    {
        id: 'sql-mastery',
        title: 'SQL Mastery: From Zero to Hero',
        description: 'Learn SQL for data analysis and database management. Covers everything from basic queries to advanced topics.',
        image: 'https://placehold.co/600x400.png',
        price: 399,
        dataAiHint: "database schema",
        domain: "Computer Science",
        category: "Databases"
    },
     {
        id: 'operating-systems-concepts',
        title: 'Operating Systems Concepts',
        description: 'Understand the core concepts of operating systems, including processes, memory management, and file systems.',
        image: 'https://placehold.co/600x400.png',
        price: 499,
        dataAiHint: "system process",
        domain: "Computer Science",
        category: "Operating Systems"
    },

    // Commerce
    {
        id: 'accounting-basics',
        title: 'Accounting Basics',
        description: 'Learn the fundamentals of accounting, including debits, credits, and financial statements.',
        image: 'https://placehold.co/600x400.png',
        price: 299,
        dataAiHint: "financial ledger",
        domain: "Commerce",
        category: "Accounting"
    },
    {
        id: 'taxation-simplified',
        title: 'Taxation Simplified',
        description: 'Understand the basics of Indian taxation, including income tax and GST for individuals and businesses.',
        image: 'https://placehold.co/600x400.png',
        price: 399,
        dataAiHint: "tax forms",
        domain: "Commerce",
        category: "Taxation"
    },
    {
        id: 'excel-for-finance',
        title: 'Excel for Finance',
        description: 'Master financial modeling and data analysis in Excel. Essential skills for any commerce professional.',
        image: 'https://placehold.co/600x400.png',
        price: 499,
        dataAiHint: "spreadsheet chart",
        domain: "Commerce",
        category: "Finance Tools"
    },
    {
        id: 'business-law-101',
        title: 'Business Law 101',
        description: 'Get introduced to the legal aspects of business, including contracts, company law, and intellectual property.',
        image: 'https://placehold.co/600x400.png',
        price: 299,
        dataAiHint: "legal gavel",
        domain: "Commerce",
        category: "Business Law"
    },
    
    // Arts & Humanities / Soft Skills
    {
        id: 'public-speaking-mastery',
        title: 'Public Speaking Mastery',
        description: 'Boost your confidence and communication skills. Learn to deliver powerful presentations.',
        image: 'https://placehold.co/600x400.png',
        price: 499,
        dataAiHint: "person stage",
        domain: "Arts & Humanities",
        category: "Public Speaking"
    },
     {
        id: 'english-confidence-booster',
        title: 'English Confidence Booster',
        description: 'Improve your spoken English and build confidence for interviews and professional settings.',
        image: 'https://placehold.co/600x400.png',
        price: 99,
        dataAiHint: "people talking",
        domain: "Soft Skills",
        category: "Confidence Building"
    },
    {
        id: 'interview-essentials',
        title: 'Interview Essentials',
        description: 'Learn the strategies to crack any job interview, from preparation to follow-up.',
        image: 'https://placehold.co/600x400.png',
        price: 199,
        dataAiHint: "job interview",
        domain: "Soft Skills",
        category: "Interview Prep"
    },
    {
        id: 'resume-writing-for-devs',
        title: 'Resume Writing for Developers',
        description: 'Craft a compelling resume that stands out to tech recruiters and lands you interviews.',
        image: 'https://placehold.co/600x400.png',
        price: 99,
        dataAiHint: "resume document",
        domain: "Soft Skills",
        category: "Resume Writing"
    },

    // UPSC
    {
        id: 'indian-polity-upsc',
        title: 'Indian Polity for UPSC',
        description: 'A comprehensive course on the Indian Constitution and political system for UPSC aspirants.',
        image: 'https://placehold.co/600x400.png',
        price: 599,
        dataAiHint: "indian parliament",
        domain: "UPSC",
        category: "Indian Polity"
    },
    {
        id: 'geography-for-upsc',
        title: 'Geography for UPSC',
        description: 'Covers physical, Indian, and world geography as per the UPSC syllabus.',
        image: 'https://placehold.co/600x400.png',
        price: 599,
        dataAiHint: "world map",
        domain: "UPSC",
        category: "Geography"
    },

    // MBA Prep
    {
        id: 'cat-quant-aptitude',
        title: 'CAT Quant Aptitude',
        description: 'Master quantitative aptitude for the CAT exam with shortcuts, strategies, and extensive practice.',
        image: 'https://placehold.co/600x400.png',
        price: 499,
        dataAiHint: "math formulas",
        domain: "MBA Prep",
        category: "Quantitative Aptitude"
    },

    // Other existing courses
    {
        id: 'data-science-python',
        title: 'Data Science with Python',
        description: 'Learn data analysis, visualization, and machine learning with Python libraries like Pandas, NumPy, and Scikit-learn.',
        image: 'https://placehold.co/600x400.png',
        price: 599,
        dataAiHint: "data chart",
        domain: "Computer Science",
        category: "AI & ML"
    },
    {
        id: 'digital-marketing-masterclass',
        title: 'Digital Marketing Masterclass',
        description: 'Master SEO, SEM, social media marketing, and content strategy to grow businesses online.',
        image: 'https://placehold.co/600x400.png',
        price: 499,
        dataAiHint: "marketing graph",
        domain: "Commerce",
        category: "Finance Tools"
    },
    {
        id: 'graphic-design-fundamentals',
        title: 'Graphic Design Fundamentals',
        description: 'Understand the principles of design, color theory, typography, and create stunning visuals using Adobe tools.',
        image: 'https://placehold.co/600x400.png',
        price: 549,
        dataAiHint: "design sketch",
        domain: "Arts & Humanities",
        category: "Communication"
    },
    {
        id: 'project-management-pmp',
        title: 'Project Management Professional (PMP)',
        description: 'Prepare for the PMP certification exam. Learn about project lifecycles, risk management, and Agile methodologies.',
        image: 'https://placehold.co/600x400.png',
        price: 599,
        dataAiHint: "task board",
        domain: "Soft Skills",
        category: "Professional Communication"
    }
];
