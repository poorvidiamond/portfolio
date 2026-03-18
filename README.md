# Poorvi Bhaskar - Firmware Engineer Portfolio

A highly optimized, modular Next.js portfolio built to showcase cross-stack embedded engineering experience, technical leadership, and hardware/software projects. It leverages modern web frameworks to provide a completely static, lighting-fast experience with seamless animations.

![Portfolio Preview](/public/profile.jpg)

## Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) & [Lucide React](https://lucide.dev/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Data Management:** Local JSON files acting as a lightweight headless CMS
- **Deployment:** Vercel (CD via GitHub Actions)

## Folder Structure

The repository cleanly separates layout logic, reusable components, and content data:

```text
src/
├── app/             # Next.js App Router endpoints (URLs)
├── components/      # Reusable UI React components
│   ├── layout/      # Navbar, Footers
│   ├── profile/     # Hero, Education, Featured Work, Interests
│   ├── projects/    # Detailed project cards and filters
│   ├── shared/      # Global shared elements (like Analytics)
│   └── volunteer/   # Modular volunteering UI
├── data/            # JSON files containing all portfolio content
└── lib/             # Utility configurations (like ThemeProvider)
```

## Content Management (CMS)

Updating the portfolio **does not require writing code.** All core content—including your resume, project metrics, case studies, and skills—is strictly driven by formatted JSON files inside `src/data/`. 

To update content, simply edit the corresponding file:
- `experience.json`: Professional history and internships
- `portfolio-projects-optimized.json`: The core projects, domains, and individual case studies
- `skills.json`: Technical skills and proficiency scoring
- `leadership.json`: Organizational initiatives and leadership roles

## Local Development

Ensure you have Node.js (v20+) installed.

```bash
# 1. Install dependencies
npm ci

# 2. Run the local development server with Hot Module Reloading
npm run dev
```
Navigate to `http://localhost:3000` to view the site.

## CI/CD Pipeline & Deployment

The portfolio is configured with a robust CI/CD workflow.

### Automated Cloud Deployment (Vercel)
Any changes pushed to the `main` branch on GitHub automatically trigger a Vercel production build. Ensure the build passes TypeScript definitions and linting.

### Local Publish & Validation
Before pushing large changes to GitHub, it is highly recommended to simulate the cloud pipeline locally. You can do this automatically via the provided script:

```powershell
# Run the local prepublish pipeline
.\local_pipeline.ps1
```
This script sequentially runs the ESLint checker, compiles the optimized Next.js production build, and instantly hosts a live production-identical server at `localhost:3000` to verify how the code behaves globally.
