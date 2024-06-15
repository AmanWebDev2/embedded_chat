import { useContext, useEffect, useState } from 'react';
import './App.css'
import ChatLauncher from './components/ChatLauncher'
import ChatLauncherBody from './components/ChatLauncherBody'
import { Conversation, useChatStore } from './store';
import { getIframeNode } from './utils';
import { SocketContext } from './context/socketContext';
import { TAB } from './constants';
import { v4 as uuidv4 } from 'uuid';

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

  .iframe-hide {
    display: none !important;
  }
  .iframe-show {
    display: block !important;
  }

  @keyframes widgetAnimation {
    0% {
        opacity: 0;
        -webkit-transform: scaleX(0.7);
        -moz-transform: scaleX(0.7);
        -o-transform: scaleX(0.7);
        -ms-transform: scaleX(0.7);
        transform: scaleX(0.7);
    }
    100% {
        opacity: 1;
        -webkit-transform: scaleX(1);
        -moz-transform: scaleX(1);
        -o-transform: scaleX(1);
        -ms-transform: scaleX(1);
        transform: scaleX(1);
    }
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

`



function App() {
  
  const [open,setOpen] = useState<boolean>(false);
  const [socketId,setSocketId] = useState<string>("");
  const { currentTab,currentConversation,setCurrentConversation,setPreviousConversations,previousConversations } = useChatStore();
  
  const socket = useContext(SocketContext);
  
  useEffect(() => {
    const chatEmbed = (window as any).chatEmbed;
    console.log(chatEmbed) // working
  }, []);


  // receive message from server
  useEffect(() => {
    // This effect only executes on the initial render so that we aren't setting
    // up the socket repeatedly. This means it can't reliably refer to "participants"
    // because once "setParticipants" is called this would be looking at a stale
    // "participants" reference (it would forever see the initial value of the
    // "participants" state since it isn't in the dependency array).
    // "participantsRef", on the other hand, will be stable across re-renders and 
    // "participantsRef.current" successfully provides the up-to-date value of 
    // "participants" (due to the other effect updating the ref).
  if(!socket) return;

  socket.on('connect', () => {
    console.log('Connected to server',socket.id);
    setSocketId(`${socket.id}`);
  });

  const handler = (message) => {
    messageHandler(message);
  };
  
    socket.on('receive-message', handler);
    return () => {
      socket.off('receive-message', handler);
      socket.disconnect();
    }
  }, []);


  // add uuid to current conversation
  useEffect(()=>{
    if(currentTab === TAB.NEW_CONVERSATION){
      setCurrentConversation({
        id:`${uuidv4()}`,
        messages: []
      })
    }
  },[currentTab,setCurrentConversation]);

  useEffect(() => {
    // scroll to bottom
    const id  = setTimeout(()=>{
      const chatBody = getIframeNode("chat-body");
      if(chatBody) {
        chatBody.scrollTo({
          top: chatBody.scrollHeight,
          behavior: "smooth"
        })
      }
    },500);

    return () => {
      clearTimeout(id);
    }
  }, [currentConversation]);


  const messageHandler = (message) => {

    console.log('Message received: ', message,message.event);

    setCurrentConversation({
      ...currentConversation,
       messages:[...currentConversation?.messages || [], message]
    })

  
    const sendMessage = (msg:Conversation) => {
      console.log('sendMessage', msg);
    }
  
    const receiveMessage = (msg:Conversation) => {
      console.log('receiveMessage', msg);
    }
  
    switch (message.event) {
      case 'sendMessage':
        sendMessage(message.userid, message.username);
        break;
      case 'receiveMessage':
        receiveMessage(message.userid, message.username, message.message);
        break;
      default:
        break;
    }
  };
  

  return (
    <>
    <style type="text/css">
        {css}
        </style>
      <ChatLauncher open={open} setOpen={setOpen} />
      <ChatLauncherBody open={open}  /> 
    </>
  )
}

export default App
