// pages/projects/index.tsx or app/projects/page.tsx
// Main Portfolio Landing Page - Shows 3 Domains with Project Highlights

import React from 'react';
import Link from 'next/link';
import { portfolioProjects } from '@/data/portfolio-projects-optimized.json';

interface ProjectHighlight {
  id: number;
  title: string;
  slug: string;
  tagline: string;
  techTags: string[];
  impact: { [key: string]: string };
}

interface Domain {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  projects: ProjectHighlight[];
}

const PortfolioPage: React.FC = () => {
  const domains: Domain[] = portfolioProjects.domains;
  const metadata = portfolioProjects.metadata;

  return (
    <div className="portfolio-page">
      {/* Hero Section */}
      <section className="hero-section">
        <h1>Featured Engineering Projects</h1>
        <p className="hero-subtitle">
          Firmware, IoT, and E-Mobility solutions with measurable impact
        </p>

        {/* Impact Metrics Dashboard */}
        <div className="metrics-dashboard">
          <div className="metric-card">
            <div className="metric-value">{metadata.totalCostSavings}</div>
            <div className="metric-label">Cost Savings</div>
          </div>
          <div className="metric-card">
            <div className="metric-value">{metadata.devicesValidated}</div>
            <div className="metric-label">Devices Validated</div>
          </div>
          <div className="metric-card">
            <div className="metric-value">{metadata.githubRepos}</div>
            <div className="metric-label">GitHub Repos</div>
          </div>
          <div className="metric-card">
            <div className="metric-value">{metadata.teamsImpacted}</div>
            <div className="metric-label">Teams Enabled</div>
          </div>
        </div>
      </section>

      {/* Domain Sections */}
      <section className="domains-container">
        {domains.map((domain) => (
          <DomainSection key={domain.id} domain={domain} />
        ))}
      </section>

      {/* View All Projects CTA */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Explore All Projects</h2>
          <p>View detailed case studies, architecture diagrams, and technical deep-dives</p>
          <div className="cta-buttons">
            {domains.map((domain) => (
              <a
                key={domain.id}
                href={`#${domain.id}`}
                className="cta-btn"
                style={{ borderColor: domain.color }}
              >
                <span className="cta-icon">{domain.icon}</span>
                {domain.title}
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

// Domain Section Component
interface DomainSectionProps {
  domain: Domain;
}

const DomainSection: React.FC<DomainSectionProps> = ({ domain }) => {
  return (
    <div id={domain.id} className="domain-section">
      {/* Domain Header */}
      <div className="domain-header" style={{ borderLeftColor: domain.color }}>
        <div className="domain-icon" style={{ color: domain.color }}>
          {domain.icon}
        </div>
        <div className="domain-info">
          <h2>{domain.title}</h2>
          <p className="domain-description">{domain.description}</p>
        </div>
      </div>

      {/* Project Highlights Grid */}
      <div className="projects-highlight-grid">
        {domain.projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            domainColor={domain.color}
          />
        ))}
      </div>
    </div>
  );
};

// Project Card Component (Clickable - Links to Individual Page)
interface ProjectCardProps {
  project: ProjectHighlight;
  domainColor: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, domainColor }) => {
  return (
    <Link href={`/projects/${project.slug}`} className="project-card-link">
      <div className="project-card" style={{ borderTopColor: domainColor }}>
        {/* Project Header */}
        <div className="card-header">
          <h3>{project.title}</h3>
          <p className="tagline">{project.tagline}</p>
        </div>

        {/* Impact Highlights */}
        <div className="impact-preview">
          {Object.entries(project.impact)
            .slice(0, 2)
            .map(([key, value]) => (
              <div key={key} className="impact-item">
                <span className="impact-icon">📊</span>
                <span className="impact-text">{value}</span>
              </div>
            ))}
        </div>

        {/* Tech Stack Preview */}
        <div className="tech-preview">
          {project.techTags.slice(0, 4).map((tag) => (
            <span key={tag} className="tech-badge">
              {tag}
            </span>
          ))}
          {project.techTags.length > 4 && (
            <span className="tech-badge more">+{project.techTags.length - 4}</span>
          )}
        </div>

        {/* View Details Button */}
        <div className="card-footer">
          <button className="view-details-btn" style={{ backgroundColor: domainColor }}>
            View Full Case Study →
          </button>
        </div>
      </div>
    </Link>
  );
};

export default PortfolioPage;
