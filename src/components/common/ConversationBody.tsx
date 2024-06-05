import { useEffect } from "react";
import { useChatStore } from "../../store";
import Message from "./Message"
import { getIframeNode } from "../../utils";

const ConversationBody = () => {
  const { currentConversation } = useChatStore();

  useEffect(() => {
    // scroll to bottom
    const chatBody = getIframeNode("chat-body");
    if(chatBody) {
      chatBody.scrollTop = chatBody.scrollHeight;
    }
  }, [currentConversation])

  return (
    <div id="chat-body" className="chat-body p-4 space-y-4 overflow-y-auto flex-1">
      {
        currentConversation?.map((messageData, index) => {
          return <Message key={index} messageData={messageData} />
        })  
      }
        
        <div id="popover-portal"></div>
      
    </div>
  )
}

export default ConversationBody