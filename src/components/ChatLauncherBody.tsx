import Frame from "react-frame-component";
import StartConversation from "./cards/StartConversation";
import { useEffect, useRef, useState } from "react";
import ContinueConversations from "./cards/ContinueConversations";
import { TAB } from "../constants";
import AllConversations from "./tabs/AllConversations";
import Header from "./common/Header";
import NewConversation from "./tabs/NewConversation";
import OpenConversation from "./tabs/OpenConversation";
import { useChatStore } from "../store";
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
    // height: 75px;
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
  display: flex;
  -webkit-box-pack: center;
  align-items: center;
  justify-content: space-evenly;
  border-top: 1px solid rgb(230, 230, 230);
  z-index: 1000;
  transition: opacity 0.3s ease 0s;
  animation-name: textAreaAnimation;
  animation-duration: 600ms;
  max-height:200px;
  padding: 0 1rem;
}

.new-conversation-footer textarea {
  box-sizing: border-box;
  padding: 18px 29px 0px 15px;
  width: 100%;
  height: 100%;
  font-family: system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 14px;
  font-weight: normal;
  line-height: 1.33;
  background-color: rgb(255, 255, 255);
  white-space: pre-wrap;
  overflow-wrap: break-word;
  max-height: 200px;
  overflow: hidden;
}

.popover {
    height: 385px;
    position: fixed;
    top: unset;
    bottom: 64px;
    left: 25px;
    right: 25px;
    z-index:22;
}
.chat-bubble-right{
    height: auto;
    padding: 9px 17px;
    min-width: 40px;
    border-radius: 18px;
    background-color: rgb(235, 73, 149);
    color: white;
    max-width: 75%;
}

.chat-bot-icon{
  background-image: url('https://app.kudoshub.com:4444/i/o/icons/user.png');
  background-size: cover;
  background-position: center center;
  border: 2px solid rgb(132, 61, 240);
  color: rgb(255, 255, 255);

  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.chat-body {
  outline-offset: -5px;
    scrollbar-color: gray lightgray;
    scrollbar-width: thin;
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
  // const [currentTab, setCurrentTab] = useState(TAB.NEW_CONVERSATION);
  const [toggleEmoji, setToggleEmoji] = useState(false);
  const [toggleGif, setToggleGif] = useState(false);

  const { currentTab, } = useChatStore();

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
        return <AllConversations />;
      case TAB.NEW_CONVERSATION:
        return (
          <NewConversation
            toggleEmoji={toggleEmoji}
            setToggleEmoji={setToggleEmoji}
            toggleGif={toggleGif}
            setToggleGif={setToggleGif}
          />
        );
      case TAB.OPEN_CONVERSATION:
        return <OpenConversation 
        setToggleGif={setToggleGif}
        toggleGif={toggleGif}
        setToggleEmoji={setToggleEmoji} 
        toggleEmoji={toggleEmoji} 
        />;
      default:
        return <Home />;
    }
  };

  return (
    <Frame
      ref={iframeChatBodyRef}
      className={`${open ? "iframe-open" : "iframe-hide"}`}
      allowFullScreen={true}
      id="chat-widget-iframe"
      head={
        <>
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css"
          />
          <link rel="stylesheet" href="https://chat-embedded.s3.ap-south-1.amazonaws.com/css/gif.css" />
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
        backgroundColor: "white", 
      }}
    >
      <style>{css}</style>
      <div className="chat-widget">{init()}</div>
    </Frame>
  );
};

const Home = () => {
  return (
    <>
      <Header/>
      <div className="chat-body z-20 slide-left-animation">
        <div className="conversation-section-body">
          {/* conditionally render continue conversation */}
          <ContinueConversations />
          <StartConversation />
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
