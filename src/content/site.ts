import { images, type ImageKey } from "./images";

export const site = {
  name: "D’Dezignz Interiors",
  email: "deviirtt@gmail.com",
  phones: ["+91 6363738685", "+91 9241812825", "+91 9916556582"],
  address: "Gattahalli, Bengaluru, Karnataka, India",
  web3formsAccessKey: (import.meta.env as Record<string, string | undefined>)["VITE_WEB3FORMS_ACCESS_KEY"] || "13d8aa91-792e-47d6-99a6-003f0125b5d8",
  nav: [
    { to: "/", label: "Home" },
    { to: "/about", label: "Studio" },
    { to: "/services", label: "Services" },
    { to: "/projects", label: "Projects" },
    { to: "/journal", label: "Journal" },
    { to: "/contact", label: "Contact" },
  ] as const,
};

export const categories = [
  "All Projects", "Residential", "Living Room", "Bedroom", "Kitchen", "False Ceiling",
  "Dresser", "Foyer", "Study", "Commercial", "Renovations",
] as const;

export type Project = {
  slug: string;
  title: string;
  category: "Residential" | "Renovations";
  cover: ImageKey;
  gallery: ImageKey[];
  featured?: boolean;
};

const keys: ImageKey[] = [
  "living",
  "bedroom",
  "kitchen",
  "partition",
  "foyer",
  "lounge",
  "bedroomSuite",
  "bedroomWardrobe",
  "residenceLiving",
  "compactBedroom",
  "openPlanHall",
  "craftJoinery",
  "cabinetryDetail",
  "storage",
];
const slugify = (s: string) =>
  s.toLowerCase().replace(/[’'&]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const residential = [
  "Archana’s Elegant Abode", "Ashwini & Pradeesh’s Home", "Godrej House", "Assetz House",
  "Hennur", "Horammavu", "Madipakkam", "Parkway Homes", "Eden Park House", "GPR House",
  "Kumbakonam House", "Housur House", "Meena Villa", "SJR Hamilton", "Ramamurthy Nagar House",
  "Anusharathy", "Paramathy", "Catherine",
];
const renovations = [
  "Ajeesh House Renovation", "Attrium House Renovation", "Praveena Raja House Renovation",
  "Pratheeba Vijay House Renovation", "Somasundarampalaya House Renovation", "GPR House Renovation",
];

export const projects: Project[] = [
  ...residential.map((title, i) => ({ title, category: "Residential" as const, i })),
  ...renovations.map((title, i) => ({ title, category: "Renovations" as const, i: i + 3 })),
].map(({ title, category, i }) => ({
  slug: slugify(title),
  title,
  category,
  cover: keys[i % keys.length]!,
  gallery: [1, 2, 3].map((d) => keys[(i + d) % keys.length]!),
  featured: i < 4 && category === "Residential",
}));

export const imageOf = (k: ImageKey) => images[k];

export type Service = { slug: string; title: string; description: string; image: ImageKey };
export const services: Service[] = [
  { slug: "residential", title: "Residential Interiors", description: "Complete home interiors planned around how your household actually lives — layout, storage, materials and light.", image: "residenceLiving" },
  { slug: "commercial", title: "Commercial Interiors", description: "Working spaces that are practical for daily use and considered in character.", image: "craftJoinery" },
  { slug: "kitchen", title: "Kitchen Design", description: "Kitchens planned for workflow first, then finished with durable, distinctive materials.", image: "kitchen" },
  { slug: "bedroom", title: "Bedroom Design", description: "Calm, restful rooms with well-planned storage and layered lighting.", image: "bedroom" },
  { slug: "living", title: "Living Room Design", description: "The social centre of the home — composed for comfort, conversation and display.", image: "living" },
  { slug: "ceiling", title: "False Ceiling and Lighting", description: "Ceiling forms and lighting that shape the mood and proportion of a room.", image: "lounge" },
  { slug: "dresser-study", title: "Dresser and Study", description: "Compact, precise built-ins that make everyday routines easier.", image: "storage" },
  { slug: "foyer", title: "Foyer Design", description: "The first impression of your home, made deliberate.", image: "foyer" },
  { slug: "renovation", title: "Renovation and Interior Improvements", description: "Reworking existing spaces to function better and feel new again.", image: "partition" },
];

export const capabilities = [
  { title: "Carpentry & Custom Furniture", note: "Built-ins and furniture made to fit the space." },
  { title: "Wood Carving", note: "Detailed carved elements and panels." },
  { title: "Precision Cutting", note: "Clean, accurate cuts for exacting joinery." },
  { title: "False Ceiling Installation", note: "Ceiling forms, coves and integrated lighting." },
  { title: "Electrical Work", note: "Lighting and electrical points planned with the design." },
  { title: "Steel Fabrication", note: "Custom metalwork and structural details." },
  { title: "Painting", note: "Wall finishes and colour application." },
  { title: "Wallpaper", note: "Selection and installation." },
  { title: "Granite, Quartz, Marble & Tile", note: "Stone and tile installation for floors, walls and counters." },
  { title: "Furniture & Home Décor", note: "Finishing pieces that complete the room." },
];

export type Article = { slug: string; title: string; category: string; cover: ImageKey; excerpt?: string; body?: string };
// Article bodies have not yet been migrated from the original website.
export const articles: Article[] = [
  { slug: "interior-planning", title: "Interior Planning", category: "Planning", cover: "living" },
  { slug: "aesthetics", title: "Aesthetics", category: "Design", cover: "foyer" },
  { slug: "vastu", title: "Vastu", category: "Planning", cover: "hero" },
  { slug: "home-handover-checklist", title: "Home Handover Checklist", category: "Guides", cover: "study" },
  { slug: "plumbing-best-practices", title: "Plumbing Best Practices", category: "Guides", cover: "kitchen" },
  { slug: "why-kitchen-first", title: "Why Kitchen First?", category: "Kitchen", cover: "kitchen" },
  { slug: "main-factors-in-kitchen-design", title: "Main Factors in Kitchen Design", category: "Kitchen", cover: "kitchen" },
  { slug: "dos-and-donts-of-kitchen-design", title: "Do’s and Don’ts of Kitchen Design", category: "Kitchen", cover: "kitchen" },
  { slug: "integral-parts-of-a-fully-functional-kitchen", title: "Integral Parts of a Fully Functional Kitchen", category: "Kitchen", cover: "kitchen" },
  { slug: "bedroom-planning", title: "Bedroom Planning", category: "Bedroom", cover: "bedroom" },
  { slug: "planning-your-childs-bedroom", title: "Planning Your Child’s Bedroom", category: "Bedroom", cover: "bedroom" },
];
