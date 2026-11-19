// Mock data representing a freelancer's workspace state
// In production this would be fetched from PostgreSQL via Prisma ORM

export const FREELANCER = {
  name: "Hamza Tariq",
  studio: "Tariq Studio",
  email: "hamza@tariqstudio.dev",
  currency: "USD",
  avatar: "HT",
};

export type MilestoneStatus = "Upcoming" | "In Progress" | "Under Review" | "Approved";
export type InvoiceStatus = "Paid" | "Pending" | "Overdue";

export interface Deliverable {
  type: "figma" | "github" | "staging" | "loom" | "file";
  label: string;
  url: string;
}

export interface Milestone {
  id: string;
  title: string;
  dueDate: string;
  budget: number;
  status: MilestoneStatus;
  deliverables: Deliverable[];
}

export interface Invoice {
  id: string;
  number: string;
  issuedDate: string;
  dueDate: string;
  amount: number;
  status: InvoiceStatus;
  paymentLink: string;
}

export interface Project {
  id: string;
  title: string;
  clientSlug: string;
  description: string;
  totalBudget: number;
  startDate: string;
  deliveryDate: string;
  milestones: Milestone[];
  invoices: Invoice[];
}

export interface Client {
  id: string;
  name: string;
  company: string;
  email: string;
  brandPrimary: string;
  brandAccent: string;
  magicLink: string;
  projects: Project[];
}

