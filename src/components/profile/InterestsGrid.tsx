'use client';

import { motion } from 'framer-motion';
import { Sun, Search, Heart, Camera, Music, Book, Mic, type LucideIcon } from 'lucide-react';
import interestsData from '@/data/interests.json';

const iconMap: Record<string, LucideIcon> = {
    Sun,
    Search,
    Heart,
    Camera,
    Music,
    Book,
    Mic
};

export default function InterestsGrid() {
    return (
        <section className="py-12 md:py-20 px-4">
            <div className="max-w-5xl mx-auto">
                <h2 className="text-3xl font-bold mb-12 flex items-center gap-3">
                    <Heart className="w-8 h-8 text-secondary" />
                    Personal Interests
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {interestsData.map((interest, index) => {
                        const Icon = iconMap[interest.icon] || Heart;

                        return (
                            <motion.div
                                key={interest.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.1 }}
                                className="group p-6 rounded-xl bg-surface border border-border hover:border-secondary transition-colors"
                            >
                                <div className="flex items-center gap-4 mb-3">
                                    <div className="p-3 rounded-lg bg-secondary/10 w-fit group-hover:bg-secondary/20 transition-colors">
                                        <Icon className="w-8 h-8 text-secondary" />
                                    </div>
                                    <h3 className="text-xl font-semibold">{interest.title}</h3>
                                </div>
                                <p className="text-foreground-secondary leading-relaxed">
                                    {interest.description}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
