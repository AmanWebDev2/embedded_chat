import { useEffect } from "react";
import { useChatStore } from "../../store";
import MessageComponent from "./Message"
import { getIframeNode } from "../../utils";

const ConversationBody = () => {
  const { currentConversation } = useChatStore();

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
    },500)
    return () => clearTimeout(id);
  }, [currentConversation]);

  return (
    <div id="chat-body" className="chat-body p-4 space-y-4 overflow-y-auto flex-1">
      {
        currentConversation?.messages.map((messageData, index) => {
          return <MessageComponent key={index} messageData={messageData} />
        })  
      }
        
        <div id="popover-portal"></div>
      
    </div>
  )
}

export default ConversationBody