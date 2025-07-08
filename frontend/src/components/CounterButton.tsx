import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface CounterButtonProps {
    value: number;
    suffix?: string;
    label?: string;
    className?: string;
}

const CounterButton: React.FC<CounterButtonProps> = ({
    value,
    suffix = '',
    label,
    className = '',
}) => {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    // Start counter after 1 second delay
                    setTimeout(() => setCount(0), 0); // Reset before start
                    setTimeout(() => setCount(value), 1000);
                } else {
                    setCount(0); // Reset counter when out of view
                }
            },
            { threshold: 0.3 } // Trigger when 30% visible
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, [value]);

    useEffect(() => {
        if (count === 0 || count === value) return;
        const timer = setTimeout(() => {
            if (count < value) {
                setCount((prev) => Math.min(prev + Math.max(1, Math.floor(value / 20)), value));
            }
        }, 100);

        return () => clearTimeout(timer);
    }, [count, value]);

    return (
        <motion.div
            ref={ref}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.05 }}
            className={`flex flex-col items-center justify-center rounded-full bg-[#023c40] w-32 h-32 md:w-40 md:h-40 shadow-lg ${className} m-4 mx-6`}
        >
            <motion.div
                className="text-3xl md:text-4xl font-bold text-[#023c40]"
                key={count}
                animate={{
                    scale: [1, 1.2, 1],
                    transition: { duration: 0.5 },
                }}
            >
                {count}
                {suffix}
            </motion.div>
            {label && (
                <motion.div
                    className="text-sm md:text-base mt-2 font-medium text-[#023c40]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    {label}
                </motion.div>
            )}
        </motion.div>
    );
};

export default CounterButton;
