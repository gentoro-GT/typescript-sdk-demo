import {LogoPlusText} from "./base/GentoroLogo.tsx";

export function HomeHeader () {
    return (
        <div className="max-w-4xl px-4 sm:px-6 lg:px-8 mx-auto text-center text-gray-800 dark:text-white fill-gray-800 dark:fill-white">
            <a className="inline-block mb-4 flex-none focus:outline-none focus:opacity-80" href="https://gentoro.com"
               target={'_blank'}>
                <LogoPlusText/>
            </a>
            <h1 className="text-3xl font-bold  sm:text-4xl ">
                Welcome to Gentoro demo
            </h1>
            <p className="mt-3 text-gray-600 dark:text-neutral-400">
                Your AI-powered bridge to connect LLMs and Enterprise solutions
            </p>
        </div>
    )
}
