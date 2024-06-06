import { TAB } from "../../constants";
import ConversationBody from "../common/ConversationBody";
import ConversationFooter from "../common/ConversationFooter";
import Header from "../common/Header";

const OpenConversation = ({
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
    <Header isMiniHeader={true} backToTab={TAB.HOME}/>
    <ConversationBody/>
    <ConversationFooter toggleEmoji={toggleEmoji} setToggleEmoji={setToggleEmoji} toggleGif={toggleGif} setToggleGif={setToggleGif} />
    </>
  )
}

export default OpenConversation