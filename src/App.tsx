import {HomeHeader} from "./components/HomeHeader";
import {UserInput} from "./components/UserInput";
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import "preline/preline";
import { IStaticMethods } from "preline/preline";
import {ChatContext, ChatServiceType} from "./ChatContext.ts";
import {ChatService} from "./services/ChatService";
import {ChatContainer} from "./components/ChatContainer";
import HSCollapse from "@preline/collapse";
import {ActionBar} from "./components/ActionBar.tsx";
declare global {
    interface Window {
        HSStaticMethods: IStaticMethods;
    }
}


function App() {
    const location = useLocation();

    useEffect(() => {
        window.HSStaticMethods.autoInit();
        HSCollapse.autoInit();
    }, [location.pathname]);

  return (
      <ChatContext.Provider value={{
            service: new ChatService() as ChatServiceType
      }}>
          <div className="relative h-screen">
              <div className="py-10 lg:py-14" style={{maxHeight: 'calc(100vh - 180px)', overflowY: 'scroll'}}>
                  <HomeHeader/>
                  <ChatContainer />
              </div>
              <div
                  className="fixed w-full bottom-0 z-10 bg-white border-t border-gray-200 pt-2 pb-3 sm:pt-4 sm:pb-6 dark:bg-neutral-900 dark:border-neutral-700">
                  <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                      <ActionBar />
                      <UserInput message={'Ask me anything...'}/>
                  </div>
              </div>
          </div>
      </ChatContext.Provider>
  )
}

export default App
