export type ProjectSlug = "credability" | "repdaily" | "readygo";

export type ProjectContent = {
  challenge: string;
  uxThinking: string;
  execution: string;
  impact: string[];
};

export type Project = {
  slug: ProjectSlug;
  client: string;
  year: string;
  role: string;
  service: string;
  title: string;
  hookSummary: string;
  headerSubtitle: string;
  content: ProjectContent;
  images: string[];
};

function projectImages(slug: ProjectSlug, count: number): string[] {
  return Array.from(
    { length: count },
    (_, index) => `/projects/${slug}/slide-${index + 1}.png`,
  );
}

export const projects: Project[] = [
  {
    slug: "credability",
    client: "ThinkMoney Group",
    year: "2019–2022",
    role: "Founding Product Designer",
    service: "Ecosystem Design, App & Web",
    title: "CREDABILITY",
    hookSummary:
      "0 to 2.5 Million Users. Founding product designer for a regulated fintech platform. Led the end-to-end design ecosystem from day zero through to mass market scale.",
    headerSubtitle:
      "From zero to 2.5 million registered users. Joining at day one as the founding product designer, I spent four years embedded across strategy, growth, compliance, and delivery to scale the platform.",
    content: {
      challenge:
        "Designing in the regulated fintech space means every UI decision carries compliance weight. The core challenge was balancing strict data capture requirements with absolute user clarity—often for an audience that was financially vulnerable. Getting the balance right between regulatory obligation and a frictionless user experience wasn't optional. It was the entire job.",
      uxThinking:
        "The platform scaled in real time. Because there was no blank canvas, every iteration was driven by active data from Mixpanel and HotJar. Funnel analytics identified severe friction in the core sign-up process. I mapped the entire flow and reduced a 15-screen, 19-input journey down to just 6 screens—without dropping a single legal compliance requirement. Additionally, CRM data revealed a heavy drop-off of users whose sole intent was acquiring a credit card. Rather than forcing them through the heavy, generalised onboarding, I designed a dedicated 'Credit Card First' lightweight journey. Full onboarding was deferred until after their application was successful. This single strategic shift drove a 3–4x improvement in completion rates.",
      execution:
        "I operated as the connective tissue between Product, Engineering, Data, and Compliance teams. Establishing a shared design system allowed us to translate complex financial strategy into clear UX decisions, communicating those requirements efficiently to engineering to maintain high delivery velocity.",
      impact: [
        "2.5 Million registered users.",
        "500,000+ weekly active users.",
        "4–8% consistent year-on-year growth in paid adoption for the DarkWeb Shield subscription.",
        "3–4x improvement in targeted application completion rates.",
      ],
    },
    images: projectImages("credability", 6),
  },
  {
    slug: "repdaily",
    client: "ToDo Engineering",
    year: "2026",
    role: "Product Design",
    service: "App Design, AI Workflow Integration",
    title: "REPDAILY",
    hookSummary:
      "103 Days to Launch. A camera-based fitness tracking app built by a two-person team. Designed, prototyped, and shipped using an advanced AI-assisted engineering workflow.",
    headerSubtitle:
      "A two-person team. 103 days from concept to launch-ready product. RepDaily is a computer-vision tracking app that automatically counts reps via the front camera, allowing users to focus entirely on effort and form.",
    content: {
      challenge:
        "The tracking mechanic was technically achievable, but the real brief was user retention. Most fitness apps lose users within two weeks because they fail to provide a compelling reason to return. Additionally, the camera-based calibration had to be flawless—if the initial setup felt awkward, the product would fail at the exact moment it needed to work.",
      uxThinking:
        "Before any UI was designed, I mapped the complete product ecosystem across six flow systems: onboarding, calibration, core training loop, progression, dashboard states, and CRM lifecycle. To de-risk the build, a beta committee of personal trainers and early users ran structured feedback loops, which directly reshaped the calibration flow and dashboard hierarchy. The product strategy also involved a deliberate Free vs. Paid split; rather than crippling the free tier, the Pro version was designed to offer meaningful, structured progression mechanics.",
      execution:
        "RepDaily was a live stress-test of a modern, lean engineering workflow. Alongside Figma for system design, I used a cross-LLM prompt development process to iterate UX rationale and product decisions across Claude and other models. Crucially, Cursor was deployed to rapidly prototype test sandbox modules, exploring live-coded design concepts and UI interactions at a speed traditional wireframing simply cannot match. This AI stack was not a shortcut; it was a pipeline that allowed a two-person team to execute at the scale of five.",
      impact: [
        "103 Days from initial concept to launch-ready product.",
        "40+ Screens designed across iOS and Android, including a full brand identity and design system.",
        "V1 Architecture structured to scale seamlessly into V2 features (leaderboards and social challenges) without requiring a rebuild.",
      ],
    },
    images: projectImages("repdaily", 12),
  },
  {
    slug: "readygo",
    client: "ToDo Engineering",
    year: "2026",
    role: "Product Design",
    service: "App Design, AI Workflow Integration",
    title: "READYGO",
    hookSummary:
      "Concept to Live Beta. A pre-activity planning app for runners and cyclists. Designed and shipped using a fully integrated AI workflow stack to bypass sequential handoffs.",
    headerSubtitle:
      "From a single friction insight to a live beta product. ReadyGo removes the gap between deciding to go out and actually going—built end-to-end using an advanced AI-assisted workflow.",
    content: {
      challenge:
        "ReadyGo is a pre-activity planning app built around a specific window: the ten minutes before a session begins. When the window opens, the questions start—What's the weather? Have I got time? What gear do I need? ReadyGo is a thinking engine, not a tracker. It generates a ready-to-go session in seconds based on a personalised activity profile. The core UX challenge was extreme restraint. The platform is data-heavy (weather, routing, nutrition, gear), but the interface had to anchor to one job: generate a plan fast enough that it becomes a habit, not a task.",
      uxThinking:
        "As the second product out of ToDo Engineering, ReadyGo was a deliberate stress test of how far a lean, AI-assisted workflow could stretch. Rather than moving sequentially from design to handoff, the pipeline ran in parallel. Figma was used strictly for system design, while Cursor and Claude Code handled prototyping and frontend scaffolding.",
      execution:
        "Gemini and Claude were integrated for rapid ideation and copy refinement. Low-fidelity UI components drawn from the design system fed directly into coded sandbox environments for immediate testing—compressing what would typically take a week of back-and-forth into a single day. Additionally, Adobe Firefly was used to generate a consistent visual library focused entirely on the preparation moment, ensuring the brand lived in the exact mindset of the user before they hit the road.",
      impact: [
        "Full screen design completed in just 2 days; feature prototypes ready for user testing in 1.5 days.",
        "Shipped to public beta on Google Play (V0.1) with iOS in review.",
        "Supported by a structured usability programme capturing contextual, in-app feedback from early users.",
      ],
    },
    images: projectImages("readygo", 6),
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
