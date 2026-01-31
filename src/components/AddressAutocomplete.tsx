'use client';

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin } from "lucide-react";

interface AddressAutocompleteProps {
    label: string;
    name: string;
    value?: string;
    onChange: (e: { target: { name: string; value: string } }) => void;
    onBlur: (e: any) => void;
    error?: string;
    touched?: boolean;
    placeholder?: string;
    onAddressSelect?: (address: string) => void;
}

interface Prediction {
    place_id: string;
    description: string;
    structured_formatting: {
        main_text: string;
        secondary_text: string;
    };
}

export default function AddressAutocomplete({
    label,
    name,
    value,
    onChange,
    onBlur,
    error,
    touched,
    placeholder,
    onAddressSelect
}: AddressAutocompleteProps) {
    const [inputValue, setInputValue] = useState(value || "");
    const [predictions, setPredictions] = useState<Prediction[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState<string | null>(null);

    useEffect(() => {
        if (value !== undefined && value !== inputValue) {
            setInputValue(value);
        }
    }, [value, inputValue]); // Added inputValue to dependency array for correctness

    useEffect(() => {
        if (!inputValue || inputValue.length < 2) {
            setPredictions([]);
            return;
        }

        const timer = setTimeout(async () => {
            setLoading(true);
            try {
                const response = await fetch(`/api/places?input=${encodeURIComponent(inputValue)}`);
                const data = await response.json();

                if (data.predictions) {
                    setPredictions(data.predictions);
                }
            } catch (error) {
                console.error('Failed to fetch predictions:', error);
            } finally {
                setLoading(false);
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [inputValue]);

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setInputValue(newValue);
        setSelectedAddress(null); // Clear selection when user types
        onChange({ target: { name, value: newValue } });
    };

    const handleSelect = (description: string) => {
        setInputValue(description);
        setSelectedAddress(description);
        setPredictions([]);
        onChange({ target: { name, value: description } });
        onAddressSelect?.(description);
    };

    const handleChangeAddress = () => {
        setSelectedAddress('');
        setInputValue('');
        onChange({ target: { name, value: '' } });
        onAddressSelect?.('');
    };

    return (
        <div className="relative">
            <label className="block text-sm font-medium text-slate-700 mb-1">
                {label}
            </label>

            {selectedAddress ? (
                // Show selected address with change button
                <div className="space-y-2">
                    <div className="flex items-start gap-1.5 px-3 py-2 bg-green-50 text-green-700 rounded-lg border border-green-200">
                        <MapPin size={14} className="shrink-0 mt-0.5" />
                        <div className="text-xs leading-relaxed flex-1">
                            <span className="font-medium">Selected: </span>
                            <span className="break-words">{selectedAddress}</span>
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={handleChangeAddress}
                            className="px-3 py-1.5 text-xs font-medium text-slate-600 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors flex items-center gap-1.5"
                        >
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                            Change Address
                        </button>
                    </div>
                </div>
            ) : (
                // Show input field
                <>
                    <div className="relative">
                        <input
                            name={name}
                            value={inputValue}
                            onChange={handleInput}
                            onBlur={onBlur}
                            type="text"
                            autoComplete="off"
                            placeholder={placeholder}
                            className={`w-full px-4 py-2 rounded-lg border text-sm ${error && touched
                                ? 'border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-100'
                                : 'border-slate-200 focus:border-[#E7294E] focus:ring-2 focus:ring-pink-200'
                                } outline-none transition-all`}
                        />
                        {loading && (
                            <div className="absolute right-3 top-2.5">
                                <div className="w-4 h-4 border-2 border-slate-300 border-t-[#E7294E] rounded-full animate-spin"></div>
                            </div>
                        )}
                    </div>

                    {/* Suggestions Dropdown */}
                    <AnimatePresence>
                        {predictions.length > 0 && (
                            <motion.ul
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 5 }}
                                className="absolute z-50 w-full bg-white mt-1 rounded-lg shadow-xl border border-slate-100 max-h-60 overflow-auto py-1"
                            >
                                {predictions.map((prediction) => (
                                    <li
                                        key={prediction.place_id}
                                        onClick={() => handleSelect(prediction.description)}
                                        className="px-4 py-3 hover:bg-slate-50 cursor-pointer text-sm border-b border-slate-50 last:border-0 flex items-start gap-3 transition-colors"
                                    >
                                        <MapPin size={16} className="mt-0.5 text-[#E7294E] shrink-0" />
                                        <div>
                                            <span className="font-medium text-slate-800 block">
                                                {prediction.structured_formatting.main_text}
                                            </span>
                                            <span className="text-xs text-slate-500">
                                                {prediction.structured_formatting.secondary_text}
                                            </span>
                                        </div>
                                    </li>
                                ))}
                            </motion.ul>
                        )}
                    </AnimatePresence>

                    {/* Error Message */}
                    {error && touched && (
                        <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                            <span className="inline-block w-1 h-1 bg-red-600 rounded-full"></span>
                            {error}
                        </p>
                    )}
                </>
            )}
        </div>
    );
}
