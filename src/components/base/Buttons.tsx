import React, {JSX} from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    children: string | JSX.Element | JSX.Element[];
}
export const MainIconButton = ({children, ... props}: ButtonProps): JSX.Element => {
    return (
        <button type="button"
            {...props}
            className="inline-flex shrink-0 justify-center items-center
                size-8 rounded-lg text-white bg-blue-600 hover:bg-blue-500
                focus:z-10 focus:outline-none focus:bg-blue-500">
            {children}
        </button>
    )
}
