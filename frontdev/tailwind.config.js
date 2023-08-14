/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors');

module.exports = {
    content: [
        './index.html',
        './src/**/*.{js,jsx}',
        './node_modules/tw-elements/dist/js/**/*.js',
    ],
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
        ],
    },
    theme:{
        screens: {
            sm: '480px', // @media (min-width: 480px)
            md: '768px', // @media (min-width: 768px)
            lg: '1024px', //  @media (min-width: 1024px)
            xl: '1280px', //  @media (min-width: 1280px)
            '2xl': '1536px', // @media (min-width: 1536px)
            '3xl': '2000px', // @media (min-width: 2000px)
            '4xl_screen': '3000px', // @media (min-width: 3000px)
        },

        colors: {
            white: '#FFFFFF',
            black: '#000000',
            cinema: {
                100: '#FFF069BF',
                200: '#FFDF00BF',
                300: '#FFDF00',
                400: '#DB0000CF',
                500: '#DB0000',
                600: '#EFEBEB',
                700: '#1270FD',
                800: '#000000CC',
            },

            //background
            bg_primary: '#FBFFFE',
            bg_secondary: '#E4E5E5',
            bg_tertiary: '#000000',
            bg_additional: '#FFF069BF',

            //text
            tx_primary: '#DB0000',
            tx_secondary:'#000000',
            tx_tertiary:'#FFFFFF',
            tx_addtional:'#908F8F',
            tx_link:'#1270FD',

            //border
            br_primary: '#00000000',
            br_secondary: '#DB0000',
            
            //button
            bt_primary: '#FFDF00',
            bt_secondary: '#DB0000',
            bt_additional: '#000000',
        },
        extend: {
            //Typography
            fontFamily: {
                primary: ['Inter', 'sans-serif'],
                secondary: ['Bebas Neue', 'sans-serif'],
            },
            fontSize:{
                heading_1: '3rem',
                heading_2: '1.5rem',
                base: '1rem',
                small: '0.7rem',
            },
            fontWeight: {
                light: 300,
                regular: 400,
                medium: 500,
                bold: 700,
              },
              // space
              spacing: {
                base: '1rem',
                small: '0.5rem',
                large: '2rem',
              },
              // border radius
              borderRadius: {
                small: '0.25rem',
                medium: '0.5rem',
                large: '1rem',
              },
              // transition time
             transitionDuration: {
                short: '0.15s ease',
                medium: '0.3s ease',
                long: '0.45s ease',
                timing_function: 'cubic-bezier(0.4, 0, 0.2, 1)',
             },
             blur: {
                150: '150px',
              },
        },
    },
    plugins: [require('daisyui')],
    daisyui: {
      themes: {
        ...require('tailwindcss/defaultTheme'),
      },
      styled: true,
      base: true,
    },
}
