import './App.css'
import ChatLauncher from './components/ChatLauncher'

const css:string = `
.kudoshub-Iframe-hide {
  display: none !important;
}
.kudoshub-Iframe-show {
  display: block !important;
}
.unread-message-count {
  width: 20px;
  height: 20px;
  font-size: 11px;
  background-color: rgb(252, 87, 107);
  color: #fff;
  z-index: 2147483001;
  position: absolute;
  border-radius: 50%;
  top: -14px;
  right: -4px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-weight: 600;
  border: 2px solid #fff;
  transition: opacity 0.3s ease 0s;
  animation-name: countAnimation;
  animation-duration: 300ms;
  box-sizing: content-box !important;
  }
  .count-size {
    top: -16px;
    right: -9px;
    width: 28px;
    height: 28px;
    line-height: 28px;
  }
  @keyframes countAnimation {
    0% {
      opacity: 0;
      -webkit-transform: translate(-12px, 12px) scale(0);
      -moz-transform: translate(-12px, 12px) scale(0);
      -o-transform: translate(-12px, 12px) scale(0);
      -ms-transform: translate(-12px, 12px) scale(0);
      transform: translate(-12px, 12px) scale(0);
    }
    100% {
      opacity: 1;
      -webkit-transform: translate(0px, 0px) scale(1);
      -moz-transform: translate(0px, 0px) scale(1);
      -o-transform: translate(0px, 0px) scale(1);
      -ms-transform: translate(0px, 0px) scale(1);
      transform: translate(0px, 0px) scale(1);
    }
  }

  @keyframes iconIframeAnimation {
    0% {
      opacity: 0;
      -webkit-transform: scale(0.5);
      -moz-transform: scale(0.5);
      -o-transform: scale(0.5);
      -ms-transform: scale(0.5);
      transform: scale(0.5)
    }
    100% {
      opacity: 1;
      -webkit-transform: scale(1);
      -moz-transform: scale(1);
      -o-transform: scale(1);
      -ms-transform: scale(1);
      transform: scale(1)
    }
  }
`

function App() {
  return (
    <>
    <style type="text/css">
        {css}
        </style>
      <ChatLauncher/>
    </>
  )
}

export default App
