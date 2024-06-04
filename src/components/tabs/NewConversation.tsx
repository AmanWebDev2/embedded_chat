import Header from "../common/Header";
import ConversationBody from "../common/ConversationBody";
import ConversationFooter from "../common/ConversationFooter";

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
      <Header/>
        <ConversationBody toggleEmoji={toggleEmoji} toggleGif={toggleGif} />
        <ConversationFooter toggleEmoji={toggleEmoji} setToggleEmoji={setToggleEmoji} toggleGif={toggleGif} setToggleGif={setToggleGif} />
    </>
  );
};

export default NewConversation;
