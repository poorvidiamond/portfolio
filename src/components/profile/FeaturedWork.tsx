'use client';
 
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import portfolioData from '@/data/portfolio-projects-optimized.json';
 
const FEATURED_SLUGS = ['flash-tool', 'renode', 'rust-embedded'];
 
const HOOK_TAGLINES: Record<string, string> = {
    'flash-tool': 'One GUI replaced four CLI scripts for global EV firmware updates',
    'renode': 'What if firmware teams never needed a prototype board?',
    'rust-embedded': 'Can Rust work for safety-critical embedded firmware at Eaton?',
};
 
const TOP_SKILLS: Record<string, string[]> = {
    'flash-tool': ['C++', 'Qt', 'CAN'],
    'renode': ['Renode', 'STM32', 'CI/CD'],
    'rust-embedded': ['Rust', 'STM32', 'FFI'],
};
 
interface FeaturedProject {
    slug: string;
    title: string;
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
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-bold flex items-center gap-3">
                        <span className="text-primary text-3xl">⚡</span>
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
 
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {projects.map((project, index) => {
                        const tagline = HOOK_TAGLINES[project.slug] || '';
                        const skills = TOP_SKILLS[project.slug] || [];
 
                        return (
                            <motion.div
                                key={project.slug}
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.35, delay: index * 0.08 }}
                            >
                                <Link
                                    href={`/projects/${project.slug}`}
                                    className="group block h-full"
                                >
                                    <div
                                        className="h-full p-5 rounded-xl bg-surface border border-border hover:border-primary/60 transition-all duration-200 flex flex-col"
                                        style={{ borderTopColor: project.domainColor, borderTopWidth: '3px' }}
                                    >
                                        {/* Title */}
                                        <div className="mb-2">
                                            <span className="text-base mr-1.5">{project.domainIcon}</span>
                                            <h3 className="inline text-base font-bold group-hover:text-primary transition-colors">
                                                {project.title}
                                            </h3>
                                        </div>
 
                                        {/* Hook tagline */}
                                        <p className="text-sm text-foreground-secondary leading-relaxed mb-4 flex-grow">
                                            {tagline}
                                        </p>
 
                                        {/* 3 tech chips + arrow */}
                                        <div className="flex items-center justify-between">
                                            <div className="flex gap-1.5">
                                                {skills.map((skill) => (
                                                    <span
                                                        key={skill}
                                                        className="text-xs px-2 py-0.5 rounded bg-background-secondary border border-border font-mono font-semibold text-primary"
                                                    >
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>
                                            <ArrowRight className="w-4 h-4 text-foreground-secondary group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0" />
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
