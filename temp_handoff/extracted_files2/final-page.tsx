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
    situation: string;
    task?: string;
    action: string;
    result: string[];
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

const LINK_ICONS: Record<string, string> = {
    github: '⌘',
    documentation: '◈',
    presentation: '◉',
    code: '◆',
    video: '▶',
    internal: '◎',
};

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const project = getProjectBySlug(slug);

    if (!project) {
        return (
            <div className="cs-not-found">
                <h1>Project Not Found</h1>
                <Link href="/projects">← Back to Projects</Link>
            </div>
        );
    }

    return (
        <div className="cs-page">
            {/* Breadcrumb */}
            <nav className="cs-breadcrumb">
                <Link href="/">Home</Link>
                <span>/</span>
                <Link href="/projects">Projects</Link>
                <span>/</span>
                <span className="cs-breadcrumb-current">{project.title}</span>
            </nav>

            {/* Header */}
            <header className="cs-header">
                <div className="cs-header-top">
                    <div className="cs-domain-pill" style={{ backgroundColor: project.domainColor }}>
                        <span>{project.domainIcon}</span>
                        <span>{project.domainTitle}</span>
                    </div>
                    <div className="cs-category-pills">
                        {project.category.map((cat: string) => (
                            <span key={cat} className="cs-cat-pill">{cat}</span>
                        ))}
                    </div>
                </div>
                <h1 className="cs-title">{project.title}</h1>
                <p className="cs-tagline">{project.tagline}</p>
            </header>

            {/* Measurable Outcomes — FULL WIDTH, above two-column split */}
            {project.cardMetrics && project.cardMetrics.length > 0 && (
                <section className="cs-outcomes">
                    <h2 className="cs-section-label">Measurable outcomes</h2>
                    <div className="cs-outcomes-grid">
                        {project.cardMetrics.map((metric: CardMetric) => (
                            <div key={metric.label} className="cs-outcome-card" style={{ borderTopColor: project.domainColor }}>
                                <span className="cs-outcome-label">{metric.label}</span>
                                <span className="cs-outcome-value">{metric.value}</span>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Two-Column: STAR left, Sidebar right — starts at same level */}
            <div className="cs-layout">
                <main className="cs-main">
                    {/* STAR — Vertical, icons inline */}
                    <div className="cs-star-grid">
                        <section className="cs-star-card">
                            <h3><span className="cs-star-emoji">📋</span> Situation</h3>
                            <p>{project.situation}</p>
                        </section>

                        {project.task && (
                            <section className="cs-star-card">
                                <h3><span className="cs-star-emoji">🎯</span> Task</h3>
                                <p>{project.task}</p>
                            </section>
                        )}

                        <section className="cs-star-card">
                            <h3><span className="cs-star-emoji">🔧</span> Action taken</h3>
                            <p>{project.action}</p>
                        </section>

                        <section className="cs-star-card cs-star-result">
                            <h3><span className="cs-star-emoji">📈</span> Result</h3>
                            <ul>
                                {project.result.map((item: string, i: number) => (
                                    <li key={i}>{item}</li>
                                ))}
                            </ul>
                        </section>
                    </div>

                    {/* Compliance Note */}
                    {(project as unknown as { complianceNote?: string }).complianceNote && (
                        <aside className="cs-compliance">
                            {(project as unknown as { complianceNote: string }).complianceNote}
                        </aside>
                    )}

                    {/* Navigation */}
                    <section className="cs-nav-footer">
                        <Link href="/projects" className="cs-nav-btn">← All projects</Link>
                        <Link href={`/projects#${project.domainId}`} className="cs-nav-btn cs-nav-btn-domain" style={{ borderColor: project.domainColor, color: project.domainColor }}>
                            More {project.domainTitle} →
                        </Link>
                    </section>
                </main>

                {/* Sidebar — starts parallel to Situation */}
                <aside className="cs-sidebar">
                    <div className="cs-sidebar-sticky">
                        {project.ownership && (
                            <div className="cs-sidebar-card cs-sidebar-ownership" style={{ borderLeftColor: project.domainColor }}>
                                <span className="cs-sidebar-heading">Ownership</span>
                                <span className="cs-ownership-value">{project.ownershipIcon} {project.ownership}</span>
                            </div>
                        )}
                        <div className="cs-sidebar-card">
                            <span className="cs-sidebar-heading">Project type</span>
                            <span className="cs-sidebar-value">{project.type}</span>
                        </div>
                        <div className="cs-sidebar-card">
                            <span className="cs-sidebar-heading">Tech stack</span>
                            <div className="cs-sidebar-tech">
                                {project.technicalSkills.map((tech: string) => (
                                    <span key={tech} className="cs-tech-chip">{tech}</span>
                                ))}
                            </div>
                        </div>
                        {(project.links?.length ?? 0) > 0 && (
                            <div className="cs-sidebar-card">
                                <span className="cs-sidebar-heading">Resources</span>
                                <div className="cs-sidebar-links">
                                    {project.links!.map((link: ProjectLink) => (
                                        <a key={link.url} href={link.url} className="cs-sidebar-link" target={link.internal ? '_self' : '_blank'} rel={link.internal ? '' : 'noopener noreferrer'}>
                                            <span className="cs-link-icon">{LINK_ICONS[link.type] || '◆'}</span>
                                            <span className="cs-link-label">{link.label}</span>
                                            <span className="cs-link-arrow">→</span>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        )}
                        <div className="cs-sidebar-card">
                            <span className="cs-sidebar-heading">Categories</span>
                            <div className="cs-sidebar-tech">
                                {project.category.map((cat: string) => (
                                    <span key={cat} className="cs-cat-chip">{cat}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
}
