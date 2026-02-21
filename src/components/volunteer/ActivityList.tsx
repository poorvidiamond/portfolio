'use client';

import { motion } from 'framer-motion';

interface Activity {
    date: string;
    name: string;
    hours: number;
}

interface ActivityListProps {
    activities: Activity[];
    color: string;
}

export default function ActivityList({ activities, color }: ActivityListProps) {
    return (
        <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, delay: 0.1 }}
            className="space-y-2 mt-4 pt-4 border-t border-border"
        >
            {activities.map((activity, index) => (
                <motion.li
                    key={`${activity.date}-${activity.name}-${index}`}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.03 }}
                    className="flex items-center gap-3 text-sm py-1"
                >
                    <span className="text-foreground-secondary font-mono text-xs w-14 shrink-0">
                        {activity.date}
                    </span>
                    <span className="text-foreground flex-1 truncate">
                        {activity.name}
                    </span>
                    <span
                        className="font-mono text-xs font-semibold shrink-0"
                        style={{ color }}
                    >
                        {activity.hours}h
                    </span>
                </motion.li>
            ))}
        </motion.ul>
    );
}
