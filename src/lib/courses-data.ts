
export type Course = {
  id: string;
  title: string;
  description: string;
  image: string;
  price: number;
  dataAiHint: string;
  domain: "Computer Science" | "Commerce" | "Arts & Humanities" | "UPSC" | "Soft Skills" | "MBA Prep" | "Government Exams";
  category: string;
  videoUrl: string;
  tutor: {
    name: string;
    image: string;
    dataAiHint: string;
  };
  features: string[];
  duration: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "All Levels";
  curriculum: {
    title: string;
    duration: string;
  }[];
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
        dataAiHint: "laptop code",
        domain: "Computer Science",
        category: "Web Development",
        videoUrl: 'https://www.youtube.com/embed/rokGy0huYEA',
        tutor: { name: 'Rohan Sharma', image: 'https://placehold.co/100x100.png', dataAiHint: 'person portrait' },
        features: [
            'Build 5 real-world web applications',
            'Master modern frontend frameworks like React',
            'Understand backend development with Node.js and Express',
            'Learn to deploy your applications to the cloud'
        ],
        duration: '24 hours',
        level: 'All Levels',
        curriculum: [
            { title: 'Module 1: HTML & CSS Basics', duration: '4 hours' },
            { title: 'Module 2: Advanced CSS & Flexbox', duration: '4 hours' },
            { title: 'Module 3: JavaScript Fundamentals', duration: '6 hours' },
            { title: 'Module 4: React Deep Dive', duration: '6 hours' },
            { title: 'Module 5: Backend with Node.js', duration: '4 hours' },
        ]
    },
    {
        id: 'ai-a-z',
        title: 'Artificial Intelligence A-Z',
        description: 'Dive into the world of AI. Learn about machine learning, data science, and neural networks.',
        image: 'https://placehold.co/600x400.png',
        price: 599,
        dataAiHint: "abstract AI",
        domain: "Computer Science",
        category: "AI & ML",
        videoUrl: 'https://www.youtube.com/embed/t-9hZ1v_L8k',
        tutor: { name: 'Priya Singh', image: 'https://placehold.co/100x100.png', dataAiHint: 'person portrait' },
        features: [
            'Understand the theory behind Artificial Intelligence',
            'Build your own AI models from scratch',
            'Learn to use libraries like TensorFlow and PyTorch',
            'Apply AI for real-world problem solving'
        ],
        duration: '30 hours',
        level: 'Intermediate',
        curriculum: [
            { title: 'Module 1: Introduction to AI', duration: '5 hours' },
            { title: 'Module 2: Machine Learning Models', duration: '10 hours' },
            { title: 'Module 3: Deep Learning & Neural Networks', duration: '10 hours' },
            { title: 'Module 4: Project - AI Chatbot', duration: '5 hours' },
        ]
    },
    {
        id: 'cyber-security-essentials',
        title: 'Cyber Security Essentials',
        description: 'Protect systems from digital attacks. Learn ethical hacking, cryptography, and network security.',
        image: 'https://placehold.co/600x400.png',
        price: 599,
        dataAiHint: "cyber security",
        domain: "Computer Science",
        category: "Cyber Security",
        videoUrl: 'https://www.youtube.com/embed/rokGy0huYEA',
        tutor: { name: 'Ankit Mehta', image: 'https://placehold.co/100x100.png', dataAiHint: 'person portrait' },
        features: [
            'Learn the fundamentals of ethical hacking',
            'Understand network security protocols',
            'Master cryptography and data protection techniques',
            'Prepare for a career in cyber security'
        ],
        duration: '20 hours',
        level: 'Beginner',
        curriculum: [
            { title: 'Module 1: Introduction to Cyber Security', duration: '4 hours' },
            { title: 'Module 2: Network Security', duration: '6 hours' },
            { title: 'Module 3: Ethical Hacking', duration: '6 hours' },
            { title: 'Module 4: Cryptography', duration: '4 hours' },
        ]
    },
    {
        id: 'dsa-in-c-plus-plus',
        title: 'DSA in C++',
        description: 'Master Data Structures and Algorithms using C++ for competitive programming and interviews.',
        image: 'https://placehold.co/600x400.png',
        price: 499,
        dataAiHint: "data structure",
        domain: "Computer Science",
        category: "Data Structures & Algorithms",
        videoUrl: 'https://www.youtube.com/embed/rokGy0huYEA',
        tutor: { name: 'Vikram Kumar', image: 'https://placehold.co/100x100.png', dataAiHint: 'person portrait' },
        features: [
            'Solve complex problems using data structures',
            'Ace coding interviews at top tech companies',
            'Understand time and space complexity',
            'Master algorithms like sorting, searching, and graphs'
        ],
        duration: '35 hours',
        level: 'Intermediate',
        curriculum: [
            { title: 'Module 1: Arrays & Strings', duration: '5 hours' },
            { title: 'Module 2: Linked Lists, Stacks & Queues', duration: '10 hours' },
            { title: 'Module 3: Trees & Graphs', duration: '15 hours' },
            { title: 'Module 4: Advanced Algorithms', duration: '5 hours' },
        ]
    },
    {
        id: 'sql-mastery',
        title: 'SQL Mastery: From Zero to Hero',
        description: 'Learn SQL for data analysis and database management. Covers everything from basic queries to advanced topics.',
        image: 'https://placehold.co/600x400.png',
        price: 399,
        dataAiHint: "database server",
        domain: "Computer Science",
        category: "Databases",
        videoUrl: 'https://www.youtube.com/embed/rokGy0huYEA',
        tutor: { name: 'Neha Gupta', image: 'https://placehold.co/100x100.png', dataAiHint: 'person portrait' },
        features: [
            'Write complex SQL queries with confidence',
            'Design and manage relational databases',
            'Perform data analysis using SQL',
            'Master joins, subqueries, and window functions'
        ],
        duration: '15 hours',
        level: 'All Levels',
        curriculum: [
            { title: 'Module 1: SQL Basics', duration: '3 hours' },
            { title: 'Module 2: Advanced Queries', duration: '5 hours' },
            { title: 'Module 3: Database Design', duration: '4 hours' },
            { title: 'Module 4: Performance Tuning', duration: '3 hours' },
        ]
    },
     {
        id: 'operating-systems-concepts',
        title: 'Operating Systems Concepts',
        description: 'Understand the core concepts of operating systems, including processes, memory management, and file systems.',
        image: 'https://placehold.co/600x400.png',
        price: 499,
        dataAiHint: "computer chip",
        domain: "Computer Science",
        category: "Operating Systems",
        videoUrl: 'https://www.youtube.com/embed/rokGy0huYEA',
        tutor: { name: 'Sanjay Patel', image: 'https://placehold.co/100x100.png', dataAiHint: 'person portrait' },
        features: [
            'Understand how operating systems work internally',
            'Learn about process scheduling and synchronization',
            'Master memory management techniques',
            'Gain a deep understanding of file systems'
        ],
        duration: '18 hours',
        level: 'Intermediate',
        curriculum: [
            { title: 'Module 1: Introduction to OS', duration: '3 hours' },
            { title: 'Module 2: Process Management', duration: '6 hours' },
            { title: 'Module 3: Memory Management', duration: '5 hours' },
            { title: 'Module 4: File Systems', duration: '4 hours' },
        ]
    },

    // Commerce
    {
        id: 'accounting-basics',
        title: 'Accounting Basics',
        description: 'Learn the fundamentals of accounting, including debits, credits, and financial statements.',
        image: 'https://placehold.co/600x400.png',
        price: 299,
        dataAiHint: "calculator paperwork",
        domain: "Commerce",
        category: "Accounting",
        videoUrl: 'https://www.youtube.com/embed/rokGy0huYEA',
        tutor: { name: 'Ravi Jain', image: 'https://placehold.co/100x100.png', dataAiHint: 'person portrait' },
        features: [
            'Master the double-entry accounting system',
            'Prepare and analyze financial statements',
            'Understand key accounting principles and standards',
            'Apply accounting concepts to real business scenarios'
        ],
        duration: '12 hours',
        level: 'Beginner',
        curriculum: [
            { title: 'Module 1: Introduction to Accounting', duration: '3 hours' },
            { title: 'Module 2: Journal & Ledger', duration: '4 hours' },
            { title: 'Module 3: Financial Statements', duration: '5 hours' },
        ]
    },
    {
        id: 'taxation-simplified',
        title: 'Taxation Simplified',
        description: 'Understand the basics of Indian taxation, including income tax and GST for individuals and businesses.',
        image: 'https://placehold.co/600x400.png',
        price: 399,
        dataAiHint: "tax calculation",
        domain: "Commerce",
        category: "Taxation",
        videoUrl: 'https://www.youtube.com/embed/rokGy0huYEA',
        tutor: { name: 'Sunita Agarwal', image: 'https://placehold.co/100x100.png', dataAiHint: 'person portrait' },
        features: [
            'Understand the Indian income tax system',
            'Learn how to file income tax returns',
            'Get a comprehensive overview of GST',
            'Learn tax planning strategies for individuals'
        ],
        duration: '16 hours',
        level: 'Beginner',
        curriculum: [
            { title: 'Module 1: Income Tax Basics', duration: '6 hours' },
            { title: 'Module 2: Filing ITR', duration: '4 hours' },
            { title: 'Module 3: Introduction to GST', duration: '6 hours' },
        ]
    },
    {
        id: 'excel-for-finance',
        title: 'Excel for Finance',
        description: 'Master financial modeling and data analysis in Excel. Essential skills for any commerce professional.',
        image: 'https://placehold.co/600x400.png',
        price: 499,
        dataAiHint: "finance spreadsheet",
        domain: "Commerce",
        category: "Finance Tools",
        videoUrl: 'https://www.youtube.com/embed/rokGy0huYEA',
        tutor: { name: 'Amit Verma', image: 'https://placehold.co/100x100.png', dataAiHint: 'person portrait' },
        features: [
            'Build financial models from scratch',
            'Use advanced Excel functions for data analysis',
            'Create insightful charts and dashboards',
            'Automate tasks with macros and VBA'
        ],
        duration: '20 hours',
        level: 'Intermediate',
        curriculum: [
            { title: 'Module 1: Advanced Excel Functions', duration: '5 hours' },
            { title: 'Module 2: Financial Modeling', duration: '8 hours' },
            { title: 'Module 3: Data Visualization', duration: '4 hours' },
            { title: 'Module 4: VBA for Finance', duration: '3 hours' },
        ]
    },
    {
        id: 'business-law-101',
        title: 'Business Law 101',
        description: 'Get introduced to the legal aspects of business, including contracts, company law, and intellectual property.',
        image: 'https://placehold.co/600x400.png',
        price: 299,
        dataAiHint: "law books",
        domain: "Commerce",
        category: "Business Law",
        videoUrl: 'https://www.youtube.com/embed/rokGy0huYEA',
        tutor: { name: 'Kavita Desai', image: 'https://placehold.co/100x100.png', dataAiHint: 'person portrait' },
        features: [
            'Understand the Indian Contract Act',
            'Learn the basics of company formation and law',
            'Get an overview of Intellectual Property rights',
            'Navigate common legal challenges in business'
        ],
        duration: '10 hours',
        level: 'Beginner',
        curriculum: [
            { title: 'Module 1: Contract Law', duration: '4 hours' },
            { title: 'Module 2: Company Law', duration: '4 hours' },
            { title: 'Module 3: Intellectual Property', duration: '2 hours' },
        ]
    },
    
    // Arts & Humanities / Soft Skills
    {
        id: 'public-speaking-mastery',
        title: 'Public Speaking Mastery',
        description: 'Boost your confidence and communication skills. Learn to deliver powerful presentations.',
        image: 'https://placehold.co/600x400.png',
        price: 499,
        dataAiHint: "public speaking",
        domain: "Arts & Humanities",
        category: "Public Speaking",
        videoUrl: 'https://www.youtube.com/embed/rokGy0huYEA',
        tutor: { name: 'Aisha Khan', image: 'https://placehold.co/100x100.png', dataAiHint: 'person portrait' },
        features: [
            'Overcome stage fright and speak with confidence',
            'Structure and deliver compelling presentations',
            'Use body language and voice modulation effectively',
            'Engage and persuade your audience'
        ],
        duration: '8 hours',
        level: 'All Levels',
        curriculum: [
            { title: 'Module 1: Building Confidence', duration: '2 hours' },
            { title: 'Module 2: Structuring Your Speech', duration: '3 hours' },
            { title: 'Module 3: Delivery Techniques', duration: '3 hours' },
        ]
    },
     {
        id: 'english-confidence-booster',
        title: 'English Confidence Booster',
        description: 'Improve your spoken English and build confidence for interviews and professional settings.',
        image: 'https://placehold.co/600x400.png',
        price: 99,
        dataAiHint: "conversation class",
        domain: "Soft Skills",
        category: "Confidence Building",
        videoUrl: 'https://www.youtube.com/embed/rokGy0huYEA',
        tutor: { name: 'Sarah Joseph', image: 'https://placehold.co/100x100.png', dataAiHint: 'person portrait' },
        features: [
            'Improve your pronunciation and fluency',
            'Learn common idioms and phrases for daily conversation',
            'Practice speaking in a supportive environment',
            'Gain confidence for job interviews and meetings'
        ],
        duration: '10 hours',
        level: 'Beginner',
        curriculum: [
            { title: 'Module 1: Pronunciation & Fluency', duration: '4 hours' },
            { title: 'Module 2: Vocabulary for Professionals', duration: '3 hours' },
            { title: 'Module 3: Conversational Practice', duration: '3 hours' },
        ]
    },
    {
        id: 'interview-essentials',
        title: 'Interview Essentials',
        description: 'Learn the strategies to crack any job interview, from preparation to follow-up.',
        image: 'https://placehold.co/600x400.png',
        price: 199,
        dataAiHint: "job interview",
        domain: "Soft Skills",
        category: "Interview Prep",
        videoUrl: 'https://www.youtube.com/embed/rokGy0huYEA',
        tutor: { name: 'Rajesh Nair', image: 'https://placehold.co/100x100.png', dataAiHint: 'person portrait' },
        features: [
            'Learn to answer common interview questions',
            'Craft the perfect introduction ("Tell me about yourself")',
            'Understand how to negotiate your salary',
            'Master the art of the follow-up'
        ],
        duration: '6 hours',
        level: 'All Levels',
        curriculum: [
            { title: 'Module 1: Pre-interview Preparation', duration: '2 hours' },
            { title: 'Module 2: During the Interview', duration: '3 hours' },
            { title: 'Module 3: Post-interview Strategy', duration: '1 hour' },
        ]
    },
    {
        id: 'resume-writing-for-devs',
        title: 'Resume Writing for Developers',
        description: 'Craft a compelling resume that stands out to tech recruiters and lands you interviews.',
        image: 'https://placehold.co/600x400.png',
        price: 99,
        dataAiHint: "resume writing",
        domain: "Soft Skills",
        category: "Resume Writing",
        videoUrl: 'https://www.youtube.com/embed/rokGy0huYEA',
        tutor: { name: 'Divya Reddy', image: 'https://placehold.co/100x100.png', dataAiHint: 'person portrait' },
        features: [
            'Learn to format your resume for ATS systems',
            'Showcase your projects effectively',
            'Write a powerful summary and skills section',
            'Tailor your resume for specific job descriptions'
        ],
        duration: '4 hours',
        level: 'All Levels',
        curriculum: [
            { title: 'Module 1: Resume Formatting', duration: '1 hour' },
            { title: 'Module 2: Content that Sells', duration: '2 hours' },
            { title: 'Module 3: Tailoring and Review', duration: '1 hour' },
        ]
    },

    // UPSC
    {
        id: 'indian-polity-upsc',
        title: 'Indian Polity for UPSC',
        description: 'A comprehensive course on the Indian Constitution and political system for UPSC aspirants.',
        image: 'https://placehold.co/600x400.png',
        price: 599,
        dataAiHint: "indian constitution",
        domain: "UPSC",
        category: "Indian Polity",
        videoUrl: 'https://www.youtube.com/embed/rokGy0huYEA',
        tutor: { name: 'Dr. Ishaan Trivedi', image: 'https://placehold.co/100x100.png', dataAiHint: 'person portrait' },
        features: [
            'Master the Indian Constitution chapter-by-chapter',
            'Understand the functioning of the Indian government',
            'Analyze important Supreme Court judgments',
            'Score high in the Polity section of UPSC CSE'
        ],
        duration: '50 hours',
        level: 'Advanced',
        curriculum: [
            { title: 'Module 1: Constitutional Framework', duration: '15 hours' },
            { title: 'Module 2: System of Government', duration: '15 hours' },
            { title: 'Module 3: Constitutional & Non-Constitutional Bodies', duration: '10 hours' },
            { title: 'Module 4: Local Government & Special Provisions', duration: '10 hours' },
        ]
    },
    {
        id: 'geography-for-upsc',
        title: 'Geography for UPSC',
        description: 'Covers physical, Indian, and world geography as per the UPSC syllabus.',
        image: 'https://placehold.co/600x400.png',
        price: 599,
        dataAiHint: "topography map",
        domain: "UPSC",
        category: "Geography",
        videoUrl: 'https://www.youtube.com/embed/rokGy0huYEA',
        tutor: { name: 'Prof. Meera Iyer', image: 'https://placehold.co/100x100.png', dataAiHint: 'person portrait' },
        features: [
            'Understand key geographical concepts and phenomena',
            'Master Indian and World geography for Prelims and Mains',
            'Learn map-based questions and techniques',
            'Connect geography with current affairs and environment'
        ],
        duration: '45 hours',
        level: 'Advanced',
        curriculum: [
            { title: 'Module 1: Physical Geography', duration: '15 hours' },
            { title: 'Module 2: Indian Geography', duration: '15 hours' },
            { title: 'Module 3: World Geography', duration: '10 hours' },
            { title: 'Module 4: Map Work and Current Affairs', duration: '5 hours' },
        ]
    },

    // MBA Prep
    {
        id: 'cat-quant-aptitude',
        title: 'CAT Quant Aptitude',
        description: 'Master quantitative aptitude for the CAT exam with shortcuts, strategies, and extensive practice.',
        image: 'https://placehold.co/600x400.png',
        price: 499,
        dataAiHint: "mathematics graph",
        domain: "MBA Prep",
        category: "Quantitative Aptitude",
        videoUrl: 'https://www.youtube.com/embed/rokGy0huYEA',
        tutor: { name: 'Arjun Desai', image: 'https://placehold.co/100x100.png', dataAiHint: 'person portrait' },
        features: [
            'Learn shortcuts and tricks to solve problems faster',
            'Master all topics from Arithmetic to Geometry',
            'Solve past CAT papers and mock tests',
            'Develop a strategy to maximize your score'
        ],
        duration: '40 hours',
        level: 'Advanced',
        curriculum: [
            { title: 'Module 1: Arithmetic', duration: '15 hours' },
            { title: 'Module 2: Algebra & Geometry', duration: '15 hours' },
            { title: 'Module 3: Modern Math', duration: '5 hours' },
            { title: 'Module 4: Mock Tests & Analysis', duration: '5 hours' },
        ]
    },

    // Other existing courses
    {
        id: 'data-science-python',
        title: 'Data Science with Python',
        description: 'Learn data analysis, visualization, and machine learning with Python libraries like Pandas, NumPy, and Scikit-learn.',
        image: 'https://placehold.co/600x400.png',
        price: 599,
        dataAiHint: "data science",
        domain: "Computer Science",
        category: "AI & ML",
        videoUrl: 'https://www.youtube.com/embed/rokGy0huYEA',
        tutor: { name: 'Priya Singh', image: 'https://placehold.co/100x100.png', dataAiHint: 'person portrait' },
        features: [
            'Perform data analysis and manipulation with Pandas',
            'Create insightful visualizations with Matplotlib and Seaborn',
            'Build machine learning models with Scikit-learn',
            'Complete a real-world data science project'
        ],
        duration: '25 hours',
        level: 'Intermediate',
        curriculum: [
            { title: 'Module 1: Python for Data Science', duration: '5 hours' },
            { title: 'Module 2: Data Analysis with Pandas', duration: '8 hours' },
            { title: 'Module 3: Data Visualization', duration: '6 hours' },
            { title: 'Module 4: Machine Learning with Scikit-learn', duration: '6 hours' },
        ]
    },
    {
        id: 'digital-marketing-masterclass',
        title: 'Digital Marketing Masterclass',
        description: 'Master SEO, SEM, social media marketing, and content strategy to grow businesses online.',
        image: 'https://placehold.co/600x400.png',
        price: 499,
        dataAiHint: "digital marketing",
        domain: "Commerce",
        category: "Finance Tools",
        videoUrl: 'https://www.youtube.com/embed/rokGy0huYEA',
        tutor: { name: 'Vivek Malhotra', image: 'https://placehold.co/100x100.png', dataAiHint: 'person portrait' },
        features: [
            'Learn Search Engine Optimization (SEO) from basics',
            'Run profitable Google Ads (SEM) campaigns',
            'Master Social Media Marketing on major platforms',
            'Develop a comprehensive digital marketing strategy'
        ],
        duration: '22 hours',
        level: 'All Levels',
        curriculum: [
            { title: 'Module 1: SEO & Content Marketing', duration: '8 hours' },
            { title: 'Module 2: Social Media Marketing', duration: '6 hours' },
            { title: 'Module 3: Paid Advertising (SEM)', duration: '8 hours' },
        ]
    },
    {
        id: 'graphic-design-fundamentals',
        title: 'Graphic Design Fundamentals',
        description: 'Understand the principles of design, color theory, typography, and create stunning visuals using Adobe tools.',
        image: 'https://placehold.co/600x400.png',
        price: 549,
        dataAiHint: "graphic design",
        domain: "Arts & Humanities",
        category: "Communication",
        videoUrl: 'https://www.youtube.com/embed/rokGy0huYEA',
        tutor: { name: 'Elena Rodriguez', image: 'https://placehold.co/100x100.png', dataAiHint: 'person portrait' },
        features: [
            'Master the core principles of great design',
            'Understand color theory and typography',
            'Learn to use Adobe Photoshop and Illustrator',
            'Create a professional design portfolio'
        ],
        duration: '18 hours',
        level: 'Beginner',
        curriculum: [
            { title: 'Module 1: Design Principles', duration: '4 hours' },
            { title: 'Module 2: Adobe Photoshop for Beginners', duration: '7 hours' },
            { title: 'Module 3: Adobe Illustrator Essentials', duration: '7 hours' },
        ]
    },
    {
        id: 'project-management-pmp',
        title: 'Project Management Professional (PMP)',
        description: 'Prepare for the PMP certification exam. Learn about project lifecycles, risk management, and Agile methodologies.',
        image: 'https://placehold.co/600x400.png',
        price: 599,
        dataAiHint: "project plan",
        domain: "Soft Skills",
        category: "Professional Communication",
        videoUrl: 'https://www.youtube.com/embed/rokGy0huYEA',
        tutor: { name: 'David Lee', image: 'https://placehold.co/100x100.png', dataAiHint: 'person portrait' },
        features: [
            'Prepare and pass the PMP certification exam',
            'Master the PMBOK Guide and Agile principles',
            'Learn to manage projects, risks, and stakeholders',
            'Apply project management concepts to real-world scenarios'
        ],
        duration: '35 hours',
        level: 'Advanced',
        curriculum: [
            { title: 'Module 1: Project Management Framework', duration: '10 hours' },
            { title: 'Module 2: Process Groups', duration: '15 hours' },
            { title: 'Module 3: Agile Practice Guide', duration: '10 hours' },
        ]
    }
];
