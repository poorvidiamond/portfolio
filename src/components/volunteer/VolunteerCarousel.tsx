'use client';

import { useRef } from 'react';

interface VolunteerCarouselProps {
    images: string[];
}

export default function VolunteerCarousel({ images }: VolunteerCarouselProps) {
    // Split images into two rows
    const mid = Math.ceil(images.length / 2);
    const row1 = images.slice(0, mid);
    const row2 = images.slice(mid);

    return (
        <div className="space-y-4 overflow-hidden">
            <MarqueeRow images={row1} direction="left" speed={30} />
            <MarqueeRow images={row2} direction="right" speed={35} />
        </div>
    );
}

function MarqueeRow({
    images,
    direction,
    speed,
}: {
    images: string[];
    direction: 'left' | 'right';
    speed: number;
}) {
    const containerRef = useRef<HTMLDivElement>(null);

    const animationName =
        direction === 'left' ? 'marquee-scroll-left' : 'marquee-scroll-right';

    return (
        <div
            ref={containerRef}
            className="relative overflow-hidden group"
            style={{ maskImage: 'linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)' }}
        >
            <div
                className="flex w-max"
                style={{
                    animation: `${animationName} ${speed}s linear infinite`,
                }}
                onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.animationPlayState = 'paused';
                }}
                onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.animationPlayState = 'running';
                }}
            >
                {/* Render images twice for seamless loop */}
                {[...images, ...images].map((src, index) => (
                    <div
                        key={`${src}-${index}`}
                        className="flex-shrink-0 mx-2"
                    >
                        <div className="w-56 h-40 md:w-72 md:h-48 rounded-xl overflow-hidden border-2 border-border bg-surface hover:border-primary transition-colors duration-300 shadow-md hover:shadow-lg">
                            <img
                                src={src}
                                alt={`Volunteer activity ${(index % images.length) + 1}`}
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                loading="lazy"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
