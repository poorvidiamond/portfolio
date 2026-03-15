'use client';

import { motion } from 'framer-motion';
import { Cpu, Code2, Wifi, TestTube, Wrench, Monitor, Car, CircuitBoard, type LucideIcon } from 'lucide-react';
import skillsData from '@/data/skills.json';

const iconMap: Record<string, LucideIcon> = {
    Cpu, Code2, Wifi, TestTube, Wrench, Monitor, Car, CircuitBoard,
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
    logo?: string;
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

                {/* Skills Grid */}
                <div className="skills-grid-container">
                    {Stack.map((item, index) => {
                        const Icon = iconMap[item.icon] || Cpu;
                        const color = LAYER_COLORS[index % LAYER_COLORS.length];

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
                                className="skills-box"
                                style={{ borderColor: `${color}30` }}
                            >
                                {/* Layer header */}
                                <div
                                    className="skills-box-header"
                                    style={{
                                        borderBottomColor: `${color}25`,
                                        background: `${color}08`,
                                    }}
                                >
                                    <Icon className="w-5 h-5 flex-shrink-0" style={{ color }} />
                                    <div>
                                        <span className="skills-box-title" style={{ color }}>{item.layer}</span>
                                        <span className="skills-box-subtitle">{item.subtitle}</span>
                                    </div>
                                </div>

                                {/* Skills list */}
                                <div className="skills-box-content">
                                    {sortedSkills.map((skill, sIdx) =>
                                        skill.logo ? (
                                            <motion.div
                                                key={skill.name}
                                                initial={{ opacity: 0, scale: 0.85 }}
                                                whileInView={{ opacity: 1, scale: 1 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: index * 0.07 + sIdx * 0.04 + 0.15 }}
                                                className="skills-box-item"
                                            >
                                                <img
                                                    src={skill.logo}
                                                    alt={skill.name}
                                                    className="skills-box-logo"
                                                    loading="lazy"
                                                />
                                                <span className="skills-box-name">{skill.name}</span>
                                                {/* Proficiency bar */}
                                                <div className="skills-box-proficiency">
                                                    <div
                                                        className="skills-box-proficiency-fill"
                                                        style={{
                                                            width: `${(skill.proficiency / 5) * 100}%`,
                                                            background: color,
                                                        }}
                                                    />
                                                </div>
                                            </motion.div>
                                        ) : (
                                            <motion.span
                                                key={skill.name}
                                                initial={{ opacity: 0, scale: 0.85 }}
                                                whileInView={{ opacity: 1, scale: 1 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: index * 0.07 + sIdx * 0.04 + 0.15 }}
                                                className="skills-text-chip"
                                                style={{ borderColor: `${color}40` }}
                                            >
                                                {skill.name}
                                            </motion.span>
                                        )
                                    )}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
