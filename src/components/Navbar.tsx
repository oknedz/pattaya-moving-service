'use client';

import { useLocale, useTranslations } from 'next-intl';
import { Link, usePathname, useRouter } from '@/i18n/routing';
import { useState, useEffect } from 'react';
import { Menu, X, Phone, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
    const t = useTranslations('Navigation');
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // Handle scroll effect for sticky navbar
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const switchLanguage = (newLocale: string) => {
        router.replace(pathname, { locale: newLocale });
    };

    const navLinks = [
        { name: t('home'), href: '/' },
        { name: t('services'), href: '/services' },
        { name: t('contact'), href: '/contact' },
    ];

    return (
        <nav
            className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'
                }`}
        >
            <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
                {/* Logo */}
                <Link href="/" className="text-2xl font-bold text-slate-800 tracking-tighter">
                    Pattaya<span className="text-orange-500">Movers</span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="text-slate-600 hover:text-orange-500 font-medium transition-colors"
                        >
                            {link.name}
                        </Link>
                    ))}

                    <button className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-full font-semibold transition-all shadow-lg shadow-orange-500/20 active:scale-95">
                        {t('getQuote')}
                    </button>

                    {/* Language Switcher */}
                    <div className="flex items-center gap-2 ml-4 border-l pl-4 border-slate-200">
                        <button
                            onClick={() => switchLanguage('en')}
                            className={`text-sm font-semibold transition-colors ${locale === 'en' ? 'text-slate-900' : 'text-slate-400 hover:text-slate-600'
                                }`}
                        >
                            EN
                        </button>
                        <span className="text-slate-300">/</span>
                        <button
                            onClick={() => switchLanguage('th')}
                            className={`text-sm font-semibold transition-colors ${locale === 'th' ? 'text-slate-900' : 'text-slate-400 hover:text-slate-600'
                                }`}
                        >
                            TH
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2 text-slate-800"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="absolute top-full left-0 w-full bg-white shadow-xl border-t border-slate-100 flex flex-col p-6 md:hidden"
                    >
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="py-4 text-lg font-medium text-slate-700 border-b border-slate-50 last:border-0"
                                onClick={() => setIsOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <div className="mt-6 flex flex-col gap-4">
                            <button className="w-full bg-orange-500 text-white py-3 rounded-xl font-bold shadow-lg shadow-orange-500/20">
                                {t('getQuote')}
                            </button>
                            <div className="flex justify-center gap-4 pt-4">
                                <button
                                    onClick={() => switchLanguage('en')}
                                    className={`px-4 py-2 rounded-lg ${locale === 'en' ? 'bg-slate-100 text-slate-900 font-bold' : 'text-slate-500'
                                        }`}
                                >
                                    English
                                </button>
                                <button
                                    onClick={() => switchLanguage('th')}
                                    className={`px-4 py-2 rounded-lg ${locale === 'th' ? 'bg-slate-100 text-slate-900 font-bold' : 'text-slate-500'
                                        }`}
                                >
                                    ไทย
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
