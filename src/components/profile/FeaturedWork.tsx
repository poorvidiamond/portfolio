'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import portfolioData from '@/data/portfolio-projects-optimized.json';

const FEATURED_SLUGS = ['flash-tool', 'renode', 'rust-embedded'];

interface FeaturedProject {
    slug: string;
    title: string;
    tagline: string;
    cardOutcome?: string;
    technicalSkills: string[];
    domainColor: string;
    domainIcon: string;
}

function getFeaturedProjects(): FeaturedProject[] {
    const results: FeaturedProject[] = [];
    for (const domain of portfolioData.portfolioProjects.domains) {
        for (const project of domain.projects) {
            if (FEATURED_SLUGS.includes(project.slug)) {
                results.push({
                    slug: project.slug,
                    title: project.title,
                    tagline: project.tagline,
                    cardOutcome: project.cardOutcome,
                    technicalSkills: project.technicalSkills,
                    domainColor: domain.color,
                    domainIcon: domain.icon,
                });
            }
        }
    }
    return results;
}

export default function FeaturedWork() {
    const projects = getFeaturedProjects();

    return (
        <section className="py-12 md:py-20 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="flex items-center justify-between mb-10">
                    <h2 className="text-3xl font-bold flex items-center gap-3">
                        <span className="text-primary">⚡</span>
                        Featured Work
                    </h2>
                    <Link
                        href="/projects"
                        className="group flex items-center gap-1 text-sm font-medium text-foreground-secondary hover:text-primary transition-colors"
                    >
                        View all projects
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.slug}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                        >
                            <Link
                                href={`/projects/${project.slug}`}
                                className="group block h-full"
                            >
                                <div
                                    className="h-full p-6 rounded-xl bg-surface border border-border hover:border-primary transition-all duration-300"
                                    style={{ borderTopColor: project.domainColor, borderTopWidth: '3px' }}
                                >
                                    <div className="mb-3">
                                        <span className="text-lg mr-2">{project.domainIcon}</span>
                                        <h3 className="inline text-lg font-semibold group-hover:text-primary transition-colors">
                                            {project.title}
                                        </h3>
                                    </div>

                                    <p className="text-sm text-foreground-secondary mb-4 leading-relaxed">
                                        {project.tagline}
                                    </p>

                                    {project.cardOutcome && (
                                        <div className="mb-4 p-3 rounded-lg bg-primary/5 border border-primary/10">
                                            <p className="text-sm leading-relaxed">
                                                <span className="text-primary font-medium mr-1">✦</span>
                                                {project.cardOutcome}
                                            </p>
                                        </div>
                                    )}

                                    <div className="flex flex-wrap gap-1.5">
                                        {project.technicalSkills.slice(0, 4).map((tech) => (
                                            <span
                                                key={tech}
                                                className="text-xs px-2 py-0.5 rounded-full bg-surface border border-border text-foreground-secondary"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                        {project.technicalSkills.length > 4 && (
                                            <span className="text-xs px-2 py-0.5 rounded-full bg-surface border border-border text-foreground-secondary">
                                                +{project.technicalSkills.length - 4}
                                            </span>
                                        )}
                                    </div>

                                    <div className="mt-4 pt-3 border-t border-border flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all">
                                        View Case Study
                                        <ArrowRight className="w-4 h-4" />
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
