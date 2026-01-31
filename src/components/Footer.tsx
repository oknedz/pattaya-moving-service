'use client';

import { useTranslations } from 'next-intl';
import { Facebook } from 'lucide-react';

export default function Footer() {
    const t = useTranslations('Footer');
    const tMeta = useTranslations('Metadata');

    return (
        <footer className="text-slate-400 py-12 border-t" style={{ backgroundColor: '#260D12' }}>
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mb-8">
                    <div className="col-span-2 md:col-span-1">
                        <h3 className="text-white text-xl font-bold mb-4">Pattaya<span style={{ color: '#E7294E' }}>Movers</span></h3>
                        <p className="text-sm leading-relaxed max-w-xs">
                            {tMeta('description')}
                        </p>
                    </div>
                    <div className="md:text-center">
                        <h4 className="text-white font-semibold mb-4">{t('services')}</h4>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#services" className="hover:text-[#E7294E] transition-colors">{t('localMoving')}</a></li>
                            <li><a href="#services" className="hover:text-[#E7294E] transition-colors">{t('longDistance')}</a></li>
                            <li><a href="#services" className="hover:text-[#E7294E] transition-colors">{t('officeRelocation')}</a></li>
                            <li><a href="#services" className="hover:text-[#E7294E] transition-colors">{t('packingServices')}</a></li>
                        </ul>
                    </div>
                    <div className="text-right">
                        <h4 className="text-white font-semibold mb-4">{t('contact')}</h4>
                        <ul className="space-y-2 text-sm">
                            <li>{t('addressText')}</li>
                            <li><a href="tel:+66123456789" className="hover:text-[#E7294E] transition-colors">+66 123 456 789</a></li>
                            <li><a href="mailto:info@pattayamovers.com" className="hover:text-[#E7294E] transition-colors">info@pattayamovers.com</a></li>
                            <li>
                                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="inline-flex p-2 rounded-full border border-slate-700 hover:border-[#E7294E] hover:text-[#E7294E] transition-all bg-white/5">
                                    <Facebook size={20} />
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="pt-8 border-t border-white/10 text-center text-xs">
                    <p>{t('copyright')}</p>
                </div>
            </div>
        </footer>
    );
}
