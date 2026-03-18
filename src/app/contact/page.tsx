'use client';

import { useState } from 'react';
import { Github, Linkedin, Mail, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ContactPage() {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
    const [errorMsg, setErrorMsg] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('sending');
        setErrorMsg('');

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Something went wrong');
            }

            setStatus('success');
            setFormData({ name: '', email: '', message: '' });
        } catch (err) {
            setStatus('error');
            setErrorMsg(err instanceof Error ? err.message : 'Failed to send message');
        }
    };

    return (
        <section className="py-20 px-4">
            <div className="max-w-4xl w-full mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 className="terminal-text text-4xl font-bold mb-4 text-center">
                        Contact
                    </h1>
                    <p className="text-foreground-secondary text-lg mb-12 max-w-2xl mx-auto text-center">
                        I&apos;m always open to discussing new opportunities, collaborations, or just chatting about embedded systems.
                    </p>

                    <div className="grid lg:grid-cols-5 gap-8">
                        {/* Contact Form */}
                        <motion.div
                            className="lg:col-span-3"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div>
                                    <label htmlFor="contact-name" className="block text-sm font-medium text-foreground-secondary mb-2">
                                        Name
                                    </label>
                                    <input
                                        id="contact-name"
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full px-4 py-3 rounded-lg bg-surface border border-border focus:border-primary focus:outline-none transition-colors text-foreground"
                                        placeholder="Your name"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="contact-email" className="block text-sm font-medium text-foreground-secondary mb-2">
                                        Email
                                    </label>
                                    <input
                                        id="contact-email"
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full px-4 py-3 rounded-lg bg-surface border border-border focus:border-primary focus:outline-none transition-colors text-foreground"
                                        placeholder="you@example.com"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="contact-message" className="block text-sm font-medium text-foreground-secondary mb-2">
                                        Message
                                    </label>
                                    <textarea
                                        id="contact-message"
                                        required
                                        rows={5}
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        className="w-full px-4 py-3 rounded-lg bg-surface border border-border focus:border-primary focus:outline-none transition-colors text-foreground resize-none"
                                        placeholder="Tell me about your project or opportunity..."
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={status === 'sending'}
                                    className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary text-background font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {status === 'sending' ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-background border-t-transparent rounded-full animate-spin" />
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            <Send className="w-5 h-5" />
                                            Send Message
                                        </>
                                    )}
                                </button>

                                {/* Status Messages */}
                                {status === 'success' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="flex items-center gap-2 p-4 rounded-lg bg-green-500/10 border border-green-500/30 text-green-400"
                                    >
                                        <CheckCircle className="w-5 h-5 flex-shrink-0" />
                                        <span>Message sent successfully! I&apos;ll get back to you soon.</span>
                                    </motion.div>
                                )}

                                {status === 'error' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="flex items-center gap-2 p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400"
                                    >
                                        <AlertCircle className="w-5 h-5 flex-shrink-0" />
                                        <span>{errorMsg}</span>
                                    </motion.div>
                                )}
                            </form>
                        </motion.div>

                        {/* Social Links */}
                        <motion.div
                            className="lg:col-span-2 flex flex-col gap-4"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                        >
                            <h2 className="text-lg font-semibold text-foreground-secondary mb-2">Or reach out directly</h2>

                            <a
                                href="mailto:poorvidiamond@gmail.com"
                                className="group p-5 rounded-xl bg-surface border border-border hover:border-primary transition-all flex items-center gap-4"
                            >
                                <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                                    <Mail className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <span className="font-semibold group-hover:text-primary transition-colors block">Email</span>
                                    <span className="text-sm text-foreground-secondary">poorvidiamond@gmail.com</span>
                                </div>
                            </a>

                            <a
                                href="https://linkedin.com/in/poorvibhaskar"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group p-5 rounded-xl bg-surface border border-border hover:border-secondary transition-all flex items-center gap-4"
                            >
                                <div className="p-3 rounded-full bg-secondary/10 group-hover:bg-secondary/20 transition-colors">
                                    <Linkedin className="w-6 h-6 text-secondary" />
                                </div>
                                <div>
                                    <span className="font-semibold group-hover:text-secondary transition-colors block">LinkedIn</span>
                                    <span className="text-sm text-foreground-secondary">poorvibhaskar</span>
                                </div>
                            </a>

                            <a
                                href="https://github.com/poorvidiamond"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group p-5 rounded-xl bg-surface border border-border hover:border-primary transition-all flex items-center gap-4"
                            >
                                <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                                    <Github className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <span className="font-semibold group-hover:text-primary transition-colors block">GitHub</span>
                                    <span className="text-sm text-foreground-secondary">poorvidiamond</span>
                                </div>
                            </a>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
