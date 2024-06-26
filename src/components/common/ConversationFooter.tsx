import React, { useContext, useEffect } from "react";
import FileUpload from "../../assets/svg/FileUpload";
import GIF from "../../assets/svg/GIF";
import SendMessage from "../../assets/svg/SendMessage";
import Smiley from "../../assets/svg/Smiley";
import { createPortal } from "react-dom";
import GifPicker, { TenorImage } from "gif-picker-react";
import EmojiPicker, { EmojiClickData, Theme } from "emoji-picker-react";
import { Conversation, useChatStore } from "../../store";
import { getIframeNode } from "../../utils";
import { SocketContext } from "../../context/socketContext";

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
  const {
    setCurrentConversation,
    currentConversation,
    previousConversations,
    setPreviousConversations,
  } = useChatStore();
  const socket = useContext(SocketContext);

  useEffect(() => {
    // add and update current conversation to previous conversation
    if (currentConversation) {
      const prevConversations = previousConversations.filter(
        (conversation) => conversation.id !== currentConversation.id
      );
      setPreviousConversations([...prevConversations, currentConversation]);
    }
  }, [currentConversation]);

  const handleSendMessage = () => {
    if (!textareaRef.current) return;
    const msg = textareaRef.current.value;
    if (msg.trim().length === 0) {
      textareaRef.current.value = "";
      return;
    }

    const conversationObj:Conversation = {
      messages: [
        {
          author: {
            firstName: "User",
            type: "widget-user",
          },
          content: msg,
          type: "text",
        },
      ],
    };

    // if(!currentConversation?.id) {
    //   conversationObj.id = uuidv4();
    // }

    setCurrentConversation(conversationObj);

    if (socket) {
      socket.emit("message", conversationObj.messages[0],currentConversation?.id);
    }

    textareaRef.current.value = "";
  };

  const handleEmoji = (e: EmojiClickData) => {
    setCurrentConversation({
      messages: [
        {
          author: {
            firstName: "User",
            type: "widget-user",
          },
          content: e.emoji,
          type: "text",
        },
      ],
    });
    setToggleEmoji(false);
  };

  const handleGif = (e: TenorImage) => {
    setCurrentConversation({
      messages: [
        {
          author: {
            firstName: "User",
            type: "widget-user",
          },
          content: e.url,
          type: "image",
        },
      ],
    });
    setToggleGif(false);
  };

  return (
    <div className="new-conversation-footer flex">
      <div className="input w-full">
        <textarea
          ref={textareaRef}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSendMessage();
            }
          }}
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
                <EmojiPicker
                  onEmojiClick={handleEmoji}
                  theme={Theme.DARK}
                  lazyLoadEmojis={true}
                  width="unset"
                  height="-webkit-fill-available"
                />
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
