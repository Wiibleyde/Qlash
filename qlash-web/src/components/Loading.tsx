import React from 'react'

const Loading = () => {
    return (
        <div className="flex flex-col items-center justify-center g-10">

            <div
                className="animate-spin rounded-full h-32 w-32 border-[16px] border-purple-500 border-t-transparent"
                style={{
                    animationDuration: '0.7s',
                }}
            />
            <div className="text-xl font-semibold mt-8">En attente des autres réponses...</div>
        </div>
    )
}

export default Loading