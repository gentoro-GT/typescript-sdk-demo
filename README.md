# Gentoro Demo App

Sample application, providing developers with essential knowledge about the Gentoro framework.

## Installation

To install the Gentoro Demo App, follow these steps:

1. Clone the repository
```bash        
    git clone https://github.com/gentoro-GT/typescript-sdk-demo.git 
``` 

2. Run `npm install`
```bash
   cd typescript-sdk
   npm install
```

3. Configure environment variables.

   Go to env directory and create a new file named `.env.local` with the following content: 
```
VITE_GENTORO_BASE_URL=https://demo.gentoro.com
VITE_GENTORO_AUTH_MOD_BASE_URI=https://demo.gentoro.com/auth
VITE_GENTORO_BRIDGE_UID={place your bridge uid here}
VITE_GENTORO_API_KEY={place your api key here}
VITE_OPENAI_API_KEY={place your openai api key here}
VITE_OPENAI_MODEL={place your openai model here, example gpt-4o-mini}
```

4. Run the application
```bash
   npm run start-local
```

## Getting Gentoro Api Key

To get the Gentoro API key, follow these steps:

1. Sign in to the Gentoro platform, using your credentials.
2. Go to the `Settings` section.
3. Locate your user account, and click at the `key` icon.
4. Create a new API Key and start using it.
    
    Make sure you keep the API key in a safe place, as it will be used to authenticate your requests.
