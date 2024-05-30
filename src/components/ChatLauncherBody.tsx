import Frame from "react-frame-component";
import StartConversation from "./cards/StartConversation";
import { useEffect, useRef } from "react";
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
        z-index: 12;
        bottom: 0px;
        left: 0px;
        right: 0px;
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

    @keyframes fadeInUpBig {
        0% {
          opacity: 0;
          transform: translate3d(0px, 2000px, 0px);
        }
        100% {
            opacity: 1;
          }
      }
    

`;
const ChatLauncherBody = ({ open }: { open: boolean }) => {
    const iframeChatBodyRef = useRef<null | HTMLIFrameElement>(null);
  
  useEffect(()=>{
    // if(!iframeChatBodyRef?.current) return;
    // const iframe = iframeChatBodyRef.current;
    // if(!iframe.contentWindow || !iframe.contentWindow.document) return;

    // const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;

    // const script = document.createElement('script');
    // script.src = 'https://cdn.tailwindcss.com';
    // iframeDocument.head.appendChild(script);
  },[]);

    return (
    <Frame
    ref={iframeChatBodyRef}
    className={`${open ? 'iframe-open':'iframe-hide'}`}
      allowFullScreen={true}
      head={
        <>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css"
        />
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
      <div className="chat-widget">
        <div className="chat-header">
          <div className="chat-widget-header-shape-secondary"></div>
          <div className="chat-widget-header-section">
            <div className="slide-left-animation">
              <div className="header-section-text">
                <div className="text-section">
                  <h1 className="text-3xl font-semibold">Hey there welcome</h1>
                  <p className="py-3 text-lg">We are here to help!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="chat-body slide-left-animation">
            <StartConversation/>
        </div>
        <div className="chat-footer">
            <div className="py-3">
                <a href="#">
                    <img src="https://app.kudoshub.com:3000/js/../media/kudosHub-logo.svg" alt="kudoshubLogo" />
                    <p>We run on Aman</p>
                </a>
            </div>
        </div>
      </div>
    </Frame>
  );
};

export default ChatLauncherBody;
