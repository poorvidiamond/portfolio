// Types for portfolio data

export interface Project {
    id: number;
    title: string;
    slug: string;
    category: ('Firmware' | 'IoT' | 'DevOps')[];
    type: string;
    situation: string;
    task?: string;
    action: string;
    result: string;
    description: string;
    techTags: string[];
    impact: string;
    repoUrl?: string;
    internalUrl?: string; // SharePoint links
    isFeatured: boolean;
}

export interface TimelineNode {
    id: number;
    role: string;
    company: string;
    location: string;
    startDate: string;
    endDate: string | 'Present';
    type: 'Professional' | 'Internship' | 'Part-time' | 'Student Job';
    bullets: string[];
    projects: number[]; // Project IDs
    url?: string;
    image?: string;
    video?: string;
    metrics?: string[];
    linkLabel?: string;
}

export interface LeadershipItem {
    id: number;
    title: string;
    description: string[];
    type: 'Technical' | 'Organizational';
    metrics?: string[];
}

export interface VolunteerActivity {
    id: number;
    date: string;
    hours: number;
    activity: string;
    category: 'Humanitarian' | 'Environment' | 'Education' | 'Community' | 'Online';
    pillar: 'missingmaps' | 'wellness' | 'corporate';
}

export interface PillarPhoto {
    src: string;
    caption: string;
}

export interface VolunteerPillar {
    id: string;
    emoji: string;
    title: string;
    subtitle: string;
    hours: number;
    color: string;
    highlights: string[];
    whyItMatters: string[];
    photos: PillarPhoto[];
}

export interface VolunteerPillarData {
    pillars: VolunteerPillar[];
}

export interface Certification {
    id: number;
    name: string;
}
