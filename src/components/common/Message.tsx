import { Message } from "../../store";

{
  /* only flex-row-reverse dynamically call
        if i am sending a message then --> flex-row-reverse
        if i am receiving a message then --> flex-row
      */
}
const MessageComponent = ({
    messageData,
}:{
    messageData: Message;
}) => {
  return (
    <div className={`bubble-right-section flex ${messageData.author.type === 'bot' ? 'flex-row':'flex-row-reverse'} gap-x-2`}>
      <div className="message-sender-icon">
        <div className="chat-bot-icon"></div>
      </div>
      <div className="chat-bubble-right">
        {/* <p className="text-sm text-balance break-all ">
          Hellossssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss
        </p> */}

        {messageData.type === "text" ? (
          <p className="text-sm text-balance break-all">{messageData.content}</p>
        ) : (
          <img src={messageData.content} alt="gif" />  
        )}
      </div>
    </div>
  );
};

export default MessageComponent;
