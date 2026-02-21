'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X, Sun, Moon, Terminal } from 'lucide-react';
import { useTheme } from '@/lib/ThemeProvider';

const navLinks = [
    { href: '/', label: '~/about' },
    { href: '/experience', label: '~/experience' },
    { href: '/technical-skills', label: '~/skills' },
    { href: '/projects', label: '~/projects' },
    { href: '/leadership', label: '~/leadership' },
    { href: '/volunteering', label: '~/volunteering' },
    { href: '/resume.pdf', label: '~/resume' },
    { href: '/contact', label: '~/contact' },
];

export default function Navbar() {
    const pathname = usePathname();
    const { theme, toggleTheme } = useTheme();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 glass">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <Terminal className="w-6 h-6 text-primary group-hover:text-secondary transition-colors" />
                        <span className="terminal-text font-bold text-lg">
                            poorvi<span className="text-primary">@</span>portfolio
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`terminal-text px-3 py-2 rounded-md text-sm transition-all ${pathname === link.href
                                    ? 'bg-primary/10 text-primary'
                                    : 'text-foreground-secondary hover:text-foreground hover:bg-surface-hover'
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}

                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            className="ml-4 p-2 rounded-md hover:bg-surface-hover transition-colors"
                            aria-label="Toggle theme"
                        >
                            {theme === 'dark' ? (
                                <Sun className="w-5 h-5 text-secondary" />
                            ) : (
                                <Moon className="w-5 h-5 text-primary" />
                            )}
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center gap-2">
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-md hover:bg-surface-hover transition-colors"
                            aria-label="Toggle theme"
                        >
                            {theme === 'dark' ? (
                                <Sun className="w-5 h-5 text-secondary" />
                            ) : (
                                <Moon className="w-5 h-5 text-primary" />
                            )}
                        </button>
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="p-2 rounded-md hover:bg-surface-hover transition-colors"
                            aria-label="Toggle menu"
                        >
                            {mobileMenuOpen ? (
                                <X className="w-6 h-6" />
                            ) : (
                                <Menu className="w-6 h-6" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden py-4 border-t border-border">
                        <div className="flex flex-col gap-1">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className={`terminal-text px-3 py-2 rounded-md text-sm transition-all ${pathname === link.href
                                        ? 'bg-primary/10 text-primary'
                                        : 'text-foreground-secondary hover:text-foreground hover:bg-surface-hover'
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}
