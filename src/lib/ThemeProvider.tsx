'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState<Theme>('dark');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line
        setMounted(true);
        // Check localStorage or system preference
        if (typeof window !== 'undefined') {
            const stored = localStorage.getItem('theme') as Theme | null;
            if (stored) {
                setTheme(stored);
            } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
                setTheme('light');
            }
        }

    }, []);

    useEffect(() => {
        if (mounted) {
            const root = document.documentElement;
            root.classList.remove('light', 'dark');
            root.classList.add(theme);
            localStorage.setItem('theme', theme);
        }
    }, [theme, mounted]);

    const toggleTheme = () => {
        setTheme(prev => prev === 'dark' ? 'light' : 'dark');
    };

    // Prevent flash of wrong theme
    /* 
    if (!mounted) {
        return <>{children}</>;
    } 
    */
    // Better to return children to allow SSR content to be present
    // We suppress hydration warning on html tag in layout so this is acceptable


    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}
