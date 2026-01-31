'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function ServiceCards() {
    const t = useTranslations('Hero.cards');

    return (
        <section className="py-8 md:py-16 bg-white">
            <div className="container mx-auto max-w-4xl px-4">
                <div className="grid grid-cols-2 gap-3 md:gap-6">
                    {/* Business Card */}
                    <motion.a
                        href="#services"
                        whileHover={{ y: -8 }}
                        transition={{ duration: 0.3 }}
                        className="bg-[#E7294E] text-white p-4 md:p-8 rounded-sm shadow-2xl group cursor-pointer flex flex-col"
                        style={{ minHeight: '180px' }}
                    >
                        <div className="flex flex-col mb-2 md:mb-4">
                            <div className="mb-2 md:mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 md:w-12 md:h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
                                    <path d="M9 22v-4h6v4" />
                                    <path d="M8 6h.01" />
                                    <path d="M16 6h.01" />
                                    <path d="M12 6h.01" />
                                    <path d="M12 10h.01" />
                                    <path d="M12 14h.01" />
                                    <path d="M16 10h.01" />
                                    <path d="M16 14h.01" />
                                    <path d="M8 10h.01" />
                                    <path d="M8 14h.01" />
                                </svg>
                            </div>
                            <h3 className="text-base md:text-2xl font-bold">{t('business.title')}</h3>
                        </div>
                        <p className="text-white/95 text-xs md:text-base mb-3 md:mb-6 leading-relaxed flex-grow">
                            {t('business.description')}
                        </p>
                        <div className="flex items-center gap-1 md:gap-2 font-semibold text-xs md:text-base mt-auto group-hover:gap-2 md:group-hover:gap-3 transition-all">
                            {t('business.link')}
                            <ArrowRight className="w-3 h-3 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                    </motion.a>

                    {/* Personal Card */}
                    <motion.a
                        href="#services"
                        whileHover={{ y: -8 }}
                        transition={{ duration: 0.3 }}
                        className="bg-[#E7294E] text-white p-4 md:p-8 rounded-sm shadow-2xl group cursor-pointer flex flex-col"
                        style={{ minHeight: '180px' }}
                    >
                        <div className="flex flex-col mb-2 md:mb-4">
                            <div className="mb-2 md:mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 md:w-12 md:h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                                    <polyline points="9 22 9 12 15 12 15 22" />
                                </svg>
                            </div>
                            <h3 className="text-base md:text-2xl font-bold">{t('personal.title')}</h3>
                        </div>
                        <p className="text-white/95 text-xs md:text-base mb-3 md:mb-6 leading-relaxed flex-grow">
                            {t('personal.description')}
                        </p>
                        <div className="flex items-center gap-1 md:gap-2 font-semibold text-xs md:text-base mt-auto group-hover:gap-2 md:group-hover:gap-3 transition-all">
                            {t('personal.link')}
                            <ArrowRight className="w-3 h-3 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                    </motion.a>
                </div>
            </div>
        </section>
    );
}
