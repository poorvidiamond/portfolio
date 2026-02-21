import { Github, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t border-border py-8 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    {/* Copyright */}
                    <div className="terminal-text text-sm text-foreground-secondary">
                        <span className="text-primary">$</span> echo &quot;© {currentYear} Poorvi Bhaskar. All rights reserved.&quot;
                    </div>

                    {/* Social Links */}
                    <div className="flex items-center gap-4">
                        <a
                            href="#"
                            className="p-2 rounded-md hover:bg-surface-hover transition-colors text-foreground-secondary hover:text-primary"
                            aria-label="GitHub"
                        >
                            <Github className="w-5 h-5" />
                        </a>
                        <a
                            href="#"
                            className="p-2 rounded-md hover:bg-surface-hover transition-colors text-foreground-secondary hover:text-primary"
                            aria-label="LinkedIn"
                        >
                            <Linkedin className="w-5 h-5" />
                        </a>
                        <a
                            href="#"
                            className="p-2 rounded-md hover:bg-surface-hover transition-colors text-foreground-secondary hover:text-primary"
                            aria-label="Email"
                        >
                            <Mail className="w-5 h-5" />
                        </a>
                    </div>

                    {/* Status */}
                    <div className="terminal-text text-sm text-foreground-secondary flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-success animate-pulse"></span>
                        Available for opportunities
                    </div>
                </div>
            </div>
        </footer>
    );
}
