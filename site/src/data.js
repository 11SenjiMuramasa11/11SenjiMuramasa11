export const identity = {
  name: "Justine James Prades",
  first: "Justine James",
  last: "Prades",
  alias: "Muramasa",
  handle: "@11SenjiMuramasa11",
  role: "Software developer & QA",
  signature: "I build the API, then try to break it.",
  intro:
    "BSIT student at NU Laguna. I build web applications in Laravel and React, then test them through full sprint cycles.",
  email: "justinejamesprades1111@gmail.com",
  github: "https://github.com/11SenjiMuramasa11",
  linkedin: "https://www.linkedin.com/in/jjprades",
};

export const stats = [
  { value: "04", label: "Projects shipped" },
  { value: "03", label: "Certifications" },
  { value: "02", label: "Team contributions" },
];

export const about = {
  paragraphs: [
    "I'm a BSIT student at National University (NU Laguna), building web applications in Laravel and React and testing them through full sprint cycles. I like the part where a system has to hold up: clear API contracts, role-based access, and a test plan that finds the gaps.",
    "Right now I'm working through authentication, middleware, and validation, and getting better at reading someone else's code before changing it.",
  ],
  notes: [
    { label: "Studying", value: "BS Information Technology, NU Laguna" },
    { label: "Focus", value: "Backend APIs and QA" },
    { label: "Currently", value: "Authentication, middleware, validation" },
    { label: "Open to", value: "Internships and collaborations" },
  ],
};

export const projects = [
  {
    id: "elective-song",
    index: "01",
    title: "Elective Song API",
    year: "2026",
    status: "Built",
    role: "Team of four",
    summary:
      "A music-streaming REST API for artists, albums, songs, and playlists, with search, charts, play counts, and playlist management.",
    detail:
      "Built as a four-person school project. Routes are split by resource, with controllers and models keeping the data layer separate from the request layer.",
    highlights: [
      "Resource routes for artists, albums, songs, and playlists",
      "Search, top charts, and genre filters",
      "Play and like counters",
      "Playlist follows and song management",
    ],
    stack: ["Node.js", "Express", "MySQL"],
    linkLabel: "Repository",
    link: "https://github.com/11SenjiMuramasa11/Elective_song_API",
    credit: "Team: Carillo, Nebreja, Prades, Solpico",
  },
  {
    id: "student-records",
    index: "02",
    title: "Student Records API",
    year: "2026",
    status: "Built",
    role: "Solo build",
    summary:
      "A compact CRUD API for student records, with JSON handling, status updates, and environment-based configuration.",
    detail:
      "My first full Express API: create, read, update, and delete student records, plus a dedicated endpoint for changing a student's status.",
    highlights: [
      "CRUD endpoints under /api/students",
      "Status updates via PATCH",
      "JSON request handling",
      "Environment-based configuration",
    ],
    stack: ["Node.js", "Express", "MySQL"],
    linkLabel: "Repository",
    link: "https://github.com/11SenjiMuramasa11/github-11SenjiMuramasa11_firstapi",
    credit: "Solo practice build",
  },
  {
    id: "trusthome",
    index: "03",
    title: "TrustHome PH",
    year: "2026",
    status: "Contributor",
    role: "Frontend and QA",
    summary:
      "A rental marketplace capstone with document-reviewed listings, conflict-free booking, and a fairness-scored bank property catalog.",
    detail:
      "Frontend work on settings, ratings, and trust scoring, then QA across five sprints: test plans, test cases, regression, and user acceptance testing.",
    highlights: [
      "Settings, ratings, and trust-scoring interfaces",
      "Test plans and test cases across five sprints",
      "Regression testing and UAT",
      "Document review and booking flows",
    ],
    stack: ["React", "Vite", "Firebase"],
    linkLabel: "Pull request #15",
    link: "https://github.com/carilloandrei9264/team-idle/pull/15",
    credit: "Contributor — team repository",
  },
  {
    id: "cpcnextboard",
    index: "04",
    title: "cpcNextboard",
    year: "2025–26",
    status: "Contributor",
    role: "Team of three",
    summary:
      "An intranet system for real-time coordination between production, inventory, sales, and logistics at a manufacturing company.",
    detail:
      "Co-developed with a team of three. Laravel and MySQL, live updates over WebSockets, role-based access, department dashboards, and a Groq-powered assistant for forecasting. Rated 4.12/5 by company staff and IT experts.",
    highlights: [
      "Real-time coordination over WebSockets",
      "Role-based access and department dashboards",
      "Groq-powered forecasting assistant",
      "Rated 4.12/5 by company staff and IT experts",
    ],
    stack: ["Laravel", "PHP", "MySQL", "WebSockets"],
    linkLabel: "Commit",
    link: "https://github.com/AndreiCarillo-9264/manufacturing-coordination-system/commit/4b3ed604daca984f0c1bf1991fbfbbab89e3dee5",
    credit: "Contributor — team repository",
  },
];

export const stack = [
  { label: "Languages", items: ["JavaScript", "PHP", "SQL", "HTML", "CSS"] },
  { label: "Frameworks", items: ["Laravel", "React", "Node.js", "Express", "Vite"] },
  { label: "Data and cloud", items: ["MySQL", "SQLite", "Firebase", "AWS"] },
  { label: "Integration", items: ["REST APIs", "EDI", "WebSockets"] },
  { label: "Tools", items: ["Git", "GitHub", "GitHub Actions", "PHPUnit", "ESLint"] },
  {
    label: "QA",
    items: [
      "Test planning",
      "Test cases",
      "Regression",
      "Traceability",
      "UAT",
    ],
  },
];

export const background = [
  {
    when: "2022 — now",
    title: "BS Information Technology",
    where: "National University (NU Laguna)",
    kind: "Education",
  },
  {
    when: "2020 — 22",
    title: "Senior High School",
    where: "Laguna College of Business and Arts",
    kind: "Education",
  },
  {
    when: "Aug 2025",
    title: "Agentblazer Workshop",
    where: "Salesforce Trailhead",
    kind: "Certification",
  },
  {
    when: "Mar 2025",
    title: "IT Specialist: Databases",
    where: "Certiport",
    kind: "Certification",
  },
  {
    when: "May 2026",
    title: "IT Specialist: Network Security",
    where: "Certiport",
    kind: "Certification",
  },
];

export const navItems = [
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "stack", label: "Stack" },
  { id: "background", label: "Background" },
  { id: "contact", label: "Contact" },
];
