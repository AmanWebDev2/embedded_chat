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
      <div className="new-conversation-footer">
        
      </div>
    </>
  );
};

export default NewConversation;
