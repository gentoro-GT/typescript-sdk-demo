import React, {JSX} from "react";
import {ErrorIcon} from "./Icons.tsx";

type ErrorProps = React.HtmlHTMLAttributes<HTMLDivElement> & {
    title: string;
    children: JSX.Element | string,
}
export const Error = ({title, children, ...props}: ErrorProps) => {
    return (
        <div className="bg-red-50 border-s-4 border-red-500 p-4 dark:bg-red-800/30" role="alert" {...props}>
            <div className="flex">
                <div className="shrink-0">
                        <span className="inline-flex justify-center items-center size-8
                        rounded-full border-4 border-red-100 bg-red-200 text-red-800 dark:border-red-900 dark:bg-red-800 dark:text-red-400">
                            <ErrorIcon height={24} width={24}/>
                        </span>
                </div>
                <div className="ms-3">
                    <h3 id="hs-bordered-red-style-label" className="text-gray-800 font-semibold dark:text-white">
                        {title}
                    </h3>
                    <p className="text-sm text-gray-700 dark:text-neutral-400">
                        {children}
                    </p>
                </div>
            </div>
        </div>
    )
}
