import Frame from "react-frame-component";
import StartConversation from "./cards/StartConversation";
import { useEffect, useRef, useState } from "react";
import ContinueConversations from "./cards/ContinueConversations";
import { TAB } from "../constants";
import AllConversations from "./tabs/AllConversations";
import Header from "./common/Header";
import NewConversation from "./tabs/NewConversation";
const css: string = ` 
    .chat-widget {
        display: flex;
        flex-direction: column;
        -webkit-box-pack: start;
        justify-content: flex-start;
        position: absolute;
        inset: 0px;
        height: 100vh;
        overflow: hidden auto;
        scroll-behavior: smooth;
        scrollbar-color: gray lightgray;
        scrollbar-width: thin;
    }

    .chat-header {
        min-height: 195px;
    }

    .chat-widget-header-shape-secondary::after {
        content: "";
        background: rgb(102, 0, 255);
        position: fixed;
        right: -64px;
        top: -160px;
        height: 183px;
        width: 23px;
        border-radius: 180px 0px 0px;
        transform: rotate(-160deg);
        transform-origin: 0px 95%;
        z-index: 9;
    }
    .chat-widget-header-section {
        position: fixed;
        z-index: 11;
        padding: 30px 35px 0px;
        width: 100%;
        min-height: 195px;
    }

    .chat-widget-header-section::after {
        content: "";
        transform: rotate(180deg) skewX(-20deg);
        transform-origin: 13.9% 91%;
        width: 530px;
        border-radius: 34px 0px 0px;
        top: -310px;
        position: fixed;
        z-index: 10;
        right: -430px;
        min-height: 277px;
        background-image: -webkit-linear-gradient(0deg, rgb(235, 73, 149) 5%, rgb(102, 0, 255) 116%);
    }
    .slide-left-animation {
        animation: 600ms ease -300ms 1 normal none running slideInLeft;
    }
    .header-section-text {
        max-width: 100%;
        display: flex;
        flex-direction: column;
        -webkit-box-pack: center;
        justify-content: center;
        opacity: 1;
        transform: translateY(0px);
        color: rgb(0, 0, 0);
        position: absolute;
        z-index: 20;
    }

    .chat-body {
        flex:1;
    }
    .chat-footer {
        animation: 1s ease 0s 1 normal backwards running fadeInUpBig;
        position: fixed;
        bottom: 0px;
        left: 0px;
        right: 0px;
        background-color: white;
    }
    .chat-footer > div{
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: rgba(0, 0, 0, 0.04) 0px -10px 10px 1px;
    }
    
    .chat-footer a {
        display: flex;
        -webkit-box-align: center;
        align-items: center;
        font-size: 13px;
        padding: 2px 12px;
        border-radius: 16px;
        cursor: pointer;
        transition: all 0.2s linear 0s;
        text-decoration: none;
        color: rgb(119, 118, 120) !important;
    }
    .chat-footer img {
        width: 26px;
        height: 26px;
        margin-right: 8px;
    }

    .card {
      box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 15px 0px, rgba(0, 0, 0, 0.1) 0px 1px 2px 0px, rgba(235, 73, 149, 0.5) 2px 0px 0px 0px inset;
      border-radius: 4px;
      margin-top: 20px;
      background: rgb(255, 255, 255);
      z-index: 12;
     
    }
    .conversation-section-body {
      padding: 0px 15px 60px;
    }
    .inner-card-body{
      padding: 20px 25px;
    }
    .prev-convo-card {
      position: relative;
    }

  .prev-convo-card:hover {
    background-color: rgba(235, 73, 149, 0.12) !important;
  }

  .prev-convo-card::after {
    content: "";
    position: absolute;
    border-bottom: 1px solid rgb(238, 238, 238);
    left: 24px;
    right: 24px;
    bottom: 0px;
    margin: 0px auto;
  }


  .min-header {
    height: 75px;
    width: 100%;
    position: relative;
    display: flex;
    align-items: center;
    padding: 14px 15px;
    transition: all 0.3s ease 0s;
    background-color: rgb(235, 73, 149);
  }

  .back-to-home-btn {
    background: transparent;
    border: none;
    outline: none;
    border-radius: 4px;
    transition: all 0.3s linear 0s;
    display: flex;
    justify-content: center;  
    cursor: pointer;
    position: relative;
    z-index: 12;
    min-width: 48px;
    min-height: 48px;
    align-self: flex-start;
  }

  .back-to-home-btn:hover {
    background-color: rgb(223 153 186 / 50%);
  }

  .back-to-home-btn svg {
    fill: white;
    width: 20px;
    transform: rotate(180deg);
    cursor: pointer;
  }


  .tab-arrow svg path {
    fill: rgb(235, 73, 149);
  }

  .all-conversations-body {
      overflow-y:scroll;
      height: calc(-76px + 100vh);
      padding-bottom: 105px;
      animation: 600ms ease -400ms 1 normal none running slideInRight;
  }

  .all-conversations-footer {
    position: fixed;
    bottom: 0px;
    height: 105px;
    pointer-events: none;
    background: linear-gradient(0deg, rgb(255, 255, 255), rgba(255, 255, 255, 0));
    width: 100%;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    z-index: 100;
  }

  .team-group > div {
    background-color: rgb(235, 73, 149);
    width: 40px;
    height: 40px;
    display:flex;
    align-items:center;
    justify-content:center;
    font-weight: bold;
}

.btn {
    background: white;
    transition: all 0.3s linear 0s;
    color: rgb(235, 73, 149);
    border: 1px solid rgb(235, 73, 149);
    outline: none;
    height: 40px;
    pointer-events: auto;
    cursor: pointer;
    text-align: center;
    font-weight: 600;
    padding: 0px 17px;
    border-radius: 25px;
    font-size: 14px;
}
.btn:hover {
    background-color: rgb(235, 73, 149);
    border-color: rgb(235, 73, 149);
    color: rgb(0, 0, 0);
    color:white;
}
.btn:hover svg {
    fill: white !important;
}

.new-conversation-body {
  flex: 1;
}
.new-conversation-footer {
  min-height: 60px;
  background: rgb(255, 255, 255);
  border-radius: 0px;
  margin: 0px;
  padding: 0px;
  display: flex;
  -webkit-box-pack: center;
  align-items: center;
  justify-content: space-evenly;
  border-top: 1px solid rgb(230, 230, 230);
  z-index: 1000;
  transition: opacity 0.3s ease 0s;
  animation-name: textAreaAnimation;
  animation-duration: 600ms;
}

.popover {
  height: 323px;
    position: fixed;
    top: unset;
    bottom: 64px;
    left: 25px;
    right: 25px;
}

    @keyframes fadeInUpBig {
        0% {
          opacity: 0;
          transform: translate3d(0px, 2000px, 0px);
        }
        100% {
            opacity: 1;
          }
      }

      @keyframes slideInLeft {
        0% {
            transform: translate3d(-100%, 0px, 0px);
            visibility: visible;
        }
        100% {
            transform: translate3d(0px, 0px, 0px);
        }
      }

      @keyframes slideInRight {
        0% {
          transform: translate3d(100%, 0px, 0px);
          visibility: visible;
        }
        100% {
            transform: translate3d(0px, 0px, 0px);
        }
      }
    

`;
const ChatLauncherBody = ({ open }: { open: boolean }) => {
  const iframeChatBodyRef = useRef<null | HTMLIFrameElement>(null);
  const [currentTab, setCurrentTab] = useState(TAB.NEW_CONVERSATION);
  const [toggleEmoji, setToggleEmoji] = useState(false);
  const [toggleGif, setToggleGif] = useState(false);

  useEffect(() => {
    // setCurrentTab(TAB.HOME);
  }, [open]);

  useEffect(() => {
    // if(!iframeChatBodyRef?.current) return;
    // const iframe = iframeChatBodyRef.current;
    // if(!iframe.contentWindow || !iframe.contentWindow.document) return;
    // const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
    // const script = document.createElement('script');
    // script.src = 'https://cdn.tailwindcss.com';
    // iframeDocument.head.appendChild(script);
  }, []);

  const init = () => {
    switch (currentTab) {
      case TAB.ALL_CONVERSATION:
        return <AllConversations setCurrentTab={setCurrentTab} />;
      case TAB.NEW_CONVERSATION:
        return (
          <NewConversation
            setCurrentTab={setCurrentTab}
            currentTab={currentTab}
            toggleEmoji={toggleEmoji}
            setToggleEmoji={setToggleEmoji}
            toggleGif={toggleGif}
            setToggleGif={setToggleGif}
          />
        );
      case TAB.PREV_CONVERSATION:
        return <>PREV CONV</>;
      default:
        return <Home currentTab={currentTab} setCurrentTab={setCurrentTab} />;
    }
  };

  return (
    <Frame
      ref={iframeChatBodyRef}
      className={`${open ? "iframe-open" : "iframe-hide"}`}
      allowFullScreen={true}
      head={
        <>
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css"
          />
          <style type="text/css">
            {`.GifPickerReact .gpr-body{display:flex;flex:1;min-height:0}`}
          </style>
          <style type="text/css">
            {`.GifPickerReact .gpr-category-placeholder{border-radius:var(--gpr-category-border-radius);position:relative}`}
          </style>
          <style type="text/css">
            {`.GifPickerReact .gpr-placeholder{background-color:var(--gpr-placeholder-color);transition:opacity .2s ease-in-out}`}
          </style>
          <style type="text/css">
            {`.GifPickerReact .gpr-category-list{grid-gap:var(--gpr-category-list-padding);display:grid;flex:1;grid-auto-rows:min-content;overflow-y:scroll;padding:var(--gpr-body-padding)}`}
          </style>
          <style type="text/css">
            {`.GifPickerReact .gpr-category{border-radius:var(--gpr-category-border-radius);cursor:pointer;position:relative;transition:box-shadow .15s ease-in-out}.GifPickerReact .gpr-category img{background-color:#d3d3d3;border-radius:var(--gpr-category-border-radius);height:100%;-o-object-fit:cover;object-fit:cover;width:100%}.GifPickerReact .gpr-category-overlay{align-items:center;background-color:rgba(0,0,0,var(--gpr-category-background-opacity));border-radius:var(--gpr-category-border-radius);display:flex;height:100%;justify-content:center;left:0;overflow:hidden;position:absolute;top:0;transition:background-color .15s ease-in-out;width:100%}.GifPickerReact .gpr-category-overlay .gpr-category-name{color:var(--gpr-category-font-color);font-size:var(--gpr-category-font-size);font-weight:var(--gpr-category-font-weight);text-shadow:0 1px 1px rgba(0,0,0,var(--gpr-category-shadow-opacity))}.GifPickerReact .gpr-category:hover{box-shadow:0 0 0 2px var(--gpr-category-border-color-hover)}.GifPickerReact .gpr-category:hover .gpr-category-overlay{background-color:rgba(0,0,0,var(--gpr-category-shadow-opacity-hover))}`}
          </style>
          <style type="text/css">
            {`.GifPickerReact .gpr-icn-trending{background-color:transparent;background-image:url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48'%3E%3Cpath fill='%23fff' d='M6.3 37 4 34.7l15-15 8 8.05L41.9 11l2.1 2.05-17 19.2-8-7.95Z'/%3E%3C/svg%3E");background-repeat:no-repeat;background-size:20px;height:20px;width:20px}.GifPickerReact .gpr-category .gpr-text-trending-category{align-items:center;display:flex;gap:4px}`}
          </style>
          <style type="text/css">
            {`.GifPickerReact .gpr-gif-list{display:flex;flex:1;flex-direction:row;gap:var(--gpr-category-list-padding);overflow-y:scroll;padding:var(--gpr-body-padding)}.GifPickerReact .gpr-gif-list-column{grid-gap:var(--gpr-category-list-padding);display:grid;flex:1;grid-auto-rows:min-content;grid-template-columns:1fr 1fr 1fr;grid-template-rows:auto 1fr}.GifPickerReact .gpr-gif-list-no-result{align-items:center;display:flex;flex:1;justify-content:center;padding-bottom:30%}`}
          </style>
          <style type="text/css">
            {`.GifPickerReact .gpr-result-placeholder{border-radius:var(--gpr-category-border-radius)}`}
          </style>
          <style type="text/css">
            {`.GifPickerReact .gpr-result-image{border-radius:var(--gpr-category-border-radius);cursor:pointer;transition:box-shadow .15s ease-in-out}.GifPickerReact .gpr-result-image img{background-color:var(--gpr-placeholder-color);border-radius:var(--gpr-category-border-radius);height:100%;-o-object-fit:cover;object-fit:cover;width:100%}.GifPickerReact .gpr-result-image:hover{box-shadow:0 0 0 2px var(--gpr-category-border-color-hover)}`}
          </style>
          <style type="text/css">
            {`.GifPickerReact .gpr-header{border-bottom:1px solid var(--gpr-picker-border-color);min-height:0;padding:var(--gpr-header-padding)}`}
          </style>
          <style type="text/css">
            {`.GifPickerReact button.gpr-btn-clear-search{align-items:center;border-radius:50%;display:flex;height:20px;justify-content:end;padding:0;position:absolute;right:var(--gpr-search-bar-inner-padding);top:50%;transform:translateY(-50%);width:20px}.GifPickerReact .gpr-icn-clear-search{background-color:transparent;background-image:url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' xml:space='preserve' width='20' height='80'%3E%3Cpath fill='%23868686' d='M6.98 13.59a.53.53 0 0 0 .74 0l2.42-2.42 2.43 2.43a.53.53 0 0 0 .74 0c.21-.21.21-.54 0-.75l-2.43-2.43L13.32 8c.21-.21.21-.54 0-.75a.525.525 0 0 0-.75 0l-2.42 2.42-2.41-2.4a.525.525 0 0 0-.75 0c-.21.21-.21.54 0 .75l2.41 2.41-2.42 2.42c-.21.2-.21.54 0 .74z'/%3E%3Cpath fill='%23868686' d='M10.15 18.43c4.41 0 8-3.59 8-8s-3.59-8-8-8-8 3.59-8 8 3.59 8 8 8zm0-14.94c3.83 0 6.94 3.11 6.94 6.94 0 3.83-3.11 6.94-6.94 6.94-3.83 0-6.94-3.11-6.94-6.94 0-3.83 3.12-6.94 6.94-6.94z'/%3E%3Cpath fill='%233371B7' d='M6.98 33.59a.53.53 0 0 0 .74 0l2.42-2.42 2.43 2.43a.53.53 0 0 0 .74 0c.21-.21.21-.54 0-.75l-2.43-2.43L13.32 28c.21-.21.21-.54 0-.75a.525.525 0 0 0-.75 0l-2.42 2.42-2.41-2.41a.525.525 0 0 0-.75 0c-.21.21-.21.54 0 .75l2.41 2.41-2.42 2.42c-.21.21-.21.55 0 .75z'/%3E%3Cpath fill='%233371B7' d='M10.15 38.43c4.41 0 8-3.59 8-8s-3.59-8-8-8-8 3.59-8 8 3.59 8 8 8zm0-14.94c3.83 0 6.94 3.11 6.94 6.94 0 3.83-3.11 6.94-6.94 6.94-3.83 0-6.94-3.11-6.94-6.94 0-3.83 3.12-6.94 6.94-6.94z'/%3E%3Cpath fill='%23C0C0BF' d='M6.98 53.59a.53.53 0 0 0 .74 0l2.42-2.42 2.43 2.43a.53.53 0 0 0 .74 0c.21-.21.21-.54 0-.75l-2.43-2.43L13.32 48c.21-.21.21-.54 0-.75a.525.525 0 0 0-.75 0l-2.42 2.42-2.41-2.41a.525.525 0 0 0-.75 0c-.21.21-.21.54 0 .75l2.41 2.41-2.42 2.42c-.21.21-.21.55 0 .75z'/%3E%3Cpath fill='%23C0C0BF' d='M10.15 58.43c4.41 0 8-3.59 8-8s-3.59-8-8-8-8 3.59-8 8 3.59 8 8 8zm0-14.94c3.83 0 6.94 3.11 6.94 6.94 0 3.83-3.11 6.94-6.94 6.94-3.83 0-6.94-3.11-6.94-6.94 0-3.83 3.12-6.94 6.94-6.94z'/%3E%3Cpath fill='%236AA9DD' d='M6.98 73.59a.53.53 0 0 0 .74 0l2.42-2.42 2.43 2.43a.53.53 0 0 0 .74 0c.21-.21.21-.54 0-.75l-2.43-2.43L13.32 68c.21-.21.21-.54 0-.75a.525.525 0 0 0-.75 0l-2.42 2.42-2.41-2.41a.525.525 0 0 0-.75 0c-.21.21-.21.54 0 .75l2.41 2.41-2.42 2.42c-.21.21-.21.55 0 .75z'/%3E%3Cpath fill='%236AA9DD' d='M10.15 78.43c4.41 0 8-3.59 8-8s-3.59-8-8-8-8 3.59-8 8 3.59 8 8 8zm0-14.94c3.83 0 6.94 3.11 6.94 6.94 0 3.83-3.11 6.94-6.94 6.94-3.83 0-6.94-3.11-6.94-6.94 0-3.83 3.12-6.94 6.94-6.94z'/%3E%3C/svg%3E");background-repeat:no-repeat;background-size:20px;height:20px;width:20px}.GifPickerReact .gpr-search-container button.gpr-btn-clear-search:focus .gpr-icn-clear-search,.GifPickerReact button.gpr-btn-clear-search:hover .gpr-icn-clear-search{background-position-y:-20px}.GifPickerReact button.gpr-btn-clear-search:focus,.GifPickerReact button.gpr-btn-clear-search:hover{background:var(--gpr-hover-bg-color)}.GifPickerReact.gpr-dark-theme button.gpr-btn-clear-search .gpr-icn-clear-search{background-position-y:-40px}.GifPickerReact.gpr-dark-theme button.gpr-btn-clear-search:hover .gpr-icn-clear-search{background-position-y:-60px}`}
          </style>
          <style type="text/css">
            {`.GifPickerReact .gpr-search-container{display:block;flex:1;min-width:0;position:relative}.GifPickerReact .gpr-search-container input.gpr-search{background-color:var(--gpr-search-input-bg-color);border:1px solid var(--gpr-search-input-bg-color);border-radius:var(--gpr-search-input-border-radius);color:var(--gpr-search-input-text-color);height:var(--gpr-search-input-height);outline:none;padding:var(--gpr-search-input-padding);transition:all .2s ease-in-out;width:100%}.GifPickerReact .gpr-search-container .gpr-icn-search{background-image:url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' xml:space='preserve' width='20' height='40'%3E%3Cpath fill='%23868686' fill-rule='evenodd' d='M12 8.81c0 2.08-1.68 3.76-3.76 3.76s-3.76-1.68-3.76-3.76 1.68-3.76 3.76-3.76S12 6.73 12 8.81zm-.77 3.91c-.83.64-1.87 1.01-2.99 1.01-2.72 0-4.92-2.2-4.92-4.92 0-2.72 2.2-4.92 4.92-4.92 2.72 0 4.92 2.2 4.92 4.92 0 1.13-.38 2.16-1.01 2.99l3.94 3.93c.25.25.25.66 0 .92-.25.25-.66.25-.92 0l-3.94-3.93z' clip-rule='evenodd'/%3E%3Cpath fill='%23C0C0BF' fill-rule='evenodd' d='M12 28.81c0 2.08-1.68 3.76-3.76 3.76s-3.76-1.68-3.76-3.76 1.68-3.76 3.76-3.76S12 26.73 12 28.81zm-.77 3.91c-.83.64-1.87 1.01-2.99 1.01-2.72 0-4.92-2.2-4.92-4.92 0-2.72 2.2-4.92 4.92-4.92 2.72 0 4.92 2.2 4.92 4.92 0 1.13-.38 2.16-1.01 2.99l3.94 3.93c.25.25.25.66 0 .92-.25.25-.66.25-.92 0l-3.94-3.93z' clip-rule='evenodd'/%3E%3C/svg%3E");background-position:0 0;background-repeat:no-repeat;background-size:20px;content:"";height:20px;left:var(--gpr-search-bar-inner-padding);position:absolute;top:50%;transform:translateY(-50%);width:20px}.GifPickerReact.gpr-dark-theme .gpr-search-container .gpr-icn-search{background-position-y:-20px}.GifPickerReact .gpr-search-container input.gpr-search::-moz-placeholder{color:var(--gpr-search-input-placeholder-color)}.GifPickerReact .gpr-search-container input.gpr-search::placeholder{color:var(--gpr-search-input-placeholder-color)}.GifPickerReact .gpr-search-container input.gpr-search:focus{background-color:var(--gpr-search-input-bg-color-active);border:1px solid var(--gpr-search-border-color-active)}`}
          </style>

          <style type="text/css">
            {`.GifPickerReact .gpr-title-container{display:block;flex:1;min-width:0;position:relative}.GifPickerReact .gpr-title-container .gpr-title{align-items:center;background-color:var(--gpr-search-input-bg-color);border-radius:var(--gpr-search-input-border-radius);color:var(--gpr-search-input-text-color);display:flex;height:var(--gpr-search-input-height);padding:var(--gpr-horizontal-padding);width:100%}`}
          </style>
          <style type="text/css">
            {`.GifPickerReact{--gpr-highlight-color:#007aeb;--gpr-hover-bg-color:#f1f8ff;--gpr-focus-bg-color:#e0f0ff;--gpr-text-color:#858585;--gpr-search-input-bg-color:#f6f6f6;--gpr-picker-border-color:#e7e7e7;--gpr-bg-color:#fff;--gpr-horizontal-padding:10px;--gpr-picker-border-radius:8px;--gpr-header-padding:15px var(--gpr-horizontal-padding);--gpr-search-input-bg-color-active:var(--gpr-search-input-bg-color);--gpr-search-input-padding:0 32px;--gpr-search-input-border-radius:8px;--gpr-search-input-height:40px;--gpr-search-input-text-color:var(--gpr-text-color);--gpr-search-input-placeholder-color:var(--gpr-text-color);--gpr-search-bar-inner-padding:var(--gpr-horizontal-padding);--gpr-search-border-color-active:var(--gpr-highlight-color);--gpr-body-padding:var(--gpr-header-padding) 0px;--gpr-category-list-padding:var(--gpr-horizontal-padding);--gpr-category-border-radius:4px;--gpr-category-background-opacity:40%;--gpr-category-font-color:var(--gpr-picker-border-color);--gpr-category-font-size:16px;--gpr-category-font-weight:600;--gpr-category-shadow-opacity:60%;--gpr-category-shadow-opacity-hover:65%;--gpr-category-border-color-hover:var(--gpr-highlight-color);--gpr-placeholder-color:#d3d3d3;color-scheme:light}.GifPickerReact.gpr-dark-theme{--gpr-dark:#000;--gpr-hover-bg-color:#363636f6;--gpr-focus-bg-color:#474747;--gpr-text-color:silver;--gpr-search-input-bg-color:#3b3b3b;--gpr-picker-border-color:#2b2b2b;--gpr-bg-color:#222;--gpr-category-font-color:#e7e7e7;--gpr-search-input-bg-color-active:var(--gpr-dark);--gpr-placeholder-color:var(--gpr-search-input-bg-color);color-scheme:dark}.GifPickerReact *{box-sizing:border-box}.GifPickerReact.gpr-main{background-color:var(--gpr-bg-color);border-color:var(--gpr-picker-border-color);border-radius:var(--gpr-picker-border-radius);border-style:solid;border-width:1px;color:var(--gpr-text-color);display:flex;flex-direction:column;position:relative}.GifPickerReact button.gpr-btn{background:none;border:0;cursor:pointer;outline:none;padding:0}`}
          </style>
        </>
      }
      style={{
        zIndex: 2147483001,
        position: "fixed",
        bottom: "20px",
        right: "20px",
        width: "376px",
        boxShadow: "rgba(0, 0, 0, 0.16) 0px 5px 40px",
        opacity: 1,
        height: "calc(100% - 120px)",
        borderRadius: "8px",
        marginBottom: "90px",
        animationName: "widgetAnimation",
        animationDuration: "300ms",
        border: "none",
        outline: "none",
        cursor: "pointer",
        background: "rgb(255, 255, 255)",
      }}
    >
      <style>{css}</style>
      <div className="chat-widget">{init()}</div>
    </Frame>
  );
};

const Home = ({
  setCurrentTab,
  currentTab,
}: {
  currentTab: string;
  setCurrentTab: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <>
      <Header setCurrentTab={setCurrentTab} currentTab={currentTab} />
      <div className="chat-body z-20 slide-left-animation">
        <div className="conversation-section-body">
          <ContinueConversations setCurrentTab={setCurrentTab} />
          <StartConversation setCurrentTab={setCurrentTab} />
        </div>
      </div>
      <div className="chat-footer z-30">
        <div className="py-3">
          <a href="#">
            <img
              src="https://app.kudoshub.com:3000/js/../media/kudosHub-logo.svg"
              alt="kudoshubLogo"
            />
            <p>We run on Aman</p>
          </a>
        </div>
      </div>
    </>
  );
};

export default ChatLauncherBody;
