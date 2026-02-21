'use client';

import { motion } from 'framer-motion';
import type { VolunteerActivity, VolunteerPillar } from '@/types';
import PillarCard from './ImpactCard';

interface ImpactGridProps {
    activities: VolunteerActivity[];
    pillars: VolunteerPillar[];
}

export default function ImpactGrid({ activities, pillars }: ImpactGridProps) {
    const grandTotal = activities.reduce((sum, a) => sum + a.hours, 0);

    // Separate pillars: first two side-by-side, corporate full width
    const topPillars = pillars.filter(p => p.id !== 'corporate');
    const corporatePillar = pillars.find(p => p.id === 'corporate');

    return (
        <div className="space-y-6">
            {/* Two small pillar cards side-by-side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {topPillars.map((pillar, index) => (
                    <motion.div
                        key={pillar.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                        <PillarCard
                            pillar={pillar}
                            grandTotal={grandTotal}
                        />
                    </motion.div>
                ))}
            </div>

            {/* Corporate pillar - full width */}
            {corporatePillar && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                >
                    <PillarCard
                        pillar={corporatePillar}
                        grandTotal={grandTotal}
                    />
                </motion.div>
            )}

            {/* Total Impact Bar */}
            <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="border-t border-b border-border py-4"
            >
                <div className="flex items-center justify-center gap-6 text-sm">
                    <div className="flex items-baseline gap-1.5">
                        <span className="text-xl font-bold font-mono text-primary">{grandTotal}</span>
                        <span className="text-foreground-secondary">total hours</span>
                    </div>
                    <span className="text-border">|</span>
                    <div className="flex items-baseline gap-1.5">
                        <span className="text-xl font-bold font-mono text-primary">{activities.length}</span>
                        <span className="text-foreground-secondary">activities</span>
                    </div>
                    <span className="text-border">|</span>
                    <div className="flex items-baseline gap-1.5">
                        <span className="text-xl font-bold font-mono text-primary">3</span>
                        <span className="text-foreground-secondary">strategic approaches</span>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
