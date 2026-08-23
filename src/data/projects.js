// Project case studies. Content is sourced from demo.html and portfolio_agent_spec.md.
// Images use generated SVG placeholders via /assets/projects/*.svg (see assets folder).
// Replace `image` / `gallery` paths with real screenshots later.

const github = (slug) => `https://github.com/Rafi1210/${slug}`;

export const projects = [
  {
    slug: 'dropify',
    number: '01',
    title: 'Dropify',
    category: 'Systems / Logistics',
    tagline: 'HERMES: hierarchical micro-clustering for last-hop delivery in Dhaka.',
    summary:
      'My undergrad capstone. A three-surface last-mile platform (Merchant, Hub Manager, Driver) built around HERMES, a hierarchical micro-clustering engine that groups nearby stops, snaps parking to road edges, plans walking loops exactly, and pairs every parcel with one of four delivery states.',
    description:
      'Dropify operationalizes park-and-walk delivery through HERMES, a micro-clustering engine that turns chaotic urban stop lists into a structured plan: cluster, park, walk, deliver, status. The platform ships as three coordinated surfaces: Merchant page, Hub Manager Dashboard, and a Driver Android app.',
    overview:
      'Dropify is built around **last-hop delivery** in dense Dhaka neighbourhoods like Banasree, Rampura, Merul Badda, and Aftabnagar, where several customer handoff locations can share one vehicle parking session even though a conventional plan treats every address as a separate stop. The platform combines three coordinated surfaces (Merchant page, Hub Manager Dashboard, Driver Android app) with **HERMES**, a hierarchical micro-clustering engine that turns parcel records into a reviewable and executable daily plan. In the final evaluation, the strongest configuration reduces vehicle events from 86 to 50 and estimated total time from 423.03 to 359.56 min while introducing 2.36 km of walking.',
    capstone: true,
    problem:
      'In dense urban Dhaka, delivery vehicles usually stop separately at every physical address. Every extra stop brings braking, parking, locking, and re-entry into traffic, so the inefficiency is not driven by road distance alone. Three things were missing: a method to decide **which stops are pedestrian-feasible together**, a way to **place the vehicle** at a real road edge rather than at the nearest intersection, and a **shared state model** between hub and driver that survives spotty connectivity.',
    solution:
      'Dropify formalises the informal park-and-walk decision. Parcels are consolidated into physical stops and projected to **exact pedestrian-edge access** positions. **Union-Find** builds broad candidate regions, then bounded connected subsets are enumerated under stop, parcel, weight, one-way, and closed-loop walking rules to produce **micro-cluster candidates**. Road-edge parking candidates are ranked using exact pedestrian-network access with a **minimax-first lexicographic** criterion. Bounded closed walking loops are solved exactly with **Held-Karp**. CP-SAT selects a non-overlapping clustered-plus-direct coverage. OSRM road times then sequence the final vehicle sessions via **nearest-neighbor + 2-opt**. Each parcel exits the day in one of **four states**: Delivered, Failed, Pending, or Not-attempted, where Failed is closed and Not-attempted is eligible for the next day.',
    architecture: [
      { name: 'Merchant Page', detail: 'Parcel entry & submission' },
      { name: 'Hub Manager Dashboard', detail: 'Cluster planning & assignment' },
      { name: 'Driver Android App', detail: 'Field navigation & delivery states' },
    ],
    architectureImage: {
      src: 'dropify-architecture',
      caption:
        'Merchant submission flows into the nearest hub, where the manager plans routes and dispatches the driver app.',
    },
    features: [
      '**HERMES** hierarchical micro-clustering: Union-Find candidate regions, then bounded connected feasible subsets under operational constraints',
      '**Edge-aware projection** of every delivery location onto the pedestrian network, not the nearest intersection',
      '**Road-edge parking** sampled on eligible driving edges, ranked with a minimax-first lexicographic criterion',
      '**Exact closed walking loops** via Held-Karp dynamic programming per bounded candidate',
      '**CP-SAT coverage selection** of clustered and direct alternatives so every eligible stop is covered exactly once',
      '**OSRM road-time sequencing** with nearest-neighbor construction and 2-opt refinement',
      '**Four-state delivery model**: Delivered, Failed, Pending, Not-attempted. Failed parcels do not re-assign next day; Not-attempted do',
      'Three coordinated surfaces: Merchant page, Hub Manager Dashboard, Driver Android app',
    ],
    challenges: [
      'Snapping parking positions to the correct side of one-way streets',
      'Balancing cluster size against walking distance per stop',
      'Holding graph-search latency under control for large delivery sets',
      'Synchronising state between the hub dashboard and the Driver Android app',
      'Distinguishing Failed (closed) from Not-attempted (re-runnable) at the data layer',
    ],
    whatILearned: [
      'A delivery system is more than a routing problem. The data model that separates Failed from Not-attempted is what makes the next day work',
      'Spatial data is harder than it looks. Coordinate systems, projections, and edge snapping all matter',
      'Graph algorithms only feel fast when the underlying data model is right',
      'A driver app is the truest test of a delivery system. If it is not usable in the field, nothing else matters',
    ],
    technologies: ['Python', 'NetworkX', 'Folium', 'FastAPI', 'Android'],
    stack: [
      { component: 'Merchant Page', techs: ['React', 'Vite'] },
      {
        component: 'Hub Manager Dashboard',
        techs: ['React', 'Vite', 'MapLibre GL JS'],
      },
      {
        component: 'Driver Android App',
        techs: ['Java', 'MapLibre Android', 'Retrofit', 'OkHttp'],
      },
      {
        component: 'Backend API',
        techs: ['FastAPI', 'Firebase Admin SDK'],
      },
      {
        component: 'HERMES Engine',
        techs: ['Python', 'OSMnx', 'NetworkX', 'OR-Tools'],
      },
      {
        component: 'Database',
        techs: ['PostgreSQL', 'Railway'],
      },
      {
        component: 'Map & Routing',
        techs: ['MapLibre', 'Stadia Maps', 'OSRM'],
      },
    ],
    image: 'dropify',
    gallery: [
      { src: 'dropify-dashboard', kind: 'web', caption: 'Hub Manager dashboard. Live hub view' },
      { src: 'dropify-assignment', kind: 'web', caption: 'Assignment page. Driver and parcel selection' },
      { src: 'dropify-app-home', kind: 'mobile', caption: 'Driver app. Assignment home' },
      { src: 'dropify-app-map', kind: 'mobile', caption: 'Driver app. Cluster map and walking route' },
      { src: 'dropify-app-update-status', kind: 'mobile', caption: 'Driver app. Per-parcel status update' },
    ],
    github: 'https://github.com/Alpha-Engineering-Workspace/dropify-admin.git',
    demo: 'https://dropify.up.railway.app/',
    apkUrl:
      'https://drive.google.com/file/d/1-bOi8voAnCCe60QEwe6lXWiu9FMgLKOz/view?usp=sharing',
    featured: true,
    year: '2026',
    accent: '#6C63FF',
    demoVideo: 'https://drive.google.com/file/d/1c503sN-4_7h3JymirYaeJFSCd1GnzHxy/preview',
    demoCredentials: [
      {
        role: 'Hub Manager',
        email: 'banasree-hub@dropify.com',
        password: 'test123',
      },
      {
        role: 'Driver',
        email: 'driver1@dropify.com',
        password: 'test1234',
      },
    ],
    surfaces: [
      {
        key: 'hub',
        label: 'Hub Manager Dashboard',
        kind: 'Web dashboard',
        summary:
          'Operations console where dispatchers watch the hub, plan routes, and assign work to drivers in real time.',
        image: 'dropify-dashboard',
        features: [
          'Live hub map with active drivers and pending deliveries',
          'Cluster preview before routes are dispatched',
          'Drag-and-drop assignment to driver IDs',
          'CSV import for bulk stop ingest',
          'Performance metrics per route (stops, distance, ETA)',
        ],
        linkLabel: 'Open hub demo',
        linkUrl: 'https://dropify.up.railway.app/',
      },
      {
        key: 'driver',
        label: 'Driver Android App',
        kind: 'Android · MVVM',
        summary:
          'Field app drivers use on the road: turn-by-turn walking directions, stop checklist, and status updates pushed back to the hub.',
        image: 'dropify-app-home',
        features: [
          'Turn-by-turn walking directions from parking position',
          'Stop checklist with proof-of-delivery capture',
          'Live status sync with the hub dashboard',
          'Offline queue for spotty connectivity',
          'Four-state delivery model: Delivered, Failed, Pending, Not-attempted',
        ],
        linkLabel: 'Download APK',
        linkUrl: 'https://drive.google.com/file/d/1-bOi8voAnCCe60QEwe6lXWiu9FMgLKOz/view?usp=sharing',
      },
    ],
  },
  {
    slug: 'caselaw-rag',
    number: '02',
    title: 'CaseLaw RAG',
    category: 'AI / Retrieval',
    tagline: 'Hybrid retrieval for U.S. federal case law.',
    summary:
      'A hybrid BM25 + FAISS retrieval pipeline for federal case law, grounded in LangGraph orchestration and LLaMA 3.3-70B through Groq. Wrapped in a judicial-style Gradio interface.',
    description:
      'CaseLaw RAG explores how classical lexical retrieval (BM25) and dense vector retrieval (FAISS) can be combined to answer legal queries more reliably than either method alone, using a LangGraph agent and LLaMA 3.3-70B via Groq.',
    overview:
      'The pipeline ingests U.S. federal case law documents, indexes them with both BM25 (lexical) and FAISS (semantic), retrieves candidates from both indexes, and asks LLaMA 3.3-70B (served by Groq) to answer the question using only the retrieved context.',
    problem:
      'LLMs hallucinate legal citations. Pure vector search misses exact legal terms; pure BM25 misses semantic intent. The interesting question is how to combine them.',
    solution:
      'A hybrid retriever that runs BM25 and FAISS in parallel, merges and re-ranks candidates, then passes the top context to LLaMA 3.3-70B via Groq. LangGraph manages the agent flow; Gradio provides a clean judicial-style UI.',
    pipeline: [
      'User Query',
      'Query Processing',
      'Hybrid Retrieval (BM25 + FAISS)',
      'Context Selection',
      'LLaMA 3.3-70B via Groq',
      'Grounded Answer',
    ],
    architecture: [
      { name: 'Gradio UI', detail: 'Judicial-style dark interface' },
      { name: 'LangGraph Agent', detail: 'Orchestrates retrieval & answer flow' },
      { name: 'Hybrid Retriever', detail: 'BM25 + FAISS in parallel' },
      { name: 'Groq Inference', detail: 'LLaMA 3.3-70B generation' },
    ],
    features: [
      'Hybrid BM25 + dense FAISS retrieval',
      'LangGraph-orchestrated reasoning flow',
      'LLaMA 3.3-70B inference via Groq API',
      'Custom Gradio UI tuned for a judicial aesthetic',
      'Strict answer grounding to retrieved context',
    ],
    challenges: [
      'Tuning the BM25 / FAISS weighting for legal vocabulary',
      'Keeping generation cost low with Groq without losing context size',
      'Positioning the project honestly as a technical retrieval prototype, not a legal product',
    ],
    whatILearned: [
      'Hybrid retrieval consistently beats single-method retrieval on noisy corpora.',
      'Grounding is a UI problem as much as a model problem. The interface must show the user where the answer came from.',
      'Agent graphs (LangGraph) make pipelines debuggable in a way raw scripts do not.',
    ],
    technologies: ['Python', 'FAISS', 'LangGraph', 'Groq', 'Gradio', 'BM25'],
    stack: [
      {
        component: 'Retrieval',
        techs: ['BM25', 'FAISS'],
      },
      {
        component: 'Orchestration',
        techs: ['LangGraph', 'Groq'],
      },
      {
        component: 'LLM',
        techs: ['LLaMA 3.3-70B'],
      },
      {
        component: 'Interface',
        techs: ['Gradio', 'Python'],
      },
    ],
    image: 'caselaw',
    gallery: ['caselaw-ui', 'caselaw-flow'],
    github: github('caselaw-rag'),
    demo: 'https://caselaw-rag.rafi.dev',
    featured: true,
    year: '2025',
    accent: '#111318',
  },
  {
    slug: 'spotify-recommendation',
    number: '03',
    title: 'Spotify Recommendation System',
    category: 'ML / Recommendation',
    tagline: 'Audio feature similarity for personalized discovery.',
    summary:
      'A machine-learning pipeline that ingests Spotify audio features, engineers similarity vectors, and recommends new music through a lightweight web interface.',
    description:
      'Built around the Spotify audio-features API, this system engineers similarity over tempo, energy, danceability, valence, and acousticness. Then it surfaces tracks a listener is statistically likely to enjoy.',
    overview:
      'The project starts from the Spotify Web API and ends at a personalized recommendation feed. Between those two points sits a feature-engineering pipeline, a similarity scoring engine, and a lightweight web frontend.',
    problem:
      'Pure collaborative filtering needs lots of user history. For cold or casual listeners, content-based filtering over audio features is a better default, and it is also more explainable.',
    solution:
      'Pull tracks and audio features from Spotify, normalize and weight them, compute cosine similarity, and recommend the top-N nearest tracks to a seed. The web app shows the seed, the reasoning, and the recommendation list.',
    features: [
      'Spotify API integration for tracks and audio features',
      'Feature engineering across tempo, energy, valence, and more',
      'Cosine-similarity recommendation engine',
      'Pandas-based analysis pipeline',
      'Interactive web UI for discovery',
    ],
    challenges: [
      'Deciding which audio features to weight and how',
      'Handling sparse or missing feature data per track',
      'Making similarity scores interpretable for end users',
    ],
    whatILearned: [
      'Recommendation is rarely a model problem. It is a data shaping problem.',
      'Even simple similarity metrics feel powerful when the feature engineering is right.',
      'Explainability beats sophistication for end-user recommendation UIs.',
    ],
    technologies: ['Python', 'Scikit-learn', 'Spotify API', 'Pandas'],
    stack: [
      {
        component: 'Data',
        techs: ['Spotify API', 'Pandas'],
      },
      {
        component: 'Model',
        techs: ['Scikit-learn', 'Python'],
      },
    ],
    image: 'spotify',
    gallery: ['spotify-app'],
    github: github('spotify-recommendation'),
    demo: 'https://spotify-rec.rafi.dev',
    featured: true,
    year: '2024',
    accent: '#1DB954',
  },
  {
    slug: 'traceq',
    number: '04',
    title: 'TraceQ',
    category: 'Web / Community',
    tagline: 'Role-based lost &amp; found for campuses.',
    summary:
      'A role-based lost-and-found platform with smart item matching and real-time notifications, designed to help campuses and communities reconnect people with their belongings.',
    description:
      'TraceQ treats lost &amp; found as a workflow problem, not a board problem. Different roles (finder, loser, admin) see different views, and items are matched automatically based on description, time, and location.',
    overview:
      'Built for university campuses, TraceQ lets people post lost or found items, automatically surfaces likely matches, and notifies users in real time when something they reported has a likely match.',
    problem:
      'Most campus lost-and-found is a wall of posters nobody reads. Digital boards help, but they still require manual searching and offer no notification flow when a match appears.',
    solution:
      'A role-based React + Node.js app with PostgreSQL persistence and Firebase for real-time notifications. Item matching runs server-side against category, time window, and location proximity.',
    features: [
      'Role-based access (finder, loser, admin)',
      'Smart item matching across category, time, and location',
      'Real-time notifications via Firebase',
      'PostgreSQL data layer',
      'React-based responsive UI',
    ],
    challenges: [
      'Designing a matching algorithm that is strict enough to be useful and loose enough to surface real matches',
      'Handling real-time notification load during peak posting hours',
      'Keeping the UI honest about how confident a match is',
    ],
    whatILearned: [
      'Role-based design changes how the entire app feels, not just the permission checks.',
      'Real-time features are about reducing friction, not adding spectacle.',
      'The right notification at the right moment is worth more than a feed of everything.',
    ],
    technologies: ['React.js', 'Node.js', 'PostgreSQL', 'Firebase'],
    stack: [
      {
        component: 'Frontend',
        techs: ['React'],
      },
      {
        component: 'Backend',
        techs: ['Node.js'],
      },
      {
        component: 'Database',
        techs: ['PostgreSQL'],
      },
      {
        component: 'Auth',
        techs: ['Firebase'],
      },
    ],
    image: 'traceq',
    gallery: ['traceq-feed', 'traceq-match'],
    github: github('traceq'),
    demo: 'https://traceq.rafi.dev',
    featured: false,
    year: '2024',
    accent: '#6C63FF',
  },
  {
    slug: 'nrf26',
    number: '05',
    title: 'NRF26 Event Platform',
    category: 'Event / Web',
    tagline: 'Digital infrastructure for a national robotics festival.',
    summary:
      'Complete digital ecosystem for EWU National RoboFest 2026: profile-frame generator, Google-Sheets-backed leaderboard, arcade game (Signal Surge), registration portal, and ambassador tools.',
    description:
      'NRF26 was not a website. It was a small operating system for a 2,000-person event: identity tools, a leaderboard, a side game, registration, and ambassador workflows, all stitched together with HTML5, Canvas, Fabric.js, and the Google Sheets API.',
    overview:
      'When the club decided to scale NRF26 to 2,000+ participants across 80+ institutions, off-the-shelf event tools were either too expensive or too rigid. So we built our own: a thin set of web tools that shared identity, data, and styling.',
    problem:
      'A national-level festival needs identity, registration, leaderboards, ambassador tooling, and a bit of fun. Buying tools for each one would blow the budget and fragment the experience.',
    solution:
      'A small set of purpose-built web tools that all share a visual identity and a Google Sheets backend: fast to ship, easy to maintain, and operable by a volunteer team.',
    features: [
      'Profile-frame generator (Canvas + Fabric.js) for participant identity',
      'Google Sheets-backed live leaderboard',
      'Signal Surge. A custom arcade mini-game for participants',
      'Registration portal with ambassador tracking',
      'Consistent visual identity across every tool',
    ],
    challenges: [
      'Coordinating design across five separate tools under one brand',
      'Keeping the Sheets-based leaderboard fast enough for live use',
      'Shipping in time for the festival while running the festival itself',
    ],
    whatILearned: [
      'Operational software is a design discipline of its own.',
      'A shared visual identity does more for trust than a polished landing page.',
      'Constraints (a tiny volunteer team, a Google Sheets backend) force clarity.',
    ],
    technologies: ['HTML5', 'Canvas', 'Fabric.js', 'Google Sheets API', 'JavaScript'],
    stack: [
      {
        component: 'Frontend',
        techs: ['HTML5', 'JavaScript', 'Canvas'],
      },
      {
        component: 'Game',
        techs: ['Fabric.js'],
      },
      {
        component: 'Data Backend',
        techs: ['Google Sheets API'],
      },
    ],
    image: 'nrf26',
    gallery: ['nrf26-frame', 'nrf26-leaderboard', 'nrf26-game'],
    github: github('nrf26-platform'),
    demo: 'https://nrf26.ewu.ac.bd',
    featured: true,
    year: '2026',
    accent: '#111318',
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

export const getProjectBySlug = (slug) =>
  projects.find((p) => p.slug === slug);

export const getAdjacentProjects = (slug) => {
  const idx = projects.findIndex((p) => p.slug === slug);
  if (idx === -1) return { prev: null, next: null };
  const prev = idx > 0 ? projects[idx - 1] : projects[projects.length - 1];
  const next = idx < projects.length - 1 ? projects[idx + 1] : projects[0];
  return { prev, next };
};