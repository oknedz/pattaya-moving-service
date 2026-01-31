'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { useQuote } from '@/context/QuoteContext';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import GsapHeroText from '@/components/GsapHeroText'; // Add import



export default function Hero() {
    const t = useTranslations('Hero');
    const { openQuoteModal } = useQuote();

    return (
        <section className="relative h-[101vh] min-h-[600px] flex items-center justify-center overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/pattay-moving-service.png"
                    alt="Pattaya Moving Service"
                    fill
                    className="object-cover"
                    priority
                    quality={90}
                />
                {/* Gray gradient top to bottom */}
                <div className="absolute inset-0 bg-gradient-to-b from-gray-900/90 via-gray-900/50 to-gray-900/20" />
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" style={{ backgroundColor: 'rgba(231, 41, 78, 0.15)' }} />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" style={{ backgroundColor: 'rgba(231, 41, 78, 0.1)' }} />
            </div>

            <div className="container mx-auto px-4 z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="max-w-4xl mx-auto"
                >
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-white mb-6 leading-tight tracking-tight">
                        {t.rich('title', {
                            light: (chunks) => <span className="font-light text-6xl md:text-7xl lg:text-8xl inline-block tracking-wider" style={{ transform: 'scale(1.56)' }}>{chunks}</span>,
                            br: () => <span className="block h-6"></span>
                        })}
                    </h1>



                    <GsapHeroText
                        text={t('subtitle')}
                        className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed font-body"
                    />

                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <button
                            onClick={openQuoteModal}
                            className="group text-white text-lg font-bold py-4 px-10 rounded-sm shadow-2xl transition-all flex items-center justify-center gap-2 mx-auto hover:scale-105 bg-gradient-to-b from-[#E7294E] to-[#C91D3E] cursor-pointer"
                            style={{ boxShadow: '0 20px 60px rgba(231, 41, 78, 0.3)' }}
                        >
                            {t('cta')}
                            <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </motion.div>
                </motion.div>
            </div>

        </section>
    );
}
