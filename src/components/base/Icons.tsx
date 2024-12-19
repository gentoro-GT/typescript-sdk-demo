import React from "react";

type IconProps = React.SVGProps<SVGSVGElement> & {

}
export const SendMessageIcon = ({height, width, ...props}: IconProps) => {
    return (
        <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width={width}
             {...props}
             height={height} fill="currentColor" viewBox="0 0 16 16">
            <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z"/>
        </svg>
    )
}

export const ErrorIcon = ({height, width, ...props}: IconProps) => {
    return (
        <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width={width} height={height} {...props} viewBox="0 0 24 24"
             fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6 6 18"></path>
            <path d="m6 6 12 12"></path>
        </svg>
    )
}
