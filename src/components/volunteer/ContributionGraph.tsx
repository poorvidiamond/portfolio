'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import type { VolunteerActivity } from '@/types';

interface ContributionGraphProps {
    activities: VolunteerActivity[];
}

export default function ContributionGraph({ activities }: ContributionGraphProps) {
    // Build a map of date -> hours
    const contributionMap = useMemo(() => {
        const map = new Map<string, number>();
        activities.forEach((activity) => {
            const existing = map.get(activity.date) || 0;
            map.set(activity.date, existing + activity.hours);
        });
        return map;
    }, [activities]);

    // Generate weeks for the last 52 weeks
    const weeks = useMemo(() => {
        const result: string[][] = [];
        const today = new Date();

        // Start from the most recent Sunday
        const startDate = new Date(today);
        startDate.setDate(today.getDate() - today.getDay() - (52 * 7 - 7));

        for (let week = 0; week < 52; week++) {
            const weekDays: string[] = [];
            for (let day = 0; day < 7; day++) {
                const date = new Date(startDate);
                date.setDate(startDate.getDate() + week * 7 + day);
                weekDays.push(date.toISOString().split('T')[0]);
            }
            result.push(weekDays);
        }
        return result;
    }, []);

    const getIntensity = (hours: number): string => {
        if (hours === 0) return 'bg-surface hover:bg-surface-hover';
        if (hours < 1) return 'bg-primary/20 hover:bg-primary/30';
        if (hours < 2) return 'bg-primary/40 hover:bg-primary/50';
        if (hours < 3) return 'bg-primary/60 hover:bg-primary/70';
        return 'bg-primary hover:bg-primary-hover';
    };

    const totalHours = useMemo(() => {
        return activities.reduce((sum, a) => sum + a.hours, 0);
    }, [activities]);

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const days = ['', 'Mon', '', 'Wed', '', 'Fri', ''];

    return (
        <div className="space-y-4">
            {/* Stats Header */}
            <div className="flex items-center justify-center gap-6 text-sm">
                <span className="text-foreground-secondary">
                    <span className="text-2xl font-bold text-primary">{totalHours.toFixed(1)}</span> hours volunteered
                </span>
                <span className="text-foreground-secondary">
                    <span className="text-2xl font-bold text-secondary">{activities.length}</span> activities
                </span>
            </div>

            {/* Graph Container */}
            <div className="overflow-x-auto pb-4 flex justify-center">
                <div className="inline-block">
                    {/* Month Labels */}
                    <div className="flex mb-2 ml-8">
                        {(() => {
                            let lastLabelCol = -4; // track last label position
                            return weeks.map((week, i) => {
                                const date = new Date(week[0]);
                                const isNewMonth = i === 0 || new Date(weeks[i - 1][0]).getMonth() !== date.getMonth();
                                const hasGap = i - lastLabelCol >= 3; // min 3 weeks apart
                                const show = isNewMonth && hasGap;
                                if (show) lastLabelCol = i;
                                return (
                                    <div key={i} className="w-3 mr-0.5 text-xs text-foreground-secondary">
                                        {show ? months[date.getMonth()] : ''}
                                    </div>
                                );
                            });
                        })()}
                    </div>

                    <div className="flex">
                        {/* Day Labels */}
                        <div className="flex flex-col mr-2">
                            {days.map((day, i) => (
                                <div key={i} className="h-3 mb-0.5 text-xs text-foreground-secondary leading-3">
                                    {day}
                                </div>
                            ))}
                        </div>

                        {/* Grid */}
                        <div className="flex gap-0.5">
                            {weeks.map((week, weekIndex) => (
                                <div key={weekIndex} className="flex flex-col gap-0.5">
                                    {week.map((date) => {
                                        const hours = contributionMap.get(date) || 0;
                                        return (
                                            <motion.div
                                                key={date}
                                                initial={{ scale: 0 }}
                                                whileInView={{ scale: 1 }}
                                                transition={{ delay: weekIndex * 0.01 }}
                                                viewport={{ once: true }}
                                                className={`w-3 h-3 rounded-sm border border-border ${getIntensity(hours)} transition-colors cursor-pointer`}
                                                title={`${date}: ${hours} hours`}
                                            />
                                        );
                                    })}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Legend */}
                    <div className="flex items-center gap-2 mt-4 text-xs text-foreground-secondary">
                        <span>Less</span>
                        <div className="flex gap-0.5">
                            <div className="w-3 h-3 rounded-sm bg-surface border border-border" />
                            <div className="w-3 h-3 rounded-sm bg-primary/20" />
                            <div className="w-3 h-3 rounded-sm bg-primary/40" />
                            <div className="w-3 h-3 rounded-sm bg-primary/60" />
                            <div className="w-3 h-3 rounded-sm bg-primary" />
                        </div>
                        <span>More</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
