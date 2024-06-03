import Header from "../common/Header";
import ConversationBody from "../common/ConversationBody";
import ConversationFooter from "../common/ConversationFooter";

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
        <ConversationBody toggleEmoji={toggleEmoji} toggleGif={toggleGif} />
   <ConversationFooter toggleEmoji={toggleEmoji} setToggleEmoji={setToggleEmoji} toggleGif={toggleGif} setToggleGif={setToggleGif} />
    </>
  );
};

export default NewConversation;
