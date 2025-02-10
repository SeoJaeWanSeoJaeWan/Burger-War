import { keyframes } from 'styled-components';
import * as styled from 'styled-components';

const textColor = keyframes`
  0% {
    background-position: right;

  }

  100% {
    background-position: left;

  }
`;

const Global = styled.createGlobalStyle`
  html,
  body {
    user-select: none;
  }

  body {
    width: 100vw;
    overflow-x: hidden;
  }

  * {
    position: relative;
    z-index: 1;

    box-sizing: border-box;
    padding: 0;
    margin: 0;

    font-family: var(--font-pretendard);
    color: ${(props) => props.theme.color.text};
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
    background-color: ${(props) => props.theme.color.background};
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

  .select {
    position: relative;

    display: inline-block;

    color: transparent;

    background: url('assets/images/common/background.png'); /* 배경 그라데이션 */
    background-size: 300% 100%; /* 너비를 0으로 설정, 높이는 100% */
    background-repeat: no-repeat;
    background-position: right;
    -webkit-background-clip: text;

    animation: ${textColor} 5s cubic-bezier(1, 0, 0, 1) infinite;
  }
`;

export default Global;
