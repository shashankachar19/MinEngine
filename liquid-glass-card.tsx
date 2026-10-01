"use client"
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export function CardGlassFilter() {
    return (
        <svg className="hidden" aria-hidden="true">
            <defs>
                <filter
                    id="card-glass"
                    x="0%"
                    y="0%"
                    width="100%"
                    height="100%"
                    colorInterpolationFilters="sRGB"
                >
                    <feTurbulence
                        type="fractalNoise"
                        baseFrequency="0.03 0.03"
                        numOctaves="2"
                        seed="3"
                        result="turbulence"
                    />
                    <feGaussianBlur in="turbulence" stdDeviation="3" result="blurredNoise" />
                    <feDisplacementMap
                        in="SourceGraphic"
                        in2="blurredNoise"
                        scale="18"
                        xChannelSelector="R"
                        yChannelSelector="B"
                        result="displaced"
                    />
                    <feGaussianBlur in="displaced" stdDeviation="3" result="finalBlur" />
                    <feComposite in="finalBlur" in2="finalBlur" operator="over" />
                </filter>
            </defs>
        </svg>
    );
}

export const LiquidGlassCard = ({ 
    className = "", 
    children, 
    delay = 0, 
    accent = false,
    style = {}
}: { 
    className?: string; 
    children: React.ReactNode; 
    delay?: number;
    accent?: boolean;
    style?: React.CSSProperties;
}) => {
    const ref = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const onMove = (e: MouseEvent) => {
            const rect = el.getBoundingClientRect();
            el.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
            el.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
        };
        el.addEventListener('mousemove', onMove);
        return () => el.removeEventListener('mousemove', onMove);
    }, []);

    return (
        <motion.div 
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
            ref={ref} 
            style={style}
            className={`liquid-glass ${accent ? "liquid-glass-accent" : ""} ${className}`}
        >
            <div className="liquid-glass-shadow" />
            <div className="liquid-glass-backdrop" />
            <div className="liquid-glass-surface" />
            <div className="liquid-glass-content p-6 md:p-7 flex flex-col h-full">
                {children}
            </div>
        </motion.div>
    );
};
