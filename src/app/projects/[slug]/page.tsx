import React from 'react';
import Link from 'next/link';
import portfolioData from '@/data/portfolio-projects-optimized.json';
import '../projects.css';

interface ProjectLink {
    type: string;
    label: string;
    url: string;
    internal?: boolean;
    note?: string;
}

interface CardMetric {
    label: string;
    value: string;
}

interface FlatProject {
    id: number;
    title: string;
    slug: string;
    tagline: string;
    category: string[];
    projectType?: string;
    ownership?: string;
    ownershipIcon?: string;
    type: string;
    description: string;
    situation: string;
    task?: string;
    action: string;
    result: string;
    impact: string;
    technicalSkills: string[];
    cardMetrics?: CardMetric[];
    links?: ProjectLink[];
    complianceNote?: string;
    displayOrder?: number;
    domainId: string;
    domainTitle: string;
    domainIcon: string;
    domainColor: string;
}

const { portfolioProjects } = portfolioData;

// Flatten all projects from all domains
function getAllProjects() {
    const allProjects: FlatProject[] = [];
    portfolioProjects.domains.forEach((domain) => {
        domain.projects.forEach((project) => {
            allProjects.push({
                ...project,
                domainId: domain.id,
                domainTitle: domain.title,
                domainIcon: domain.icon,
                domainColor: domain.color,
            } as unknown as FlatProject);
        });
    });
    return allProjects;
}

function getProjectBySlug(slug: string) {
    return getAllProjects().find((p) => p.slug === slug);
}

export async function generateStaticParams() {
    return getAllProjects().map((project) => ({
        slug: project.slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const project = getProjectBySlug(slug);
    return {
        title: project ? `${project.title} | Poorvi Bhaskar` : 'Project Not Found',
        description: project?.tagline || '',
    };
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const project = getProjectBySlug(slug);

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

                {/* Ownership Badge */}
                {project.ownership && (
                    <div className="quick-impact">
                        <div className="impact-stat">
                            <div className="impact-value">{project.ownershipIcon} {project.ownership}</div>
                        </div>
                    </div>
                )}

                {/* Measurable Outcomes */}
                {project.cardMetrics && project.cardMetrics.length > 0 && (
                    <div className="impact-breakdown" style={{ marginTop: '1.5rem' }}>
                        <h3>Measurable Outcomes</h3>
                        <div className="detail-impact-grid">
                            {project.cardMetrics.map((metric: CardMetric) => (
                                <div key={metric.label} className="detail-impact-card">
                                    <div className="detail-impact-label">{metric.label}</div>
                                    <div className="detail-impact-value">{metric.value}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </header>

            {/* Main Content Area */}
            <div className="project-content">
                {/* Left Sidebar - TOC */}
                <aside className="toc-sidebar">
                    <div className="toc-sticky">
                        <h3>On This Page</h3>
                        <nav className="toc-nav">
                            <a href="#overview">Overview</a>
                            <a href="#situation">Situation</a>
                            {project.task && <a href="#task">Task</a>}
                            <a href="#action">Action Taken</a>
                            <a href="#result">Results</a>
                            <a href="#impact">Impact</a>
                            <a href="#tech-stack">Tech Stack</a>
                            {project.links && project.links.length > 0 && (
                                <a href="#resources">Resources</a>
                            )}
                        </nav>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="project-main">
                    {/* Overview */}
                    <section id="overview" className="content-section">
                        <h2>Project Overview</h2>
                        <p className="overview-text">{project.description}</p>
                    </section>

                    {/* Situation */}
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

                    {/* Task */}
                    {project.task && (
                        <section id="task" className="content-section star-section">
                            <div className="section-header">
                                <div className="section-icon" style={{ backgroundColor: project.domainColor }}>
                                    🎯
                                </div>
                                <h2>Task</h2>
                            </div>
                            <div className="section-content">
                                <p>{project.task}</p>
                            </div>
                        </section>
                    )}

                    {/* Action */}
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

                    {/* Result */}
                    <section id="result" className="content-section star-section">
                        <div className="section-header">
                            <div className="section-icon" style={{ backgroundColor: project.domainColor }}>
                                ✅
                            </div>
                            <h2>Result</h2>
                        </div>
                        <div className="section-content">
                            <p>{project.result}</p>
                        </div>
                    </section>

                    {/* Impact */}
                    <section id="impact" className="content-section star-section">
                        <div className="section-header">
                            <div className="section-icon" style={{ backgroundColor: project.domainColor }}>
                                📊
                            </div>
                            <h2>Impact</h2>
                        </div>
                        <div className="section-content">
                            <p>{project.impact}</p>
                        </div>
                    </section>

                    {/* Tech Stack */}
                    <section id="tech-stack" className="content-section">
                        <div className="section-header">
                            <div className="section-icon" style={{ backgroundColor: project.domainColor }}>
                                💻
                            </div>
                            <h2>Technology Stack</h2>
                        </div>
                        <div className="tech-stack-grid">
                            {project.technicalSkills.map((tech: string) => (
                                <div key={tech} className="tech-card">
                                    <span className="tech-name">{tech}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Compliance Note */}
                    {(project as unknown as { complianceNote?: string }).complianceNote && (
                        <section className="content-section">
                            <div className="section-content" style={{ fontSize: '0.8rem', color: 'var(--color-foreground-secondary)', fontStyle: 'italic', borderLeft: '3px solid var(--color-border)', paddingLeft: '1rem' }}>
                                <p>⚠️ {(project as unknown as { complianceNote: string }).complianceNote}</p>
                            </div>
                        </section>
                    )}


                    {/* Resources & Links */}
                    {(project.links?.length ?? 0) > 0 && (
                        <section id="resources" className="content-section">
                            <h2>Resources &amp; Links</h2>
                            <div className="resources-grid">
                                {project.links!.map((link: ProjectLink) => (
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
                                            {link.type === 'code' && '📦'}
                                            {link.type === 'video' && '🎬'}
                                            {link.type === 'internal' && '🔒'}
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

                    {/* Navigation */}
                    <section className="project-navigation">
                        <h3>Explore More Projects</h3>
                        <div className="nav-buttons">
                            <Link href="/projects" className="nav-btn">
                                ← View All Projects
                            </Link>
                            <Link
                                href={`/projects#${project.domainId}`}
                                className="nav-btn"
                                style={{ borderColor: project.domainColor }}
                            >
                                More {project.domainTitle} →
                            </Link>
                        </div>
                    </section>
                </main>

                {/* Right Sidebar */}
                <aside className="info-sidebar">
                    <div className="info-sticky">
                        <div className="info-card">
                            <h4>Project Type</h4>
                            <p>{project.type}</p>
                        </div>

                        <div className="info-card">
                            <h4>Categories</h4>
                            <div className="info-tags">
                                {project.category.map((cat: string) => (
                                    <span key={cat} className="info-tag">{cat}</span>
                                ))}
                            </div>
                        </div>

                        {project.ownership && (
                            <div className="info-card">
                                <h4>Ownership</h4>
                                <p>{project.ownershipIcon} {project.ownership}</p>
                            </div>
                        )}

                        {(project.links?.length ?? 0) > 0 && (
                            <div className="info-card">
                                <h4>Quick Links</h4>
                                <div className="quick-links">
                                    {project.links!.map((link: ProjectLink) => (
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
                                            {link.type === 'code' && '📦 '}
                                            {link.type === 'video' && '🎬 '}
                                            {link.type === 'internal' && '🔒 '}
                                            {link.label}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </aside>
            </div>
        </div>
    );
}
