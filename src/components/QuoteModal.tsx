'use client';

import { useTranslations } from 'next-intl';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import AddressAutocomplete from './AddressAutocomplete';
import DatePicker from './DatePicker';
import TimePicker from './TimePicker';

interface QuoteModalProps {
    isOpen: boolean;
    onClose: () => void;
}

interface DistanceData {
    distance: { text: string; km: number };
    duration: string;
    price: { base: number; perKm: number; total: number };
}

export default function QuoteModal({ isOpen, onClose }: QuoteModalProps) {
    const t = useTranslations('QuoteForm');
    const [submitted, setSubmitted] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [touched, setTouched] = useState<Record<string, boolean>>({});
    const [selectedOrigin, setSelectedOrigin] = useState('');
    const [selectedDestination, setSelectedDestination] = useState('');
    const [distanceData, setDistanceData] = useState<DistanceData | null>(null);
    const [loadingDistance, setLoadingDistance] = useState(false);

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

    // Fetch distance when both addresses are selected
    useEffect(() => {
        const fetchDistance = async () => {
            if (selectedOrigin && selectedDestination) {
                setLoadingDistance(true);
                try {
                    const response = await fetch(
                        `/api/distance?origin=${encodeURIComponent(selectedOrigin)}&destination=${encodeURIComponent(selectedDestination)}`
                    );
                    const data = await response.json();
                    if (response.ok) {
                        setDistanceData(data);
                    } else {
                        setDistanceData(null);
                    }
                } catch (error) {
                    console.error('Failed to fetch distance:', error);
                    setDistanceData(null);
                } finally {
                    setLoadingDistance(false);
                }
            } else {
                setDistanceData(null);
            }
        };

        fetchDistance();
    }, [selectedOrigin, selectedDestination]);

    const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setTouched({ ...touched, [name]: true });
        const error = validateField(name, value);
        setErrors({ ...errors, [name]: error });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | { target: { name: string; value: string } }) => {
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
                        className="relative bg-white w-full max-w-3xl rounded-2xl shadow-2xl p-6 md:p-8 max-h-[90vh] overflow-y-auto"
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
                                                onChange={(e) => handleChange(e as any)}
                                                onBlur={handleBlur}
                                                placeholder={t('origin')}
                                                error={errors.origin}
                                                touched={touched.origin}
                                                onAddressSelect={setSelectedOrigin}
                                            />
                                        </div>
                                        <div>
                                            <AddressAutocomplete
                                                label={t('destination')}
                                                name="destination"
                                                onChange={(e) => handleChange(e as any)}
                                                onBlur={handleBlur}
                                                placeholder={t('destination')}
                                                error={errors.destination}
                                                touched={touched.destination}
                                                onAddressSelect={setSelectedDestination}
                                            />
                                        </div>
                                    </div>

                                    {/* Price Calculation Display */}
                                    {loadingDistance && (
                                        <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                                            <div className="flex items-center justify-center gap-2 text-slate-600">
                                                <div className="w-4 h-4 border-2 border-slate-300 border-t-[#E7294E] rounded-full animate-spin"></div>
                                                <span className="text-sm">Calculating distance...</span>
                                            </div>
                                        </div>
                                    )}

                                    {distanceData && !loadingDistance && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-4 border border-green-200"
                                        >
                                            <div className="space-y-3">
                                                <div className="flex items-center justify-between text-sm">
                                                    <span className="text-slate-600">Distance:</span>
                                                    <span className="font-semibold text-slate-800">{distanceData.distance.text} ({distanceData.distance.km} km)</span>
                                                </div>
                                                <div className="flex items-center justify-between text-sm">
                                                    <span className="text-slate-600">Estimated Duration:</span>
                                                    <span className="font-semibold text-slate-800">{distanceData.duration}</span>
                                                </div>
                                                <div className="border-t border-green-200 pt-2 mt-2">
                                                    <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                                                        <span>Base Price:</span>
                                                        <span>{distanceData.price.base} THB</span>
                                                    </div>
                                                    <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                                                        <span>Distance ({distanceData.distance.km} km × {distanceData.price.perKm} THB):</span>
                                                        <span>{Math.round(distanceData.distance.km * distanceData.price.perKm)} THB</span>
                                                    </div>
                                                    <div className="flex items-center justify-between text-lg font-bold text-[#E7294E]">
                                                        <span>Estimated Total:</span>
                                                        <span>{distanceData.price.total.toLocaleString()} THB</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}

                                    {/* Name, Email, Phone in single row on desktop */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

                                    {/* Date and Time Selection - Separate Fields */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <DatePicker
                                            label={t('moveDate') || 'Moving Date'}
                                            name="moveDate"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={errors.moveDate}
                                            touched={touched.moveDate}
                                        />
                                        <TimePicker
                                            label={t('moveTime') || 'Moving Time'}
                                            name="moveTime"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={errors.moveTime}
                                            touched={touched.moveTime}
                                        />
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
