import { Conversation } from "../../store";

{
  /* only flex-row-reverse dynamically call
        if i am sending a message then --> flex-row-reverse
        if i am receiving a message then --> flex-row
      */
}
const Message = ({
    messageData,
}:{
    messageData: Conversation;
}) => {
  return (
    <div className="bubble-right-section flex flex-row-reverse items-center gap-x-2">
      <div className="message-sender-icon">
        <div className="chat-bot-icon"></div>
      </div>
      <div className="chat-bubble-right">
        {/* <p className="text-sm text-balance break-all ">
          Hellossssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss
        </p> */}

        {messageData.messages[0].type === "text" ? (
          <p className="text-sm text-balance break-all">{messageData.messages[0].content}</p>
        ) : (
          <img src={messageData.messages[0].content} alt="gif" />  
        )}
      </div>
    </div>
  );
};

export default Message;
