import { TrendingUp, Users, Award, Terminal } from 'lucide-react';
import leadershipData from '@/data/leadership.json';
import type { LeadershipItem } from '@/types';

export const metadata = {
    title: 'Leadership | Poorvi Bhaskar',
    description: 'Technical initiatives and organizational leadership roles.',
};

export default function LeadershipPage() {
    const leadership = leadershipData as LeadershipItem[];
    const technical = leadership.filter((item) => item.type === 'Technical');
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
                        I lead technical initiatives that improve team efficiency and mentor
                        engineers across multiple domains—while staying hands-on with code and
                        firmware development.
                    </p>
                </div>

                {/* Technical Leadership */}
                <div className="mb-20">
                    <h2 className="leadership-col-header leadership-col-header-tech mb-6">
                        <TrendingUp className="w-5 h-5" />
                        <span>Technical Leadership</span>
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {technical.map((item) => (
                            <article key={item.id} className="leadership-card leadership-card-tech">
                                <div className="leadership-card-icon leadership-card-icon-tech">
                                    <Terminal className="w-4 h-4" />
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
                                            <span key={i} className="leadership-metric leadership-metric-tech">
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
