'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Wallet, Clock, ShieldCheck } from 'lucide-react';
import Image from 'next/image';

export default function FeatureSection() {
    const t = useTranslations('Features');

    const features = [
        {
            icon: Wallet,
            key: 'affordable',
            color: 'text-[#E7294E]' // Pink
        },
        {
            icon: Clock,
            key: 'fast',
            color: 'text-[#E7294E]'
        },
        {
            icon: ShieldCheck,
            key: 'safe',
            color: 'text-[#E7294E]'
        }
    ];

    return (
        <section className="py-20 bg-white overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-20">

                    {/* Left Side - Image */}
                    <div className="w-full lg:w-1/2 relative">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="relative rounded-2xl overflow-hidden shadow-2xl"
                        >
                            {/* Placeholder image - Replace with actual image */}
                            <div className="relative aspect-[4/3] bg-slate-100">
                                <Image
                                    src="/Delivery Team at Work.png"
                                    alt="Professional Moving Team at Work"
                                    fill
                                    className="object-cover hover:scale-105 transition-transform duration-700"
                                />
                                {/* Overlay gradient */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-slate-900/20 to-transparent pointer-events-none" />
                            </div>
                        </motion.div>

                        {/* Decorative background element behind image */}
                        <div className="absolute -bottom-10 -left-10 w-2/3 h-2/3 bg-[#E7294E]/5 rounded-full blur-3xl -z-10" />
                    </div>

                    {/* Right Side - Content */}
                    <div className="w-full lg:w-1/2">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="text-5xl md:text-6xl font-heading font-bold text-slate-800 mb-10 tracking-tight leading-tight text-center lg:text-left">
                                {t.rich('title', {
                                    block: (chunks) => <span className="block">{chunks}</span>
                                })}
                            </h2>

                            <div className="space-y-10">
                                {features.map((feature, index) => (
                                    <motion.div
                                        key={feature.key}
                                        initial={{ opacity: 0, x: 30 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.2, duration: 0.5 }}
                                        className="flex gap-6 group"
                                    >
                                        <div className={`shrink-0 w-14 h-14 flex items-center justify-center ${feature.color} transition-all duration-300 `}>
                                            <feature.icon size={28} strokeWidth={2} />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-heading font-bold text-slate-800 mb-2 group-hover:text-[#E7294E] transition-colors">
                                                {t(`items.${feature.key}.title`)}
                                            </h3>
                                            <p className="text-slate-600 leading-relaxed text-base">
                                                {t(`items.${feature.key}.description`)}
                                            </p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
