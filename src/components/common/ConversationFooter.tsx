import FileUpload from "../../assets/svg/FileUpload";
import GIF from "../../assets/svg/GIF";
import Smiley from "../../assets/svg/Smiley";

const ConversationFooter = ({
    toggleEmoji,
    setToggleEmoji,
    toggleGif,
    setToggleGif
  }: {
    toggleEmoji: boolean;
    setToggleEmoji: React.Dispatch<React.SetStateAction<boolean>>;
    toggleGif: boolean;
    setToggleGif: React.Dispatch<React.SetStateAction<boolean>>;
  }) => {
  return (
    <div className="new-conversation-footer flex">
    <div className="input w-full">
      {/* <input autoFocus className="outline-none focus:ring-0" type="text" name="msg" id="msg" placeholder="Write your message..." /> */}
      <textarea autoFocus className="outline-none focus:ring-0 resize-none w-full h-full" placeholder="Write your message"></textarea>
    </div>
    <div className="msg-icons self-start pt-4 flex items-center gap-x-3">
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
  )
}

export default ConversationFooter