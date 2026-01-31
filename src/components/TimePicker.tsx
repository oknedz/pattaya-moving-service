'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock } from 'lucide-react';

interface TimePickerProps {
    label: string;
    name: string;
    value?: string;
    onChange: (e: { target: { name: string; value: string } }) => void;
    onBlur: (e: any) => void;
    error?: string;
    touched?: boolean;
}

export default function TimePicker({
    label,
    name,
    value,
    onChange,
    onBlur,
    error,
    touched
}: TimePickerProps) {
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [selectedTime, setSelectedTime] = useState(value || '09:00');

    const generateTimeSlots = () => {
        const slots = [];
        for (let hour = 6; hour <= 20; hour++) {
            for (let minute = 0; minute < 60; minute += 30) {
                const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
                slots.push(timeString);
            }
        }
        return slots;
    };

    const handleTimeSelect = (time: string) => {
        setSelectedTime(time);
        onChange({ target: { name, value: time } });
        setShowTimePicker(false);
    };

    return (
        <div className="relative">
            <label className="block text-sm font-medium text-slate-700 mb-1">
                {label}
            </label>

            <button
                type="button"
                onClick={() => setShowTimePicker(!showTimePicker)}
                onBlur={onBlur}
                className={`w-full px-4 py-2 rounded-lg border text-sm text-left flex items-center justify-between ${error && touched
                        ? 'border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-100'
                        : 'border-slate-200 focus:border-[#E7294E] focus:ring-2 focus:ring-pink-200'
                    } outline-none transition-all`}
            >
                <span className={selectedTime ? 'text-slate-700' : 'text-slate-400'}>
                    {selectedTime || 'Select time'}
                </span>
                <Clock size={18} className="text-slate-400" />
            </button>

            {/* Time Picker Dropdown */}
            <AnimatePresence>
                {showTimePicker && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute z-50 mt-2 bg-white rounded-xl shadow-2xl border border-slate-200 p-4 w-full"
                    >
                        <div className="flex items-center gap-2 mb-3">
                            <Clock size={16} className="text-slate-600" />
                            <span className="text-sm font-medium text-slate-700">Select Time</span>
                        </div>
                        <div className="grid grid-cols-3 gap-2 max-h-60 overflow-y-auto">
                            {generateTimeSlots().map(time => (
                                <button
                                    key={time}
                                    type="button"
                                    onClick={() => handleTimeSelect(time)}
                                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${selectedTime === time
                                            ? 'bg-[#E7294E] text-white'
                                            : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                                        }`}
                                >
                                    {time}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Error Message */}
            {error && touched && (
                <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                    <span className="inline-block w-1 h-1 bg-red-600 rounded-full"></span>
                    {error}
                </p>
            )}
        </div>
    );
}
