import React from "react";

export const LoadingDots: React.FC = () => {
    return (
        <div className="space-x-2 h-20 inline-flex">
            <div className="w-2 h-2 bg-blue-500 dark:bg-white rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-blue-500 dark:bg-white rounded-full animate-bounce" style={{ animationDelay: '100ms' }}></div>
            <div className="w-2 h-2 bg-blue-500 dark:bg-white rounded-full animate-bounce" style={{ animationDelay: '200ms' }}></div>
        </div>
    );
}
