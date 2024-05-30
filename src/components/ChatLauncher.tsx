import { useRef } from "react";
import Frame from "react-frame-component";
import Close from "../assets/svg/Close";
import Open from "../assets/svg/Open";

const css: string = `  
.chat-icon {
    position: fixed;
    inset: 0;
    cursor: pointer;
}
  .chat-icon-area .chatscreen-close,
  .chat-icon-area .chatscreen-open {
    position: absolute;
    transition: transform 0.16s linear 0s, opacity 0.08s linear 0s;
    inset: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
}
  .chatscreen-close {
    opacity: 0;
    transform: rotate(-60deg)        
  }
  .chatscreen-open {
    opacity: 1;
    transform: rotate(0deg) scale(1)
  }
`;

const ChatLauncher = ({ open, setOpen}: {open:boolean,setOpen: React.Dispatch<React.SetStateAction<boolean>>}) => {
  const iframeRef = useRef<null | HTMLIFrameElement>(null);

  const handleOpenCloseChatWidget = () => {
    if(!iframeRef?.current) return;
    setOpen(()=>!open);
    
  };

  return (
    <Frame
      ref={iframeRef}
      srcDoc='<!DOCTYPE html><html><head></head><body><div class="frame-root"></div></body></html>'
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        width: "64px",
        height: "64px",
        borderTopLeftRadius: "50%",
        borderTopRightRadius: "50%",
        borderBottomLeftRadius: "initial",
        borderBottomRightRadius: "50%",
        background: "rgb(235, 73, 149)",
        border: "4px solid rgb(255, 255, 255)",
        cursor: "pointer",
        transition: "opacity 0.3s ease 0s",
        overflow: "hidden",
        boxSizing: "content-box",
        boxShadow:
          "rgba(0, 0, 0, 0.13) 0px 1px 68px 0px, rgba(0, 0, 0, 0.12) 0px 2px 67px 0px",
        animation: "iconIframeAnimation",
        animationDuration: "300ms",
        zIndex: 2147483001,
      }}
      onClick={handleOpenCloseChatWidget}
    >
      <div className="chat-icon">
        <style>{css}</style>
        <div className="chat-icon-area">
          <div className="chatscreen-close"
          style={{
            opacity:`${open ? '1': '0'}`,
            transform: `${open ? 'rotate(0deg)': 'rotate(-60deg)'}`
          }}
          >
            <Close/>
          </div>
          <div className="chatscreen-open" style={{
            opacity:`${open ? '0': '1'}`,
            transform: `${open ? 'scale(0) ': 'scale(1)'}`
          }}>
            <Open/>
          </div>
        </div>
      </div>
    </Frame>
  );
};

export default ChatLauncher;
