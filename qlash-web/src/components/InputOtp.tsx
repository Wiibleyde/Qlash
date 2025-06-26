import React from 'react'

interface InputOtpProps extends React.HTMLAttributes<HTMLInputElement> {
    children?: React.ReactNode;
    inputsRef: React.RefObject<Array<HTMLInputElement | null>>;
    index: number;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    onPaste: (e: React.ClipboardEvent<HTMLInputElement>) => void;
}

const InputOtp = ({
    children,
    className,
    inputsRef,
    index,
    ...props
}: InputOtpProps) => {
    return (
        <input
            {...props}
            ref={el => { inputsRef.current[index] = el; }}
            type='text'
            inputMode='numeric'
            pattern='[0-9]*'
            maxLength={1}
            className='w-14 h-14 bg-[#f9f9f9] text-center rounded-2xl border border-[#ececec] outline-[#5427ec] text-2xl font-bold'
            autoComplete="off"
        />
    )
}

export default InputOtp