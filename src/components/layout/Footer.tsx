import { Github, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t border-border py-8 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    {/* Copyright */}
                    <div className="text-base font-medium text-foreground-secondary">
                        © {currentYear} Poorvi Bhaskar. All rights reserved.
                    </div>

                    {/* Social Links */}
                    <div className="flex items-center gap-6">
                        <a
                            href="#"
                            className="p-2 rounded-md hover:bg-surface-hover transition-colors text-foreground-secondary hover:text-primary"
                            aria-label="GitHub"
                        >
                            <Github className="w-6 h-6" />
                        </a>
                        <a
                            href="#"
                            className="p-2 rounded-md hover:bg-surface-hover transition-colors text-foreground-secondary hover:text-primary"
                            aria-label="LinkedIn"
                        >
                            <Linkedin className="w-6 h-6" />
                        </a>
                        <a
                            href="#"
                            className="p-2 rounded-md hover:bg-surface-hover transition-colors text-foreground-secondary hover:text-primary"
                            aria-label="Email"
                        >
                            <Mail className="w-6 h-6" />
                        </a>
                    </div>

                    {/* Status */}
                    <div className="text-base font-medium text-foreground-secondary flex items-center gap-3">
                        <span className="w-2.5 h-2.5 rounded-full bg-success animate-pulse"></span>
                        Available for opportunities
                    </div>
                </div>
            </div>
        </footer>
    );
}
