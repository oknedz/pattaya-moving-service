'use client';

import { useTranslations } from 'next-intl';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import AddressAutocomplete from './AddressAutocomplete';

interface QuoteModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function QuoteModal({ isOpen, onClose }: QuoteModalProps) {
    const t = useTranslations('QuoteForm');
    const [submitted, setSubmitted] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [touched, setTouched] = useState<Record<string, boolean>>({});

    const validateField = (name: string, value: string) => {
        switch (name) {
            case 'origin':
                return value.trim() ? '' : t('originRequired') || 'Origin location is required';
            case 'destination':
                return value.trim() ? '' : t('destinationRequired') || 'Destination location is required';
            case 'name':
                return value.trim() ? '' : t('nameRequired') || 'Name is required';
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!value.trim()) return t('emailRequired') || 'Email is required';
                if (!emailRegex.test(value)) return t('emailInvalid') || 'Please enter a valid email';
                return '';
            case 'phone':
                if (!value.trim()) return t('phoneRequired') || 'Phone number is required';
                return '';
            default:
                return '';
        }
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setTouched({ ...touched, [name]: true });
        const error = validateField(name, value);
        setErrors({ ...errors, [name]: error });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (touched[name]) {
            const error = validateField(name, value);
            setErrors({ ...errors, [name]: error });
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const newErrors: Record<string, string> = {};
        const newTouched: Record<string, boolean> = {};

        // Validate all fields
        ['origin', 'destination', 'name', 'email', 'phone'].forEach(field => {
            const value = formData.get(field) as string;
            newTouched[field] = true;
            const error = validateField(field, value);
            if (error) newErrors[field] = error;
        });

        setTouched(newTouched);
        setErrors(newErrors);

        // If no errors, submit
        if (Object.keys(newErrors).length === 0) {
            // Simulate API call
            setTimeout(() => {
                setSubmitted(true);
                setErrors({});
                setTouched({});
                setTimeout(() => {
                    onClose();
                    setSubmitted(false);
                }, 3000);
            }, 1000);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 20 }}
                        className="relative bg-white w-full max-w-lg rounded-2xl shadow-2xl p-6 md:p-8 overflow-hidden"
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
                        >
                            <X size={24} />
                        </button>

                        {submitted ? (
                            <div className="flex flex-col items-center justify-center py-12 text-center">
                                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                                    <svg
                                        className="w-8 h-8"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M5 13l4 4L19 7"
                                        />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-slate-800 mb-2">
                                    {t('success')}
                                </h3>
                            </div>
                        ) : (
                            <>
                                <h2 className="text-2xl font-bold text-slate-800 mb-6 text-center">
                                    {t('title')}
                                </h2>
                                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <AddressAutocomplete
                                                label={t('origin')}
                                                name="origin"
                                                value=""
                                                onChange={(e) => handleChange(e as any)}
                                                onBlur={handleBlur}
                                                placeholder={t('origin')}
                                                error={errors.origin}
                                                touched={touched.origin}
                                            />
                                        </div>
                                        <div>
                                            <AddressAutocomplete
                                                label={t('destination')}
                                                name="destination"
                                                value=""
                                                onChange={(e) => handleChange(e as any)}
                                                onBlur={handleBlur}
                                                placeholder={t('destination')}
                                                error={errors.destination}
                                                touched={touched.destination}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">
                                            {t('name')}
                                        </label>
                                        <input
                                            name="name"
                                            type="text"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            className={`w-full px-4 py-2 rounded-lg border ${errors.name && touched.name
                                                ? 'border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-100'
                                                : 'border-slate-200 focus:border-[#E7294E] focus:ring-2 focus:ring-pink-200'
                                                } outline-none transition-all`}
                                        />
                                        {errors.name && touched.name && (
                                            <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                                                <span className="inline-block w-1 h-1 bg-red-600 rounded-full"></span>
                                                {errors.name}
                                            </p>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">
                                                {t('email')}
                                            </label>
                                            <input
                                                name="email"
                                                type="email"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                className={`w-full px-4 py-2 rounded-lg border ${errors.email && touched.email
                                                    ? 'border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-100'
                                                    : 'border-slate-200 focus:border-[#E7294E] focus:ring-2 focus:ring-pink-200'
                                                    } outline-none transition-all`}
                                            />
                                            {errors.email && touched.email && (
                                                <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                                                    <span className="inline-block w-1 h-1 bg-red-600 rounded-full"></span>
                                                    {errors.email}
                                                </p>
                                            )}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">
                                                {t('phone')}
                                            </label>
                                            <input
                                                name="phone"
                                                type="tel"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                className={`w-full px-4 py-2 rounded-lg border ${errors.phone && touched.phone
                                                    ? 'border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-100'
                                                    : 'border-slate-200 focus:border-[#E7294E] focus:ring-2 focus:ring-pink-200'
                                                    } outline-none transition-all`}
                                            />
                                            {errors.phone && touched.phone && (
                                                <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                                                    <span className="inline-block w-1 h-1 bg-red-600 rounded-full"></span>
                                                    {errors.phone}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">
                                            {t('comments')}
                                        </label>
                                        <textarea
                                            name="comments"
                                            rows={3}
                                            className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-[#E7294E] focus:ring-2 focus:ring-pink-200 outline-none transition-all resize-none"
                                        ></textarea>
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full bg-[#E7294E] hover:bg-[#C91D3E] text-white font-bold py-3 rounded-xl shadow-lg shadow-[#E7294E]/20 active:scale-[0.98] transition-all bg-gradient-to-r from-[#E7294E] to-[#C91D3E]"
                                    >
                                        {t('submit')}
                                    </button>
                                </form>
                            </>
                        )}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
