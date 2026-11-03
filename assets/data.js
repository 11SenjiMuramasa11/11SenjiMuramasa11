/**
 * Edit this file to update the portfolio.
 * Optional links left empty are hidden automatically.
 */
window.PORTFOLIO = {
  identity: {
    name: "Justine James Prades",
    alias: "Muramasa",
    handle: "11SenjiMuramasa11",
    role: "Backend developer in progress",
    signature:
      "I turn ideas into REST APIs — currently leveling up one endpoint at a time.",
    bio:
      "I’m Justine, a JavaScript developer who learns by building. My current quest is backend development: REST APIs, relational databases, and the clean structure that holds them together.",
    avatar: "assets/avatar-cropped.png",
    github: "https://github.com/11SenjiMuramasa11",
    email: "",
    resume: "",
    githubJoined: "2025-05-26",
    projectsBuilt: 3
  },

  stats: [
    { value: "2", label: "Public repositories" },
    { value: "2", label: "REST APIs built" },
    { value: "1", label: "Core language" },
    { value: "2025", label: "Coding since" }
  ],

  ledger: [
    { label: "Public repositories", value: "2", icon: "star" },
    { label: "REST APIs built", value: "2", icon: "api" },
    { label: "Core language", value: "JavaScript", icon: "code" },
    { label: "Current quest", value: "Backend architecture", icon: "book" }
  ],

  skills: [
    {
      id: "javascript",
      label: "JavaScript",
      art: "js",
      tag: "Primary language",
      summary:
        "The language I reach for first — from route logic to small browser interactions.",
      description:
        "I work with modern JavaScript in Node.js: modules, objects, arrays, asynchronous flow, and the small pieces of browser code that make an interface respond.",
      usedIn: ["Elective Song API", "Student Records API", "This portfolio"]
    },
    {
      id: "node",
      label: "Node.js",
      art: "node",
      tag: "Runtime",
      summary: "Runs the server side of both APIs.",
      description:
        "Node is where my backend projects live. I use it to start Express servers, load environment variables, and keep JavaScript running outside the browser.",
      usedIn: ["Elective Song API", "Student Records API"]
    },
    {
      id: "express",
      label: "Express",
      art: "express",
      tag: "Framework",
      summary: "Routing, middleware, JSON responses, and error handling.",
      description:
        "I split Express apps into routes, controllers, and models. I’m learning to keep each layer focused so the next endpoint is easier to add.",
      usedIn: ["Elective Song API", "Student Records API"]
    },
    {
      id: "mysql",
      label: "MySQL",
      art: "mysql",
      tag: "Database",
      summary: "Relational schemas and queries for real project data.",
      description:
        "I design tables and write the queries behind both APIs — songs, artists, albums, playlists, and student records — using mysql2 and parameterised queries.",
      usedIn: ["Elective Song API", "Student Records API"]
    },
    {
      id: "rest",
      label: "REST APIs",
      art: "rest",
      tag: "Architecture",
      summary: "Resource routes, CRUD operations, and JSON contracts.",
      description:
        "I like a predictable API: clear resources, sensible status codes, consistent JSON, and endpoints that do one job well.",
      usedIn: ["Elective Song API", "Student Records API"]
    },
    {
      id: "git",
      label: "Git",
      art: "git",
      tag: "Version control",
      summary: "Small commits and a history I can retrace.",
      description:
        "I use Git to keep experiments separate from working code, review what changed, and move a project forward without losing the previous version.",
      usedIn: ["Elective Song API", "Student Records API"]
    },
    {
      id: "github",
      label: "GitHub",
      art: "github",
      tag: "Build in public",
      summary: "Where the work lives and the next experiment starts.",
      description:
        "My public repositories are part of my learning log. They show the projects, the commits, and the parts I’m still figuring out.",
      usedIn: ["Elective Song API", "Student Records API"]
    },
    {
      id: "backend",
      label: "Backend design",
      art: "backend",
      tag: "Current quest",
      summary: "Learning how the pieces fit together cleanly.",
      description:
        "My next stretch is architecture: authentication, reusable middleware, validation, and a folder structure that stays readable as an API grows.",
      usedIn: ["Elective Song API", "Student Records API"]
    }
  ],

  projects: [
    {
      id: "elective-song",
      title: "Elective Song API",
      art: "music",
      type: "Team project",
      year: "2026",
      summary:
        "A music-streaming REST API for artists, albums, songs, and playlists.",
      description:
        "Built as a four-person school project, the API exposes JSON endpoints for browsing music, searching songs and artists, tracking plays and likes, and managing public playlists. Routes are split by resource, with controllers and models keeping the data layer separate.",
      stack: ["Node.js", "Express", "MySQL", "JavaScript"],
      highlights: [
        "Resource routes for artists, albums, songs, and playlists",
        "Search, top charts, and genre filters",
        "Play and like counters",
        "Playlist follows and song management"
      ],
      note: "Team: Carillo, Nebreja, Prades, Solpico",
      repo: "https://github.com/11SenjiMuramasa11/Elective_song_API"
    },
    {
      id: "student-records",
      title: "Student Records API",
      art: "student",
      type: "Practice API",
      year: "2026",
      summary: "A compact CRUD API for student records.",
      description:
        "My first full Express API: create, read, update, and delete student records, plus a dedicated endpoint for changing a student’s status. Built to practise routing, controllers, and MySQL queries.",
      stack: ["Node.js", "Express", "MySQL", "CORS"],
      highlights: [
        "CRUD endpoints under /api/students",
        "Status updates via PATCH",
        "JSON request handling",
        "Environment-based configuration"
      ],
      note: "Solo practice build",
      repo:
        "https://github.com/11SenjiMuramasa11/github-11SenjiMuramasa11_firstapi"
    },
    {
      id: "portfolio",
      title: "This namecard",
      art: "portfolio",
      type: "Front-end build",
      year: "2026",
      summary: "A Genshin-inspired profile book with a project archive.",
      description:
        "A dependency-free portfolio built with semantic HTML, custom CSS, and vanilla JavaScript. The interface borrows the shape of an in-game profile: a namecard, an adventure ledger, and a tabbed project archive.",
      stack: ["HTML", "CSS", "JavaScript"],
      highlights: [
        "Responsive two-page book layout",
        "Accessible tabs and dialog",
        "Original SVG namecard art",
        "No framework or build step"
      ],
      note: "Designed and built for this portfolio",
      repo: ""
    }
  ],

  log: [
    {
      date: "2025",
      title: "Joined GitHub",
      text: "Created my account and started keeping code in public."
    },
    {
      date: "Jan 2026",
      title: "First API",
      text: "Built the Student Records API to practise Express and MySQL."
    },
    {
      date: "Feb 2026",
      title: "Music API",
      text: "Shipped the Elective Song API with a four-person team."
    },
    {
      date: "Now",
      title: "Next quest",
      text: "Authentication, middleware, and cleaner backend structure."
    }
  ]
};
