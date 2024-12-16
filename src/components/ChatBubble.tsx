import {JSX} from "react";
import {OnlyLogo} from "./GentoroLogo";
import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm'
import rehypeSanitize from 'rehype-sanitize'
import rehypeExternalLinks from 'rehype-external-links'


type BubbleProps = {
    children: JSX.Element,
}

export const FormattedMessage = ({children}: {children:  string}): JSX.Element => {
    return (
        <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[
                rehypeSanitize,
                [rehypeExternalLinks,
                    { content: { type: 'text', value: '🔗' } }
                ],
            ]}
            className='prose prose-invert min-w-full'>
            {children}
        </ReactMarkdown>
    )
}

export const GentoroChatBubble = ({children}: BubbleProps): JSX.Element => {
    return (
        <li className="max-w-4xl py-2 px-4 sm:px-6 lg:px-8 mx-auto flex gap-x-2 sm:gap-x-4">
            <OnlyLogo width={32} height={32} className={"shrink-0 size-[32px] rounded-full fill-gray-800 dark:fill-neutral-200"}/>
            <div className="grow mt-1 space-y-1">
                {children}
            </div>
        </li>
)
}

export const UserChatBubble = ({
    children
}: BubbleProps): JSX.Element => {
    return (
        <li className="py-2 sm:py-4">
            <div className="max-w-4xl px-4 sm:px-6 lg:px-8 mx-auto">
                <div className="max-w-2xl flex gap-x-2 sm:gap-x-4">
                  <span className="shrink-0 inline-flex items-center justify-center size-[32px] rounded-full bg-gray-600">
                    <span className="text-sm font-medium text-white leading-none">AZ</span>
                  </span>
                    <div className="grow mt-1 space-y-1">
                        <p className="text-gray-800 dark:text-neutral-200">
                            {children}
                        </p>
                    </div>
                </div>
            </div>
        </li>
)
}
