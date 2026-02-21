'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { GraduationCap } from 'lucide-react';
import educationData from '@/data/education.json';

// Type definition based on new JSON structure

export default function EducationTimeline() {
    return (
        <section className="py-12 bg-background-secondary/30">
            <div className="max-w-4xl mx-auto px-4">
                <h2 className="text-3xl font-bold mb-12 flex items-center gap-3">
                    <GraduationCap className="w-8 h-8 text-primary" />
                    Education
                </h2>

                <div className="space-y-6">
                    {educationData.map((edu, index) => (
                        <motion.div
                            key={edu.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="w-full"
                        >
                            <div className="card-hover p-6 rounded-xl bg-surface border border-border flex flex-row gap-4 items-start">
                                {/* Logo/Icon Section */}
                                {edu.logo && (
                                    <div className="shrink-0 w-16 h-16 relative rounded overflow-hidden bg-white p-1 mt-3">
                                        <Image
                                            src={`/${edu.logo}`}
                                            alt={`${edu.school} Logo`}
                                            fill
                                            className="object-contain"
                                        />
                                    </div>
                                )}
                                <div className="flex-1 flex flex-col gap-1">
                                    <h3 className="text-lg font-bold text-foreground">{edu.school}</h3>

                                    <p className="text-foreground-secondary">
                                        {edu.degree}{edu.major ? `, ${edu.major}` : ''}
                                    </p>

                                    <p className="text-sm text-foreground-secondary/80">
                                        {edu.startDate} – {edu.endDate}
                                    </p>

                                    <p className="text-sm text-foreground-secondary/80">
                                        Grade: {edu.gpa}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
