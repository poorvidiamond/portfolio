'use client';

import type { VolunteerPillar } from '@/types';

interface PhotoGridProps {
    pillars: VolunteerPillar[];
}

export default function PhotoGrid({ pillars }: PhotoGridProps) {
    // Collect photos per pillar
    const pillarPhotos = pillars
        .filter((p) => p.photos.length > 0)
        .map((p) =>
            p.photos.map((photo) => ({
                ...photo,
                pillarTitle: p.title,
                pillarColor: p.color,
                pillarEmoji: p.emoji,
            }))
        );

    // Interleave: pick one from each pillar in round-robin order
    const interleaved: MarqueePhoto[] = [];
    const maxLen = Math.max(...pillarPhotos.map((arr) => arr.length));
    for (let i = 0; i < maxLen; i++) {
        for (const photos of pillarPhotos) {
            if (i < photos.length) {
                interleaved.push(photos[i]);
            }
        }
    }

    if (interleaved.length === 0) return null;

    // Split into two rows
    const mid = Math.ceil(interleaved.length / 2);
    const row1 = interleaved.slice(0, mid);
    const row2 = interleaved.slice(mid);

    return (
        <div className="marquee-container">
            {/* Row 1: scrolls left */}
            <div className="marquee-row">
                <div className="marquee-track marquee-left">
                    {[...row1, ...row1, ...row1].map((photo, i) => (
                        <MarqueeCard key={`r1-${i}`} photo={photo} />
                    ))}
                </div>
            </div>

            {/* Row 2: scrolls right */}
            <div className="marquee-row">
                <div className="marquee-track marquee-right">
                    {[...row2, ...row2, ...row2].map((photo, i) => (
                        <MarqueeCard key={`r2-${i}`} photo={photo} />
                    ))}
                </div>
            </div>
        </div>
    );
}

interface MarqueePhoto {
    src: string;
    caption: string;
    pillarTitle: string;
    pillarColor: string;
    pillarEmoji: string;
}

function MarqueeCard({ photo }: { photo: MarqueePhoto }) {
    return (
        <div className="marquee-card">
            <div
                className="marquee-card-inner"
                style={{ borderColor: `${photo.pillarColor}35` }}
            >
                {/* Pillar title on top, centered */}
                <div className="marquee-title-bar">
                    <span
                        className="marquee-pillar-tag"
                        style={{
                            color: photo.pillarColor,
                            borderColor: `${photo.pillarColor}40`,
                            background: `${photo.pillarColor}12`,
                        }}
                    >
                        {photo.pillarEmoji} {photo.pillarTitle}
                    </span>
                </div>

                {/* Image */}
                <div className="marquee-img-wrap">
                    <img
                        src={photo.src}
                        alt={photo.caption}
                        className="marquee-img"
                        loading="lazy"
                    />
                </div>

                {/* Caption below, centered */}
                <p className="marquee-caption">{photo.caption}</p>
            </div>
        </div>
    );
}
