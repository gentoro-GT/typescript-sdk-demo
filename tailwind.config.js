/** @type {import('tailwindcss').Config} */
module.exports = {
  // configure the paths to all of your source files
  content: [
    'node_modules/preline/dist/*.js',
    './src/**/*.{html,js,ts,jsx,tsx}'
  ],

  theme: {
    container: {
      center: true,
    },
    extend: {
      animation: {
        bounce: 'bounce 1s infinite',
      },
      keyframes: {
        bounce: {
          '0%, 100%': {
            transform: 'translateY(0)',
          },
          '50%': {
            transform: 'translateY(-10px)',
          },
        },
      },
    }
  },
  // add plugins to your Tailwind CSS project
  plugins: [
    require('@tailwindcss/forms'),
    require('preline/plugin'),
    require('@tailwindcss/typography')
  ]
}
