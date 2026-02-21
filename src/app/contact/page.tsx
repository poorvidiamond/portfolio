'use client';

import { Github, Linkedin, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ContactPage() {
    return (
        <section className="py-20 px-4 min-h-screen flex items-center justify-center">
            <div className="max-w-3xl w-full mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 className="terminal-text text-4xl font-bold mb-6">
                        <span className="text-primary">~/</span>contact
                    </h1>
                    <p className="text-foreground-secondary text-lg mb-12 max-w-2xl mx-auto">
                        I&apos;m always open to discussing new opportunities, collaborations, or just chatting about embedded systems.
                    </p>

                    <div className="grid md:grid-cols-3 gap-6">
                        <a
                            href="mailto:poorvibhaskar@example.com" // Replace with actual email if known, or keep placeholder
                            className="group p-8 rounded-xl bg-surface border border-border hover:border-primary transition-all flex flex-col items-center gap-4"
                        >
                            <div className="p-4 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                                <Mail className="w-8 h-8 text-primary" />
                            </div>
                            <span className="font-semibold group-hover:text-primary transition-colors">Email Me</span>
                        </a>

                        <a
                            href="https://linkedin.com/in/poorvibhaskar"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group p-8 rounded-xl bg-surface border border-border hover:border-secondary transition-all flex flex-col items-center gap-4"
                        >
                            <div className="p-4 rounded-full bg-secondary/10 group-hover:bg-secondary/20 transition-colors">
                                <Linkedin className="w-8 h-8 text-secondary" />
                            </div>
                            <span className="font-semibold group-hover:text-secondary transition-colors">LinkedIn</span>
                        </a>

                        <a
                            href="https://github.com/poorvibhaskar"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group p-8 rounded-xl bg-surface border border-border hover:border-primary transition-all flex flex-col items-center gap-4"
                        >
                            <div className="p-4 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                                <Github className="w-8 h-8 text-primary" />
                            </div>
                            <span className="font-semibold group-hover:text-primary transition-colors">GitHub</span>
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
