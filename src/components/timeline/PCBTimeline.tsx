'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { MapPin, Calendar, ChevronRight, ExternalLink, Award } from 'lucide-react';
import type { TimelineNode } from '@/types';

interface PCBTimelineProps {
    nodes: TimelineNode[];
}

export default function PCBTimeline({ nodes }: PCBTimelineProps) {
    return (
        <div className="relative">
            {/* Timeline Nodes */}
            <div className="space-y-20">
                {nodes.map((node, index) => (
                    <TimelineNodeCard
                        key={node.id}
                        node={node}
                        index={index}
                        isLast={index === nodes.length - 1}
                    />
                ))}
            </div>
        </div>
    );
}


function TimelineNodeCard({ node, index, isLast }: { node: TimelineNode; index: number; isLast: boolean }) {
    const isLeft = index % 2 === 0;
    const cardRef = useRef<HTMLDivElement>(null);

    // Track component's position in viewport
    const { scrollYProgress } = useScroll({
        target: cardRef,
        offset: ["start end", "end start"]
    });

    const cardBorderColor = useTransform(scrollYProgress,
        [0.2, 0.5, 0.8],
        ["rgba(229, 229, 229, 1)", "rgba(34, 197, 94, 0.8)", "rgba(229, 229, 229, 1)"]
    );

    // Shadow for the card
    const cardBoxShadow = useTransform(scrollYProgress,
        [0.2, 0.5, 0.8],
        ["0 0 0px rgba(0, 0, 0, 0)", "0 0 20px rgba(34, 197, 94, 0.2)", "0 0 0px rgba(0, 0, 0, 0)"]
    );

    // Trace line animation - fills as we scroll past
    // We want it to fill from the center of this card (approx 0.5) to the next (approx 0.8 or 1.0 of this card's view + gap?)
    // Simplified: Just use the same progress but mapped to fill when this card is maintained? 
    // Actually, "start center" to "end center" of the CARD might cover the transition.
    // Let's rely on the card's scroll progress to fill the "outgoing" line.
    const traceScaleY = useTransform(scrollYProgress, [0.4, 0.7], [0, 1]);

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className={`relative flex items-stretch ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
        >
            {/* Segmented Trace Line (Outgoing) */}
            {!isLast && (
                <div
                    className="absolute left-8 md:left-1/2 w-2 bg-trace/30 transform -translate-x-1/2 -z-10"
                    style={{
                        top: '2rem',
                        height: 'calc(100% + 5rem)'
                    }}
                >
                    <motion.div
                        className="w-full bg-trace-active origin-top"
                        style={{ scaleY: traceScaleY, height: '100%' }}
                    />
                </div>
            )}

            {/* Content Card */}
            <div
                className={`ml-16 md:ml-0 md:w-[75%] ${isLeft ? 'md:pr-12' : 'md:pl-12'
                    }`}
            >
                <motion.div
                    style={{ borderColor: cardBorderColor, boxShadow: cardBoxShadow }}
                    className="card-hover bg-surface border-2 border-border rounded-lg p-6 h-full flex flex-col justify-between"
                >
                    <div className="flex flex-col md:flex-row gap-6">
                        {/* Media / Link Section - FIRST (Left) */}
                        {(node.video || node.image || node.url) && (
                            <div className="md:w-1/3 shrink-0">
                                {node.url ? (
                                    <a
                                        href={node.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block relative w-full h-48 md:h-full min-h-[12rem] rounded-lg overflow-hidden border border-border group bg-surface-secondary/30 hover:border-primary transition-colors"
                                    >
                                        {node.video ? (
                                            <div className="absolute inset-0 flex items-center justify-center bg-black">
                                                <video
                                                    src={node.video}
                                                    autoPlay
                                                    muted
                                                    loop
                                                    playsInline
                                                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                                                />
                                            </div>
                                        ) : node.image ? (
                                            <div className="absolute inset-0 p-2 flex items-center justify-center bg-black">
                                                <img
                                                    src={node.image}
                                                    alt={`${node.company} logo`}
                                                    className="max-w-full max-h-full object-contain opacity-90 group-hover:opacity-100 transition-opacity"
                                                />
                                            </div>
                                        ) : (
                                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                                <ExternalLink className="w-8 h-8 text-foreground-secondary group-hover:text-primary mb-2 transition-colors relative z-10" />
                                                <p className="text-xs font-medium text-foreground group-hover:text-primary transition-colors relative z-10">
                                                    View Project
                                                </p>
                                            </div>
                                        )}
                                        <div className="absolute bottom-0 left-0 right-0 bg-black/70 backdrop-blur-sm px-3 py-2 flex items-center justify-center gap-1.5 z-10">
                                            <ExternalLink className="w-3 h-3 text-primary" />
                                            <span className="text-xs text-white/90 group-hover:text-primary transition-colors">
                                                {node.linkLabel || 'Click to view company product portfolio'}
                                            </span>
                                        </div>
                                    </a>
                                ) : (
                                    <div className="block relative w-full h-48 md:h-full min-h-[12rem] rounded-lg overflow-hidden border border-border bg-surface-secondary/30">
                                        {node.video ? (
                                            <div className="absolute inset-0 flex items-center justify-center bg-black">
                                                <video
                                                    src={node.video}
                                                    autoPlay
                                                    muted
                                                    loop
                                                    playsInline
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        ) : node.image && (
                                            <div className="absolute inset-0 p-2 flex items-center justify-center bg-black">
                                                <img
                                                    src={node.image}
                                                    alt={`${node.company} logo`}
                                                    className="max-w-full max-h-full object-contain"
                                                />
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Info Section - SECOND (Right) */}
                        <div className="flex-1">
                            <div>
                                {/* Header */}
                                <div className="mb-4">
                                    <span
                                        className={`text-xs px-2 py-1 rounded-md ${node.type === 'Professional'
                                            ? 'bg-primary/10 text-primary'
                                            : 'bg-secondary/10 text-secondary'
                                            }`}
                                    >
                                        {node.type}
                                    </span>
                                    <div className="flex items-baseline justify-between gap-4 mt-2">
                                        <h3 className="text-xl font-bold min-w-0">{node.role}</h3>
                                        <span className="flex items-center gap-1 text-sm text-foreground-secondary shrink-0 whitespace-nowrap">
                                            <Calendar className="w-4 h-4" />
                                            {node.startDate} - {node.endDate}
                                        </span>
                                    </div>
                                    <div className="flex items-baseline justify-between gap-4">
                                        <p className="text-primary font-medium min-w-0">{node.company}</p>
                                        <span className="flex items-center gap-1 text-sm text-foreground-secondary shrink-0 whitespace-nowrap">
                                            <MapPin className="w-4 h-4" />
                                            {node.location}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Bullets */}
                            <ul className="space-y-2">
                                {node.bullets.map((bullet, i) => (
                                    <li key={i} className="flex items-start gap-2 text-sm text-foreground-secondary">
                                        <ChevronRight className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                                        <span>{bullet}</span>
                                    </li>
                                ))}
                            </ul>

                            {/* Metrics */}
                            {node.metrics && node.metrics.length > 0 && (
                                <div className="flex flex-wrap gap-2 mt-4">
                                    {node.metrics.map((metric, i) => (
                                        <span
                                            key={i}
                                            className="flex items-center gap-1 text-xs px-2 py-1 rounded-md bg-primary/10 text-primary"
                                        >
                                            <Award className="w-3 h-3" />
                                            {metric}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Empty Spacer Side (Desktop Only) to clear the "other side" since dot is center */}
            <div className="hidden md:block md:w-[25%]" />
        </motion.div>
    );
}
