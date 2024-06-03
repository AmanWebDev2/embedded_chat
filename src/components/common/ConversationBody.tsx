import EmojiPicker from "emoji-picker-react";
import GifPicker, { Theme } from "gif-picker-react";

const ConversationBody = ({
  toggleEmoji,
  toggleGif,
}: {
  toggleEmoji: boolean;
  toggleGif: boolean;
}) => {
  return (
    <div className="chat-body flex-1 items-center p-4">
      
      {/* only flex-row-reverse dynamically call
        if i am sending a message then --> flex-row-reverse
        if i am receiving a message then --> flex-row
      */}
        <div className="bubble-right-section flex flex-row-reverse items-center gap-x-2">
          <div className="message-sender-icon">
            <div className="chat-bot-icon"></div>
          </div>
          <div className="chat-bubble-right">
            <p className="text-sm text-balance break-all ">Hellossssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss</p>
          </div>
        </div>

        { toggleGif &&  <div className="popover-wrapper">
          <div className="popover" role="tooltip">
            <GifPicker height="-webkit-fill-available" width="unset" theme={Theme.DARK} tenorApiKey={"AIzaSyBAQM7rDpRahglJ3iDdMoUcCxCvNB8sWuA"} />
          </div>
        </div>}
        {
          toggleEmoji && <div className="popover-wrapper">
          <div className="popover" role="tooltip">
            <EmojiPicker theme={Theme.DARK} lazyLoadEmojis={true} width="unset" height="-webkit-fill-available" />
          </div>
        </div>
        }
    </div>
  )
}

export default ConversationBody