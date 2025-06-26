import { cn } from '@/utils/cn';
import React, { useRef } from 'react';

interface OtpFormProps extends React.HTMLAttributes<HTMLDivElement> {
    length: number;
    otp: string[];
    setOtp: (otp: string[]) => void;
}

const OtpForm = ({
    otp,
    setOtp,
    className,
    length,
    ...props
}: OtpFormProps) => {
    const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
        const value = e.target.value.replace(/[^0-9]/g, '');
        if (!value) return;
        const newOtp = [...otp];
        newOtp[idx] = value[0];
        setOtp(newOtp);

        // Focus input suivant si pas le dernier
        if (idx < length - 1 && value) {
            inputsRef.current[idx + 1]?.focus();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, idx: number) => {
        if (e.key === 'Backspace') {
            if (otp[idx]) {
                // Efface la valeur courante
                const newOtp = [...otp];
                newOtp[idx] = '';
                setOtp(newOtp);
            } else if (idx > 0) {
                // Focus input précédent
                inputsRef.current[idx - 1]?.focus();
            }
        }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        const paste = e.clipboardData.getData('text').replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
        if (paste.length === length) {
            setOtp(paste.split('').slice(0, length));
            // Focus le dernier input
            inputsRef.current[length - 1]?.focus();
            e.preventDefault();
        }
    };

    return (
        <div className={cn("w-full flex flex-row justify-between", className)} {...props}>
            {otp.map((char, idx) => (
                <input
                    key={idx}
                    ref={el => { inputsRef.current[idx] = el; }}
                    type='text'
                    inputMode='numeric'
                    pattern='[0-9]*'
                    maxLength={1}
                    value={char}
                    onChange={(e) => handleChange(e, idx)}
                    onKeyDown={(e) => handleKeyDown(e, idx)}
                    onPaste={handlePaste}
                    className='w-14 h-14 bg-[#f9f9f9] text-center rounded-2xl border border-[#ececec] outline-[#5427ec] text-2xl font-bold'
                    autoComplete="off"
                />
            ))}
        </div>
    )
}

export default OtpForm