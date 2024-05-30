import Frame from "react-frame-component";
import MinizeIcon from "../assets/svg/minimize_icon.svg";
import OpenIcon from "../assets/svg/open_icon.svg";

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

const ChatLauncher = () => {
  return (
    <Frame
    allowTransparency={true}
    frameBorder={0}
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
    >
      <div className="chat-icon">
        <style>{css}</style>
        <div className="chat-icon-area">
          <div className="chatscreen-close">
            <img src={MinizeIcon} alt="minimize icon" />
          </div>
          <div className="chatscreen-open">
            <img src={OpenIcon} alt="minimize icon" />
          </div>
        </div>
      </div>
    </Frame>
  );
};

export default ChatLauncher;
