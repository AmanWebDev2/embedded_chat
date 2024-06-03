import GifPicker, { Theme } from "gif-picker-react";
import FileUpload from "../../assets/svg/FileUpload";
import GIF from "../../assets/svg/GIF";
import Smiley from "../../assets/svg/Smiley";
import Header from "../common/Header";
import ConversationBody from "../common/ConversationBody";
import EmojiPicker from "emoji-picker-react";

const NewConversation = ({
  currentTab,
  setCurrentTab,
  toggleEmoji,
  setToggleEmoji,
  toggleGif,
  setToggleGif
}: {
  currentTab: string;
  setCurrentTab: React.Dispatch<React.SetStateAction<string>>;
  toggleEmoji: boolean;
  setToggleEmoji: React.Dispatch<React.SetStateAction<boolean>>;
  toggleGif: boolean;
  setToggleGif: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <>
      <Header setCurrentTab={setCurrentTab} currentTab={currentTab} />
      <div className="new-conversation-body">
        <ConversationBody/>
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
      <div className="new-conversation-footer flex">
        <div className="input">
          <input autoFocus className="outline-none focus:ring-0" type="text" name="msg" id="msg" placeholder="Write your message..." />
        </div>
        <div className="msg-icons flex items-center gap-x-3">
          <button className="emoji-picker" onClick={()=>{
            setToggleEmoji(!toggleEmoji)
            setToggleGif(false)
          }}>
              <Smiley/>
          </button>
          <button className="gif" onClick={()=>{
            setToggleGif(!toggleGif)
            setToggleEmoji(false)
          }} >
            <GIF/>
          </button>
          <button className="file-upload">
            <input className="hidden" type="file" name="file-upload" id="file-upload" />
            <FileUpload/>
          </button>
        </div>
      </div>
    </>
  );
};

export default NewConversation;
