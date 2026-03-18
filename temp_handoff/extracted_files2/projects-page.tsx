'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import portfolioData from '@/data/portfolio-projects-optimized.json';
import './projects.css';

const { portfolioProjects } = portfolioData;

/* ── Config: hook taglines, top skills, ownership ── */
const HOOK_TAGLINES: Record<number, string> = {
    9: 'One GUI replaced four CLI scripts for global EV firmware updates',
    10: 'Ran regression suites and resolved setup blockers for a new OEM program',
    11: 'Turned ambiguous isoSPI docs into a repeatable validation workflow',
    5: 'Built a working Matter ecosystem to replace Wi-Fi speculation',
    4: 'Qualified ~50 smart home devices before product launch — from scratch',
    2: 'Gave field engineers remote fault visibility for the first time',
    8: 'What if firmware teams never needed a prototype board?',
    6: 'Can Rust work for safety-critical embedded firmware at Eaton?',
    12: 'Open-source I2C driver contributed back to the mbed community',
};

const TOP_SKILLS: Record<number, string[]> = {
    9: ['C++', 'Qt', 'CAN', 'UDS'],
    10: ['Python', 'HiL', 'CAN', 'CANoe'],
    11: ['isoSPI', 'SPI', 'I2C', 'EEPROM'],
    5: ['Matter', 'Thread', 'Silicon Labs', 'OpenThread'],
    4: ['ESP32', 'FreeRTOS', 'BLE', 'OTA'],
    2: ['STM32', 'Raspberry Pi', 'Node-RED', 'SWD'],
    8: ['Renode', 'STM32', 'Robot Framework', 'CI/CD'],
    6: ['Rust', 'STM32', 'FFI', 'CI/CD'],
    12: ['C++', 'I2C', 'mbed LPC1768', 'CMake'],
};

const OWNED_IDS = new Set([9, 11, 8, 6]);

interface Project {
    id: number;
    title: string;
    slug: string;
    tagline: string;
    technicalSkills: string[];
    ownership?: string;
    ownershipIcon?: string;
}

interface Domain {
    id: string;
    title: string;
    description: string;
    icon: string;
    color: string;
    projects: Project[];
}

export default function ProjectsPage() {
    const domains = portfolioProjects.domains as unknown as Domain[];
    const [openDomains, setOpenDomains] = useState<Set<string>>(new Set([domains[0]?.id]));

    const toggleDomain = (id: string) => {
        setOpenDomains(prev => {
            const next = new Set(prev);
            if (next.has(id)) {
                next.delete(id);
            } else {
                next.add(id);
            }
            return next;
        });
    };

    return (
        <div className="pl-page">
            {/* Header */}
            <div className="pl-header">
                <h1 className="terminal-text">Featured Engineering Projects</h1>
                <p>Firmware, IoT, and E-Mobility solutions with measurable impact</p>
            </div>

            {/* Metrics */}
            <div className="pl-metrics">
                <div className="pl-metric">
                    <div className="pl-metric-value">9</div>
                    <div className="pl-metric-label">Projects</div>
                </div>
                <div className="pl-metric">
                    <div className="pl-metric-value">4</div>
                    <div className="pl-metric-label">Domains</div>
                </div>
                <div className="pl-metric">
                    <div className="pl-metric-value">4+</div>
                    <div className="pl-metric-label">Teams Enabled</div>
                </div>
            </div>

            {/* Legend */}
            <div className="pl-legend">
                <div className="pl-legend-item">
                    <div className="pl-legend-bar pl-legend-owned" />
                    <span>🔧 Individually Owned</span>
                </div>
                <div className="pl-legend-item">
                    <div className="pl-legend-bar pl-legend-contributor" />
                    <span>👤 Individual Contributor</span>
                </div>
            </div>

            {/* Domain Accordions */}
            {domains.map((domain) => {
                const isOpen = openDomains.has(domain.id);
                return (
                    <div key={domain.id} className="pl-domain">
                        <button
                            className={`pl-domain-header ${isOpen ? 'pl-domain-open' : ''}`}
                            style={{ '--domain-color': domain.color } as React.CSSProperties}
                            onClick={() => toggleDomain(domain.id)}
                            aria-expanded={isOpen}
                        >
                            <div className="pl-domain-left">
                                <span className="pl-domain-icon">{domain.icon}</span>
                                <div className="pl-domain-info">
                                    <span className="pl-domain-title">{domain.title}</span>
                                    <span className="pl-domain-desc">{domain.description}</span>
                                </div>
                            </div>
                            <div className="pl-domain-right">
                                <span className="pl-domain-count">
                                    {domain.projects.length} project{domain.projects.length > 1 ? 's' : ''}
                                </span>
                                <span className={`pl-domain-chevron ${isOpen ? 'pl-chevron-open' : ''}`}>▾</span>
                            </div>
                        </button>

                        <div className={`pl-domain-content ${isOpen ? 'pl-content-open' : ''}`}>
                            <div className="pl-cards-grid">
                                {domain.projects.map((project) => {
                                    const isOwned = OWNED_IDS.has(project.id);
                                    const skills = TOP_SKILLS[project.id] || project.technicalSkills.slice(0, 4);
                                    const tagline = HOOK_TAGLINES[project.id] || project.tagline;

                                    return (
                                        <Link
                                            key={project.id}
                                            href={`/projects/${project.slug}`}
                                            className={`pl-project-card ${isOwned ? 'pl-card-owned' : ''}`}
                                            style={{ '--domain-color': domain.color } as React.CSSProperties}
                                        >
                                            <div className="pl-card-content">
                                                <div className="pl-card-title-row">
                                                    <h3 className="pl-card-title">{project.title}</h3>
                                                    <span
                                                        className={`pl-ownership-badge ${isOwned ? '' : 'pl-contributor'}`}
                                                        title={isOwned ? 'Individually Owned' : 'Individual Contributor'}
                                                    >
                                                        {isOwned ? '🔧' : '👤'}
                                                    </span>
                                                </div>
                                                <p className="pl-card-tagline">{tagline}</p>
                                                <div className="pl-card-skills">
                                                    {skills.map((skill) => (
                                                        <span key={skill} className="pl-chip">{skill}</span>
                                                    ))}
                                                </div>
                                            </div>
                                            <span className="pl-card-arrow">→</span>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