export const CLIENTS: Client[] = [
  {
    id: "client-001",
    name: "Sarah Jenkins",
    company: "Acme Corp",
    email: "sarah@acmecorp.io",
    brandPrimary: "#0F4C81",
    brandAccent: "#F59E0B",
    magicLink: "http://localhost:3000/portal/acme-corp",
    projects: [
      {
        id: "proj-001",
        title: "E-commerce Storefront Redesign",
        clientSlug: "acme-corp",
        description: "Complete redesign and redevelopment of the Acme Corp Shopify storefront with custom product filtering, wishlist, and mobile-first responsive layout.",
        totalBudget: 4800,
        startDate: "Oct 2, 2026",
        deliveryDate: "Dec 15, 2026",
        milestones: [
          {
            id: "ms-001",
            title: "Discovery, Wireframes, and Design System",
            dueDate: "Oct 20, 2026",
            budget: 1200,
            status: "Approved",
            deliverables: [
              { type: "figma", label: "Wireframe Prototype (Figma)", url: "https://figma.com/file/demo-wireframes" },
              { type: "file", label: "Design System Spec (PDF)", url: "#" },
            ],
          },
          {
            id: "ms-002",
            title: "Homepage and Product Listing Development",
            dueDate: "Nov 10, 2026",
            budget: 1600,
            status: "Under Review",
            deliverables: [
              { type: "staging", label: "Staging Build (Live Preview)", url: "https://acme-staging.vercel.app" },
              { type: "github", label: "GitHub Repository", url: "https://github.com/Abdul-Monim" },
              { type: "loom", label: "Walkthrough Recording (Loom)", url: "https://loom.com/share/demo" },
            ],
          },
          {
            id: "ms-003",
            title: "Cart, Checkout, and Payment Integration",
            dueDate: "Dec 1, 2026",
            budget: 1200,
            status: "In Progress",
            deliverables: [],
          },
          {
            id: "ms-004",
            title: "QA Testing, Performance Optimization, and Launch",
            dueDate: "Dec 15, 2026",
            budget: 800,
            status: "Upcoming",
            deliverables: [],
          },
        ],
        invoices: [
          { id: "inv-001", number: "INV-2026-001", issuedDate: "Oct 2, 2026",  dueDate: "Oct 10, 2026", amount: 1200, status: "Paid",    paymentLink: "#" },
          { id: "inv-002", number: "INV-2026-002", issuedDate: "Nov 1, 2026",  dueDate: "Nov 15, 2026", amount: 1600, status: "Pending", paymentLink: "#" },
          { id: "inv-003", number: "INV-2026-003", issuedDate: "Dec 1, 2026",  dueDate: "Dec 10, 2026", amount: 1200, status: "Pending", paymentLink: "#" },
          { id: "inv-004", number: "INV-2026-004", issuedDate: "Dec 15, 2026", dueDate: "Dec 25, 2026", amount: 800,  status: "Pending", paymentLink: "#" },
        ],
      },
    ],
  },
  {
    id: "client-002",
    name: "Ahmed Raza",
    company: "BrightTech Solutions",
    email: "ahmed@brighttech.pk",
    brandPrimary: "#065F46",
    brandAccent: "#10B981",
    magicLink: "http://localhost:3000/portal/brighttech",
    projects: [
      {
        id: "proj-002",
        title: "Internal HR Dashboard (MVP)",
        clientSlug: "brighttech",
        description: "React-based internal HR management dashboard for employee onboarding, leave tracking, and payroll summaries.",
        totalBudget: 3200,
        startDate: "Nov 1, 2026",
        deliveryDate: "Jan 20, 2027",
        milestones: [
          { id: "ms-005", title: "Requirements and Database Schema", dueDate: "Nov 15, 2026", budget: 600,  status: "Approved",  deliverables: [{ type: "file", label: "Schema Diagram (PDF)", url: "#" }] },
          { id: "ms-006", title: "Employee Management Module",       dueDate: "Dec 5, 2026",  budget: 1200, status: "In Progress", deliverables: [] },
          { id: "ms-007", title: "Leave and Payroll Module",         dueDate: "Jan 5, 2027",  budget: 1000, status: "Upcoming",  deliverables: [] },
          { id: "ms-008", title: "Testing and Deployment",            dueDate: "Jan 20, 2027", budget: 400,  status: "Upcoming",  deliverables: [] },
        ],
        invoices: [
          { id: "inv-005", number: "INV-2026-005", issuedDate: "Nov 1, 2026",  dueDate: "Nov 10, 2026", amount: 600,  status: "Paid",    paymentLink: "#" },
          { id: "inv-006", number: "INV-2026-006", issuedDate: "Nov 20, 2026", dueDate: "Nov 30, 2026", amount: 1200, status: "Overdue", paymentLink: "#" },
        ],
      },
    ],
  },
  {
    id: "client-003",
    name: "Lena Müller",
    company: "NordBrand GmbH",
    email: "lena@nordbrand.de",
    brandPrimary: "#1E1B4B",
    brandAccent: "#A855F7",
    magicLink: "http://localhost:3000/portal/nordbrand",
    projects: [
      {
        id: "proj-003",
        title: "Portfolio and Brand Website",
        clientSlug: "nordbrand",
        description: "Multilingual brand portfolio website with Framer Motion animations, case studies, and a contact inquiry system.",
        totalBudget: 2200,
        startDate: "Nov 10, 2026",
        deliveryDate: "Dec 30, 2026",
        milestones: [
          { id: "ms-009", title: "Design Mockups and Prototype",    dueDate: "Nov 25, 2026", budget: 700,  status: "Under Review", deliverables: [{ type: "figma", label: "Full Design Mockup (Figma)", url: "https://figma.com/file/demo-nordbrand" }] },
          { id: "ms-010", title: "Development and Animation Build", dueDate: "Dec 15, 2026", budget: 1100, status: "Upcoming",     deliverables: [] },
          { id: "ms-011", title: "Launch and DNS Handover",          dueDate: "Dec 30, 2026", budget: 400,  status: "Upcoming",     deliverables: [] },
        ],
        invoices: [
          { id: "inv-007", number: "INV-2026-007", issuedDate: "Nov 10, 2026", dueDate: "Nov 20, 2026", amount: 700, status: "Paid",    paymentLink: "#" },
          { id: "inv-008", number: "INV-2026-008", issuedDate: "Dec 1, 2026",  dueDate: "Dec 10, 2026", amount: 1100, status: "Pending", paymentLink: "#" },
        ],
      },
    ],
  },
];
