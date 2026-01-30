'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { useQuote } from '@/context/QuoteContext';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
    const t = useTranslations('Hero');
    const { openQuoteModal } = useQuote();

    return (
        <section className="relative h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden bg-slate-900">
            {/* Background with overlay */}
            <div className="absolute inset-0 z-0">
                {/* Placeholder for background image. In production, use next/image with quality=100 */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 opacity-90" />
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />
            </div>

            <div className="container mx-auto px-4 z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="max-w-4xl mx-auto"
                >
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight tracking-tight">
                        {t.rich('title', {
                            highlight: (chunks) => <span className="text-orange-500">{chunks}</span>
                        })}
                        {/* Fallback if rich translation not used: just the text */}
                        Move with <span className="text-orange-500">Confidence</span>
                    </h1>

                    <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
                        {t('subtitle')}
                    </p>

                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <button
                            onClick={openQuoteModal}
                            className="group bg-orange-500 hover:bg-orange-600 text-white text-lg font-bold py-4 px-10 rounded-full shadow-2xl shadow-orange-500/30 transition-all flex items-center justify-center gap-2 mx-auto"
                        >
                            {t('cta')}
                            <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </motion.div>
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2"
            >
                <span className="text-xs text-slate-400 uppercase tracking-widest">Scroll</span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-slate-400 to-transparent" />
            </motion.div>
        </section>
    );
}
