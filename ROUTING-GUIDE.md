# Portfolio Routing Structure Guide

## 📁 File Structure

```
your-portfolio/
├── app/  (or pages/)
│   ├── projects/
│   │   ├── page.tsx                      # Main portfolio page (domain overview)
│   │   ├── [slug]/
│   │   │   └── page.tsx                  # Individual project detail page
│   │   └── layout.tsx (optional)         # Shared layout for all project pages
│   │
│   └── ...other pages
│
├── components/
│   ├── PortfolioMainPage.tsx             # Component for main portfolio
│   ├── ProjectDetailPage.tsx             # Component for project details
│   └── ...other components
│
├── data/
│   └── portfolio-projects-optimized.json # All project data
│
└── styles/
    └── PortfolioPages.css                # All portfolio styles
```

---

## 🌐 URL Structure

### **Main Portfolio Page**
```
yoursite.com/projects
```
Shows all 3 domains with project highlights

### **Individual Project Pages**
```
yoursite.com/projects/renode
yoursite.com/projects/flash-tool
yoursite.com/projects/adbms
yoursite.com/projects/flex-pdu-testing
yoursite.com/projects/matter-thread
yoursite.com/projects/rust-embedded
yoursite.com/projects/recording-breaker
yoursite.com/projects/smart-wifi-testing
```

### **Domain Filtering (Optional)**
```
yoursite.com/projects?domain=emobility
yoursite.com/projects?domain=iot
yoursite.com/projects?domain=infrastructure
```

---

## 🔗 Project Slug Mapping

| Project ID | Title | Slug | URL |
|------------|-------|------|-----|
| 8 | Renode Simulation Platform | `renode` | `/projects/renode` |
| 9 | Flex PDU Flash Tool | `flash-tool` | `/projects/flash-tool` |
| 11 | ADBMS Battery Management | `adbms` | `/projects/adbms` |
| 10 | Flex PDU HiL Testing | `flex-pdu-testing` | `/projects/flex-pdu-testing` |
| 5 | Matter and Thread Protocol | `matter-thread` | `/projects/matter-thread` |
| 6 | Rust Embedded Development | `rust-embedded` | `/projects/rust-embedded` |
| 2 | Recording Breaker Diagnostics | `recording-breaker` | `/projects/recording-breaker` |
| 4 | Smart WiFi Devices Testing | `smart-wifi-testing` | `/projects/smart-wifi-testing` |

---

## 🚀 Implementation Steps

### **Step 1: Set Up Next.js Routing**

#### For Next.js 13+ (App Router)
```
app/
├── projects/
│   ├── page.tsx              # Main portfolio page
│   └── [slug]/
│       └── page.tsx          # Dynamic project pages
```

#### For Next.js Pages Router
```
pages/
├── projects/
│   ├── index.tsx             # Main portfolio page
│   └── [slug].tsx            # Dynamic project pages
```

---

### **Step 2: Main Portfolio Page (Next.js App Router)**

```tsx
// app/projects/page.tsx
import PortfolioMainPage from '@/components/PortfolioMainPage';
import portfolioData from '@/data/portfolio-projects-optimized.json';

export const metadata = {
  title: 'Projects | Poorvi Bhaskar',
  description: 'Featured engineering projects in E-Mobility, IoT, and Firmware Infrastructure',
};

export default function ProjectsPage() {
  return <PortfolioMainPage />;
}
```

---

### **Step 3: Dynamic Project Pages (Next.js App Router)**

```tsx
// app/projects/[slug]/page.tsx
import ProjectDetailPage from '@/components/ProjectDetailPage';
import { getAllProjects } from '@/lib/projects';
import { notFound } from 'next/navigation';

// Generate all project paths at build time
export async function generateStaticParams() {
  const allProjects = getAllProjects();
  return allProjects.map((project) => ({
    slug: project.slug,
  }));
}

// Generate metadata for each project
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const allProjects = getAllProjects();
  const project = allProjects.find((p) => p.slug === params.slug);

  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  return {
    title: `${project.title} | Poorvi Bhaskar`,
    description: project.tagline,
  };
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const allProjects = getAllProjects();
  const project = allProjects.find((p) => p.slug === params.slug);

  if (!project) {
    notFound();
  }

  return <ProjectDetailPage params={params} />;
}
```

