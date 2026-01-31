'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useLocale } from 'next-intl';

interface GsapHeroTextProps {
    text: string;
    className?: string;
}

export default function GsapHeroText({ text, className = '' }: GsapHeroTextProps) {
    const container = useRef<HTMLDivElement>(null);
    const locale = useLocale();

    useGSAP(() => {
        if (!container.current) return;

        const chars = container.current.querySelectorAll('.char');

        gsap.fromTo(chars,
            {
                opacity: 0,
                y: 50,
                rotateX: -90,
                scale: 0.5
            },
            {
                opacity: 1,
                y: 0,
                rotateX: 0,
                scale: 1,
                duration: 0.8,
                stagger: 0.03,
                ease: "back.out(1.7)",
                delay: 0.2
            }
        );
    }, { scope: container, dependencies: [text] });

    // Use Intl.Segmenter for safe grapheme splitting (works for Thai)
    const segmenter = new Intl.Segmenter(locale, { granularity: 'grapheme' });
    const segments = Array.from(segmenter.segment(text)).map(s => s.segment);

    return (
        <div ref={container} className={`perspective-text ${className} flex flex-wrap justify-center gap-[0.2em] perspective-[1000px]`}>
            {/* We map words by splitting via space manually to keep structure, then characters? 
               actually grapheme splitting destroys spaces if not careful.
               Let's split by words first, then graphemes within words.
            */}
            {text.split(' ').map((word, wordIndex) => (
                <span key={wordIndex} className="inline-block whitespace-nowrap">
                    {Array.from(new Intl.Segmenter(locale, { granularity: 'grapheme' }).segment(word)).map((seg, charIndex) => (
                        <span
                            key={`${wordIndex}-${charIndex}`}
                            className="char inline-block transform-style-3d backface-hidden"
                            style={{ display: 'inline-block' }}
                        >
                            {seg.segment}
                        </span>
                    ))}
                    {/* Add space after word unless it's the last one? 
                        Gap in flex container handles spacing nicely.
                    */}
                </span>
            ))}
        </div>
    );
}
