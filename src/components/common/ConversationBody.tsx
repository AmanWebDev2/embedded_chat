import { useChatStore } from "../../store";
import MessageComponent from "./Message"

const ConversationBody = () => {
  const { currentConversation } = useChatStore();

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