'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export default function Analytics() {
    const pathname = usePathname();
    const lastTrackedPath = useRef('');

    useEffect(() => {
        // Avoid duplicate tracking for the same path
        if (pathname === lastTrackedPath.current) return;
        lastTrackedPath.current = pathname;

        // Fire-and-forget — don't block the UI
        fetch('/api/track', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                path: pathname,
                referrer: document.referrer || null,
            }),
        }).catch(() => {
            // Silently fail — analytics should never break the app
        });
    }, [pathname]);

    return null;
}
