import Header from "../common/Header";
import ConversationBody from "../common/ConversationBody";
import ConversationFooter from "../common/ConversationFooter";
import { TAB } from "../../constants";

const NewConversation = ({
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
    <>
      <Header isMiniHeader={false} backToTab={TAB.HOME}/>
        <ConversationBody/>
        <ConversationFooter toggleEmoji={toggleEmoji} setToggleEmoji={setToggleEmoji} toggleGif={toggleGif} setToggleGif={setToggleGif} />
    </>
  );
};

export default NewConversation;
