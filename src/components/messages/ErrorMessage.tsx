import {Message, MessageRole} from "../../ChatContext.ts";
import {isObj} from "openai/core";
import {Error} from "../base/Error.tsx";
import {
    isOfType,
    SdkError, SdkErrorSchema,
} from "@gentoro/sdk";
import {ErrorIcon} from "../base/Icons.tsx";
import HSCollapse from "@preline/collapse";
export class ErrorMessage implements Message {
    private readonly _id:number;
    private readonly _role:MessageRole;
    private readonly _error:unknown;
    constructor(id: number, error: unknown, role: MessageRole = MessageRole.Gentoro) {
        this._id = id;
        this._role = role;
        this._error = error;
    }

    id(): number {
        return this._id;
    }

    plainText(): string {
        return isObj(this._error) ? this._error?.message as string : JSON.stringify(this._error);
    }

    role(): MessageRole {
        return this._role;
    }

    render = () => {
        console.log('rendering error message', this._error, isOfType(SdkErrorSchema, this._error));
        setTimeout(() => {
            HSCollapse.autoInit();
        }, 1000);
        if( isOfType(SdkErrorSchema, this._error) ) {
            const _sdkError: SdkError = this._error as SdkError;
            return (
                <div className="bg-red-50 border-s-4 border-red-500 p-4 dark:bg-red-800/30" role="alert">
                    <div className="flex">
                        <div className="shrink-0">
                        <span className="inline-flex justify-center items-center size-8
                        rounded-full border-4 border-red-100 bg-red-200 text-red-800 dark:border-red-900 dark:bg-red-800 dark:text-red-400">
                            <ErrorIcon height={24} width={24}/>
                        </span>
                        </div>
                        <div className="ms-3">
                            <h3 id="hs-bordered-red-style-label"
                                className="text-gray-800 font-semibold dark:text-white">
                                Error Code: {_sdkError.code}
                            </h3>
                            {_sdkError.message && (
                                <p className="text-sm text-gray-700 dark:text-neutral-400">
                                    {_sdkError.message}
                                </p>
                            )}
                            {_sdkError.details && (
                                <>
                                    <div id="hs-show-hide-collapse-heading"
                                         className="hs-collapse hidden w-full overflow-hidden transition-[height] duration-300">
                                        <p className="text-gray-500 dark:text-neutral-400 mt-2">
                                            {_sdkError.details}
                                        </p>
                                    </div>
                                    <p className="mt-2">
                                        <button type="button"
                                                className="hs-collapse-toggle inline-flex items-center gap-x-1 text-sm font-semibold rounded-lg border border-transparent text-blue-600 decoration-2 hover:text-blue-700 hover:underline focus:outline-none focus:underline focus:text-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-600 dark:focus:text-blue-600"
                                                id="hs-show-hide-collapse" aria-expanded="false"
                                                aria-controls="hs-show-hide-collapse-heading"
                                                data-hs-collapse="#hs-show-hide-collapse-heading">
                                            <span className="hs-collapse-open:hidden">View more</span>
                                            <span className="hs-collapse-open:block hidden">View less</span>
                                            <svg className="hs-collapse-open:rotate-180 shrink-0 size-4"
                                                 xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                 viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                                                 strokeLinecap="round" strokeLinejoin="round">
                                                <path d="m6 9 6 6 6-6"></path>
                                            </svg>
                                        </button>
                                    </p>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )
        } else {
            return <Error title={'Error'}>{this.plainText()}</Error>
        }
    }
}
