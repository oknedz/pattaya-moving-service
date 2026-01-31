'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, ChevronLeft, ChevronRight } from 'lucide-react';

interface DateTimePickerProps {
    label: string;
    name: string;
    value?: string;
    onChange: (e: { target: { name: string; value: string } }) => void;
    onBlur: (e: any) => void;
    error?: string;
    touched?: boolean;
}

export default function DateTimePicker({
    label,
    name,
    value,
    onChange,
    onBlur,
    error,
    touched
}: DateTimePickerProps) {
    const [showCalendar, setShowCalendar] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | null>(value ? new Date(value) : null);
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState('09:00');

    const daysInMonth = (date: Date) => {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };

    const firstDayOfMonth = (date: Date) => {
        return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    };

    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

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

    const handleDateSelect = (day: number) => {
        const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
        setSelectedDate(newDate);

        // Combine date and time
        const dateTimeString = `${newDate.toISOString().split('T')[0]}T${selectedTime}`;
        onChange({ target: { name, value: dateTimeString } });
    };

    const handleTimeSelect = (time: string) => {
        setSelectedTime(time);
        if (selectedDate) {
            const dateTimeString = `${selectedDate.toISOString().split('T')[0]}T${time}`;
            onChange({ target: { name, value: dateTimeString } });
        }
    };

    const formatDisplayDate = () => {
        if (!selectedDate) return 'Select date and time';
        const dateStr = selectedDate.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
        return `${dateStr} at ${selectedTime}`;
    };

    const previousMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
    };

    const nextMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
    };

    const renderCalendar = () => {
        const days = [];
        const totalDays = daysInMonth(currentMonth);
        const startDay = firstDayOfMonth(currentMonth);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Empty cells for days before month starts
        for (let i = 0; i < startDay; i++) {
            days.push(<div key={`empty-${i}`} className="aspect-square" />);
        }

        // Days of the month
        for (let day = 1; day <= totalDays; day++) {
            const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
            date.setHours(0, 0, 0, 0);
            const isPast = date < today;
            const isSelected = selectedDate?.getDate() === day &&
                selectedDate?.getMonth() === currentMonth.getMonth() &&
                selectedDate?.getFullYear() === currentMonth.getFullYear();
            const isToday = date.getTime() === today.getTime();

            days.push(
                <button
                    key={day}
                    type="button"
                    onClick={() => !isPast && handleDateSelect(day)}
                    disabled={isPast}
                    className={`aspect-square rounded-lg text-sm font-medium transition-all ${isPast
                            ? 'text-slate-300 cursor-not-allowed'
                            : isSelected
                                ? 'bg-[#E7294E] text-white shadow-lg'
                                : isToday
                                    ? 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                                    : 'hover:bg-slate-100 text-slate-700'
                        }`}
                >
                    {day}
                </button>
            );
        }

        return days;
    };

    return (
        <div className="relative">
            <label className="block text-sm font-medium text-slate-700 mb-1">
                {label}
            </label>

            <button
                type="button"
                onClick={() => setShowCalendar(!showCalendar)}
                onBlur={onBlur}
                className={`w-full px-4 py-2 rounded-lg border text-sm text-left flex items-center justify-between ${error && touched
                        ? 'border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-100'
                        : 'border-slate-200 focus:border-[#E7294E] focus:ring-2 focus:ring-pink-200'
                    } outline-none transition-all`}
            >
                <span className={selectedDate ? 'text-slate-700' : 'text-slate-400'}>
                    {formatDisplayDate()}
                </span>
                <Calendar size={18} className="text-slate-400" />
            </button>

            {/* Calendar Dropdown */}
            <AnimatePresence>
                {showCalendar && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute z-50 mt-2 bg-white rounded-xl shadow-2xl border border-slate-200 p-4 w-full md:w-96"
                    >
                        {/* Month Navigation */}
                        <div className="flex items-center justify-between mb-4">
                            <button
                                type="button"
                                onClick={previousMonth}
                                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                            >
                                <ChevronLeft size={20} />
                            </button>
                            <h3 className="font-semibold text-slate-800">
                                {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                            </h3>
                            <button
                                type="button"
                                onClick={nextMonth}
                                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                            >
                                <ChevronRight size={20} />
                            </button>
                        </div>

                        {/* Day Headers */}
                        <div className="grid grid-cols-7 gap-1 mb-2">
                            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                                <div key={day} className="text-center text-xs font-medium text-slate-500 py-2">
                                    {day}
                                </div>
                            ))}
                        </div>

                        {/* Calendar Grid */}
                        <div className="grid grid-cols-7 gap-1 mb-4">
                            {renderCalendar()}
                        </div>

                        {/* Time Selector */}
                        <div className="border-t border-slate-200 pt-4">
                            <div className="flex items-center gap-2 mb-3">
                                <Clock size={16} className="text-slate-600" />
                                <span className="text-sm font-medium text-slate-700">Select Time</span>
                            </div>
                            <div className="grid grid-cols-4 gap-2 max-h-40 overflow-y-auto">
                                {generateTimeSlots().map(time => (
                                    <button
                                        key={time}
                                        type="button"
                                        onClick={() => handleTimeSelect(time)}
                                        className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${selectedTime === time
                                                ? 'bg-[#E7294E] text-white'
                                                : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                                            }`}
                                    >
                                        {time}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Done Button */}
                        <button
                            type="button"
                            onClick={() => setShowCalendar(false)}
                            className="w-full mt-4 px-4 py-2 bg-[#E7294E] text-white rounded-lg font-medium hover:bg-[#C91D3E] transition-colors"
                        >
                            Done
                        </button>
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
