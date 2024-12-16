import {HomeHeader} from "./components/HomeHeader";
import {UserInput} from "./components/UserInput";
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import "preline/preline";
import { IStaticMethods } from "preline/preline";
import {ChatContext, ChatServiceType} from "./ChatContext.ts";
import {ChatService} from "./service/ChatService";
import {ChatContainer} from "./components/ChatContainer";
declare global {
    interface Window {
        HSStaticMethods: IStaticMethods;
    }
}


function App() {
    const location = useLocation();

    useEffect(() => {
        window.HSStaticMethods.autoInit();
    }, [location.pathname]);

  return (
      <ChatContext.Provider value={{
            service: new ChatService() as ChatServiceType
      }}>
          <div className="relative h-screen">
              <div className="py-10 lg:py-14">
                  <HomeHeader/>
                  <ChatContainer />
              </div>
              <div
                  className="fixed w-full bottom-0 z-10 bg-white border-t border-gray-200 pt-2 pb-3 sm:pt-4 sm:pb-6 dark:bg-neutral-900 dark:border-neutral-700">
                  <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                      <div className="flex justify-between items-center mb-3">
                          <button type="button"
                                  className="inline-flex justify-center items-center gap-x-2 rounded-lg font-medium text-gray-800 hover:text-blue-600 focus:outline-none focus:text-blue-600 text-xs sm:text-sm dark:text-neutral-200 dark:hover:text-blue-500 dark:focus:text-blue-500">
                              <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                   viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                                   strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M5 12h14"/>
                                  <path d="M12 5v14"/>
                              </svg>
                              New chat
                          </button>

                          <button type="button"
                                  className="py-1.5 px-2 inline-flex items-center gap-x-2 text-xs font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800">
                              <svg className="size-3" xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                   fill="currentColor" viewBox="0 0 16 16">
                                  <path
                                      d="M5 3.5h6A1.5 1.5 0 0 1 12.5 5v6a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 11V5A1.5 1.5 0 0 1 5 3.5z"/>
                              </svg>
                              Stop generating
                          </button>
                      </div>
                      <UserInput message={'Ask me anything...'}/>
                  </div>
              </div>
          </div>
      </ChatContext.Provider>
  )
}

export default App
