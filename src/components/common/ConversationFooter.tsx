import React from "react";
import FileUpload from "../../assets/svg/FileUpload";
import GIF from "../../assets/svg/GIF";
import SendMessage from "../../assets/svg/SendMessage";
import Smiley from "../../assets/svg/Smiley";
import { createPortal } from "react-dom";
import GifPicker, { TenorImage } from "gif-picker-react";
import EmojiPicker, { EmojiClickData, Theme } from "emoji-picker-react";
import { useChatStore } from "../../store";

const ConversationFooter = ({
  toggleEmoji,
  setToggleEmoji,
  toggleGif,
  setToggleGif,
}: {
  toggleEmoji: boolean;
  setToggleEmoji: React.Dispatch<React.SetStateAction<boolean>>;
  toggleGif: boolean;
  setToggleGif: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  const { setCurrentConversation } = useChatStore();

  const getIframeNode = (id: string): null | HTMLDivElement => {
    const chatWidgetIframe = document.getElementById(
      "chat-widget-iframe"
    ) as HTMLIFrameElement;
    const doc = chatWidgetIframe.contentWindow?.document;
    if (!doc) return null;
    const div = doc.getElementById(id);
    return div as HTMLDivElement;
  };

  const handleMessage = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    console.log(e.target.value);
  };

  const handleSendMessage = () => {
    if (!textareaRef.current) return;
    const msg = {
      type: "text",
      text: textareaRef.current.value,
    };
    console.log("Message sent", msg);
  };

  const handleEmoji = (e:EmojiClickData) => {
    console.log('Emoji clicked');
    console.log(e.getImageUrl());
  }

  const handleGif = (e:TenorImage) => {
    console.log('Gif clicked');
    console.log(e.url);

    setCurrentConversation({
      author:{
        type: "widget-user",
        firstName: "User"
      },
      messages:[{
        content: e.url,
        type: "image"
      }],
      id: "123"
    })
   
  }

  return (
    <div className="new-conversation-footer flex">
      <div className="input w-full">
        <textarea
          ref={textareaRef}
          onChange={handleMessage}
          autoFocus
          className="outline-none focus:ring-0 resize-none w-full h-full"
          placeholder="Write your message"
        ></textarea>
      </div>
      {getIframeNode("popover-portal") &&
        createPortal(
          <>
            {toggleGif && (
              <div className="popover" role="tooltip">
                <GifPicker
                  onGifClick={handleGif}
                  height="-webkit-fill-available"
                  width="unset"
                  theme={Theme.DARK}
                  tenorApiKey={"AIzaSyBAQM7rDpRahglJ3iDdMoUcCxCvNB8sWuA"}
                />
              </div>
            )}
          </>,
          getIframeNode("popover-portal") as Element
        )}

      {getIframeNode("popover-portal") &&
        createPortal(
          <>
            {toggleEmoji && (
                 <div className="popover" role="tooltip">
                 <EmojiPicker onEmojiClick={handleEmoji} theme={Theme.DARK} lazyLoadEmojis={true} width="unset" height="-webkit-fill-available" />
               </div>
            )}
          </>,
          getIframeNode("popover-portal") as Element
        )}
      <div className="msg-icons self-start pt-4 flex items-center gap-x-3">
        <button
          className="emoji-picker"
          onClick={() => {
            setToggleEmoji(!toggleEmoji);
            setToggleGif(false);
          }}
        >
          <Smiley />
        </button>
        <button
          className="gif"
          onClick={() => {
            setToggleGif(!toggleGif);
            setToggleEmoji(false);
          }}
        >
          <GIF />
        </button>
        <button className="file-upload">
          <input
            className="hidden"
            type="file"
            name="file-upload"
            id="file-upload"
          />
          <FileUpload />
        </button>

        <button className="send" onClick={handleSendMessage}>
          <SendMessage />
        </button>
      </div>
    </div>
  );
};

export default ConversationFooter;
