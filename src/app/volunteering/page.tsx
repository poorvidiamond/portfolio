import ImpactGrid from '@/components/volunteer/ImpactGrid';
import PhotoGrid from '@/components/volunteer/PhotoGrid';
import volunteerData from '@/data/volunteer.json';
import pillarData from '@/data/volunteer-pillars.json';
import type { VolunteerActivity, VolunteerPillarData } from '@/types';

export const metadata = {
    title: 'Volunteering | Poorvi Bhaskar',
    description: 'Strategic volunteering: technical skill deployment, wellness integration, and corporate citizenship.',
};

export default function VolunteeringPage() {
    const activities = volunteerData as VolunteerActivity[];
    const data = pillarData as VolunteerPillarData;
    const pillars = data.pillars;

    return (
        <section className="py-20 px-4">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="mb-12">
                    <h1 className="terminal-text text-3xl font-bold mb-4">
                        Volunteering as Strategic Practice
                    </h1>
                    <p className="text-foreground-secondary max-w-2xl leading-relaxed">
                        I approach community engagement the way I approach engineering:
                        systematically, intentionally, and with measurable impact.
                    </p>
                </div>

                {/* Three Pillars label */}
                <p className="text-foreground-secondary mb-3 text-sm font-medium">
                    Three pillars:
                </p>

                {/* Pillar Cards + Total Impact Bar */}
                <ImpactGrid activities={activities} pillars={pillars} />

                {/* Photo Highlights */}
                <div className="mt-14">
                    <h2 className="text-xl font-semibold mb-6">
                        Photo Highlights:{' '}
                        <span className="text-foreground-secondary font-normal">Impact in Action</span>
                    </h2>
                    <PhotoGrid pillars={pillars} />
                </div>
            </div>
        </section>
    );
}
