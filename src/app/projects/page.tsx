'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import portfolioData from '@/data/portfolio-projects-optimized.json';
import './projects.css';

const { portfolioProjects } = portfolioData;

interface ProjectHighlight {
    id: number;
    title: string;
    slug: string;
    tagline: string;
    technicalSkills: string[];
    impact: string;
    cardOutcome?: string;
}

interface Domain {
    id: string;
    title: string;
    description: string;
    icon: string;
    color: string;
    status?: string;
    projects: ProjectHighlight[];
}

export default function ProjectsPage() {
    const domains = portfolioProjects.domains as unknown as Domain[];
    const metadata = portfolioProjects.metadata;

    return (
        <div className="portfolio-page">
            {/* Hero Section */}
            <section className="hero-section">
                <h1 className="terminal-text">
                    Featured Engineering Projects
                </h1>
                <p className="hero-subtitle">
                    Firmware, IoT, and E-Mobility solutions with measurable impact
                </p>

                {/* Impact Metrics Dashboard */}
                <div className="metrics-dashboard">
                    {[
                        { value: `${metadata.totalProjects}`, label: 'Projects' },
                        { value: metadata.devicesValidated, label: 'Devices Validated' },
                        { value: metadata.githubRepos, label: 'GitHub Repos' },
                        { value: metadata.teamsImpacted, label: 'Teams Enabled' },
                    ].map((metric, i) => (
                        <motion.div
                            key={metric.label}
                            className="metric-card"
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: i * 0.1 }}
                        >
                            <div className="metric-value">{metric.value}</div>
                            <div className="metric-label">{metric.label}</div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Domain Sections */}
            <section className="domains-container">
                {domains.map((domain, di) => (
                    <DomainSection key={domain.id} domain={domain} index={di} />
                ))}
            </section>

            {/* Featured Case Studies CTA */}
            <section className="cta-section">
                <div className="cta-content">
                    <h2>Dive Into Case Studies</h2>
                    <p>View detailed case studies, architecture diagrams, and technical deep-dives</p>
                    <div className="cta-buttons">
                        {domains.map((domain) => (
                            <Link
                                key={domain.id}
                                href={`/projects/${domain.projects[0]?.slug}`}
                                className="cta-btn"
                                style={{ borderColor: domain.color }}
                            >
                                <span className="cta-icon">{domain.icon}</span>
                                {domain.title}
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}

function DomainSection({ domain, index }: { domain: Domain; index: number }) {
    return (
        <motion.div
            id={domain.id}
            className="domain-section"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
        >
            <div className="domain-header" style={{ borderLeftColor: domain.color }}>
                <div className="domain-icon" style={{ color: domain.color }}>
                    {domain.icon}
                </div>
                <div className="domain-info">
                    <h2>{domain.title}</h2>
                    <p className="domain-description">{domain.description}</p>
                </div>
            </div>

            <div className="projects-highlight-grid">
                {domain.projects.map((project, pi) => (
                    <ProjectCard
                        key={project.id}
                        project={project}
                        domainColor={domain.color}
                        index={pi}
                    />
                ))}
            </div>
        </motion.div>
    );
}

function ProjectCard({
    project,
    domainColor,
    index,
}: {
    project: ProjectHighlight;
    domainColor: string;
    index: number;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: index * 0.08 }}
        >
            <Link href={`/projects/${project.slug}`} className="project-card-link">
                <div className="project-card" style={{ borderTopColor: domainColor }}>
                    <div className="card-header">
                        <h3>{project.title}</h3>
                        <p className="tagline">{project.tagline}</p>
                    </div>

                    {project.cardOutcome ? (
                        <div className="card-outcome">
                            <span className="card-outcome-icon">✦</span>
                            <span className="card-outcome-text">{project.cardOutcome}</span>
                        </div>
                    ) : (
                        <div className="impact-preview">
                            <div className="impact-item">
                                <span className="impact-icon">📊</span>
                                <span className="impact-text">{project.impact}</span>
                            </div>
                        </div>
                    )}

                    <div className="tech-preview">
                        {project.technicalSkills.slice(0, 4).map((tag) => (
                            <span key={tag} className="tech-badge">
                                {tag}
                            </span>
                        ))}
                        {project.technicalSkills.length > 4 && (
                            <span className="tech-badge more">+{project.technicalSkills.length - 4}</span>
                        )}
                    </div>

                    <div className="card-footer">
                        <button className="view-details-btn" style={{ backgroundColor: domainColor }}>
                            View Full Case Study →
                        </button>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
