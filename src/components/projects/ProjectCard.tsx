'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, ExternalLink, Github, Star, ChevronDown, ChevronUp } from 'lucide-react';
import type { Project } from '@/types';

interface ProjectCardProps {
    project: Project;
    index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
    const [isOpen, setIsOpen] = useState(false);
    const hasInternalUrl = project.internalUrl?.includes('sharepoint.com');
    const hasRepoUrl = !!project.repoUrl;

    return (
        <motion.article
            layout
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            viewport={{ once: true }}
            className={`card-hover bg-surface border border-border rounded-lg overflow-hidden cursor-pointer transition-colors ${isOpen ? 'border-primary' : ''}`}
            onClick={() => setIsOpen(!isOpen)}
        >
            {/* Card Header */}
            <div className="p-6">
                <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                            {project.category.map((cat) => (
                                <span
                                    key={cat}
                                    className={`text-xs px-2 py-1 rounded-md font-medium ${cat === 'Firmware'
                                        ? 'bg-primary/10 text-primary'
                                        : cat === 'IoT'
                                            ? 'bg-success/10 text-success'
                                            : 'bg-secondary/10 text-secondary'
                                        }`}
                                >
                                    {cat}
                                </span>
                            ))}
                            {project.isFeatured && (
                                <span className="flex items-center gap-1 text-xs px-2 py-1 rounded-md bg-warning/20 text-warning">
                                    <Star className="w-3 h-3 fill-warning" />
                                    Featured
                                </span>
                            )}
                        </div>
                        <h3 className="text-lg font-semibold text-foreground">
                            {project.title}
                        </h3>
                    </div>

                    {/* Expand Icon */}
                    <div className="text-foreground-secondary">
                        {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </div>
                </div>

                {/* Description - Collapsible */}
                <motion.div layout>
                    <p className={`text-foreground-secondary text-sm mt-4 ${!isOpen && 'line-clamp-3'}`}>
                        {project.description}
                    </p>
                </motion.div>

                {/* Impact - Only shown when open */}
                <AnimatePresence>
                    {isOpen && project.impact && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-4"
                        >
                            <div className="p-3 rounded-md bg-background-secondary border border-border">
                                <p className="text-xs text-foreground-secondary uppercase tracking-wide mb-1">
                                    Impact
                                </p>
                                <p className="text-sm text-foreground">{project.impact}</p>
                            </div>

                            {/* Links in Expanded View */}
                            <div className="flex items-center gap-3 mt-4 pt-4 border-t border-border">
                                {hasRepoUrl && (
                                    <a
                                        href={project.repoUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 text-xs font-medium text-foreground-secondary hover:text-primary transition-colors"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <Github className="w-4 h-4" />
                                        GitHub Repo
                                    </a>
                                )}
                                {hasInternalUrl && (
                                    <div className="flex items-center gap-2 text-xs font-medium text-foreground-secondary opacity-70">
                                        <Lock className="w-4 h-4" />
                                        Internal Asset
                                    </div>
                                )}
                                {!hasInternalUrl && !hasRepoUrl && project.internalUrl && (
                                    <a
                                        href={project.internalUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 text-xs font-medium text-foreground-secondary hover:text-primary transition-colors"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <ExternalLink className="w-4 h-4" />
                                        Project Link
                                    </a>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-2 mt-4">
                    {(isOpen ? project.techTags : project.techTags.slice(0, 6)).map((tag) => (
                        <span key={tag} className="tech-badge">
                            {tag}
                        </span>
                    ))}
                    {!isOpen && project.techTags.length > 6 && (
                        <span className="tech-badge">+{project.techTags.length - 6}</span>
                    )}
                </div>
            </div>
        </motion.article>
    );
}