---

### **Step 4: Helper Functions**

Create a utility file for project data:

```tsx
// lib/projects.ts
import portfolioData from '@/data/portfolio-projects-optimized.json';

export interface Project {
  id: number;
  title: string;
  slug: string;
  tagline: string;
  description: string;
  situation: string;
  action: string;
  result: string;
  techTags: string[];
  impact: { [key: string]: string };
  category: string[];
  type: string;
  isFeatured: boolean;
  displayOrder: number;
  media?: {
    thumbnail: string;
    gallery?: string[];
  };
  links?: Array<{
    type: string;
    label: string;
    url: string;
    internal: boolean;
  }>;
  domainId?: string;
  domainTitle?: string;
  domainIcon?: string;
  domainColor?: string;
}

// Get all projects from all domains
export function getAllProjects(): Project[] {
  const allProjects: Project[] = [];
  
  portfolioData.portfolioProjects.domains.forEach((domain) => {
    domain.projects.forEach((project) => {
      allProjects.push({
        ...project,
        domainId: domain.id,
        domainTitle: domain.title,
        domainIcon: domain.icon,
        domainColor: domain.color,
      });
    });
  });
  
  return allProjects;
}

// Get project by slug
export function getProjectBySlug(slug: string): Project | undefined {
  const allProjects = getAllProjects();
  return allProjects.find((p) => p.slug === slug);
}

// Get projects by domain
export function getProjectsByDomain(domainId: string): Project[] {
  const allProjects = getAllProjects();
  return allProjects.filter((p) => p.domainId === domainId);
}

// Get featured projects
export function getFeaturedProjects(): Project[] {
  const allProjects = getAllProjects();
  return allProjects.filter((p) => p.isFeatured);
}
```

---

## 🎨 Navigation Flow

### **User Journey Example:**

1. **User lands on main portfolio page:**
   ```
   yoursite.com/projects
   ```
   - Sees hero with impact metrics
   - Sees 3 domain sections
   - Each domain shows 3 project cards

2. **User clicks "Renode Simulation Platform":**
   ```
   yoursite.com/projects/renode
   ```
   - Full page dedicated to Renode project
   - STAR format breakdown
   - Tech stack details
   - Links to GitHub repo
   - "View All Projects" button to return

3. **User clicks "More E-Mobility Projects":**
   ```
   yoursite.com/projects?domain=emobility
   ```
   - Main portfolio page with E-Mobility filter applied
   - Shows only E-Mobility projects

---

## 🔗 Link Examples in Your Components

### **Main Portfolio Page (Project Card)**
```tsx
<Link href={`/projects/${project.slug}`}>
  <div className="project-card">
    <h3>{project.title}</h3>
    <p>{project.tagline}</p>
    <button>View Full Case Study →</button>
  </div>
</Link>
```

### **Project Detail Page (Navigation)**
```tsx
{/* Back to all projects */}
<Link href="/projects">
  ← View All Projects
</Link>

{/* Back to domain */}
<Link href={`/projects?domain=${project.domainId}`}>
  More {project.domainTitle} Projects →
</Link>

{/* Next project */}
<Link href={`/projects/${nextProject.slug}`}>
  Next: {nextProject.title} →
</Link>
```

---

## 📱 Mobile Navigation

Add a sticky header on project detail pages:

```tsx
<div className="mobile-nav-sticky">
  <Link href="/projects">← Back to Projects</Link>
  <h3>{project.title}</h3>
</div>
```

---

## 🎯 SEO Optimization

### **Sitemap.xml Example**
```xml
<url>
  <loc>https://yoursite.com/projects</loc>
  <priority>0.9</priority>
</url>
<url>
  <loc>https://yoursite.com/projects/renode</loc>
  <priority>0.8</priority>
</url>
<url>
  <loc>https://yoursite.com/projects/flash-tool</loc>
  <priority>0.8</priority>
</url>
<!-- Add all 8 project URLs -->
```

