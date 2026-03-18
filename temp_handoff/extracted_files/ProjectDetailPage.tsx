// pages/projects/[slug].tsx or app/projects/[slug]/page.tsx
// Individual Project Detail Page - Full STAR Format

import React from 'react';
import Link from 'next/link';
import { portfolioProjects } from '@/data/portfolio-projects-optimized.json';

interface ProjectDetailProps {
  params: {
    slug: string;
  };
}

// This gets all projects flattened from all domains
const getAllProjects = () => {
  const allProjects: any[] = [];
  portfolioProjects.domains.forEach((domain) => {
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
};

// This function finds a project by slug
const getProjectBySlug = (slug: string) => {
  const allProjects = getAllProjects();
  return allProjects.find((p) => p.slug === slug);
};

// For Next.js App Router - Generate static params
export async function generateStaticParams() {
  const allProjects = getAllProjects();
  return allProjects.map((project) => ({
    slug: project.slug,
  }));
}

const ProjectDetailPage: React.FC<ProjectDetailProps> = ({ params }) => {
  const project = getProjectBySlug(params.slug);

  if (!project) {
    return (
      <div className="project-not-found">
        <h1>Project Not Found</h1>
        <Link href="/projects">← Back to Projects</Link>
      </div>
    );
  }

  return (
    <div className="project-detail-page">
      {/* Breadcrumb Navigation */}
      <nav className="breadcrumb">
        <Link href="/">Home</Link>
        <span className="separator">/</span>
        <Link href="/projects">Projects</Link>
        <span className="separator">/</span>
        <span className="current">{project.title}</span>
      </nav>

      {/* Project Header */}
      <header className="project-header" style={{ borderLeftColor: project.domainColor }}>
        <div className="header-top">
          <div className="domain-badge" style={{ backgroundColor: project.domainColor }}>
            <span className="domain-icon">{project.domainIcon}</span>
            <span className="domain-name">{project.domainTitle}</span>
          </div>
          <div className="category-badges">
            {project.category.map((cat: string) => (
              <span key={cat} className="category-badge">
                {cat}
              </span>
            ))}
          </div>
        </div>

        <h1 className="project-title">{project.title}</h1>
        <p className="project-tagline">{project.tagline}</p>

        {/* Quick Impact Metrics */}
        <div className="quick-impact">
          {Object.entries(project.impact).map(([key, value]) => (
            <div key={key} className="impact-stat">
              <div className="impact-value">{value}</div>
              <div className="impact-key">{key}</div>
            </div>
          ))}
        </div>
      </header>

      {/* Main Content Area */}
      <div className="project-content">
        {/* Left Sidebar - Table of Contents */}
        <aside className="toc-sidebar">
          <div className="toc-sticky">
            <h3>On This Page</h3>
            <nav className="toc-nav">
              <a href="#overview">Overview</a>
              <a href="#situation">Situation</a>
              <a href="#action">Action Taken</a>
              <a href="#result">Results & Impact</a>
              <a href="#tech-stack">Tech Stack</a>
              {project.links && project.links.length > 0 && (
                <a href="#resources">Resources</a>
              )}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="project-main">
          {/* Overview Section */}
          <section id="overview" className="content-section">
            <h2>Project Overview</h2>
            <p className="overview-text">{project.description}</p>
          </section>

          {/* STAR Format - Situation */}
          <section id="situation" className="content-section star-section">
            <div className="section-header">
              <div className="section-icon" style={{ backgroundColor: project.domainColor }}>
                📋
              </div>
              <h2>Situation</h2>
            </div>
            <div className="section-content">
              <p>{project.situation}</p>
            </div>
          </section>

          {/* STAR Format - Action */}
          <section id="action" className="content-section star-section">
            <div className="section-header">
              <div className="section-icon" style={{ backgroundColor: project.domainColor }}>
                🔧
              </div>
              <h2>Action Taken</h2>
            </div>
            <div className="section-content">
              <p>{project.action}</p>
            </div>
          </section>

          {/* STAR Format - Result */}
          <section id="result" className="content-section star-section">
            <div className="section-header">
              <div className="section-icon" style={{ backgroundColor: project.domainColor }}>
                ✅
              </div>
              <h2>Results & Impact</h2>
            </div>
            <div className="section-content">
              <p>{project.result}</p>
              
              {/* Detailed Impact Breakdown */}
              <div className="impact-breakdown">
                <h3>Measurable Outcomes</h3>
                <div className="impact-grid">
                  {Object.entries(project.impact).map(([key, value]) => (
                    <div key={key} className="impact-card">
                      <div className="impact-label">{key}</div>
                      <div className="impact-value-large">{value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Tech Stack Section */}
          <section id="tech-stack" className="content-section">
            <div className="section-header">
              <div className="section-icon" style={{ backgroundColor: project.domainColor }}>
                💻
              </div>
              <h2>Technology Stack</h2>
            </div>
            <div className="tech-stack-grid">
              {project.techTags.map((tech: string) => (
                <div key={tech} className="tech-card">
                  <span className="tech-name">{tech}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Media Gallery (if available) */}
          {project.media && project.media.gallery && project.media.gallery.length > 0 && (
            <section id="gallery" className="content-section">
              <h2>Project Gallery</h2>
              <div className="media-gallery">
                {project.media.gallery.map((image: string, index: number) => (
                  <div key={index} className="gallery-item">
                    <img src={image} alt={`${project.title} - Image ${index + 1}`} />
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Resources & Links */}
          {project.links && project.links.length > 0 && (
            <section id="resources" className="content-section">
              <h2>Resources & Links</h2>
              <div className="resources-grid">
                {project.links.map((link: any) => (
                  <a
                    key={link.url}
                    href={link.url}
                    className="resource-card"
                    target={link.internal ? '_self' : '_blank'}
                    rel={link.internal ? '' : 'noopener noreferrer'}
                  >
                    <div className="resource-icon">
                      {link.type === 'github' && '💻'}
                      {link.type === 'documentation' && '📚'}
                      {link.type === 'presentation' && '📊'}
                    </div>
                    <div className="resource-info">
                      <div className="resource-label">{link.label}</div>
                      <div className="resource-type">{link.type}</div>
                    </div>
                    <div className="resource-arrow">→</div>
                  </a>
                ))}
              </div>
            </section>
          )}

          {/* Navigation to Other Projects */}
          <section className="project-navigation">
            <h3>Explore More Projects</h3>
            <div className="nav-buttons">
              <Link href="/projects" className="nav-btn">
                ← View All Projects
              </Link>
              <Link
                href={`/projects?domain=${project.domainId}`}
                className="nav-btn"
                style={{ borderColor: project.domainColor }}
              >
                More {project.domainTitle} Projects →
              </Link>
            </div>
          </section>
        </main>

        {/* Right Sidebar - Quick Info */}
        <aside className="info-sidebar">
          <div className="info-sticky">
            {/* Project Type */}
            <div className="info-card">
              <h4>Project Type</h4>
              <p>{project.type}</p>
            </div>

            {/* Categories */}
            <div className="info-card">
              <h4>Categories</h4>
              <div className="info-tags">
                {project.category.map((cat: string) => (
                  <span key={cat} className="info-tag">
                    {cat}
                  </span>
                ))}
              </div>
            </div>

            {/* Featured Badge */}
            {project.isFeatured && (
              <div className="info-card featured-badge">
                <span className="star-icon">⭐</span>
                <span>Featured Project</span>
              </div>
            )}

            {/* Quick Links */}
            {project.links && project.links.length > 0 && (
              <div className="info-card">
                <h4>Quick Links</h4>
                <div className="quick-links">
                  {project.links.map((link: any) => (
                    <a
                      key={link.url}
                      href={link.url}
                      className="quick-link"
                      target={link.internal ? '_self' : '_blank'}
                      rel={link.internal ? '' : 'noopener noreferrer'}
                    >
                      {link.type === 'github' && '💻 '}
                      {link.type === 'documentation' && '📚 '}
                      {link.type === 'presentation' && '📊 '}
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Share Section (Optional) */}
            <div className="info-card">
              <h4>Share This Project</h4>
              <div className="share-buttons">
                <button className="share-btn" aria-label="Share on LinkedIn">
                  LinkedIn
                </button>
                <button className="share-btn" aria-label="Copy Link">
                  Copy Link
                </button>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default ProjectDetailPage;
