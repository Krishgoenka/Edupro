
export type SubTopic = {
  segmentId: string;
  title: string;
  description: string;
  duration: string;
  keywords: string[];
  price: number;
};

export type CourseSegment = {
  title:string;
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
                    { segmentId: 'wd-html-structure', title: 'HTML5 Structure', description: 'Learn the basic boilerplate of an HTML5 document.', duration: '30 mins', keywords: ['html', 'boilerplate'], price: 10 },
                    { segmentId: 'wd-html-tags', title: 'Common HTML Tags', description: 'Understand and use tags like headings, paragraphs, links, and images.', duration: '30 mins', keywords: ['html tags', 'p', 'h1'], price: 10 },
                    { segmentId: 'wd-html-semantic', title: 'Semantic HTML', description: 'Use tags like <header>, <nav>, <article> for better structure.', duration: '30 mins', keywords: ['semantic html'], price: 15 },
                    { segmentId: 'wd-html-forms', title: 'HTML Forms', description: 'Create forms with various input types for user data collection.', duration: '30 mins', keywords: ['forms', 'input'], price: 15 },
                    { segmentId: 'wd-css-basics', title: 'CSS Fundamentals & Selectors', description: 'Learn how to apply CSS and use different types of selectors.', duration: '1 hour', keywords: ['css', 'selectors'], price: 20 },
                    { segmentId: 'wd-css-box-model', title: 'The CSS Box Model', description: 'Understand margin, border, padding, and content.', duration: '1 hour', keywords: ['box model', 'margin', 'padding'], price: 20 },
                    { segmentId: 'wd-css-flexbox', title: 'Layout with Flexbox', description: 'Create 1D responsive layouts using Flexbox.', duration: '1 hour', keywords: ['flexbox', 'responsive design'], price: 25 },
                    { segmentId: 'wd-css-grid', title: 'Layout with CSS Grid', description: 'Build complex 2D responsive layouts with CSS Grid.', duration: '1 hour', keywords: ['css grid', 'responsive design'], price: 25 },
                ]
            },
            {
                title: 'JavaScript Fundamentals',
                duration: '8 hours',
                subTopics: [
                     { segmentId: 'wd-js-vars', title: 'Variables & Data Types', description: 'Understand let, const, var, and different data types in JS.', duration: '1 hour', keywords: ['javascript', 'variables', 'data types'], price: 20 },
                    { segmentId: 'wd-js-logic', title: 'Control Flow: Conditionals', description: 'Use if/else and switch statements to make decisions.', duration: '1 hour', keywords: ['if else', 'conditionals'], price: 20 },
                    { segmentId: 'wd-js-loops', title: 'Control Flow: Loops', description: 'Repeat actions using for loops and while loops.', duration: '1 hour', keywords: ['loops', 'for loop'], price: 20 },
                    { segmentId: 'wd-js-functions', title: 'Functions & Scope', description: 'Write reusable code with functions and understand scope.', duration: '1.5 hours', keywords: ['functions', 'scope'], price: 25 },
                    { segmentId: 'wd-js-es6', title: 'Modern ES6 Features', description: 'Learn arrow functions, template literals, and destructuring.', duration: '1.5 hours', keywords: ['es6', 'arrow functions'], price: 25 },
                    { segmentId: 'wd-js-dom', title: 'DOM Manipulation', description: 'Select and modify HTML elements using JavaScript.', duration: '1 hour', keywords: ['dom', 'document object model'], price: 25 },
                    { segmentId: 'wd-js-events', title: 'Handling User Events', description: 'Respond to user actions like clicks and keyboard input.', duration: '1 hour', keywords: ['events', 'event listeners'], price: 25 },
                ]
            },
            {
                title: 'React & Backend Development',
                duration: '10 hours',
                subTopics: [
                    { segmentId: 'wd-react-intro', title: 'Introduction to React & JSX', description: 'Set up a React app and understand component-based architecture.', duration: '1.5 hours', keywords: ['react', 'jsx'], price: 30 },
                    { segmentId: 'wd-react-props', title: 'Components and Props', description: 'Create reusable components and pass data using props.', duration: '1.5 hours', keywords: ['components', 'props'], price: 30 },
                    { segmentId: 'wd-react-state', title: 'Managing State', description: 'Use the useState hook to manage component state.', duration: '2 hours', keywords: ['state', 'useState'], price: 40 },
                    { segmentId: 'wd-react-hooks', title: 'Lifecycle & Effects with useEffect', description: 'Understand component lifecycle and handle side effects.', duration: '1.5 hours', keywords: ['useEffect', 'hooks'], price: 40 },
                    { segmentId: 'wd-node-intro', title: 'Introduction to Node.js', description: 'Understand the Node.js runtime and its event-driven architecture.', duration: '1 hour', keywords: ['node.js', 'backend'], price: 30 },
                    { segmentId: 'wd-node-express', title: 'Building a Server with Express', description: 'Create a simple web server using the Express framework.', duration: '1.5 hours', keywords: ['express', 'server'], price: 40 },
                    { segmentId: 'wd-node-api', title: 'Creating a RESTful API', description: 'Design and build API endpoints for data operations.', duration: '1 hour', keywords: ['api', 'restful'], price: 40 },
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
                    { segmentId: 'ai-intro', title: 'The Intuition Behind AI & ML', description: 'Grasp core concepts and different types of AI.', duration: '2 hours', keywords: ['ai concepts', 'machine learning overview'], price: 40 },
                    { segmentId: 'ai-data-cleaning', title: 'Data Preprocessing: Cleaning Data', description: 'Learn techniques for handling missing or inconsistent data.', duration: '2 hours', keywords: ['data cleaning'], price: 50 },
                    { segmentId: 'ai-data-scaling', title: 'Data Preprocessing: Feature Scaling', description: 'Understand Normalization and Standardization of data.', duration: '2 hours', keywords: ['feature scaling', 'normalization'], price: 50 },
                    { segmentId: 'ai-regression-linear', title: 'Linear Regression', description: 'Predict continuous values with a simple linear model.', duration: '2 hours', keywords: ['linear regression', 'supervised learning'], price: 50 },
                    { segmentId: 'ai-regression-poly', title: 'Polynomial Regression', description: 'Model non-linear relationships in your data.', duration: '2 hours', keywords: ['polynomial regression'], price: 50 },
                ]
            },
            {
                title: 'Advanced Models & Deep Learning',
                duration: '15 hours',
                subTopics: [
                    { segmentId: 'ai-classification-logistic', title: 'Logistic Regression for Classification', description: 'Predict categories using the logistic regression model.', duration: '2 hours', keywords: ['classification', 'logistic regression'], price: 50 },
                    { segmentId: 'ai-classification-knn', title: 'K-Nearest Neighbors (K-NN)', description: 'Classify data based on its proximity to neighbors.', duration: '1.5 hours', keywords: ['knn', 'classification'], price: 45 },
                    { segmentId: 'ai-classification-svm', title: 'Support Vector Machines (SVM)', description: 'Understand the intuition and use of SVMs for classification.', duration: '1.5 hours', keywords: ['svm', 'support vector machine'], price: 45 },
                    { segmentId: 'ai-clustering-kmeans', title: 'K-Means Clustering', description: 'Group unlabeled data with the K-Means algorithm.', duration: '2 hours', keywords: ['clustering', 'unsupervised learning', 'k-means'], price: 50 },
                    { segmentId: 'ai-ann-intro', title: 'Introduction to Neural Networks', description: 'Understand the architecture of Artificial Neural Networks (ANNs).', duration: '2 hours', keywords: ['ann', 'neural networks'], price: 60 },
                    { segmentId: 'ai-ann-build', title: 'Building an ANN with TensorFlow', description: 'Construct your first neural network using the TensorFlow library.', duration: '2 hours', keywords: ['tensorflow', 'ann'], price: 60 },
                    { segmentId: 'ai-cnn-intro', title: 'Convolutional Neural Networks (CNNs)', description: 'Learn the theory behind CNNs for image recognition.', duration: '2 hours', keywords: ['cnn', 'computer vision'], price: 60 },
                    { segmentId: 'ai-cnn-build', title: 'Building a CNN for Image Classification', description: 'Apply your knowledge to build an image classifier.', duration: '2 hours', keywords: ['image recognition', 'cnn'], price: 60 },
                ]
            },
            {
                title: 'Practical Application',
                duration: '5 hours',
                subTopics: [
                    { segmentId: 'ai-nlp-intro', title: 'Introduction to Natural Language Processing', description: 'Understand how machines process human language.', duration: '2 hours', keywords: ['nlp', 'natural language processing'], price: 60 },
                    { segmentId: 'ai-chatbot-project', title: 'Project: Build an AI Chatbot', description: 'Apply your knowledge to build a real-world AI application.', duration: '3 hours', keywords: ['chatbot', 'project'], price: 80 }
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
                    { segmentId: 'cysec-intro', title: 'Foundations of Cyber Security', description: 'Overview of the cyber landscape, CIA triad, and attack vectors.', duration: '2 hours', keywords: ['cyber security basics', 'cia triad'], price: 60 },
                    { segmentId: 'cysec-threats', title: 'Common Threats and Malware', description: 'Learn about viruses, worms, ransomware, and phishing attacks.', duration: '2 hours', keywords: ['threats', 'malware', 'phishing'], price: 60 },
                    { segmentId: 'cysec-network-basics', title: 'Networking Basics for Security', description: 'Understand TCP/IP, DNS, and HTTP/S protocols.', duration: '2 hours', keywords: ['networking', 'tcp ip'], price: 60 },
                    { segmentId: 'cysec-firewalls', title: 'Network Security with Firewalls & VPNs', description: 'Learn to configure and use firewalls and Virtual Private Networks.', duration: '2 hours', keywords: ['firewalls', 'vpn', 'network security'], price: 70 },
                    { segmentId: 'cysec-detection', title: 'Intrusion Detection & Prevention', description: 'Understand how IDS and IPS systems work to protect networks.', duration: '2 hours', keywords: ['ids', 'ips', 'intrusion detection'], price: 70 },
                ]
            },
            {
                title: 'Offensive and Defensive Security',
                duration: '10 hours',
                subTopics: [
                    { segmentId: 'cysec-hacking-recon', title: 'Ethical Hacking: Reconnaissance', description: 'Learn information gathering techniques like footprinting and scanning.', duration: '2 hours', keywords: ['reconnaissance', 'ethical hacking'], price: 80 },
                    { segmentId: 'cysec-hacking-tools', title: 'Penetration Testing with Kali Linux', description: 'Use tools like Nmap and Metasploit to find vulnerabilities.', duration: '3 hours', keywords: ['penetration testing', 'kali linux', 'nmap'], price: 90 },
                    { segmentId: 'cysec-crypto-symmetric', title: 'Symmetric & Asymmetric Encryption', description: 'Understand different encryption algorithms like AES and RSA.', duration: '2.5 hours', keywords: ['encryption', 'cryptography', 'aes', 'rsa'], price: 85 },
                    { segmentId: 'cysec-crypto-hashing', title: 'Hashing and Digital Signatures', description: 'Learn how hashing ensures data integrity and use of digital signatures.', duration: '2.5 hours', keywords: ['hashing', 'digital signatures', 'pki'], price: 85 },
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
                    { segmentId: 'dsa-complexity', title: 'Time & Space Complexity Analysis', description: 'Understand Big O, Big Omega, and Big Theta notations.', duration: '3 hours', keywords: ['big o', 'time complexity'], price: 40 },
                    { segmentId: 'dsa-arrays', title: 'Arrays & Strings in C++', description: 'Master fundamentals of contiguous data structures.', duration: '3 hours', keywords: ['arrays', 'strings', 'c++'], price: 40 },
                    { segmentId: 'dsa-recursion', title: 'Recursion and Backtracking', description: 'Learn to solve problems by breaking them down.', duration: '3 hours', keywords: ['recursion', 'backtracking'], price: 45 },
                    { segmentId: 'dsa-sorting', title: 'Sorting Algorithms', description: 'Learn Bubble Sort, Merge Sort, and Quick Sort.', duration: '3 hours', keywords: ['sorting', 'quick sort'], price: 45 },
                    { segmentId: 'dsa-searching', title: 'Searching Algorithms', description: 'Learn Linear Search and Binary Search on various problems.', duration: '3 hours', keywords: ['searching', 'binary search'], price: 45 },
                ]
            },
            {
                title: 'Linear & Non-Linear Structures',
                duration: '15 hours',
                subTopics: [
                    { segmentId: 'dsa-linked-lists', title: 'Linked Lists', description: 'Understand singly, doubly, and circular linked lists.', duration: '3 hours', keywords: ['linked lists'], price: 50 },
                    { segmentId: 'dsa-stacks', title: 'Stacks', description: 'Learn LIFO principle and its applications.', duration: '2 hours', keywords: ['stacks'], price: 40 },
                    { segmentId: 'dsa-queues', title: 'Queues', description: 'Learn FIFO principle and its applications.', duration: '2 hours', keywords: ['queues'], price: 40 },
                    { segmentId: 'dsa-trees-binary', title: 'Binary Trees & Traversals', description: 'Understand tree structure and traversals (Inorder, Preorder, Postorder).', duration: '3 hours', keywords: ['trees', 'traversals'], price: 50 },
                    { segmentId: 'dsa-trees-bst', title: 'Binary Search Trees (BST)', description: 'Learn properties of BSTs and search/insert/delete operations.', duration: '2 hours', keywords: ['binary search tree', 'bst'], price: 50 },
                    { segmentId: 'dsa-graphs-bfs-dfs', title: 'Graph Traversals (BFS & DFS)', description: 'Learn graph representations and traversals like BFS and DFS.', duration: '3 hours', keywords: ['graphs', 'bfs', 'dfs'], price: 50 },
                ]
            },
            {
                title: 'Advanced Algorithms',
                duration: '5 hours',
                subTopics: [
                    { segmentId: 'dsa-greedy', title: 'Greedy Algorithms', description: 'Understand the greedy approach with classic problems.', duration: '2.5 hours', keywords: ['greedy algorithms'], price: 60 },
                    { segmentId: 'dsa-dp', title: 'Dynamic Programming', description: 'Learn the DP paradigm to solve complex optimization problems.', duration: '2.5 hours', keywords: ['dynamic programming', 'dp'], price: 60 }
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
                    { segmentId: 'sql-basics', title: 'Basic Queries (SELECT, WHERE, FROM)', description: 'Learn the foundational queries to retrieve and filter data.', duration: '2 hours', keywords: ['select', 'where', 'sql basics'], price: 40 },
                    { segmentId: 'sql-sorting-limiting', title: 'Sorting and Limiting Results', description: 'Use ORDER BY to sort data and LIMIT/TOP to restrict results.', duration: '1 hour', keywords: ['order by', 'limit'], price: 20 },
                    { segmentId: 'sql-aggregate', title: 'Aggregate Functions', description: 'Perform calculations using COUNT, SUM, AVG, MIN, and MAX.', duration: '2 hours', keywords: ['count', 'sum', 'aggregate functions'], price: 40 },
                    { segmentId: 'sql-grouping', title: 'Grouping Data with GROUP BY', description: 'Group rows that have the same values into summary rows.', duration: '2 hours', keywords: ['group by', 'having'], price: 40 },
                ]
            },
            {
                title: 'Advanced Data Analysis',
                duration: '8 hours',
                subTopics: [
                    { segmentId: 'sql-joins-inner', title: 'INNER and LEFT Joins', description: 'Combine data from multiple tables using INNER and LEFT JOIN.', duration: '2 hours', keywords: ['joins', 'inner join', 'left join'], price: 60 },
                    { segmentId: 'sql-joins-adv', title: 'RIGHT and FULL OUTER Joins', description: 'Understand less common but powerful join types.', duration: '1 hour', keywords: ['right join', 'full outer join'], price: 30 },
                    { segmentId: 'sql-subqueries', title: 'Subqueries and CTEs', description: 'Utilize subqueries and Common Table Expressions for complex logic.', duration: '2.5 hours', keywords: ['subqueries', 'cte'], price: 70 },
                    { segmentId: 'sql-window', title: 'Window Functions for Analytics', description: 'Learn powerful functions like RANK(), DENSE_RANK(), and LEAD().', duration: '2.5 hours', keywords: ['window functions', 'rank'], price: 70 }
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
                    { segmentId: 'os-intro', title: 'Introduction to Operating Systems', description: 'Learn OS components and structures (monolithic, microkernel).', duration: '2 hours', keywords: ['os basics', 'kernel'], price: 50 },
                    { segmentId: 'os-process', title: 'Process & Thread Management', description: 'Dive into process states, PCBs, and context switching.', duration: '3 hours', keywords: ['processes', 'threads', 'pcb'], price: 60 },
                    { segmentId: 'os-scheduling-fcfs-sjf', title: 'CPU Scheduling: FCFS & SJF', description: 'Understand First-Come-First-Serve and Shortest-Job-First algorithms.', duration: '2 hours', keywords: ['scheduling', 'fcfs', 'sjf'], price: 50 },
                    { segmentId: 'os-scheduling-rr', title: 'CPU Scheduling: Priority & Round Robin', description: 'Learn Priority Scheduling and Round Robin algorithms.', duration: '2 hours', keywords: ['round robin', 'priority scheduling'], price: 50 },
                ]
            },
            {
                title: 'Synchronization & Memory',
                duration: '9 hours',
                subTopics: [
                    { segmentId: 'os-sync', title: 'Process Synchronization', description: 'Solve concurrency issues with semaphores and mutexes.', duration: '3 hours', keywords: ['synchronization', 'semaphores', 'mutex'], price: 70 },
                    { segmentId: 'os-deadlock', title: 'Deadlocks', description: 'Understand deadlock conditions and prevention strategies.', duration: '2 hours', keywords: ['deadlock'], price: 50 },
                    { segmentId: 'os-memory', title: 'Main Memory Management', description: 'Learn about contiguous allocation, paging, and segmentation.', duration: '2 hours', keywords: ['memory management', 'paging'], price: 60 },
                    { segmentId: 'os-virtual-memory', title: 'Virtual Memory Concepts', description: 'Grasp demand paging and page replacement algorithms like FIFO & LRU.', duration: '2 hours', keywords: ['virtual memory', 'lru'], price: 60 }
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
                    { segmentId: 'acc-intro', title: 'Introduction to Accounting & GAAP', description: 'Learn basic principles (GAAP) and the accounting equation.', duration: '2 hours', keywords: ['accounting principles', 'gaap'], price: 30 },
                    { segmentId: 'acc-journal', title: 'Recording Transactions with Journal Entries', description: 'Master analyzing transactions and creating journal entries.', duration: '2 hours', keywords: ['journal entries', 'debits and credits'], price: 40 },
                    { segmentId: 'acc-ledger', title: 'Posting to the General Ledger', description: 'Learn to post journal entries to ledger T-accounts.', duration: '1 hour', keywords: ['t-accounts', 'ledger'], price: 20 },
                    { segmentId: 'acc-trial-balance', title: 'Preparing the Trial Balance', description: 'Learn to prepare a trial balance to check for errors.', duration: '1 hour', keywords: ['trial balance'], price: 20 },
                    { segmentId: 'acc-adjusting', title: 'Making Adjusting Entries', description: 'Understand adjusting entries for accruals and deferrals.', duration: '1 hour', keywords: ['adjusting entries'], price: 30 },
                ]
            },
            {
                title: 'Financial Reporting',
                duration: '5 hours',
                subTopics: [
                    { segmentId: 'acc-income-statement', title: 'Preparing the Income Statement', description: 'Learn how to create a statement of profit and loss.', duration: '1.5 hours', keywords: ['income statement'], price: 40 },
                    { segmentId: 'acc-balance-sheet', title: 'Preparing the Balance Sheet', description: 'Learn how to create a statement of financial position.', duration: '2 hours', keywords: ['balance sheet'], price: 50 },
                    { segmentId: 'acc-cash-flow', title: 'Understanding the Cash Flow Statement', description: 'Learn the basics of the statement of cash flows.', duration: '1.5 hours', keywords: ['cash flow statement'], price: 40 },
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
                    { segmentId: 'tax-income-heads', title: 'The 5 Heads of Income', description: 'Deep dive into Salary, House Property, PGBP, and Capital Gains.', duration: '4 hours', keywords: ['heads of income', 'salary tax', 'pgbp'], price: 80 },
                    { segmentId: 'tax-deductions-80c', title: 'Section 80C Deductions', description: 'Explore tax-saving deductions under section 80C.', duration: '2 hours', keywords: ['deductions', '80c', 'tax saving'], price: 50 },
                    { segmentId: 'tax-deductions-other', title: 'Other Deductions (80D, 80G, etc.)', description: 'Learn about other popular deductions like 80D, 80G, and 80TTA.', duration: '2 hours', keywords: ['80d', '80g'], price: 50 },
                    { segmentId: 'tax-itr', title: 'ITR Filing Process & Formats', description: 'A step-by-step guide to filing your income tax return (ITR) online.', duration: '2 hours', keywords: ['itr filing', 'tax forms'], price: 60 },
                ]
            },
            {
                title: 'Indirect Taxes (GST)',
                duration: '6 hours',
                subTopics: [
                    { segmentId: 'tax-gst-intro', title: 'Introduction to the GST Framework', description: 'Understand Goods and Services Tax and tax slabs (CGST, SGST, IGST).', duration: '2 hours', keywords: ['gst', 'goods and services tax'], price: 50 },
                    { segmentId: 'tax-gst-reg', title: 'GST Registration', description: 'Learn who needs to register for GST and the process involved.', duration: '1 hour', keywords: ['gst registration'], price: 30 },
                    { segmentId: 'tax-gst-itc', title: 'Input Tax Credit (ITC) Mechanism', description: 'Learn the concept of Input Tax Credit and how to claim it.', duration: '2 hours', keywords: ['input tax credit', 'itc'], price: 50 },
                    { segmentId: 'tax-gst-returns', title: 'Filing GST Returns', description: 'An overview of different GST returns like GSTR-1 and GSTR-3B.', duration: '1 hour', keywords: ['gst returns'], price: 30 },
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
                    { segmentId: 'excel-adv-lookup', title: 'Advanced Lookup Functions', description: 'Master VLOOKUP, INDEX-MATCH, and XLOOKUP.', duration: '2 hours', keywords: ['vlookup', 'index match', 'xlookup'], price: 60 },
                    { segmentId: 'excel-adv-logical', title: 'Advanced Logical Functions', description: 'Utilize SUMIFS, COUNTIFS, and complex nested IF statements.', duration: '2 hours', keywords: ['sumifs', 'countifs', 'if statements'], price: 60 },
                    { segmentId: 'excel-pivot-tables', title: 'Data Analysis with Pivot Tables', description: 'Summarize, analyze, and report on large datasets effortlessly.', duration: '2 hours', keywords: ['pivot tables', 'data analysis'], price: 60 },
                    { segmentId: 'excel-pivot-charts', title: 'Visualizing with Pivot Charts & Slicers', description: 'Create interactive charts and filters based on Pivot Table data.', duration: '2 hours', keywords: ['pivot charts', 'slicers'], price: 60 },
                ]
            },
            {
                title: 'Financial Applications',
                duration: '12 hours',
                subTopics: [
                    { segmentId: 'excel-fm-setup', title: 'Financial Modeling: Setup', description: 'Structure and set up a 3-statement financial model.', duration: '3 hours', keywords: ['financial modeling', 'setup'], price: 80 },
                    { segmentId: 'excel-fm-forecast', title: 'Financial Modeling: Forecasting', description: 'Learn to forecast revenue, expenses, and balance sheet items.', duration: '4 hours', keywords: ['forecasting', 'dcf valuation'], price: 100 },
                    { segmentId: 'excel-fm-valuation', title: 'Financial Modeling: DCF Valuation', description: 'Perform a Discounted Cash Flow (DCF) valuation.', duration: '3 hours', keywords: ['dcf valuation'], price: 100 },
                    { segmentId: 'excel-dashboards', title: 'Building Interactive Dashboards', description: 'Create compelling charts and interactive dashboards.', duration: '2 hours', keywords: ['dashboards', 'data visualization'], price: 80 },
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
                    { segmentId: 'law-contract-essentials', title: 'Essentials of a Valid Contract', description: 'Learn about offer, acceptance, consideration, and legality.', duration: '2 hours', keywords: ['contracts', 'indian contract act', 'valid contract'], price: 60 },
                    { segmentId: 'law-contract-breach', title: 'Breach of Contract & Remedies', description: 'Understand what constitutes a breach and the available legal remedies.', duration: '2 hours', keywords: ['breach of contract', 'remedies'], price: 60 },
                    { segmentId: 'law-company-types', title: 'Types of Companies', description: 'Learn the differences between sole proprietorship, partnership, and companies.', duration: '2 hours', keywords: ['company types', 'partnership'], price: 50 },
                    { segmentId: 'law-company-incorporation', title: 'Company Formation', description: 'Understand the legal process of incorporating a company in India.', duration: '2 hours', keywords: ['company law', 'incorporation', 'companies act'], price: 50 },
                ]
            },
            {
                title: 'Intellectual Property',
                duration: '2 hours',
                subTopics: [
                    { segmentId: 'law-ip', title: 'Intellectual Property Rights (IPR)', description: 'Learn the basics of patents, trademarks, and copyright.', duration: '2 hours', keywords: ['patents', 'trademarks', 'copyright', 'ipr'], price: 80 }
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
                title: 'Core Public Speaking Skills',
                duration: '8 hours',
                subTopics: [
                    { segmentId: 'psm-confidence', title: 'Building Unshakable Confidence', description: 'Use psychological techniques to overcome anxiety and stage fright.', duration: '2 hours', keywords: ['public speaking confidence', 'stage fright'], price: 120 },
                    { segmentId: 'psm-structure', title: 'Structuring a Memorable Speech', description: 'Learn storytelling, the rule of three, and how to create a strong narrative.', duration: '2 hours', keywords: ['speech writing', 'storytelling'], price: 120 },
                    { segmentId: 'psm-voice', title: 'Mastering Voice Modulation', description: 'Learn to control your pitch, pace, and volume for maximum impact.', duration: '2 hours', keywords: ['voice modulation', 'vocal variety'], price: 130 },
                    { segmentId: 'psm-body-language', title: 'Powerful Body Language', description: 'Use gestures, posture, and movement to command attention.', duration: '2 hours', keywords: ['body language', 'delivery skills'], price: 130 },
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
                title: 'Core Language & Confidence Skills',
                duration: '10 hours',
                subTopics: [
                    { segmentId: 'eng-pronunciation', title: 'Clear Pronunciation Drills', description: 'Work on common Indian pronunciation errors and intonation.', duration: '3 hours', keywords: ['english pronunciation', 'accent reduction'], price: 80 },
                    { segmentId: 'eng-fluency', title: 'Fluency and Flow Practice', description: 'Improve your speaking flow with drills and exercises.', duration: '2 hours', keywords: ['fluency'], price: 60 },
                    { segmentId: 'eng-vocab', title: 'Vocabulary for Professionals', description: 'Learn essential business English vocabulary for meetings and emails.', duration: '2.5 hours', keywords: ['business english', 'vocabulary'], price: 80 },
                    { segmentId: 'eng-convo', title: 'Real-World Conversational Practice', description: 'Engage in guided conversations to build speaking confidence.', duration: '2.5 hours', keywords: ['spoken english', 'english confidence'], price: 80 },
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
                    { segmentId: 'int-prep', title: 'Pre-interview Research & Preparation', description: 'Learn to research a company and analyze the job description.', duration: '1.5 hours', keywords: ['interview prep', 'researching company'], price: 50 },
                    { segmentId: 'int-answer-common', title: 'Answering Common Questions', description: 'Craft answers for "Tell me about yourself", "Strengths/Weaknesses".', duration: '1.5 hours', keywords: ['interview questions'], price: 60 },
                    { segmentId: 'int-star-method', title: 'Acing Behavioral Questions with STAR', description: 'Master the STAR method for answering competency questions.', duration: '1.5 hours', keywords: ['star method', 'behavioral questions'], price: 60 },
                    { segmentId: 'int-post', title: 'Post-interview Strategy & Negotiation', description: 'Learn to write thank-you notes and negotiate salary.', duration: '1.5 hours', keywords: ['follow up', 'salary negotiation'], price: 50 },
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
                title: 'Building a Killer Tech Resume',
                duration: '4 hours',
                subTopics: [
                    { segmentId: 'res-format', title: 'ATS-Friendly Formatting & Structure', description: 'Create a clean, professional, and ATS-friendly resume format.', duration: '1 hour', keywords: ['resume format', 'ats'], price: 30 },
                    { segmentId: 'res-content-exp', title: 'Writing Action-Oriented Experience', description: 'Learn to write compelling bullet points for your work experience.', duration: '1 hour', keywords: ['resume writing', 'work experience'], price: 30 },
                    { segmentId: 'res-content-projects', title: 'Showcasing Your Projects', description: 'Effectively describe your personal and academic projects.', duration: '1 hour', keywords: ['projects section'], price: 30 },
                    { segmentId: 'res-tailor', title: 'Tailoring & Keyword Optimization', description: 'Customize your resume for each job application using keywords.', duration: '1 hour', keywords: ['customizing resume', 'keywords'], price: 30 },
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
                    { segmentId: 'pol-framework', title: 'Constitutional Framework', description: 'Historical background, Preamble, and salient features.', duration: '8 hours', keywords: ['constitution', 'preamble'], price: 100 },
                    { segmentId: 'pol-rights-duties', title: 'Fundamental Rights & Duties', description: 'In-depth look at Articles 12-35 and Fundamental Duties.', duration: '8 hours', keywords: ['fundamental rights'], price: 100 },
                    { segmentId: 'pol-dpsp-amendment', title: 'DPSP & Amendment Procedure', description: 'Directive Principles and the process for amending the Constitution.', duration: '5 hours', keywords: ['dpsp', 'amendment'], price: 60 },
                    { segmentId: 'pol-union-exec', title: 'The Union Executive', description: 'Roles and powers of the President, VP, and Prime Minister.', duration: '4 hours', keywords: ['president', 'prime minister'], price: 60 },
                ]
            },
            {
                title: 'Part 2: Institutions and Governance',
                duration: '25 hours',
                subTopics: [
                    { segmentId: 'pol-parliament', title: 'Parliament & State Legislature', description: 'Structure and functioning of Lok Sabha, Rajya Sabha and State Assemblies.', duration: '8 hours', keywords: ['parliament', 'lok sabha'], price: 100 },
                    { segmentId: 'pol-judiciary', title: 'The Judiciary', description: 'Study the Supreme Court, High Courts, and judicial review.', duration: '7 hours', keywords: ['judiciary', 'supreme court'], price: 90 },
                    { segmentId: 'pol-bodies', title: 'Constitutional Bodies', description: 'Understand roles of ECI, UPSC, CAG, and other bodies.', duration: '5 hours', keywords: ['election commission', 'cag', 'constitutional bodies'], price: 80 },
                    { segmentId: 'pol-local', title: 'Local Government', description: 'Covering Panchayati Raj and Municipalities (73rd & 74th Amendments).', duration: '5 hours', keywords: ['panchayati raj', 'municipalities'], price: 80 }
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
                    { segmentId: 'geo-physical-geomorph', title: 'Geomorphology', description: 'Earth interior, plate tectonics, volcanoes, and earthquakes.', duration: '10 hours', keywords: ['geomorphology', 'plate tectonics'], price: 130 },
                    { segmentId: 'geo-physical-clima', title: 'Climatology', description: 'Atmosphere, temperature, pressure belts, and winds.', duration: '10 hours', keywords: ['climatology', 'climate zones'], price: 130 },
                    { segmentId: 'geo-physical-oceano', title: 'Oceanography', description: 'Ocean floor relief, currents, and tides.', duration: '5 hours', keywords: ['oceanography', 'ocean currents'], price: 70 },
                ]
            },
            {
                title: 'Indian & Human Geography',
                duration: '20 hours',
                subTopics: [
                    { segmentId: 'geo-indian-physical', title: 'Physical Geography of India', description: 'Himalayas, plains, plateaus, and drainage systems.', duration: '6 hours', keywords: ['indian geography', 'himalayas', 'rivers'], price: 80 },
                    { segmentId: 'geo-indian-climate', title: 'Climate of India & Monsoon', description: 'Mechanism of the Indian monsoon, seasons, and climate regions.', duration: '4 hours', keywords: ['monsoon', 'india climate'], price: 60 },
                    { segmentId: 'geo-human', title: 'Human & Economic Geography', description: 'Population, migration, agriculture, and industries.', duration: '5 hours', keywords: ['human geography', 'population'], price: 70 },
                    { segmentId: 'geo-world', title: 'World Geography & Mapping', description: 'Geography of continents and important map locations.', duration: '5 hours', keywords: ['world geography', 'mapping'], price: 70 },
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
                    { segmentId: 'cat-arithmetic', title: 'Arithmetic Deep Dive', description: 'Percentages, profit & loss, TSD, time & work, ratios.', duration: '12 hours', keywords: ['percentages', 'profit and loss', 'arithmetic'], price: 140 },
                    { segmentId: 'cat-algebra', title: 'Algebra & Modern Math', description: 'Equations, inequalities, functions, logarithms, P&C, and probability.', duration: '13 hours', keywords: ['algebra', 'permutation', 'probability'], price: 150 },
                    { segmentId: 'cat-geometry', title: 'Geometry & Mensuration', description: 'Questions on triangles, circles, quadrilaterals, and 2D/3D shapes.', duration: '10 hours', keywords: ['geometry', 'mensuration', 'triangles'], price: 120 }
                ]
            },
            {
                title: 'Test-Taking Strategy',
                duration: '5 hours',
                subTopics: [
                    { segmentId: 'cat-di', title: 'Data Interpretation Basics', description: 'Introduction to solving tables, charts, and graphs.', duration: '2.5 hours', keywords: ['data interpretation', 'di'], price: 45 },
                    { segmentId: 'cat-mocks', title: 'Mock Tests & Analysis', description: 'Practice with full-length mocks and learn detailed analysis.', duration: '2.5 hours', keywords: ['mock tests', 'cat exam strategy'], price: 45 }
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
                title: 'Data Foundations with Python',
                duration: '13 hours',
                subTopics: [
                    { segmentId: 'ds-python-numpy', title: 'NumPy for Numerical Data', description: 'Master NumPy arrays and numerical operations.', duration: '4 hours', keywords: ['numpy', 'numerical python'], price: 120 },
                    { segmentId: 'ds-python-pandas', title: 'Pandas for Data Manipulation', description: 'Learn to use DataFrames for data cleaning and analysis.', duration: '5 hours', keywords: ['pandas', 'dataframes', 'data manipulation'], price: 150 },
                    { segmentId: 'ds-analysis', title: 'Exploratory Data Analysis (EDA)', description: 'Learn to extract insights and summarize main characteristics of data.', duration: '4 hours', keywords: ['eda', 'data cleaning'], price: 120 }
                ]
            },
            {
                title: 'Visualization & Modeling',
                duration: '12 hours',
                subTopics: [
                    { segmentId: 'ds-viz-matplotlib', title: 'Data Visualization with Matplotlib', description: 'Create various plots and charts using Matplotlib.', duration: '3 hours', keywords: ['matplotlib', 'plotting'], price: 90 },
                    { segmentId: 'ds-viz-seaborn', title: 'Statistical Visualization with Seaborn', description: 'Create beautiful and informative statistical plots.', duration: '3 hours', keywords: ['seaborn', 'data visualization'], price: 90 },
                    { segmentId: 'ds-ml', title: 'Intro to Scikit-learn for ML', description: 'Build and evaluate predictive models like Linear Regression.', duration: '6 hours', keywords: ['scikit-learn', 'machine learning'], price: 180 }
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
                    { segmentId: 'dm-seo-onpage', title: 'On-Page & Technical SEO', description: 'Optimize your website content and structure for search engines.', duration: '4 hours', keywords: ['on-page seo', 'technical seo'], price: 90 },
                    { segmentId: 'dm-seo-offpage', title: 'Off-Page SEO & Link Building', description: 'Learn strategies to build authority and backlinks to your site.', duration: '4 hours', keywords: ['off-page seo', 'link building'], price: 90 },
                    { segmentId: 'dm-smm-fb-ig', title: 'Facebook & Instagram Marketing', description: 'Build and manage successful organic and paid campaigns.', duration: '3 hours', keywords: ['social media', 'facebook marketing'], price: 70 },
                    { segmentId: 'dm-smm-li', title: 'LinkedIn & B2B Marketing', description: 'Leverage LinkedIn for professional networking and B2B marketing.', duration: '3 hours', keywords: ['linkedin marketing', 'b2b'], price: 70 },
                    { segmentId: 'dm-sem-search', title: 'Google Ads: Search Campaigns', description: 'Master search engine marketing (SEM) to drive targeted traffic.', duration: '4 hours', keywords: ['google ads', 'ppc', 'sem'], price: 90 },
                    { segmentId: 'dm-sem-display', title: 'Google Ads: Display & Video Ads', description: 'Learn to run display and YouTube ad campaigns.', duration: '4 hours', keywords: ['display ads', 'youtube ads'], price: 90 },
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
                    { segmentId: 'gd-principles', title: 'Core Principles of Design', description: 'Learn about balance, contrast, hierarchy, and repetition.', duration: '3 hours', keywords: ['design principles', 'visual hierarchy'], price: 90 },
                    { segmentId: 'gd-color-theory', title: 'Color Theory', description: 'Understand color psychology and create effective color palettes.', duration: '2 hours', keywords: ['color theory'], price: 60 },
                    { segmentId: 'gd-typography', title: 'Typography', description: 'Learn the art of arranging type to make written language legible and appealing.', duration: '2 hours', keywords: ['typography'], price: 60 },
                    { segmentId: 'gd-photoshop', title: 'Adobe Photoshop Basics', description: 'Get started with layers, selections, and photo editing.', duration: '5.5 hours', keywords: ['photoshop', 'photo editing'], price: 170 },
                    { segmentId: 'gd-illustrator', title: 'Adobe Illustrator Basics', description: 'Learn to create logos and icons using the pen tool and shapes.', duration: '5.5 hours', keywords: ['illustrator', 'vector graphics', 'logos'], price: 170 },
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
                    { segmentId: 'pmp-framework', title: 'Project Management Framework', description: 'Understand process groups (Initiating, Planning, etc.).', duration: '8 hours', keywords: ['pmp', 'pmbok', 'project lifecycle'], price: 130 },
                    { segmentId: 'pmp-scope', title: 'Scope and Schedule Management', description: 'Learn to define project scope and create a schedule.', duration: '8 hours', keywords: ['scope management', 'schedule management'], price: 130 },
                    { segmentId: 'pmp-cost-risk', title: 'Cost and Risk Management', description: 'Learn to manage project budgets and identify risks.', duration: '9 hours', keywords: ['cost management', 'risk management'], price: 150 },
                ]
            },
            {
                title: 'Agile Methodologies',
                duration: '10 hours',
                subTopics: [
                    { segmentId: 'pmp-agile-intro', title: 'Introduction to Agile & Scrum', description: 'Learn Agile principles and the Scrum framework.', duration: '5 hours', keywords: ['agile', 'scrum'], price: 90 },
                    { segmentId: 'pmp-agile-hybrid', title: 'Hybrid Approaches and PMP Exam Prep', description: 'Understand hybrid models and focus on exam preparation.', duration: '5 hours', keywords: ['hybrid project management', 'pmp exam'], price: 90 },
                ]
            }
        ]
    }
];
