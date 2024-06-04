// import { useEffect } from "react";
import { useChatStore } from "../../store";
import Message from "./Message"

const ConversationBody = () => {
  const { currentConversation } = useChatStore();

  // useEffect(() => {
  //   // scroll to bottom

  // }, [currentConversation])

  return (
    <div className="chat-body p-4 space-y-4 overflow-y-auto flex-1">
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