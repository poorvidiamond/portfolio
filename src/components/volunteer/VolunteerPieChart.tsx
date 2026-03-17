'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { VolunteerPillar } from '@/types';
import { ChevronDown } from 'lucide-react';

interface VolunteerPieChartProps {
    pillars: VolunteerPillar[];
    totalHours: number;
    totalActivities: number;
}

export default function VolunteerPieChart({ pillars, totalHours, totalActivities }: VolunteerPieChartProps) {
    const [expandedPillar, setExpandedPillar] = useState<string>(pillars[0]?.id || '');

    const total = pillars.reduce((sum, p) => sum + p.hours, 0);

    // Build pie segments
    const segments: { pillar: VolunteerPillar; startAngle: number; endAngle: number; percentage: number }[] = [];
    let currentAngle = -90;

    pillars.forEach(pillar => {
        const percentage = (pillar.hours / total) * 100;
        const sweepAngle = (pillar.hours / total) * 360;
        segments.push({
            pillar,
            startAngle: currentAngle,
            endAngle: currentAngle + sweepAngle,
            percentage,
        });
        currentAngle += sweepAngle;
    });

    // SVG arc path helper
    function describeArc(cx: number, cy: number, r: number, startAngle: number, endAngle: number) {
        const start = polarToCartesian(cx, cy, r, endAngle);
        const end = polarToCartesian(cx, cy, r, startAngle);
        const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;
        return `M ${cx} ${cy} L ${start.x} ${start.y} A ${r} ${r} 0 ${largeArcFlag} 0 ${end.x} ${end.y} Z`;
    }

    function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
        const rad = (angleDeg * Math.PI) / 180;
        return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
    }

    const cx = 110, cy = 110, r = 95;

    const togglePillar = (id: string) => {
        setExpandedPillar(expandedPillar === id ? '' : id);
    };

    return (
        <div className="space-y-10">
            {/* Top section: Pie chart + summary stats */}
            <div className="flex flex-col items-center gap-6">
                <div className="relative">
                    <svg width="220" height="220" viewBox="0 0 220 220" className="drop-shadow-lg">
                        {segments.map(({ pillar, startAngle, endAngle }) => (
                            <path
                                key={pillar.id}
                                d={describeArc(cx, cy, r, startAngle, endAngle)}
                                fill={pillar.color}
                                stroke="var(--color-background)"
                                strokeWidth="2"
                                className="transition-opacity duration-300"
                                style={{
                                    opacity: expandedPillar && expandedPillar !== pillar.id ? 0.35 : 1,
                                }}
                            />
                        ))}
                        <circle cx={cx} cy={cy} r="42" fill="var(--color-background)" />
                        <text x={cx} y={cy - 4} textAnchor="middle" className="fill-foreground font-bold" fontSize="20">
                            {totalHours}
                        </text>
                        <text x={cx} y={cy + 12} textAnchor="middle" className="fill-foreground-secondary" fontSize="10">
                            total hours
                        </text>
                    </svg>
                </div>

                {/* Summary stats */}
                <div className="flex items-center gap-6 text-sm text-foreground-secondary">
                    <span><strong className="text-primary font-mono text-lg">{totalActivities}</strong> activities</span>
                    <span className="text-border">|</span>
                    <span><strong className="text-primary font-mono text-lg">3</strong> focus areas</span>
                </div>
            </div>

            {/* Accordion cards for each pillar */}
            <div className="space-y-3">
                {segments.map(({ pillar, percentage }) => {
                    const isExpanded = expandedPillar === pillar.id;

                    return (
                        <div
                            key={pillar.id}
                            className="rounded-xl border border-border overflow-hidden transition-shadow duration-200"
                            style={{ borderLeftColor: pillar.color, borderLeftWidth: '4px' }}
                        >
                            {/* Accordion header - always visible */}
                            <button
                                onClick={() => togglePillar(pillar.id)}
                                className="w-full flex items-center gap-3 px-5 py-4 text-left hover:bg-surface-hover transition-colors"
                            >
                                <span
                                    className="w-3.5 h-3.5 rounded-full flex-shrink-0"
                                    style={{ backgroundColor: pillar.color }}
                                />
                                <span className="text-lg mr-1">{pillar.emoji}</span>
                                <div className="flex-1">
                                    <span className="font-semibold text-foreground">{pillar.title}</span>
                                    <span className="ml-3 text-sm text-foreground-secondary">
                                        {pillar.hours}h · {Math.round(percentage)}%
                                    </span>
                                </div>
                                <ChevronDown
                                    className={`w-5 h-5 text-foreground-secondary transition-transform duration-300 ${
                                        isExpanded ? 'rotate-180' : ''
                                    }`}
                                />
                            </button>

                            {/* Expandable content */}
                            <AnimatePresence initial={true}>
                                {isExpanded && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="px-5 pb-5 pt-1 space-y-4 border-t border-border/50">
                                            <p className="text-sm text-foreground-secondary italic">{pillar.subtitle}</p>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                                {/* Highlights */}
                                                <div>
                                                    <h4 className="text-sm font-semibold text-primary mb-2">Highlights</h4>
                                                    <ul className="space-y-1.5">
                                                        {pillar.highlights.map((h, i) => (
                                                            <li key={i} className="text-sm text-foreground-secondary flex items-start gap-2">
                                                                <span className="text-primary mt-0.5">▸</span>
                                                                {h}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>

                                                {/* Why It Matters */}
                                                <div>
                                                    <h4 className="text-sm font-semibold text-secondary mb-2">Why This Matters</h4>
                                                    <ul className="space-y-1.5">
                                                        {pillar.whyItMatters.map((w, i) => (
                                                            <li key={i} className="text-sm text-foreground-secondary flex items-start gap-2">
                                                                <span className="text-secondary mt-0.5">▸</span>
                                                                {w}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
