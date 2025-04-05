import {createGlobalStyle} from 'styled-components';

export const GlobalStyle = createGlobalStyle`

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
    :root {
        --color-primary: #4CAF50;
        --color-secondary: #FF9800;
        --color-background: #F5F5F5;
        --color-text: #333;
        }
    body {
        font-family: 'Inter', sans-serif;
        background-color: red;
        font-size: 16px;
        color: rgba(34, 34, 96, .6);
        overflow-x: hidden;
    }

`;

//font size: clamp(1rem, 1.5vw, 1.2rem);
