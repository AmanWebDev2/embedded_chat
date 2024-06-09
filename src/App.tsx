import { useEffect, useState } from 'react';
import './App.css'
import ChatLauncher from './components/ChatLauncher'
import ChatLauncherBody from './components/ChatLauncherBody'
import io from 'socket.io-client';
import { useChatStore } from './store';
import { TAB } from './constants';
import { getIframeNode } from './utils';

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
  const { currentTab,setCurrentConversation,currentConversation,setPreviousConversations,previousConversations } = useChatStore();

  useEffect(() => {
    const chatEmbed = (window as any).chatEmbed;
    console.log(chatEmbed) // working

    const socket = io('http://localhost:3030');

    // socket.on('connect', () => {
    //   console.log('Connected to server',socket.id);
    // })

    socket.on('welcome', (msg) => {
      console.log('Welcome from server',msg);
    });

    socket.on('message', (msg) => {
      console.log('Message from server',msg);
    })
    
    return () => {
      socket.disconnect(); // Disconnect when the component unmounts
  };
  }, []);



  useEffect(()=>{
    const socket = io('http://localhost:3030');
    if(currentTab === TAB.NEW_CONVERSATION) {
      socket.on('connect', () => {
        console.log('Connected to server',socket.id);
        setCurrentConversation({
          id:`${socket.id}`,
          messages: []
        })
      });
    }
    return () => {
      if(currentTab === TAB.NEW_CONVERSATION){
        socket.disconnect(); // Disconnect when the component unmounts
      }
    }
  },[currentTab]);

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

    // add and update current conversation to previous conversation
    if(currentConversation) {
      const prevConversations = previousConversations.filter(conversation => conversation.id !== currentConversation.id);
      setPreviousConversations([...prevConversations,currentConversation]);
    }
    

    return () => clearTimeout(id);
  }, [currentConversation,previousConversations,setPreviousConversations]);

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
