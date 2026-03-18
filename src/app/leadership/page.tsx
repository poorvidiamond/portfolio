import { Users, Award } from 'lucide-react';
import leadershipData from '@/data/leadership.json';
import type { LeadershipItem } from '@/types';

export const metadata = {
    title: 'Leadership | Poorvi Bhaskar',
    description: 'Organizational leadership roles and community involvement.',
};

export default function LeadershipPage() {
    const leadership = leadershipData as LeadershipItem[];
    const organizational = leadership.filter((item) => item.type === 'Organizational');

    return (
        <section className="py-20 px-4">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="mb-12">
                    <h1 className="terminal-text text-3xl font-bold mb-4">
                        Leadership
                    </h1>
                    <p className="text-foreground-secondary max-w-2xl">
                        I lead initiatives within Eaton&apos;s Leadership Development Program
                        focused on community engagement, professional development, and
                        cross-functional collaboration.
                    </p>
                </div>

                {/* Organizational Leadership */}
                <div>
                    <h2 className="leadership-col-header leadership-col-header-org mb-6">
                        <Users className="w-5 h-5" />
                        <span>Organizational Leadership</span>
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {organizational.map((item) => (
                            <article key={item.id} className="leadership-card leadership-card-org">
                                <div className="leadership-card-icon leadership-card-icon-org">
                                    <Users className="w-4 h-4" />
                                </div>
                                <h3 className="leadership-card-title">{item.title}</h3>
                                <ul className="leadership-card-desc">
                                    {item.description.map((point, i) => (
                                        <li key={i}>{point}</li>
                                    ))}
                                </ul>
                                {item.metrics && item.metrics.length > 0 && (
                                    <div className="leadership-card-metrics">
                                        {item.metrics.map((metric, i) => (
                                            <span key={i} className="leadership-metric leadership-metric-org">
                                                <Award className="w-3 h-3" />
                                                {metric}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </article>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
