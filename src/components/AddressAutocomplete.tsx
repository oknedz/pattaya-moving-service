'use client';

import usePlacesAutocomplete from "use-places-autocomplete";
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin } from "lucide-react";

interface AddressAutocompleteProps {
    label: string;
    name: string;
    value?: string;
    onChange: (e: { target: { name: string; value: string } }) => void; // Mimic event for easier integration
    onBlur: (e: any) => void;
    error?: string;
    touched?: boolean;
    placeholder?: string;
}

export default function AddressAutocomplete({
    label,
    name,
    value,
    onChange,
    onBlur,
    error,
    touched,
    placeholder
}: AddressAutocompleteProps) {
    const {
        ready,
        value: inputValue,
        suggestions: { status, data },
        setValue: setServiceValue,
        clearSuggestions,
    } = usePlacesAutocomplete({
        requestOptions: {
            componentRestrictions: { country: "th" },
        },
        debounce: 300,
        defaultValue: value || "", // Use empty string if undefined
    });

    // Update internal state when external value changes (only if value is provided)
    useEffect(() => {
        if (value !== undefined && value !== inputValue) {
            setServiceValue(value);
        }
    }, [value, setServiceValue, inputValue]);

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setServiceValue(e.target.value);
        // Propagate to parent form
        onChange({ target: { name, value: e.target.value } });
    };

    const handleSelect = (description: string) => {
        setServiceValue(description, false);
        clearSuggestions();
        // Propagate to parent form
        onChange({ target: { name, value: description } });
    };

    return (
        <div className="relative">
            <label className="block text-sm font-medium text-slate-700 mb-1">
                {label}
            </label>
            <div className="relative">
                <input
                    name={name}
                    value={inputValue}
                    onChange={handleInput}
                    onBlur={onBlur}
                    disabled={!ready}
                    type="text"
                    autoComplete="off"
                    placeholder={placeholder}
                    className={`w-full px-4 py-2 rounded-lg border ${error && touched
                        ? 'border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-100'
                        : 'border-slate-200 focus:border-[#E7294E] focus:ring-2 focus:ring-pink-200'
                        } outline-none transition-all disabled:bg-slate-50 disabled:text-slate-400`}
                />
                {!ready && (
                    <div className="absolute right-3 top-2.5">
                        <div className="w-4 h-4 border-2 border-slate-200 border-t-[#E7294E] rounded-full animate-spin"></div>
                    </div>
                )}
            </div>

            {/* Suggestions Dropdown */}
            <AnimatePresence>
                {status === "OK" && (
                    <motion.ul
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 5 }}
                        className="absolute z-50 w-full bg-white mt-1 rounded-lg shadow-xl border border-slate-100 max-h-60 overflow-auto py-1"
                    >
                        {data.map(({ place_id, description, structured_formatting }) => (
                            <li
                                key={place_id}
                                onClick={() => handleSelect(description)}
                                className="px-4 py-3 hover:bg-slate-50 cursor-pointer text-sm border-b border-slate-50 last:border-0 flex items-start gap-3 transition-colors"
                            >
                                <MapPin size={16} className="mt-0.5 text-[#E7294E] shrink-0" />
                                <div>
                                    <span className="font-medium text-slate-800 block">
                                        {structured_formatting.main_text}
                                    </span>
                                    <span className="text-xs text-slate-500">
                                        {structured_formatting.secondary_text}
                                    </span>
                                </div>
                            </li>
                        ))}
                        <li className="px-2 py-1 bg-slate-50 flex justify-end">
                            <img src="https://developers.google.com/maps/documentation/images/powered_by_google_on_white.png" alt="Powered by Google" className="h-4 opacity-70" />
                        </li>
                    </motion.ul>
                )}
            </AnimatePresence>

            {error && touched && (
                <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                    <span className="inline-block w-1 h-1 bg-red-600 rounded-full"></span>
                    {error}
                </p>
            )}
        </div>
    );
}
