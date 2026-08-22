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
    tagline: 'Smart last-mile delivery through graph-based routing.',
    summary:
      'My undergrad capstone. A delivery optimization platform that groups nearby stops, selects practical parking positions, and plans walking routes — backed by a FastAPI service, PostgreSQL + PostGIS, and an Android driver app.',
    description:
      'Dropify is built around the last-mile problem: too many individual stops, inefficient vehicle stopping, and walking from parking positions. It groups nearby deliveries, picks a parking position, and plans walking routes that drivers can actually follow.',
    overview:
      'As my undergrad capstone, Dropify explores how graph algorithms and real road-network data can turn chaotic urban delivery lists into structured, walkable routes. The system models the area as a graph of OpenStreetMap nodes, picks practical vehicle stopping positions along the road edge, and plans the walking segment using OSM footpaths.',
    capstone: true,
    problem:
      'Last-mile delivery in dense urban areas wastes time when vehicles stop at every address. Many stops are within walking distance of a single good parking position, but no one is calculating which position minimizes total walking time — drivers are.',
    solution:
      'Dropify clusters nearby deliveries, snaps candidate parking positions to the nearest road edge using OSM data, interpolates positions with Shapely, and runs graph search (NetworkX + OSRM) to find the shortest walking path. Drivers see turn-by-turn walking directions; managers see a live hub view.',
    architecture: [
      { name: 'Hub Manager Dashboard', detail: 'React-based operations view' },
      { name: 'FastAPI Backend', detail: 'Routing & orchestration service' },
      { name: 'PostgreSQL + PostGIS', detail: 'Spatial data store' },
      { name: 'OSRM / NetworkX', detail: 'Graph routing engine' },
      { name: 'Driver Android App', detail: 'MVVM architecture' },
    ],
    features: [
      'Route optimization over real OSM road graph',
      'Parking-position interpolation via Shapely edge snapping',
      'Live map visualization with Folium',
      'FastAPI service layer for routing requests',
      'Full Android driver app in MVVM architecture',
      'Real-time hub dashboard for managers',
    ],
    challenges: [
      'Snapping parking positions to the correct side of one-way streets',
      'Balancing cluster size vs walking distance per stop',
      'Handling graph search latency for large delivery sets',
      'Coordinating state between the hub dashboard and Android driver app',
    ],
    whatILearned: [
      'Spatial data is harder than it looks — coordinate systems, projections, and snapping matter.',
      'Graph algorithms only feel fast when your data model is right.',
      'A driver app is the truest test of a delivery system; if it is not usable in the field, nothing else matters.',
    ],
    technologies: ['Python', 'NetworkX', 'Folium', 'FastAPI', 'Android', 'Shapely'],
    stack: [
      'React',
      'FastAPI',
      'PostgreSQL',
      'PostGIS',
      'OSRM',
      'NetworkX',
      'Android',
      'Shapely',
    ],
    image: 'dropify',
    gallery: ['dropify-map', 'dropify-dashboard', 'dropify-app'],
    github: github('dropify'),
    demo: 'https://dropify-demo.rafi.dev',
    featured: true,
    year: '2026',
    accent: '#6C63FF',
  },
  {
    slug: 'caselaw-rag',
    number: '02',
    title: 'CaseLaw RAG',
    category: 'AI / Retrieval',
    tagline: 'Hybrid retrieval for U.S. federal case law.',
    summary:
      'A hybrid BM25 + FAISS retrieval pipeline for federal case law, grounded in LangGraph orchestration and LLaMA 3.3-70B through Groq — wrapped in a judicial-style Gradio interface.',
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
      'Grounding is a UI problem as much as a model problem — the interface must show the user where the answer came from.',
      'Agent graphs (LangGraph) make pipelines debuggable in a way raw scripts do not.',
    ],
    technologies: ['Python', 'FAISS', 'LangGraph', 'Groq', 'Gradio', 'BM25'],
    stack: ['Python', 'FAISS', 'BM25', 'LangGraph', 'Groq', 'LLaMA 3.3-70B', 'Gradio'],
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
      'Built around the Spotify audio-features API, this system engineers similarity over tempo, energy, danceability, valence, and acousticness — then surfaces tracks a listener is statistically likely to enjoy.',
    overview:
      'The project starts from the Spotify Web API and ends at a personalized recommendation feed. Between those two points sits a feature-engineering pipeline, a similarity scoring engine, and a lightweight web frontend.',
    problem:
      'Pure collaborative filtering needs lots of user history. For cold or casual listeners, content-based filtering over audio features is a better default — and it is also more explainable.',
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
      'Recommendation is rarely a model problem — it is a data shaping problem.',
      'Even simple similarity metrics feel powerful when the feature engineering is right.',
      'Explainability beats sophistication for end-user recommendation UIs.',
    ],
    technologies: ['Python', 'Scikit-learn', 'Spotify API', 'Pandas'],
    stack: ['Python', 'Scikit-learn', 'Spotify API', 'Pandas'],
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
    stack: ['React', 'Node.js', 'PostgreSQL', 'Firebase'],
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
      'Complete digital ecosystem for EWU National RoboFest 2026 — profile-frame generator, Google-Sheets-backed leaderboard, arcade game (Signal Surge), registration portal, and ambassador tools.',
    description:
      'NRF26 was not a website. It was a small operating system for a 2,000-person event: identity tools, a leaderboard, a side game, registration, and ambassador workflows — all stitched together with HTML5, Canvas, Fabric.js, and the Google Sheets API.',
    overview:
      'When the club decided to scale NRF26 to 2,000+ participants across 80+ institutions, off-the-shelf event tools were either too expensive or too rigid. So we built our own: a thin set of web tools that shared identity, data, and styling.',
    problem:
      'A national-level festival needs identity, registration, leaderboards, ambassador tooling, and a bit of fun. Buying tools for each one would blow the budget and fragment the experience.',
    solution:
      'A small set of purpose-built web tools that all share a visual identity and a Google Sheets backend — fast to ship, easy to maintain, and operable by a volunteer team.',
    features: [
      'Profile-frame generator (Canvas + Fabric.js) for participant identity',
      'Google Sheets-backed live leaderboard',
      'Signal Surge — a custom arcade mini-game for participants',
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
    stack: ['HTML5', 'Canvas', 'Fabric.js', 'Google Sheets API', 'JavaScript'],
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