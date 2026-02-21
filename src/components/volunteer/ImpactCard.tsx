'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { VolunteerPillar } from '@/types';

interface PillarCardProps {
    pillar: VolunteerPillar;
    grandTotal: number;
}

export default function PillarCard({ pillar, grandTotal }: PillarCardProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const percentage = grandTotal > 0 ? (pillar.hours / grandTotal) * 100 : 0;

    return (
        <motion.div
            layout
            onClick={() => setIsExpanded((prev) => !prev)}
            className="relative bg-surface border border-border rounded-lg p-6 cursor-pointer
                       transition-shadow duration-300 overflow-hidden group"
            style={{
                boxShadow: isExpanded
                    ? `0 0 24px ${pillar.color}20, 0 0 48px ${pillar.color}10`
                    : 'none',
            }}
            whileHover={{
                boxShadow: `0 0 24px ${pillar.color}20, 0 0 48px ${pillar.color}10`,
            }}
            transition={{ layout: { duration: 0.3, ease: 'easeInOut' } }}
        >
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div
                        className="w-11 h-11 rounded-md flex items-center justify-center text-xl"
                        style={{ backgroundColor: `${pillar.color}15` }}
                    >
                        {pillar.emoji}
                    </div>
                    <div>
                        <h3 className="terminal-text text-sm font-semibold text-foreground">
                            {pillar.title}
                        </h3>
                        <p className="text-xs text-foreground-secondary mt-0.5">
                            {pillar.subtitle}
                        </p>
                    </div>
                </div>

                <div className="text-right">
                    <span
                        className="text-2xl font-bold font-mono"
                        style={{ color: pillar.color }}
                    >
                        {pillar.hours}
                    </span>
                    <p className="text-xs text-foreground-secondary">hours</p>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-4">
                <div className="w-full h-1.5 rounded-full bg-border overflow-hidden">
                    <motion.div
                        className="h-full rounded-full"
                        style={{ backgroundColor: pillar.color }}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${percentage}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
                    />
                </div>
                <p className="text-[10px] text-foreground-secondary mt-1 text-right font-mono">
                    {percentage.toFixed(0)}%
                </p>
            </div>

            {/* Expandable Content */}
            <AnimatePresence mode="sync">
                {isExpanded && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="mt-4 pt-4 border-t border-border space-y-4">
                            {/* Highlights */}
                            <div className="rounded-md p-3" style={{ backgroundColor: `${pillar.color}08`, borderLeft: `3px solid ${pillar.color}` }}>
                                <p className="text-xs font-semibold mb-2" style={{ color: pillar.color }}>
                                    Highlights
                                </p>
                                <ul className="space-y-1">
                                    {pillar.highlights.map((item, i) => (
                                        <li key={i} className="flex items-start gap-2 text-sm text-foreground-secondary">
                                            <span style={{ color: pillar.color }} className="mt-0.5 text-xs">▸</span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Why it matters */}
                            <div>
                                <p className="text-xs font-semibold text-foreground mb-2">Why this matters:</p>
                                <ul className="space-y-1">
                                    {pillar.whyItMatters.map((item, i) => (
                                        <li key={i} className="flex items-start gap-2 text-sm text-foreground-secondary">
                                            <span className="text-primary mt-0.5 text-xs">•</span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>



                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Expand indicator */}
            <div className="absolute top-3 right-3">
                <motion.svg
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="w-4 h-4 text-foreground-secondary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </motion.svg>
            </div>
        </motion.div>
    );
}
