import { keyframes } from "styled-components";
import * as styled from "styled-components";

const Global = styled.createGlobalStyle`
  html,
  body {
    user-select: none;
  }

  body {
    overflow: hidden;
  }

  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;

    font-family: var(--font-pretendard);
    color: ${(props) => props.theme.color.black};
  }

  a {
    color: inherit;
    text-decoration: none;

    cursor: pointer;
  }

  ul,
  ol {
    list-style: none;
  }

  button {
    border: none;
    outline: none;
    background: none;

    cursor: pointer;
  }

  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background-color: ${(props) => props.theme.color.gray};
  }

  ::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.color.white};
    border-radius: 10px;

    cursor: pointer;
  }

  .a11y {
    position: absolute;
    clip: rect(0 0 0 0);
    width: 1px;
    height: 1px;
    margin: -1px;
    overflow: hidden;
  }
`;

export default Global;
