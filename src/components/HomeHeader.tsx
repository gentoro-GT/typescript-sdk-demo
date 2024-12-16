import {LogoPlusText} from "./GentoroLogo";

export function HomeHeader () {
    return (
        <div className="max-w-4xl px-4 sm:px-6 lg:px-8 mx-auto text-center">
            <a className="inline-block mb-4 flex-none focus:outline-none focus:opacity-80" href="https://gentoro.com"
               target={'_blank'}>
                <LogoPlusText/>
            </a>
            <h1 className="text-3xl font-bold text-gray-800 sm:text-4xl dark:text-white">
                Welcome to Gentoro demo
            </h1>
            <p className="mt-3 text-gray-600 dark:text-neutral-400">
                Your AI-powered bridge to connect LLMs and Enterprise solutions
            </p>
        </div>
    )
}
