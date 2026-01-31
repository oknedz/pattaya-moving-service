'use client';
import { useTranslations } from 'next-intl';
import { Truck, Package, Map, Building2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Services() {
    const t = useTranslations('Services');

    const services = [
        { id: 'local', icon: Truck },
        { id: 'long_distance', icon: Map },
        { id: 'office', icon: Building2 },
        { id: 'packing', icon: Package },
    ];

    return (
        <section className="py-20 bg-slate-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-3xl md:text-5xl font-heading font-bold text-slate-800 mb-6 tracking-tight">{t('title')}</h2>
                        <p className="text-slate-600 text-lg max-w-2xl mx-auto">{t('subtitle')}</p>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={service.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -10 }}
                            className="bg-white p-8 rounded-sm shadow-sm hover:shadow-2xl transition-all border border-slate-100 group"
                        >
                            <div className="mb-6 text-[#E7294E]">
                                <service.icon size={48} />
                            </div>
                            <h3 className="text-xl font-heading font-bold text-slate-800 mb-3">{t(`items.${service.id}.title`)}</h3>
                            <p className="text-slate-600 leading-relaxed">{t(`items.${service.id}.description`)}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
