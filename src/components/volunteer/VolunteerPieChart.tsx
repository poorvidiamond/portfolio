'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { VolunteerPillar } from '@/types';

interface VolunteerPieChartProps {
    pillars: VolunteerPillar[];
    totalHours: number;
    totalActivities: number;
}

export default function VolunteerPieChart({ pillars, totalHours, totalActivities }: VolunteerPieChartProps) {
    const [selectedPillar, setSelectedPillar] = useState<string | null>(null);

    const total = pillars.reduce((sum, p) => sum + p.hours, 0);
    
    // Build pie segments
    const segments: { pillar: VolunteerPillar; startAngle: number; endAngle: number; percentage: number }[] = [];
    let currentAngle = -90; // Start from top
    
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

    const selected = pillars.find(p => p.id === selectedPillar);

    // SVG arc path helper
    function describeArc(cx: number, cy: number, r: number, startAngle: number, endAngle: number) {
        const start = polarToCartesian(cx, cy, r, endAngle);
        const end = polarToCartesian(cx, cy, r, startAngle);
        const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;
        return `M ${cx} ${cy} L ${start.x} ${start.y} A ${r} ${r} 0 ${largeArcFlag} 0 ${end.x} ${end.y} Z`;
    }

    function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
        const rad = (angleDeg * Math.PI) / 180;
        return {
            x: cx + r * Math.cos(rad),
            y: cy + r * Math.sin(rad),
        };
    }

    const cx = 120, cy = 120, r = 100;

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-10">
                {/* Pie Chart */}
                <div className="relative flex-shrink-0">
                    <svg width="240" height="240" viewBox="0 0 240 240" className="drop-shadow-lg">
                        {segments.map(({ pillar, startAngle, endAngle }) => {
                            const isSelected = selectedPillar === pillar.id;
                            // Calculate midpoint for hover scale origin
                            const midAngle = (startAngle + endAngle) / 2;
                            const offsetX = isSelected ? Math.cos((midAngle * Math.PI) / 180) * 6 : 0;
                            const offsetY = isSelected ? Math.sin((midAngle * Math.PI) / 180) * 6 : 0;

                            return (
                                <path
                                    key={pillar.id}
                                    d={describeArc(cx, cy, r, startAngle, endAngle)}
                                    fill={pillar.color}
                                    stroke="var(--color-background)"
                                    strokeWidth="2"
                                    className="cursor-pointer transition-all duration-300"
                                    style={{
                                        transform: `translate(${offsetX}px, ${offsetY}px)`,
                                        opacity: selectedPillar && !isSelected ? 0.4 : 1,
                                        filter: isSelected ? 'brightness(1.15)' : 'none',
                                    }}
                                    onClick={() => setSelectedPillar(selectedPillar === pillar.id ? null : pillar.id)}
                                />
                            );
                        })}
                        {/* Center circle */}
                        <circle cx={cx} cy={cy} r="45" fill="var(--color-background)" />
                        <text x={cx} y={cy - 6} textAnchor="middle" className="fill-foreground text-lg font-bold" fontSize="20">
                            {totalHours}
                        </text>
                        <text x={cx} y={cy + 14} textAnchor="middle" className="fill-foreground-secondary" fontSize="11">
                            total hours
                        </text>
                    </svg>
                </div>

                {/* Legend */}
                <div className="flex flex-col gap-3 min-w-[200px]">
                    {segments.map(({ pillar, percentage }) => (
                        <button
                            key={pillar.id}
                            onClick={() => setSelectedPillar(selectedPillar === pillar.id ? null : pillar.id)}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all duration-200 border ${
                                selectedPillar === pillar.id
                                    ? 'border-primary/40 bg-primary/5 shadow-sm'
                                    : 'border-transparent hover:bg-surface-hover'
                            }`}
                        >
                            <span
                                className="w-3 h-3 rounded-full flex-shrink-0"
                                style={{ backgroundColor: pillar.color }}
                            />
                            <div className="flex-1">
                                <span className="text-sm font-medium text-foreground">{pillar.emoji} {pillar.title}</span>
                                <div className="flex items-center gap-2 text-xs text-foreground-secondary">
                                    <span>{pillar.hours}h</span>
                                    <span>·</span>
                                    <span>{Math.round(percentage)}%</span>
                                </div>
                            </div>
                        </button>
                    ))}

                    {/* Summary stats */}
                    <div className="mt-2 pt-3 border-t border-border flex items-center gap-4 text-xs text-foreground-secondary">
                        <span><strong className="text-primary font-mono">{totalActivities}</strong> activities</span>
                        <span><strong className="text-primary font-mono">3</strong> focus areas</span>
                    </div>
                </div>
            </div>

            {/* Expanded detail panel */}
            <AnimatePresence mode="wait">
                {selected && (
                    <motion.div
                        key={selected.id}
                        initial={{ opacity: 0, y: 10, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: 'auto' }}
                        exit={{ opacity: 0, y: -10, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                    >
                        <div
                            className="rounded-xl border border-border p-6 space-y-5"
                            style={{ borderLeftColor: selected.color, borderLeftWidth: '4px' }}
                        >
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-semibold">
                                    {selected.emoji} {selected.title}
                                </h3>
                                <button
                                    onClick={() => setSelectedPillar(null)}
                                    className="text-foreground-secondary hover:text-foreground text-sm"
                                >
                                    ✕
                                </button>
                            </div>
                            <p className="text-sm text-foreground-secondary">{selected.subtitle}</p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Highlights */}
                                <div>
                                    <h4 className="text-sm font-semibold text-primary mb-2">Highlights</h4>
                                    <ul className="space-y-1.5">
                                        {selected.highlights.map((h, i) => (
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
                                        {selected.whyItMatters.map((w, i) => (
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
}
