import PCBTimeline from '@/components/timeline/PCBTimeline';
import experienceData from '@/data/experience.json';
import type { TimelineNode } from '@/types';

export const metadata = {
    title: 'Experience | Poorvi Bhaskar',
    description: 'Professional experience timeline - Firmware Engineer specializing in embedded systems development.',
};

export default function ExperiencePage() {
    const experiences = experienceData as TimelineNode[];

    return (
        <section className="py-20 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-12 text-center md:text-left">
                    <h1 className="terminal-text text-3xl font-bold mb-4">
                        Experience
                    </h1>
                    <p className="text-foreground-secondary max-w-2xl mx-auto md:mx-0">
                        My journey through embedded systems, from internships to full-time roles.
                        The PCB trace below represents my career path—scroll to watch it light up.
                    </p>
                </div>

                {/* Timeline */}
                <PCBTimeline nodes={experiences} />
            </div>
        </section>
    );
}
