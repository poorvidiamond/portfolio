'use client';

import { motion } from 'framer-motion';

const CRITERIA = [
    {
        icon: '✓',
        title: 'Skill Leverage',
        description: 'Deploy technical expertise where it creates unique value (e.g., GIS/mapping skills for humanitarian crisis response)',
    },
    {
        icon: '✓',
        title: 'Sustainable Integration',
        description: 'Align contribution with existing practices — fitness, team events, remote work (not martyrdom or burnout models)',
    },
    {
        icon: '✓',
        title: 'Organizational Effectiveness',
        description: 'Select crisis-focused, high-impact organizations and initiatives (research-backed choices, not convenience-based)',
    },
];

export default function PhilosophyFooter() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="border-t border-border pt-10 mt-10"
        >
            <h2 className="terminal-text text-lg font-semibold text-foreground mb-2">
                My Volunteering Philosophy
            </h2>
            <p className="text-xs text-foreground-secondary mb-6">
                Effort allocation based on three criteria:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                {CRITERIA.map((item, index) => (
                    <motion.div
                        key={item.title}
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="bg-surface border border-border rounded-lg p-4"
                    >
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-primary font-bold text-sm">{item.icon}</span>
                            <h3 className="terminal-text text-sm font-semibold text-foreground">
                                {item.title}
                            </h3>
                        </div>
                        <p className="text-xs text-foreground-secondary leading-relaxed">
                            {item.description}
                        </p>
                    </motion.div>
                ))}
            </div>

            <p className="text-sm text-foreground-secondary italic text-center">
                Not performance volunteering. Not checkbox compliance.{' '}
                <span className="text-foreground font-medium not-italic">Intentional contribution.</span>
            </p>
        </motion.div>
    );
}
