// All portfolio content lives here. Edit this file to update the site.

export const profile = {
  name: 'Abul Hasnat Ahmad',
  firstName: 'Abul Hasnat',
  role: 'Software Engineer',
  roles: ['Full Stack Engineer', 'Java & Spring Boot Developer', 'React Developer', 'POS Systems Engineer'],
  location: 'Lahore, Pakistan',
  email: 'abulhasnatahmad12@gmail.com',
  github: 'https://github.com/hasnatahmad1',
  linkedin: 'https://www.linkedin.com/in/abul-hasnat-ahmad-07b0aa350',
  cv: 'Abul_Hasnat_Ahmad_CV.pdf',
  tagline:
    'I build and support production software, from Java Point of Sale systems and payment terminal integrations to REST APIs and React frontends.',
  about: [
    'I am a full stack Software Engineer with 13 months of hands-on experience (7 months as an intern and 6 months as an Associate Software Engineer), specializing in Java and Spring Boot.',
    'At WalQalum Technologies I build and support production Point of Sale systems used across multiple client stores: payment terminal integration, kiosk interfaces, store deployments and production bug fixing. I also build REST APIs with Django REST Framework and frontends in React.',
    'I work directly with clients and stakeholders, and I am looking for a Software Engineer role where I can grow in a challenging, product-focused team.',
  ],
}

export const stats = [
  { value: '13', label: 'Months of experience' },
  { value: '2', label: 'Production systems' },
  { value: '10+', label: 'Projects built' },
  { value: '3', label: 'Languages spoken' },
]

export const experience = [
  {
    role: 'Associate Software Engineer (Full Stack, Java)',
    company: 'WalQalum Technologies',
    duration: '6 months',
    points: [
      'Developed and maintained features for PlatformPOS, a Java-based Point of Sale system used across multiple client store environments.',
      'Implemented PAX payment terminal integration covering credit/debit handling, part payments and cash discount programs, and resolved related payment bugs.',
      'Designed and built kiosk user interfaces and worked on Conexxus Food Service kiosk integration.',
      'Configured and deployed store-specific POS setups and fixed production bugs to keep client stores running smoothly.',
      'Tested the TruAge age-verification feature within the POS workflow.',
      'Set up Grafana/Loki log collection and monitoring for POS environments to speed up issue diagnosis.',
      'Handled client-facing technical communication and coordinated with leads and stakeholders on requirements and fixes.',
    ],
    tags: ['Java', 'PAX', 'Kiosk UI', 'Grafana', 'Loki'],
  },
  {
    role: 'Software Engineering Intern (Full Stack)',
    company: 'WalQalum Technologies',
    duration: '5 months',
    points: [
      'Worked across frontend and backend development tasks under senior engineer guidance, building a strong base in Java and full stack practices.',
      'Contributed to feature development and bug fixing and followed team Git workflows.',
    ],
    tags: ['Java', 'Full Stack', 'Git'],
  },
  {
    role: 'Intern',
    company: 'SmartSEO',
    duration: '2 months',
    points: ['Completed an internship and gained early professional exposure to working in a software team.'],
    tags: ['Teamwork'],
  },
]

// category: 'production' | 'java' | 'web' | 'ai'
export const projects = [
  {
    title: 'Unicenta OPOS',
    category: 'production',
    description:
      'Production Point of Sale system. Built and fixed features across the Java UI and .NET backend, and worked directly with clients on requirements, issues and fixes.',
    stack: ['Core Java 8', 'Java UI', '.NET'],
  },
  {
    title: 'GLUU',
    category: 'production',
    description:
      'Production Spring Framework application. Delivered features and bug fixes and handled client communication.',
    stack: ['Spring Framework', 'Java'],
  },
  {
    title: 'Chatbot with MCP',
    category: 'ai',
    description: 'AI chatbot built with Spring AI and the Model Context Protocol.',
    stack: ['Spring AI', 'MCP', 'Java'],
  },
  {
    title: 'Agent2Agent Communication',
    category: 'Communication',
    description: 'An implementation of agent-to-agent (A2A) communication.',
    stack: ['Spring Boot', 'A2A'],
  },
  {
    title: 'Sales Data Pipeline',
    category: 'java',
    description: 'ETL pipeline for processing sales data with Java and MySQL.',
    stack: ['Spring Boot', 'Java', 'MySQL'],
  },
  {
    title: 'Simple POS',
    category: 'java',
    description: 'Point of Sale application built with Core Java and MySQL.',
    stack: ['Core Java', 'Swing', 'MySQL'],
  },
  {
    title: 'Travel Agency Platform',
    category: 'web',
    description: 'Full stack travel agency application.',
    stack: ['React', 'Django REST'],
  },
  {
    title: 'Chat Application',
    category: 'web',
    description: 'Full stack chat application.',
    stack: ['React', 'Django REST'],
  },
  {
    title: 'E-Commerce Frontend',
    category: 'web',
    description: 'Responsive e-commerce storefront UI.',
    stack: ['React', 'CSS'],
  },
  {
    title: 'Todo List Apps',
    category: 'web',
    description: 'CRUD apps integrating JavaScript and React frontends with Django REST APIs.',
    stack: ['JavaScript', 'React', 'DRF'],
  },
]

export const projectFilters = [
  { key: 'all', label: 'All' },
  { key: 'production', label: 'Production' },
  { key: 'java', label: 'Java' },
  { key: 'web', label: 'Web' },
  { key: 'ai', label: 'AI' },
]

export const skills = [
  { group: 'Languages', items: ['Java', 'Python', 'JavaScript', 'TypeScript', 'C++', 'SQL', 'C# / .NET'] },
  {
    group: 'Backend',
    items: ['Spring Boot', 'Spring Security (JWT)', 'Spring AI', 'Hibernate / JPA', 'Django REST Framework', 'REST APIs'],
  },
  { group: 'Frontend', items: ['React', 'HTML', 'CSS', 'JavaScript', 'Java Swing'] },
  { group: 'Databases', items: ['MySQL'] },
  { group: 'Tools & Practices', items: ['Git & GitHub', 'Flyway', 'Grafana / Loki', 'MCP', 'Agent2Agent (A2A)'] },
  {
    group: 'Soft Skills',
    items: ['Client Communication', 'Problem Solving', 'Team Collaboration', 'Production Support', 'Adaptability'],
  },
]

export const education = [
  { degree: 'BSc Software Engineering', school: 'University of Engineering & Technology (UET)', score: 'CGPA 3.01' },
  { degree: 'FSc Pre-Engineering', school: 'Govt. Islamia Civil Lines College', score: '1008 / 1100' },
  { degree: 'Matriculation (Computer Science)', school: 'Bright Way Foundation School', score: '1022 / 1100' },
]

export const languages = ['English', 'Urdu', 'Punjabi']
