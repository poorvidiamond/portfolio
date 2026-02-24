'use client';

import { motion } from 'framer-motion';
import { Cpu, Code2, Wifi, TestTube, Wrench, Monitor, Car, CircuitBoard, ShieldCheck, Terminal, type LucideIcon } from 'lucide-react';
import skillsData from '@/data/skills.json';

const iconMap: Record<string, LucideIcon> = {
    Cpu, Code2, Wifi, TestTube, Wrench, Monitor, Car, CircuitBoard, ShieldCheck, Terminal,
};

/* ── Per-layer accent colors ── */
const LAYER_COLORS = [
    '#06b6d4', // Cyan
    '#22c55e', // Green
    '#f97316', // Orange
    '#a855f7', // Purple
    '#ef4444', // Red
    '#3b82f6', // Blue
    '#ec4899', // Pink
    '#eab308', // Yellow
];

interface Skill {
    name: string;
    logo: string;
    proficiency: number;
}

interface StackLayer {
    layer: string;
    subtitle: string;
    icon: string;
    skills: Skill[];
}

export default function SkillsPage() {
    const { Stack } = skillsData as {
        Stack: StackLayer[];
    };

    const totalLayers = Stack.length;

    return (
        <section className="py-20 px-4 min-h-screen">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-12 text-center">
                    <h1 className="terminal-text text-3xl font-bold mb-2">
                        <span className="text-primary">~/</span>technical-skills
                    </h1>
                    <p className="text-foreground-secondary text-base">
                        The Embedded Systems Stack
                    </p>
                </div>

                {/* Pyramid */}
                <div className="pyramid-container">
                    {Stack.map((item, index) => {
                        const Icon = iconMap[item.icon] || Cpu;
                        const color = LAYER_COLORS[index % LAYER_COLORS.length];
                        // Width grows linearly from 36% at top to 100% at bottom
                        const widthPercent = 36 + (64 * index) / (totalLayers - 1);

                        // Sort skills: highest proficiency first
                        const sortedSkills = [...item.skills].sort(
                            (a, b) => b.proficiency - a.proficiency
                        );

                        return (
                            <motion.div
                                key={item.layer}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: index * 0.07 }}
                                className="pyramid-row"
                                style={{ maxWidth: `${widthPercent}%` }}
                            >
                                {/* Layer label */}
                                <div
                                    className="pyramid-label"
                                    style={{
                                        borderColor: color,
                                        background: `${color}15`,
                                    }}
                                >
                                    <Icon className="w-4 h-4 flex-shrink-0" style={{ color }} />
                                    <span className="pyramid-layer-name" style={{ color }}>{item.layer}</span>
                                    <span className="pyramid-layer-sub">— {item.subtitle}</span>
                                </div>

                                {/* Skills card */}
                                <div
                                    className="pyramid-skills-card"
                                    style={{ borderColor: `${color}30` }}
                                >
                                    <div className="pyramid-skills-grid">
                                        {sortedSkills.map((skill, sIdx) => (
                                            <motion.div
                                                key={skill.name}
                                                initial={{ opacity: 0, scale: 0.85 }}
                                                whileInView={{ opacity: 1, scale: 1 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: index * 0.07 + sIdx * 0.04 + 0.15 }}
                                                className="pyramid-skill-item"
                                            >
                                                {skill.logo ? (
                                                    <img
                                                        src={skill.logo}
                                                        alt={skill.name}
                                                        className="pyramid-skill-logo dark:invert"
                                                        loading="lazy"
                                                    />
                                                ) : (
                                                    <div className="pyramid-skill-logo-placeholder" style={{ borderColor: `${color}40` }}>
                                                        <span style={{ color, fontSize: '0.6rem', fontWeight: 700 }}>
                                                            {skill.name.slice(0, 2).toUpperCase()}
                                                        </span>
                                                    </div>
                                                )}
                                                <span className="pyramid-skill-name">{skill.name}</span>
                                                {/* Proficiency bar */}
                                                <div className="pyramid-proficiency-bar">
                                                    <div
                                                        className="pyramid-proficiency-fill"
                                                        style={{
                                                            width: `${(skill.proficiency / 5) * 100}%`,
                                                            background: color,
                                                        }}
                                                    />
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
