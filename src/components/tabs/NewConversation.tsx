import FileUpload from "../../assets/svg/FileUpload";
import GIF from "../../assets/svg/GIF";
import Smiley from "../../assets/svg/Smiley";
import Header from "../common/Header";

const NewConversation = ({
  currentTab,
  setCurrentTab,
}: {
  currentTab: string;
  setCurrentTab: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <>
      <Header setCurrentTab={setCurrentTab} currentTab={currentTab} />
      <div className="new-conversation-body">

      </div>
      <div className="new-conversation-footer flex">
        <div className="input">
          <input autoFocus className="outline-none focus:ring-0" type="text" name="msg" id="msg" placeholder="Write your message..." />
        </div>
        <div className="msg-icons flex items-center gap-x-3">
          <button className="emoji-picker">
            <Smiley/>
          </button>
          <button className="gif" >
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
