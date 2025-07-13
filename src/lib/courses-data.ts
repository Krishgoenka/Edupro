
export type SubTopic = {
  segmentId: string;
  title: string;
  description: string;
  duration: string;
  keywords: string[];
  price: number;
};

export type CourseSegment = {
  title: string;
  duration: string;
  subTopics: SubTopic[];
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
            {
                title: 'HTML & CSS Foundations',
                duration: '6 hours',
                subTopics: [
                    { segmentId: 'wd-html-structure', title: 'HTML5: Page Structure & Semantics', description: 'Learn to build a well-structured and accessible webpage using semantic HTML tags.', duration: '2 hours', keywords: ['html', 'semantic html', 'web structure'], price: 30 },
                    { segmentId: 'wd-css-basics', title: 'CSS Basics: Selectors & Box Model', description: 'Style your websites by understanding selectors, colors, typography, and the CSS box model.', duration: '2 hours', keywords: ['css', 'selectors', 'box model', 'styling'], price: 30 },
                    { segmentId: 'wd-flex-grid', title: 'Advanced CSS: Flexbox & Grid', description: 'Master modern layout techniques with Flexbox for 1D layouts and CSS Grid for 2D layouts.', duration: '2 hours', keywords: ['flexbox', 'css grid', 'responsive design'], price: 40 },
                ]
            },
            {
                title: 'JavaScript Fundamentals',
                duration: '8 hours',
                subTopics: [
                     { segmentId: 'wd-js-vars', title: 'JavaScript Variables & Data Types', description: 'Start your JS journey by learning about variables, primitive and complex data types.', duration: '2 hours', keywords: ['javascript', 'variables', 'data types'], price: 40 },
                    { segmentId: 'wd-js-logic', title: 'Logic & Control Flow', description: 'Learn to make decisions in your code using conditional statements and loops.', duration: '2 hours', keywords: ['if else', 'loops', 'control flow'], price: 40 },
                    { segmentId: 'wd-js-functions', title: 'Functions & Scope', description: 'Understand how to write reusable code blocks with functions and the concept of scope.', duration: '2 hours', keywords: ['functions', 'scope', 'es6'], price: 40 },
                    { segmentId: 'wd-js-dom', title: 'DOM Manipulation', description: 'Bring your websites to life by interacting with HTML elements using JavaScript.', duration: '2 hours', keywords: ['dom', 'document object model', 'events'], price: 50 },
                ]
            },
            {
                title: 'React & Backend Development',
                duration: '10 hours',
                subTopics: [
                    { segmentId: 'wd-react-intro', title: 'Introduction to React & JSX', description: 'Set up your first React app and understand the power of components and JSX syntax.', duration: '2 hours', keywords: ['react', 'jsx', 'create-react-app'], price: 50 },
                    { segmentId: 'wd-react-props-state', title: 'Props, State & Hooks', description: 'Build dynamic UIs by managing component state with useState and passing data with props.', duration: '4 hours', keywords: ['props', 'state', 'hooks', 'useState'], price: 75 },
                    { segmentId: 'wd-node-express', title: 'Backend with Node.js & Express', description: 'Create servers, routes, and RESTful APIs to support your applications.', duration: '4 hours', keywords: ['node.js', 'express', 'api', 'backend'], price: 75 }
                ]
            }
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
            {
                title: 'Foundations of Machine Learning',
                duration: '10 hours',
                subTopics: [
                    { segmentId: 'ai-intro', title: 'The Intuition Behind AI', description: 'Grasp the core concepts, history, and different types of Artificial Intelligence.', duration: '2 hours', keywords: ['ai concepts', 'machine learning overview', 'types of ai'], price: 60 },
                    { segmentId: 'ai-data-processing', title: 'Data Preprocessing for ML', description: 'Learn the crucial steps of cleaning and preparing data for machine learning models.', duration: '4 hours', keywords: ['data cleaning', 'feature scaling', 'data preprocessing'], price: 75 },
                    { segmentId: 'ai-regression', title: 'Regression Models', description: 'Explore various supervised learning models for predicting continuous values, like house prices.', duration: '4 hours', keywords: ['linear regression', 'polynomial regression', 'supervised learning'], price: 75 }
                ]
            },
            {
                title: 'Advanced Models & Deep Learning',
                duration: '15 hours',
                subTopics: [
                    { segmentId: 'ai-classification', title: 'Classification Models', description: 'Learn models like Logistic Regression, K-NN, and SVM for predicting categories.', duration: '5 hours', keywords: ['classification', 'logistic regression', 'svm'], price: 80 },
                    { segmentId: 'ai-clustering', title: 'Clustering with K-Means', description: 'Understand unsupervised learning by grouping unlabeled data with K-Means algorithm.', duration: '3 hours', keywords: ['clustering', 'unsupervised learning', 'k-means'], price: 70 },
                    { segmentId: 'ai-deep-learning-intro', title: 'Introduction to Neural Networks', description: 'Dive into the architecture of Artificial Neural Networks (ANNs) and build your first one.', duration: '4 hours', keywords: ['ann', 'neural networks', 'neurons', 'tensorflow'], price: 80 },
                    { segmentId: 'ai-cnn', title: 'Convolutional Neural Networks (CNNs)', description: 'Understand the architecture of CNNs, used for image recognition and computer vision tasks.', duration: '3 hours', keywords: ['cnn', 'computer vision', 'image recognition'], price: 80 }
                ]
            },
            {
                title: 'Practical Application',
                duration: '5 hours',
                subTopics: [
                    { segmentId: 'ai-chatbot-project', title: 'Project - AI Chatbot', description: 'Apply your knowledge to build a real-world AI application using Natural Language Processing.', duration: '5 hours', keywords: ['nlp', 'chatbot', 'project', 'natural language processing'], price: 100 }
                ]
            }
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
            {
                title: 'Core Security Concepts',
                duration: '10 hours',
                subTopics: [
                    { segmentId: 'cysec-intro', title: 'Foundations of Cyber Security', description: 'Get an overview of the cyber security landscape, common threats (malware, phishing), and attack vectors.', duration: '3 hours', keywords: ['cyber security basics', 'threats', 'malware', 'phishing'], price: 90 },
                    { segmentId: 'cysec-network', title: 'Network Security Principles', description: 'Learn to secure networks with firewalls, VPNs, and secure protocols like HTTPS and SSH.', duration: '4 hours', keywords: ['firewalls', 'vpn', 'network protocols', 'https'], price: 120 },
                    { segmentId: 'cysec-detection', title: 'Intrusion Detection & Prevention', description: 'Understand how Intrusion Detection Systems (IDS) and Intrusion Prevention Systems (IPS) work.', duration: '3 hours', keywords: ['ids', 'ips', 'intrusion detection'], price: 90 }
                ]
            },
            {
                title: 'Offensive and Defensive Security',
                duration: '10 hours',
                subTopics: [
                    { segmentId: 'cysec-hacking', title: 'Ethical Hacking & Pen Testing', description: 'Discover vulnerabilities and how to perform penetration testing on systems and networks.', duration: '5 hours', keywords: ['penetration testing', 'ethical hacking', 'vulnerability assessment', 'kali linux'], price: 150 },
                    { segmentId: 'cysec-crypto', title: 'Cryptography and Data Protection', description: 'Understand encryption algorithms (symmetric vs asymmetric), hashing, and digital signatures.', duration: '5 hours', keywords: ['encryption', 'cryptography', 'public key infrastructure', 'hashing'], price: 150 }
                ]
            }
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
            {
                title: 'Basics & Sorting/Searching',
                duration: '15 hours',
                subTopics: [
                    { segmentId: 'dsa-complexity', title: 'Complexity Analysis', description: 'Understand Big O, Big Omega, and Big Theta notations for analyzing algorithm efficiency.', duration: '3 hours', keywords: ['big o', 'time complexity', 'space complexity'], price: 50 },
                    { segmentId: 'dsa-arrays', title: 'Arrays, Strings & Pointers', description: 'Master the fundamentals of contiguous data structures and memory management in C++.', duration: '4 hours', keywords: ['arrays', 'strings', 'pointers', 'c++'], price: 60 },
                    { segmentId: 'dsa-recursion', title: 'Recursion and Backtracking', description: 'Learn the art of solving problems by breaking them down into smaller, self-similar problems.', duration: '4 hours', keywords: ['recursion', 'backtracking'], price: 60 },
                    { segmentId: 'dsa-sorting-searching', title: 'Sorting & Searching Algorithms', description: 'Learn Bubble Sort, Merge Sort, Quick Sort, Binary Search, and more.', duration: '4 hours', keywords: ['sorting', 'searching', 'binary search', 'quick sort'], price: 70 }
                ]
            },
            {
                title: 'Linear & Non-Linear Structures',
                duration: '15 hours',
                subTopics: [
                    { segmentId: 'dsa-linear', title: 'Linked Lists, Stacks & Queues', description: 'Understand linear data structures, their variations (doubly, circular), and their practical applications.', duration: '6 hours', keywords: ['linked lists', 'stacks', 'queues'], price: 80 },
                    { segmentId: 'dsa-trees', title: 'Trees (General, Binary, BST)', description: 'Dive deep into tree data structures, including traversals (Inorder, Preorder, Postorder).', duration: '5 hours', keywords: ['trees', 'binary search tree', 'bst', 'traversals'], price: 80 },
                    { segmentId: 'dsa-heaps-graphs', title: 'Heaps & Graphs', description: 'Learn about Heaps (Priority Queues) and Graph representations and traversals (BFS, DFS).', duration: '4 hours', keywords: ['graphs', 'bfs', 'dfs', 'heaps', 'priority queue'], price: 80 }
                ]
            },
            {
                title: 'Advanced Algorithms',
                duration: '5 hours',
                subTopics: [
                    { segmentId: 'dsa-adv-algo', title: 'Dynamic Programming', description: 'Learn advanced techniques like DP and Greedy Algorithms to solve complex problems.', duration: '5 hours', keywords: ['dynamic programming', 'greedy algorithms', 'dp'], price: 100 }
                ]
            }
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
            {
                title: 'Querying Fundamentals',
                duration: '7 hours',
                subTopics: [
                    { segmentId: 'sql-basics', title: 'SQL Fundamentals (SELECT, WHERE)', description: 'Learn foundational queries like SELECT, WHERE, FROM, and basic operators.', duration: '2 hours', keywords: ['select', 'where', 'from', 'sql basics'], price: 50 },
                    { segmentId: 'sql-aggregate', title: 'Aggregate Functions (COUNT, SUM)', description: 'Learn to perform calculations on sets of data using COUNT, SUM, AVG, MIN, MAX.', duration: '2 hours', keywords: ['count', 'sum', 'aggregate functions'], price: 60 },
                    { segmentId: 'sql-joins', title: 'Joining Tables', description: 'Master various types of JOINs (INNER, LEFT, RIGHT, FULL) to combine data.', duration: '3 hours', keywords: ['joins', 'inner join', 'left join', 'relational data'], price: 80 }
                ]
            },
            {
                title: 'Advanced Data Analysis',
                duration: '8 hours',
                subTopics: [
                    { segmentId: 'sql-advanced-query', title: 'Advanced Queries & Subqueries', description: 'Utilize GROUP BY, HAVING, subqueries, and common table expressions (CTEs).', duration: '4 hours', keywords: ['group by', 'subqueries', 'cte', 'having'], price: 100 },
                    { segmentId: 'sql-window', title: 'Window Functions', description: 'Learn powerful window functions like RANK(), DENSE_RANK(), LEAD(), and LAG() for complex analytical queries.', duration: '4 hours', keywords: ['window functions', 'rank', 'lead', 'lag', 'analytical sql'], price: 120 }
                ]
            }
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
            {
                title: 'Core Concepts & Processes',
                duration: '9 hours',
                subTopics: [
                    { segmentId: 'os-intro', title: 'Introduction to Operating Systems', description: 'Learn the basic components, structure (monolithic, microkernel), and function of an OS.', duration: '2 hours', keywords: ['os basics', 'kernel', 'system calls'], price: 60 },
                    { segmentId: 'os-process', title: 'Process & Thread Management', description: 'Dive into process states, process control blocks (PCB), and threads.', duration: '3 hours', keywords: ['processes', 'threads', 'pcb'], price: 80 },
                    { segmentId: 'os-scheduling', title: 'CPU Scheduling Algorithms', description: 'Understand FCFS, SJF, Priority Scheduling, and Round Robin algorithms.', duration: '4 hours', keywords: ['scheduling', 'cpu scheduling', 'gantt chart'], price: 90 }
                ]
            },
            {
                title: 'Synchronization & Memory',
                duration: '9 hours',
                subTopics: [
                    { segmentId: 'os-sync', title: 'Process Synchronization & Deadlocks', description: 'Understand concurrency issues, the critical section problem, and solve them using semaphores and mutexes.', duration: '4 hours', keywords: ['synchronization', 'deadlock', 'semaphores', 'mutex'], price: 100 },
                    { segmentId: 'os-memory', title: 'Memory Management', description: 'Learn about contiguous memory allocation, paging, and segmentation.', duration: '3 hours', keywords: ['memory management', 'paging', 'segmentation'], price: 80 },
                    { segmentId: 'os-virtual-memory', title: 'Virtual Memory', description: 'Grasp the concepts of demand paging and page replacement algorithms (FIFO, LRU).', duration: '2 hours', keywords: ['virtual memory', 'demand paging', 'page replacement'], price: 80 }
                ]
            }
        ]
    },

    // Commerce
    {
        id: 'accounting-basics',
        title: 'Financial Accounting Fundamentals',
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
            {
                title: 'The Accounting Cycle',
                duration: '7 hours',
                subTopics: [
                    { segmentId: 'acc-intro', title: 'Introduction to Accounting', description: 'Learn the basic principles (GAAP), the accounting equation, and types of accounts.', duration: '2 hours', keywords: ['accounting principles', 'gaap', 'accounting equation'], price: 50 },
                    { segmentId: 'acc-journal', title: 'Recording Transactions (Journal & Ledger)', description: 'Master the process of analyzing transactions and creating journal entries, then posting to ledger accounts.', duration: '3 hours', keywords: ['journal entries', 't-accounts', 'ledger', 'debits and credits'], price: 60 },
                    { segmentId: 'acc-trial-balance', title: 'Preparing the Trial Balance', description: 'Learn how to prepare a trial balance to check the arithmetic accuracy of the ledger.', duration: '2 hours', keywords: ['trial balance', 'adjusting entries'], price: 50 }
                ]
            },
            {
                title: 'Financial Reporting',
                duration: '5 hours',
                subTopics: [
                    { segmentId: 'acc-statements', title: 'Preparing Financial Statements', description: 'Learn to prepare the Income Statement, Balance Sheet, and Statement of Retained Earnings.', duration: '5 hours', keywords: ['balance sheet', 'income statement', 'financial statement', 'financial reporting'], price: 140 }
                ]
            }
        ]
    },
    {
        id: 'taxation-simplified',
        title: 'Indian Taxation Simplified',
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
            {
                title: 'Direct Taxes (Income Tax)',
                duration: '10 hours',
                subTopics: [
                    { segmentId: 'tax-income-heads', title: 'The 5 Heads of Income', description: 'Learn about Salary, House Property, PGBP, Capital Gains, and Other Sources.', duration: '5 hours', keywords: ['heads of income', 'salary tax', 'capital gains', 'pgbp'], price: 100 },
                    { segmentId: 'tax-deductions', title: 'Deductions under Chapter VI-A', description: 'Explore popular deductions like 80C, 80D, 80G to save tax legally.', duration: '2 hours', keywords: ['deductions', '80c', 'tax saving'], price: 60 },
                    { segmentId: 'tax-itr', title: 'ITR Filing Process', description: 'A step-by-step guide to filing your income tax return (ITR) online.', duration: '3 hours', keywords: ['itr filing', 'tax forms', 'income tax return'], price: 80 }
                ]
            },
            {
                title: 'Indirect Taxes (GST)',
                duration: '6 hours',
                subTopics: [
                    { segmentId: 'tax-gst-intro', title: 'Introduction to GST', description: 'Understand the Goods and Services Tax framework, registration, and tax slabs in India.', duration: '3 hours', keywords: ['gst', 'goods and services tax', 'gst registration'], price: 80 },
                    { segmentId: 'tax-gst-itc', title: 'Input Tax Credit (ITC)', description: 'Learn the concept of Input Tax Credit and how to claim it.', duration: '3 hours', keywords: ['input tax credit', 'itc', 'gst credit'], price: 80 }
                ]
            }
        ]
    },
    {
        id: 'excel-for-finance',
        title: 'Advanced Excel for Finance Professionals',
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
            {
                title: 'Excel Core Skills',
                duration: '8 hours',
                subTopics: [
                    { segmentId: 'excel-adv-functions', title: 'Advanced Excel Functions', description: 'Master functions like VLOOKUP, HLOOKUP, INDEX-MATCH, SUMIFS, and COUNTIFS.', duration: '4 hours', keywords: ['vlookup', 'index match', 'sumifs', 'excel functions'], price: 100 },
                    { segmentId: 'excel-pivot', title: 'Data Analysis with Pivot Tables', description: 'Learn to summarize and analyze large datasets effortlessly using Pivot Tables.', duration: '4 hours', keywords: ['pivot tables', 'data analysis', 'excel reporting'], price: 100 }
                ]
            },
            {
                title: 'Financial Applications',
                duration: '12 hours',
                subTopics: [
                    { segmentId: 'excel-fm', title: 'Financial Modeling & Valuation', description: 'Learn to build a 3-statement financial model and perform Discounted Cash Flow (DCF) valuation.', duration: '8 hours', keywords: ['financial modeling', 'forecasting', 'dcf valuation', '3 statement model'], price: 200 },
                    { segmentId: 'excel-viz', title: 'Data Visualization & Dashboards', description: 'Create compelling charts and interactive dashboards to present financial data effectively.', duration: '4 hours', keywords: ['charts', 'dashboards', 'data visualization', 'excel charts'], price: 100 }
                ]
            }
        ]
    },
    {
        id: 'business-law-101',
        title: 'Fundamentals of Business Law',
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
            {
                title: 'Core Business Legislation',
                duration: '8 hours',
                subTopics: [
                    { segmentId: 'law-contract', title: 'The Indian Contract Act, 1872', description: 'Learn the essentials of forming a valid contract, breach of contract, and remedies.', duration: '4 hours', keywords: ['contracts', 'indian contract act', 'valid contract', 'breach of contract'], price: 100 },
                    { segmentId: 'law-company', title: 'The Companies Act, 2013', description: 'Understand the legal framework for starting and running a company, including incorporation and types of companies.', duration: '4 hours', keywords: ['company law', 'incorporation', 'companies act', 'directors'], price: 100 }
                ]
            },
            {
                title: 'Intellectual Property',
                duration: '2 hours',
                subTopics: [
                    { segmentId: 'law-ip', title: 'Intellectual Property Law', description: 'Learn how to protect your ideas and brand with patents, trademarks, and copyright.', duration: '2 hours', keywords: ['patents', 'trademarks', 'copyright', 'intellectual property'], price: 100 }
                ]
            }
        ]
    },
    
    // Arts & Humanities / Soft Skills
    {
        id: 'public-speaking-mastery',
        title: 'Public Speaking Mastery: From Fear to Pro',
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
            {
                title: 'The Core Skills',
                duration: '8 hours',
                subTopics: [
                    { segmentId: 'psm-confidence', title: 'Building Unshakable Confidence', description: 'Psychological techniques to overcome anxiety, stage fright, and project confidence.', duration: '2 hours', keywords: ['public speaking confidence', 'stage fright', 'anxiety management', 'mindset'], price: 150 },
                    { segmentId: 'psm-structure', title: 'Structuring a Memorable Speech', description: 'Learn storytelling, the rule of three, and how to create a compelling narrative for your talk.', duration: '3 hours', keywords: ['speech writing', 'presentation structure', 'storytelling', 'persuasion'], price: 175 },
                    { segmentId: 'psm-delivery', title: 'Mastering Your Delivery', description: 'Master voice modulation, pacing, powerful pauses, and effective body language.', duration: '3 hours', keywords: ['body language', 'voice modulation', 'delivery skills', 'vocal variety'], price: 175 }
                ]
            }
        ]
    },
     {
        id: 'english-confidence-booster',
        title: 'Spoken English & Confidence Booster',
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
            {
                title: 'Core Language Skills',
                duration: '10 hours',
                subTopics: [
                    { segmentId: 'eng-pronunciation', title: 'Clear Pronunciation & Fluency', description: 'Work on common Indian pronunciation errors, intonation, and improve your speaking flow.', duration: '4 hours', keywords: ['english pronunciation', 'fluency', 'accent reduction', 'intonation'], price: 100 },
                    { segmentId: 'eng-vocab', title: 'Vocabulary for Professionals', description: 'Learn essential business English vocabulary for meetings, emails, and presentations.', duration: '3 hours', keywords: ['business english', 'vocabulary', 'professional communication', 'idioms'], price: 100 },
                    { segmentId: 'eng-convo', title: 'Real-World Conversational Practice', description: 'Engage in guided conversations on topics like interviews and group discussions to build confidence.', duration: '3 hours', keywords: ['spoken english', 'english speaking', 'english confidence', 'conversation practice'], price: 100 }
                ]
            }
        ]
    },
    {
        id: 'interview-essentials',
        title: 'The Ultimate Job Interview Guide',
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
            {
                title: 'The Interview Lifecycle',
                duration: '6 hours',
                subTopics: [
                    { segmentId: 'int-prep', title: 'Pre-interview Preparation', description: 'Learn how to research a company, analyze the job description, and prepare for common questions.', duration: '2 hours', keywords: ['interview prep', 'researching company', 'job description analysis'], price: 70 },
                    { segmentId: 'int-during', title: 'Acing the Interview', description: 'Master the STAR method for behavioral questions and learn how to ask insightful questions.', duration: '3 hours', keywords: ['answering questions', 'star method', 'behavioral questions', 'interview questions'], price: 100 },
                    { segmentId: 'int-post', title: 'Post-interview Strategy', description: 'Learn how to write effective thank-you notes, handle job offers, and negotiate salary.', duration: '1 hour', keywords: ['follow up', 'salary negotiation', 'job offer'], price: 50 }
                ]
            }
        ]
    },
    {
        id: 'resume-writing-for-devs',
        title: 'The Tech Resume: Writing for Developers',
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
            {
                title: 'Building a Killer Resume',
                duration: '4 hours',
                subTopics: [
                    { segmentId: 'res-format', title: 'ATS-Friendly Formatting', description: 'Create a clean, professional, and Applicant Tracking System (ATS) friendly resume format.', duration: '1 hour', keywords: ['resume format', 'ats', 'resume template'], price: 40 },
                    { segmentId: 'res-content', title: 'Content that Sells: Projects & Experience', description: 'Learn to write compelling, action-oriented descriptions of your projects and experience using action verbs.', duration: '2 hours', keywords: ['resume writing', 'projects section', 'work experience', 'bullet points'], price: 40 },
                    { segmentId: 'res-tailor', title: 'Tailoring and Keyword Optimization', description: 'Customize your resume for each job application using keywords from the job description for maximum impact.', duration: '1 hour', keywords: ['customizing resume', 'resume review', 'keywords', 'jobscan'], price: 20 }
                ]
            }
        ]
    },

    // UPSC
    {
        id: 'indian-polity-upsc',
        title: 'Indian Polity for UPSC by M. Laxmikanth',
        description: 'A comprehensive course on the Indian Constitution and political system for UPSC aspirants, based on the popular book.',
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
            {
                title: 'Part 1: Foundational Concepts',
                duration: '25 hours',
                subTopics: [
                    { segmentId: 'pol-framework', title: 'Constitutional Framework', description: 'Covering the Preamble, Fundamental Rights & Duties, DPSP, and Amendment Procedures.', duration: '12 hours', keywords: ['constitution', 'preamble', 'fundamental rights', 'dpsp', 'citizenship'], price: 150 },
                    { segmentId: 'pol-union', title: 'The Union Executive & Legislature', description: 'An in-depth look at the President, Prime Minister, Council of Ministers, and Parliament.', duration: '8 hours', keywords: ['parliament', 'president', 'prime minister', 'lok sabha'], price: 125 },
                    { segmentId: 'pol-judiciary', title: 'The Judiciary', description: 'Study the Supreme Court, High Courts, judicial review, and important judgments.', duration: '5 hours', keywords: ['judiciary', 'supreme court', 'judicial review'], price: 100 },
                ]
            },
            {
                title: 'Part 2: Institutions and Governance',
                duration: '25 hours',
                subTopics: [
                    { segmentId: 'pol-state', title: 'State Government', description: 'Understand the roles of the Governor, Chief Minister, and State Legislature.', duration: '7 hours', keywords: ['state government', 'governor', 'chief minister'], price: 100 },
                    { segmentId: 'pol-bodies', title: 'Constitutional & Non-Constitutional Bodies', description: 'Understand the roles of the ECI, UPSC, CAG, NITI Aayog, etc.', duration: '10 hours', keywords: ['election commission', 'cag', 'attorney general', 'constitutional bodies', 'niti aayog'], price: 150 },
                    { segmentId: 'pol-local', title: 'Local Government & Special Provisions', description: 'Covering Panchayati Raj, Municipalities, and special provisions for states.', duration: '8 hours', keywords: ['panchayati raj', 'municipalities', 'local self government'], price: 125 }
                ]
            }
        ]
    },
    {
        id: 'geography-for-upsc',
        title: 'Geography for UPSC (GC Leong)',
        description: 'Covers physical, Indian, and world geography as per the UPSC syllabus, with a focus on core concepts.',
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
            {
                title: 'Core Geographical Concepts',
                duration: '25 hours',
                subTopics: [
                    { segmentId: 'geo-physical-geomorph', title: 'Geomorphology (Landforms)', description: 'Covers Earth\'s interior, plate tectonics, volcanoes, earthquakes, and landform development.', duration: '10 hours', keywords: ['geomorphology', 'plate tectonics', 'landforms', 'gc leong'], price: 150 },
                    { segmentId: 'geo-physical-clima', title: 'Climatology', description: 'Learn about atmosphere, temperature, pressure belts, winds, and different climate zones.', duration: '10 hours', keywords: ['climatology', 'climate zones', 'pressure belts'], price: 150 },
                    { segmentId: 'geo-physical-oceano', title: 'Oceanography', description: 'Study ocean floor relief, temperature, salinity, ocean currents, and tides.', duration: '5 hours', keywords: ['oceanography', 'ocean currents', 'tides'], price: 100 },
                ]
            },
            {
                title: 'Indian & Human Geography',
                duration: '20 hours',
                subTopics: [
                    { segmentId: 'geo-indian', title: 'Indian Geography', description: 'A detailed study of the physical and human geography of India, including climate, rivers, and resources.', duration: '10 hours', keywords: ['indian geography', 'monsoon', 'rivers', 'natural resources', 'india physical'], price: 150 },
                    { segmentId: 'geo-human', title: 'Human & Economic Geography', description: 'Study population, migration, agriculture, industries, and transport.', duration: '5 hours', keywords: ['human geography', 'economic geography', 'population', 'agriculture'], price: 100 },
                    { segmentId: 'geo-world', title: 'World Geography & Mapping', description: 'Explore the geography of continents and practice important map locations for prelims.', duration: '5 hours', keywords: ['world geography', 'continents', 'mapping', 'places in news'], price: 100 },
                ]
            }
        ]
    },

    // MBA Prep
    {
        id: 'cat-quant-aptitude',
        title: 'CAT Quantitative Aptitude (Arun Sharma)',
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
            {
                title: 'Core Quant Topics',
                duration: '35 hours',
                subTopics: [
                    { segmentId: 'cat-arithmetic', title: 'Arithmetic Deep Dive', description: 'Deep dive into percentages, profit & loss, simple & compound interest, time & work, etc.', duration: '12 hours', keywords: ['percentages', 'profit and loss', 'time and work', 'arithmetic', 'ratios'], price: 150 },
                    { segmentId: 'cat-algebra', title: 'Algebra & Modern Math', description: 'Master equations, inequalities, functions, logarithms, P&C, and probability.', duration: '13 hours', keywords: ['algebra', 'permutation', 'combination', 'probability', 'functions'], price: 150 },
                    { segmentId: 'cat-geometry', title: 'Geometry & Mensuration', description: 'Tackle questions on triangles, circles, quadrilaterals, and 2D/3D shapes.', duration: '10 hours', keywords: ['geometry', 'mensuration', 'triangles', 'circles', 'coordinate geometry'], price: 150 }
                ]
            },
            {
                title: 'Test-Taking Strategy',
                duration: '5 hours',
                subTopics: [
                    { segmentId: 'cat-mocks', title: 'Mock Tests & Analysis', description: 'Practice with full-length mocks and learn from detailed analysis to build exam temperament.', duration: '5 hours', keywords: ['mock tests', 'cat exam strategy', 'test analysis', 'time management'], price: 100 }
                ]
            }
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
            {
                title: 'Data Foundations',
                duration: '13 hours',
                subTopics: [
                    { segmentId: 'ds-python', title: 'Python for Data Science (NumPy & Pandas)', description: 'Get up to speed with Python, and its powerful libraries NumPy and Pandas for data manipulation.', duration: '5 hours', keywords: ['python basics', 'numpy', 'pandas', 'dataframes'], price: 150 },
                    { segmentId: 'ds-analysis', title: 'Exploratory Data Analysis (EDA)', description: 'Learn to clean, transform, handle missing values, and extract insights from datasets.', duration: '8 hours', keywords: ['data cleaning', 'data manipulation', 'pandas', 'eda'], price: 200 }
                ]
            },
            {
                title: 'Visualization & Modeling',
                duration: '12 hours',
                subTopics: [
                    { segmentId: 'ds-viz', title: 'Data Visualization with Matplotlib & Seaborn', description: 'Create beautiful and informative plots to communicate your findings.', duration: '6 hours', keywords: ['matplotlib', 'seaborn', 'plotting', 'data visualization'], price: 150 },
                    { segmentId: 'ds-ml', title: 'Introduction to Machine Learning', description: 'Build and evaluate predictive models using the Scikit-learn library.', duration: '6 hours', keywords: ['scikit-learn', 'machine learning models', 'prediction'], price: 150 }
                ]
            }
        ]
    },
    {
        id: 'digital-marketing-masterclass',
        title: 'The Complete Digital Marketing Masterclass',
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
            {
                title: 'Organic & Paid Channels',
                duration: '22 hours',
                subTopics: [
                    { segmentId: 'dm-seo', title: 'SEO & Content Marketing', description: 'Learn on-page, off-page, and technical SEO to rank higher on Google.', duration: '8 hours', keywords: ['seo', 'content marketing', 'keywords', 'link building'], price: 200 },
                    { segmentId: 'dm-smm', title: 'Social Media Marketing (SMM)', description: 'Build and manage successful organic and paid campaigns on Facebook, Instagram, & LinkedIn.', duration: '6 hours', keywords: ['social media', 'facebook marketing', 'instagram marketing', 'smm'], price: 150 },
                    { segmentId: 'dm-sem', title: 'Paid Advertising (SEM/PPC)', description: 'Master Google Ads and search engine marketing (SEM) to drive targeted traffic.', duration: '8 hours', keywords: ['google ads', 'ppc', 'sem', 'paid advertising'], price: 200 }
                ]
            }
        ]
    },
    {
        id: 'graphic-design-fundamentals',
        title: 'Graphic Design Fundamentals & Theory',
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
            {
                title: 'Design Theory and Tools',
                duration: '18 hours',
                subTopics: [
                    { segmentId: 'gd-principles', title: 'Core Principles of Design & Color Theory', description: 'Learn about balance, contrast, hierarchy, typography, and how to use color effectively.', duration: '4 hours', keywords: ['design principles', 'color theory', 'typography', 'visual hierarchy'], price: 150 },
                    { segmentId: 'gd-photoshop', title: 'Adobe Photoshop for Beginners', description: 'Get started with layers, selections, and photo editing in the industry-standard tool.', duration: '7 hours', keywords: ['photoshop', 'photo editing', 'layers'], price: 200 },
                    { segmentId: 'gd-illustrator', title: 'Adobe Illustrator for Vector Graphics', description: 'Learn to create logos, icons, and illustrations using the pen tool and shapes.', duration: '7 hours', keywords: ['illustrator', 'vector graphics', 'logos', 'icons'], price: 200 }
                ]
            }
        ]
    },
    {
        id: 'project-management-pmp',
        title: 'Project Management Professional (PMP) Prep',
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
            {
                title: 'PMP Foundations',
                duration: '25 hours',
                subTopics: [
                    { segmentId: 'pmp-framework', title: 'Project Management Framework & Lifecycle', description: 'Understand the core concepts, process groups, and lifecycle of a project.', duration: '10 hours', keywords: ['pmp', 'pmbok', 'project lifecycle', 'process groups'], price: 200 },
                    { segmentId: 'pmp-knowledge-areas', title: 'Knowledge Areas (Scope, Schedule, Cost)', description: 'A deep dive into the key knowledge areas as per the PMBOK guide.', duration: '15 hours', keywords: ['scope management', 'schedule management', 'cost management', 'risk management'], price: 250 }
                ]
            },
            {
                title: 'Agile Methodologies',
                duration: '10 hours',
                subTopics: [
                    { segmentId: 'pmp-agile', title: 'Agile & Hybrid Approaches', description: 'Learn Agile principles and how they are integrated into the PMP exam.', duration: '10 hours', keywords: ['agile', 'scrum', 'kanban', 'hybrid project management'], price: 200 }
                ]
            }
        ]
    }
];
