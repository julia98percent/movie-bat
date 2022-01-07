import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;  
  }
  a:hover, a:visited, a:link, a:active {
    text-decoration: none;
    color: white;
  }
  body {
    box-sizing: border-box;
    background-color: #141414;
    color: white;
  }
  .tasteItem {
    height: 7vw;
    width: 7vw;
    border-radius: 100%;
    margin: 1vw;
    line-height: 6vw;
  }
  .nextBtn {
    margin-top: 3vh;
    margin-bottom: 3vh;
  }
  .isHidden {
    // visibility: hidden;
    display: none;
  }
  .isShown {
    color: red;
  }
    .btn-brown{
      background-color: brown;
      color: white;
    }
`;

export default GlobalStyle;
