'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { User } from 'lucide-react';

export default function ProfileHero() {
    return (
        <section className="pt-6 pb-12 md:pt-10 md:pb-20 animate-fade-in relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    {/* Profile Image & Background Effect */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="relative"
                    >
                        <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto rounded-2xl overflow-hidden border-2 border-primary/30 shadow-2xl shadow-primary/10">
                            <Image
                                src="/profile.jpg"
                                alt="Poorvi Bhaskar"
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                        {/* Decorative Elements */}
                        <div className="absolute -top-6 -left-6 text-primary/20">
                            <svg width="60" height="60" viewBox="0 0 60 60" fill="currentColor">
                                <path d="M0 0h10v10H0V0zm20 0h10v10H20V0zm20 0h10v10H40V0z" />
                                <path d="M0 20h10v10H0V20zm20 0h10v10H20V20zm20 0h10v10H40V20z" />
                            </svg>
                        </div>
                    </motion.div>

                    {/* Bio Text */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="space-y-6"
                    >
                        <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                            Poorvi Bhaskar
                        </h1>
                        <h2 className="text-3xl font-bold flex items-center gap-3 mb-6 text-foreground">
                            <User className="w-8 h-8 text-primary" />
                            Who am I
                        </h2>

                        <div className="prose prose-invert max-w-none text-foreground-secondary space-y-4 text-justify">
                            <p>
                                Making firmware reliable, testable, and production-ready is my drive. As an Embedded Systems Engineer in Eaton&apos;s Engineering &amp; Technology Leadership Development Program, I work across IoT connectivity, Power Systems, and E-mobility.
                            </p>
                            <p>
                                I combine cross-functional experience with hands-on skills in embedded firmware, wireless protocols, and hardware validation. Collaborating with teams across the US, Poland, India, and China has exposed me to diverse engineering practices across the product lifecycle.
                            </p>
                            <p>
                                I bring cross-stack experience from hardware interfaces to CI/CD, and I&apos;m building toward a focused embedded engineering role with a path to technical leadership.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
