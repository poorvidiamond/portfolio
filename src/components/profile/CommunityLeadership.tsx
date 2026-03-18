'use client';

import { motion } from 'framer-motion';
import { Users, Award } from 'lucide-react';
import leadershipData from '@/data/leadership.json';

interface LeadershipItem {
    id: number;
    title: string;
    description: string[];
    type: string;
    metrics?: string[];
}

export default function CommunityLeadership() {
    const organizational = (leadershipData as LeadershipItem[]).filter(
        (item) => item.type === 'Organizational'
    );

    return (
        <section className="py-12 md:py-20 px-4">
            <div className="max-w-5xl mx-auto">
                <div className="flex items-center gap-2 mb-8">
                    <Users className="w-6 h-6 text-primary" />
                    <h2 className="text-2xl font-bold">Community & Leadership</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                    {organizational.map((item, index) => (
                        <motion.article
                            key={item.id}
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.35, delay: index * 0.08 }}
                            className="leadership-card leadership-card-org"
                        >
                            <div className="leadership-card-icon leadership-card-icon-org">
                                <Users className="w-4 h-4" />
                            </div>
                            <h3 className="leadership-card-title">{item.title}</h3>
                            <ul className="leadership-card-desc">
                                {item.description.map((point, i) => (
                                    <li key={i}>{point}</li>
                                ))}
                            </ul>
                            {item.metrics && item.metrics.length > 0 && (
                                <div className="leadership-card-metrics">
                                    {item.metrics.map((metric, i) => (
                                        <span key={i} className="leadership-metric leadership-metric-org">
                                            <Award className="w-3 h-3" />
                                            {metric}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    );
}
