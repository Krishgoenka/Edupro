
export type CourseSegment = {
  segmentId: string;
  title: string;
  description: string;
  duration: string;
  keywords: string[];
  price: number;
  isLocked?: boolean;
};

export type Course = {
  id: string;
  title:string;
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
  curriculum: CourseSegment[];
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
        image: 'https://img.youtube.com/vi/MsnQ5uepIaE/hqdefault.jpg',
        price: 499,
        dataAiHint: "laptop code",
        domain: "Computer Science",
        category: "Web Development",
        videoUrl: 'https://www.youtube.com/embed/MsnQ5uepIaE',
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
            { segmentId: 'wd-html-css', title: 'Module 1: HTML & CSS Basics', description: 'Learn the foundational building blocks of all websites.', duration: '4 hours', keywords: ['html', 'css', 'frontend basics'], price: 100 },
            { segmentId: 'wd-adv-css', title: 'Module 2: Advanced CSS & Flexbox', description: 'Create complex and responsive layouts with modern CSS.', duration: '4 hours', keywords: ['flexbox', 'grid', 'responsive design'], price: 100 },
            { segmentId: 'wd-js', title: 'Module 3: JavaScript Fundamentals', description: 'Bring your websites to life with programming logic.', duration: '6 hours', keywords: ['javascript', 'es6', 'dom manipulation'], price: 150 },
            { segmentId: 'wd-react', title: 'Module 4: React Deep Dive', description: 'Build powerful single-page applications with the most popular UI library.', duration: '6 hours', keywords: ['react', 'hooks', 'state management'], price: 150 },
            { segmentId: 'wd-node', title: 'Module 5: Backend with Node.js', description: 'Create servers and APIs to support your applications.', duration: '4 hours', keywords: ['node.js', 'express', 'api'], price: 100 },
        ]
    },
    {
        id: 'ai-a-z',
        title: 'Artificial Intelligence A-Z',
        description: 'Dive into the world of AI. Learn about machine learning, data science, and neural networks.',
        image: 'https://img.youtube.com/vi/5NgNicANyqM/hqdefault.jpg',
        price: 599,
        dataAiHint: "abstract AI",
        domain: "Computer Science",
        category: "AI & ML",
        videoUrl: 'https://www.youtube.com/embed/5NgNicANyqM',
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
            { segmentId: 'ai-intro', title: 'Module 1: Introduction to AI', description: 'Grasp the core concepts and history of Artificial Intelligence.', duration: '5 hours', keywords: ['ai concepts', 'machine learning overview'], price: 100 },
            { segmentId: 'ai-ml-models', title: 'Module 2: Machine Learning Models', description: 'Explore various supervised and unsupervised learning models.', duration: '10 hours', keywords: ['regression', 'classification', 'supervised learning'], price: 200 },
            { segmentId: 'ai-deep-learning', title: 'Module 3: Deep Learning & Neural Networks', description: 'Dive into the architecture of neural networks.', duration: '10 hours', keywords: ['neural networks', 'tensorflow', 'pytorch'], price: 250 },
            { segmentId: 'ai-chatbot-project', title: 'Module 4: Project - AI Chatbot', description: 'Apply your knowledge to build a real-world AI application.', duration: '5 hours', keywords: ['nlp', 'chatbot', 'project'], price: 150 },
        ]
    },
    {
        id: 'cyber-security-essentials',
        title: 'Cyber Security Essentials',
        description: 'Protect systems from digital attacks. Learn ethical hacking, cryptography, and network security.',
        image: 'https://img.youtube.com/vi/v3iUx2SNspY/hqdefault.jpg',
        price: 599,
        dataAiHint: "cyber security",
        domain: "Computer Science",
        category: "Cyber Security",
        videoUrl: 'https://www.youtube.com/embed/v3iUx2SNspY',
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
            { segmentId: 'cysec-intro', title: 'Module 1: Introduction to Cyber Security', description: 'Get an overview of the cyber security landscape and common threats.', duration: '4 hours', keywords: ['cyber security basics', 'threats'], price: 150 },
            { segmentId: 'cysec-network', title: 'Module 2: Network Security', description: 'Learn how to secure networks with firewalls, VPNs, and more.', duration: '6 hours', keywords: ['firewalls', 'vpn', 'network protocols'], price: 200 },
            { segmentId: 'cysec-hacking', title: 'Module 3: Ethical Hacking', description: 'Discover vulnerabilities and how to perform penetration testing.', duration: '6 hours', keywords: ['penetration testing', 'ethical hacking'], price: 200 },
            { segmentId: 'cysec-crypto', title: 'Module 4: Cryptography', description: 'Understand encryption and data protection techniques.', duration: '4 hours', keywords: ['encryption', 'cryptography'], price: 150 },
        ]
    },
    {
        id: 'dsa-in-c-plus-plus',
        title: 'DSA in C++',
        description: 'Master Data Structures and Algorithms using C++ for competitive programming and interviews.',
        image: 'https://img.youtube.com/vi/VTLCoHnyACE/hqdefault.jpg',
        price: 499,
        dataAiHint: "data structure",
        domain: "Computer Science",
        category: "Data Structures & Algorithms",
        videoUrl: 'https://www.youtube.com/embed/VTLCoHnyACE',
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
            { segmentId: 'dsa-arrays', title: 'Module 1: Arrays & Strings', description: 'Master the fundamentals of contiguous data structures.', duration: '5 hours', keywords: ['arrays', 'strings', 'pointers'], price: 100 },
            { segmentId: 'dsa-linear', title: 'Module 2: Linked Lists, Stacks & Queues', description: 'Understand linear data structures and their applications.', duration: '10 hours', keywords: ['linked lists', 'stacks', 'queues'], price: 150 },
            { segmentId: 'dsa-nonlinear', title: 'Module 3: Trees & Graphs', description: 'Dive deep into non-linear data structures for complex problem-solving.', duration: '15 hours', keywords: ['trees', 'graphs', 'bst'], price: 200 },
            { segmentId: 'dsa-adv-algo', title: 'Module 4: Advanced Algorithms', description: 'Learn advanced techniques like dynamic programming.', duration: '5 hours', keywords: ['dynamic programming', 'greedy algorithms'], price: 150 },
        ]
    },
    {
        id: 'sql-mastery',
        title: 'SQL Mastery: From Zero to Hero',
        description: 'Learn SQL for data analysis and database management. Covers everything from basic queries to advanced topics.',
        image: 'https://img.youtube.com/vi/SSKVgrwhzus/hqdefault.jpg',
        price: 399,
        dataAiHint: "database server",
        domain: "Computer Science",
        category: "Databases",
        videoUrl: 'https://www.youtube.com/embed/SSKVgrwhzus',
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
            { segmentId: 'sql-basics', title: 'Module 1: SQL Basics', description: 'Learn the foundational queries like SELECT, WHERE, and FROM.', duration: '3 hours', keywords: ['select', 'where', 'from'], price: 100 },
            { segmentId: 'sql-advanced', title: 'Module 2: Advanced Queries', description: 'Master complex queries with JOINs, subqueries, and more.', duration: '5 hours', keywords: ['joins', 'subqueries', 'group by'], price: 150 },
            { segmentId: 'sql-design', title: 'Module 3: Database Design', description: 'Understand database normalization and schema design.', duration: '4 hours', keywords: ['normalization', 'schemas'], price: 100 },
            { segmentId: 'sql-perf', title: 'Module 4: Performance Tuning', description: 'Learn how to optimize your queries for speed.', duration: '3 hours', keywords: ['indexing', 'query optimization'], price: 100 },
        ]
    },
     {
        id: 'operating-systems-concepts',
        title: 'Operating Systems Concepts',
        description: 'Understand the core concepts of operating systems, including processes, memory management, and file systems.',
        image: 'https://img.youtube.com/vi/yK1uBHPdp30/hqdefault.jpg',
        price: 499,
        dataAiHint: "computer chip",
        domain: "Computer Science",
        category: "Operating Systems",
        videoUrl: 'https://www.youtube.com/embed/yK1uBHPdp30',
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
            { segmentId: 'os-intro', title: 'Module 1: Introduction to OS', description: 'Learn the basic components and function of an OS.', duration: '3 hours', keywords: ['os basics', 'kernel'], price: 100 },
            { segmentId: 'os-process', title: 'Module 2: Process Management', description: 'Dive into processes, threads, and CPU scheduling.', duration: '6 hours', keywords: ['processes', 'threads', 'scheduling'], price: 150 },
            { segmentId: 'os-memory', title: 'Module 3: Memory Management', description: 'Understand virtual memory, paging, and segmentation.', duration: '5 hours', keywords: ['virtual memory', 'paging'], price: 150 },
            { segmentId: 'os-files', title: 'Module 4: File Systems', description: 'Explore how data is stored and retrieved from storage.', duration: '4 hours', keywords: ['file systems', 'storage'], price: 100 },
        ]
    },

    // Commerce
    {
        id: 'accounting-basics',
        title: 'Accounting Basics',
        description: 'Learn the fundamentals of accounting, including debits, credits, and financial statements.',
        image: 'https://img.youtube.com/vi/FYFOKjYMXVw/hqdefault.jpg',
        price: 299,
        dataAiHint: "calculator paperwork",
        domain: "Commerce",
        category: "Accounting",
        videoUrl: 'https://www.youtube.com/embed/FYFOKjYMXVw',
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
            { segmentId: 'acc-intro', title: 'Module 1: Introduction to Accounting', description: 'Learn the basic principles and the accounting equation.', duration: '3 hours', keywords: ['accounting principles', 'debits', 'credits'], price: 100 },
            { segmentId: 'acc-journal', title: 'Module 2: Journal & Ledger', description: 'Master the art of recording transactions.', duration: '4 hours', keywords: ['journal entries', 't-accounts'], price: 100 },
            { segmentId: 'acc-statements', title: 'Module 3: Financial Statements', description: 'Learn to prepare and interpret key financial reports like the balance sheet.', duration: '5 hours', keywords: ['balance sheet', 'income statement', 'financial statement'], price: 150 },
        ]
    },
    {
        id: 'taxation-simplified',
        title: 'Taxation Simplified',
        description: 'Understand the basics of Indian taxation, including income tax and GST for individuals and businesses.',
        image: 'https://img.youtube.com/vi/Cox8rLXYAGQ/hqdefault.jpg',
        price: 399,
        dataAiHint: "tax calculation",
        domain: "Commerce",
        category: "Taxation",
        videoUrl: 'https://www.youtube.com/embed/Cox8rLXYAGQ',
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
            { segmentId: 'tax-income', title: 'Module 1: Income Tax Basics', description: 'Learn about tax slabs, deductions, and different heads of income.', duration: '6 hours', keywords: ['income tax', 'slabs', 'deductions'], price: 150 },
            { segmentId: 'tax-itr', title: 'Module 2: Filing ITR', description: 'A step-by-step guide to filing your income tax return.', duration: '4 hours', keywords: ['itr filing', 'tax forms'], price: 100 },
            { segmentId: 'tax-gst', title: 'Module 3: Introduction to GST', description: 'Understand the Goods and Services Tax framework in India.', duration: '6 hours', keywords: ['gst', 'goods and services tax'], price: 150 },
        ]
    },
    {
        id: 'excel-for-finance',
        title: 'Excel for Finance',
        description: 'Master financial modeling and data analysis in Excel. Essential skills for any commerce professional.',
        image: 'https://img.youtube.com/vi/hkybRW7Z3Yk/hqdefault.jpg',
        price: 499,
        dataAiHint: "finance spreadsheet",
        domain: "Commerce",
        category: "Finance Tools",
        videoUrl: 'https://www.youtube.com/embed/hkybRW7Z3Yk',
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
            { segmentId: 'excel-adv', title: 'Module 1: Advanced Excel Functions', description: 'Master functions like VLOOKUP, INDEX-MATCH, and Pivot Tables.', duration: '5 hours', keywords: ['vlookup', 'pivot tables', 'index match'], price: 150 },
            { segmentId: 'excel-fm', title: 'Module 2: Financial Modeling', description: 'Learn to build robust financial models for forecasting and valuation.', duration: '8 hours', keywords: ['financial modeling', 'forecasting'], price: 200 },
            { segmentId: 'excel-viz', title: 'Module 3: Data Visualization', description: 'Create compelling charts and interactive dashboards.', duration: '4 hours', keywords: ['charts', 'dashboards'], price: 100 },
            { segmentId: 'excel-vba', title: 'Module 4: VBA for Finance', description: 'Automate repetitive financial tasks using VBA macros.', duration: '3 hours', keywords: ['vba', 'macros'], price: 100 },
        ]
    },
    {
        id: 'business-law-101',
        title: 'Business Law 101',
        description: 'Get introduced to the legal aspects of business, including contracts, company law, and intellectual property.',
        image: 'https://img.youtube.com/vi/O8_7Fiu-OKI/hqdefault.jpg',
        price: 299,
        dataAiHint: "law books",
        domain: "Commerce",
        category: "Business Law",
        videoUrl: 'https://www.youtube.com/embed/O8_7Fiu-OKI',
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
            { segmentId: 'law-contract', title: 'Module 1: Contract Law', description: 'Learn the essentials of forming a valid contract.', duration: '4 hours', keywords: ['contracts', 'indian contract act'], price: 100 },
            { segmentId: 'law-company', title: 'Module 2: Company Law', description: 'Understand the legal framework for starting and running a company.', duration: '4 hours', keywords: ['company law', 'incorporation'], price: 100 },
            { segmentId: 'law-ip', title: 'Module 3: Intellectual Property', description: 'Learn how to protect your ideas with patents, trademarks, and copyright.', duration: '2 hours', keywords: ['patents', 'trademarks', 'copyright'], price: 100 },
        ]
    },
    
    // Arts & Humanities / Soft Skills
    {
        id: 'public-speaking-mastery',
        title: 'Public Speaking Mastery',
        description: 'Boost your confidence and communication skills. Learn to deliver powerful presentations.',
        image: 'https://img.youtube.com/vi/dHAbmoFHqgA/hqdefault.jpg',
        price: 499,
        dataAiHint: "public speaking",
        domain: "Arts & Humanities",
        category: "Public Speaking",
        videoUrl: 'https://www.youtube.com/embed/dHAbmoFHqgA',
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
            { segmentId: 'psm-confidence', title: 'Module 1: Building Confidence', description: 'Techniques to overcome anxiety and project confidence.', duration: '2 hours', keywords: ['public speaking confidence', 'stage fright'], price: 200 },
            { segmentId: 'psm-structure', title: 'Module 2: Structuring Your Speech', description: 'Learn how to create a compelling narrative for your talk.', duration: '3 hours', keywords: ['speech writing', 'presentation structure'], price: 150 },
            { segmentId: 'psm-delivery', title: 'Module 3: Delivery Techniques', description: 'Master voice modulation, pacing, and body language.', duration: '3 hours', keywords: ['body language', 'voice modulation'], price: 150 },
        ]
    },
     {
        id: 'english-confidence-booster',
        title: 'English Confidence Booster',
        description: 'Improve your spoken English and build confidence for interviews and professional settings.',
        image: 'https://img.youtube.com/vi/qlqsh5cmt1I/hqdefault.jpg',
        price: 299,
        dataAiHint: "conversation class",
        domain: "Soft Skills",
        category: "Confidence Building",
        videoUrl: 'https://www.youtube.com/embed/qlqsh5cmt1I',
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
            { segmentId: 'eng-pronunciation', title: 'Module 1: Pronunciation & Fluency', description: 'Work on common pronunciation errors and improve your speaking flow.', duration: '4 hours', keywords: ['english pronunciation', 'fluency'], price: 100 },
            { segmentId: 'eng-vocab', title: 'Module 2: Vocabulary for Professionals', description: 'Learn essential business English vocabulary.', duration: '3 hours', keywords: ['business english', 'vocabulary'], price: 100 },
            { segmentId: 'eng-convo', title: 'Module 3: Conversational Practice', description: 'Engage in guided conversations to build real-world confidence.', duration: '3 hours', keywords: ['spoken english', 'english speaking', 'english confidence'], price: 100 },
        ]
    },
    {
        id: 'interview-essentials',
        title: 'Interview Essentials',
        description: 'Learn the strategies to crack any job interview, from preparation to follow-up.',
        image: 'https://img.youtube.com/vi/Ji46s5BHdr0/hqdefault.jpg',
        price: 199,
        dataAiHint: "job interview",
        domain: "Soft Skills",
        category: "Interview Prep",
        videoUrl: 'https://www.youtube.com/embed/Ji46s5BHdr0',
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
            { segmentId: 'int-prep', title: 'Module 1: Pre-interview Preparation', description: 'Learn how to research a company and prepare for common questions.', duration: '2 hours', keywords: ['interview prep', 'researching company'], price: 70 },
            { segmentId: 'int-during', title: 'Module 2: During the Interview', description: 'Master the STAR method for behavioral questions.', duration: '3 hours', keywords: ['answering questions', 'star method'], price: 100 },
            { segmentId: 'int-post', title: 'Module 3: Post-interview Strategy', description: 'Learn how to write effective thank-you notes and negotiate salary.', duration: '1 hour', keywords: ['follow up', 'salary negotiation'], price: 50 },
        ]
    },
    {
        id: 'resume-writing-for-devs',
        title: 'Resume Writing for Developers',
        description: 'Craft a compelling resume that stands out to tech recruiters and lands you interviews.',
        image: 'https://img.youtube.com/vi/RYMTn-V_LV8/hqdefault.jpg',
        price: 99,
        dataAiHint: "resume writing",
        domain: "Soft Skills",
        category: "Resume Writing",
        videoUrl: 'https://www.youtube.com/embed/RYMTn-V_LV8',
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
            { segmentId: 'res-format', title: 'Module 1: Resume Formatting', description: 'Create a clean, professional, and ATS-friendly resume format.', duration: '1 hour', keywords: ['resume format', 'ats'], price: 40 },
            { segmentId: 'res-content', title: 'Module 2: Content that Sells', description: 'Learn to write compelling descriptions of your projects and experience.', duration: '2 hours', keywords: ['resume writing', 'projects section'], price: 40 },
            { segmentId: 'res-tailor', title: 'Module 3: Tailoring and Review', description: 'Customize your resume for each job application for maximum impact.', duration: '1 hour', keywords: ['customizing resume', 'resume review'], price: 20 },
        ]
    },

    // UPSC
    {
        id: 'indian-polity-upsc',
        title: 'Indian Polity for UPSC',
        description: 'A comprehensive course on the Indian Constitution and political system for UPSC aspirants.',
        image: 'https://img.youtube.com/vi/oIN7FBZjqGI/hqdefault.jpg',
        price: 599,
        dataAiHint: "indian constitution",
        domain: "UPSC",
        category: "Indian Polity",
        videoUrl: 'https://www.youtube.com/embed/oIN7FBZjqGI',
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
            { segmentId: 'pol-framework', title: 'Module 1: Constitutional Framework', description: 'Covering the Preamble, Fundamental Rights, DPSP, and more.', duration: '15 hours', keywords: ['constitution', 'preamble', 'fundamental rights'], price: 200 },
            { segmentId: 'pol-gov', title: 'Module 2: System of Government', description: 'An in-depth look at the Legislature, Executive, and Judiciary.', duration: '15 hours', keywords: ['parliament', 'judiciary', 'executive'], price: 200 },
            { segmentId: 'pol-bodies', title: 'Module 3: Constitutional & Non-Constitutional Bodies', description: 'Understand the roles of the ECI, CAG, NITI Aayog, etc.', duration: '10 hours', keywords: ['election commission', 'cag', 'attorney general'], price: 150 },
            { segmentId: 'pol-local', title: 'Module 4: Local Government & Special Provisions', description: 'Covering Panchayati Raj, Municipalities, and special status states.', duration: '10 hours', keywords: ['panchayati raj', 'municipalities'], price: 150 },
        ]
    },
    {
        id: 'geography-for-upsc',
        title: 'Geography for UPSC',
        description: 'Covers physical, Indian, and world geography as per the UPSC syllabus.',
        image: 'https://img.youtube.com/vi/e_ichQiWMQs/hqdefault.jpg',
        price: 599,
        dataAiHint: "topography map",
        domain: "UPSC",
        category: "Geography",
        videoUrl: 'https://www.youtube.com/embed/e_ichQiWMQs',
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
            { segmentId: 'geo-physical', title: 'Module 1: Physical Geography', description: 'Covers Geomorphology, Climatology, and Oceanography.', duration: '15 hours', keywords: ['geomorphology', 'climatology', 'oceanography'], price: 200 },
            { segmentId: 'geo-indian', title: 'Module 2: Indian Geography', description: 'A detailed study of the physical and human geography of India.', duration: '15 hours', keywords: ['indian geography', 'monsoon', 'rivers'], price: 200 },
            { segmentId: 'geo-world', title: 'Module 3: World Geography', description: 'Explore the geography of continents and important regions.', duration: '10 hours', keywords: ['world geography', 'continents'], price: 150 },
            { segmentId: 'geo-map', title: 'Module 4: Map Work and Current Affairs', description: 'Practice map-based questions and link geography to current events.', duration: '5 hours', keywords: ['map work', 'current events geography'], price: 100 },
        ]
    },

    // MBA Prep
    {
        id: 'cat-quant-aptitude',
        title: 'CAT Quant Aptitude',
        description: 'Master quantitative aptitude for the CAT exam with shortcuts, strategies, and extensive practice.',
        image: 'https://img.youtube.com/vi/5O6ZnVoqwl4/hqdefault.jpg',
        price: 499,
        dataAiHint: "mathematics graph",
        domain: "MBA Prep",
        category: "Quantitative Aptitude",
        videoUrl: 'https://www.youtube.com/embed/5O6ZnVoqwl4',
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
            { segmentId: 'cat-arithmetic', title: 'Module 1: Arithmetic', description: 'Deep dive into percentages, profit & loss, time & work, etc.', duration: '15 hours', keywords: ['percentages', 'profit and loss', 'time and work'], price: 200 },
            { segmentId: 'cat-algebra', title: 'Module 2: Algebra & Geometry', description: 'Master equations, inequalities, and geometric concepts.', duration: '15 hours', keywords: ['algebra', 'geometry', 'mensuration'], price: 200 },
            { segmentId: 'cat-modern-math', title: 'Module 3: Modern Math', description: 'Tackle permutation, combination, and probability questions.', duration: '5 hours', keywords: ['permutation', 'combination', 'probability'], price: 100 },
            { segmentId: 'cat-mocks', title: 'Module 4: Mock Tests & Analysis', description: 'Practice with full-length mocks and learn from detailed analysis.', duration: '5 hours', keywords: ['mock tests', 'cat exam strategy'], price: 100 },
        ]
    },

    // Other existing courses
    {
        id: 'data-science-python',
        title: 'Data Science with Python',
        description: 'Learn data analysis, visualization, and machine learning with Python libraries like Pandas, NumPy, and Scikit-learn.',
        image: 'https://img.youtube.com/vi/Q4ap8MXd4T4/hqdefault.jpg',
        price: 599,
        dataAiHint: "data science",
        domain: "Computer Science",
        category: "AI & ML",
        videoUrl: 'https://www.youtube.com/embed/Q4ap8MXd4T4',
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
            { segmentId: 'ds-python', title: 'Module 1: Python for Data Science', description: 'Get up to speed with Python, NumPy, and Pandas.', duration: '5 hours', keywords: ['python basics', 'numpy', 'pandas'], price: 150 },
            { segmentId: 'ds-analysis', title: 'Module 2: Data Analysis with Pandas', description: 'Learn to clean, transform, and analyze datasets.', duration: '8 hours', keywords: ['data cleaning', 'data manipulation', 'pandas'], price: 200 },
            { segmentId: 'ds-viz', title: 'Module 3: Data Visualization', description: 'Create beautiful and informative plots with Matplotlib and Seaborn.', duration: '6 hours', keywords: ['matplotlib', 'seaborn', 'plotting'], price: 150 },
            { segmentId: 'ds-ml', title: 'Module 4: Machine Learning with Scikit-learn', description: 'Build and evaluate predictive models.', duration: '6 hours', keywords: ['scikit-learn', 'machine learning models'], price: 150 },
        ]
    },
    {
        id: 'digital-marketing-masterclass',
        title: 'Digital Marketing Masterclass with AI',
        description: 'Master SEO, SEM, social media marketing, and content strategy to grow businesses online.',
        image: 'https://img.youtube.com/vi/kunkYTKFNtI/hqdefault.jpg',
        price: 499,
        dataAiHint: "digital marketing",
        domain: "Commerce",
        category: "Finance Tools",
        videoUrl: 'https://www.youtube.com/embed/kunkYTKFNtI',
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
            { segmentId: 'dm-seo', title: 'Module 1: SEO & Content Marketing', description: 'Learn how to rank higher on Google and create engaging content.', duration: '8 hours', keywords: ['seo', 'content marketing', 'keywords'], price: 200 },
            { segmentId: 'dm-smm', title: 'Module 2: Social Media Marketing', description: 'Build and manage successful campaigns on Facebook, Instagram, etc.', duration: '6 hours', keywords: ['social media', 'facebook marketing', 'instagram marketing'], price: 150 },
            { segmentId: 'dm-sem', title: 'Module 3: Paid Advertising (SEM)', description: 'Master Google Ads to drive targeted traffic.', duration: '8 hours', keywords: ['google ads', 'ppc', 'sem'], price: 200 },
        ]
    },
    {
        id: 'graphic-design-fundamentals',
        title: 'Graphic Design Fundamentals',
        description: 'Understand the principles of design, color theory, typography, and create stunning visuals using Adobe tools.',
        image: 'https://img.youtube.com/vi/e_dv7GBHka8/hqdefault.jpg',
        price: 549,
        dataAiHint: "graphic design",
        domain: "Arts & Humanities",
        category: "Communication",
        videoUrl: 'https://www.youtube.com/embed/e_dv7GBHka8',
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
            { segmentId: 'gd-principles', title: 'Module 1: Design Principles', description: 'Learn about balance, contrast, hierarchy, and other core principles.', duration: '4 hours', keywords: ['design principles', 'color theory', 'typography'], price: 150 },
            { segmentId: 'gd-photoshop', title: 'Module 2: Adobe Photoshop for Beginners', description: 'Get started with the industry-standard tool for photo editing.', duration: '7 hours', keywords: ['photoshop', 'photo editing'], price: 200 },
            { segmentId: 'gd-illustrator', title: 'Module 3: Adobe Illustrator Essentials', description: 'Learn to create vector graphics and illustrations.', duration: '7 hours', keywords: ['illustrator', 'vector graphics'], price: 200 },
        ]
    },
    {
        id: 'project-management-pmp',
        title: 'Project Management Professional (PMP)',
        description: 'Prepare for the PMP certification exam. Learn about project lifecycles, risk management, and Agile methodologies.',
        image: 'https://img.youtube.com/vi/vzqDTSZOTic/hqdefault.jpg',
        price: 599,
        dataAiHint: "project plan",
        domain: "Soft Skills",
        category: "Professional Communication",
        videoUrl: 'https://www.youtube.com/embed/vzqDTSZOTic',
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
            { segmentId: 'pmp-framework', title: 'Module 1: Project Management Framework', description: 'Understand the core concepts and lifecycle of a project.', duration: '10 hours', keywords: ['pmp', 'pmbok', 'project lifecycle'], price: 200 },
            { segmentId: 'pmp-process', title: 'Module 2: Process Groups', description: 'A deep dive into the 5 process groups: Initiating, Planning, Executing, Monitoring & Controlling, and Closing.', duration: '15 hours', keywords: ['initiating', 'planning', 'executing', 'monitoring', 'closing'], price: 250 },
            { segmentId: 'pmp-agile', title: 'Module 3: Agile Practice Guide', description: 'Learn Agile principles and how they are applied in project management.', duration: '10 hours', keywords: ['agile', 'scrum', 'kanban'], price: 200 },
        ]
    }
];