### **robots.txt**
```
User-agent: *
Allow: /projects
Allow: /projects/*
Sitemap: https://yoursite.com/sitemap.xml
```

---

## 🚦 Example Page Flow Diagram

```
Homepage
   │
   ├─→ /projects (Main Portfolio)
   │      │
   │      ├─→ E-Mobility Section
   │      │      ├─→ /projects/flash-tool
   │      │      ├─→ /projects/flex-pdu-testing
   │      │      └─→ /projects/adbms
   │      │
   │      ├─→ IoT Section
   │      │      ├─→ /projects/matter-thread
   │      │      ├─→ /projects/smart-wifi-testing
   │      │      └─→ /projects/recording-breaker
   │      │
   │      └─→ Infrastructure Section
   │             ├─→ /projects/renode
   │             ├─→ /projects/rust-embedded
   │             └─→ /projects/flash-tool
   │
   └─→ Each project page has:
          - Full STAR breakdown
          - Tech stack
          - Links (GitHub, docs)
          - Back to portfolio button
```

---

## 🎨 Visual Consistency

### **Shared Elements Across Pages:**

1. **Header/Navigation** - Same on all pages
2. **Footer** - Same on all pages
3. **Domain Colors** - Consistent across main + detail pages
4. **Typography** - Same font family and hierarchy
5. **Spacing** - Consistent padding/margins

### **Layout Component (Optional)**

```tsx
// app/projects/layout.tsx
export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="projects-layout">
      <nav className="projects-nav">
        {/* Optional sticky navigation */}
      </nav>
      <main>{children}</main>
    </div>
  );
}
```

---

## ✅ Testing Checklist

- [ ] All 8 project pages render correctly
- [ ] Links from main page → detail pages work
- [ ] Links from detail pages → main page work
- [ ] Domain filtering works (if implemented)
- [ ] Breadcrumb navigation works
- [ ] GitHub/docs links open correctly
- [ ] Mobile navigation is smooth
- [ ] Page transitions are smooth
- [ ] SEO meta tags are correct
- [ ] All images load properly

---

## 🚀 Deployment Checklist

### **Before Deploying:**

1. **Test all routes locally:**
   ```bash
   npm run dev
   # Visit http://localhost:3000/projects
   # Click through all 8 project pages
   ```

2. **Build for production:**
   ```bash
   npm run build
   ```

3. **Check build output for static pages:**
   ```
   ✓ Generating static pages (9/9)
     ├ /projects
     ├ /projects/renode
     ├ /projects/flash-tool
     ├ /projects/adbms
     ├ /projects/flex-pdu-testing
     ├ /projects/matter-thread
     ├ /projects/rust-embedded
     ├ /projects/recording-breaker
     └ /projects/smart-wifi-testing
   ```

4. **Deploy to Vercel/Netlify:**
   ```bash
   vercel --prod
   # or
   netlify deploy --prod
   ```

---

## 🎯 Quick Commands

```bash
# Create project structure
mkdir -p app/projects/\[slug\]
touch app/projects/page.tsx
touch app/projects/\[slug\]/page.tsx

# Copy components
cp PortfolioMainPage.tsx components/
cp ProjectDetailPage.tsx components/

# Copy data
mkdir -p data
cp portfolio-projects-optimized.json data/

# Copy styles
cp PortfolioPages.css styles/
```

---

## 📝 Summary

**Two-Level Structure:**
1. `/projects` - Main page with 3 domains, project highlights
2. `/projects/[slug]` - Individual project pages with full STAR details

**User Flow:**
- Browse domains → Click project card → View full case study → Return to browse

**Files Needed:**
- `PortfolioMainPage.tsx` (main portfolio)
- `ProjectDetailPage.tsx` (individual projects)
- `PortfolioPages.css` (all styles)
- `portfolio-projects-optimized.json` (data)
- `lib/projects.ts` (helper functions)

**Result:**
✅ Clean navigation
✅ SEO-friendly URLs
✅ Fast page loads (static generation)
✅ Professional presentation
✅ Easy to maintain

Ready to implement! 🚀
