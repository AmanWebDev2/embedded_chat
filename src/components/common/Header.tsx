import Clock from "../../assets/svg/Clock";
import CloseAngularBracket from "../../assets/svg/CloseAngularBracket";
import { TAB } from "../../constants";

const Header = ({
  currentTab,
  setCurrentTab,
}: {
  currentTab: string;
  setCurrentTab: React.Dispatch<React.SetStateAction<string>>;
}) => {
  console.log(currentTab)
  const headerText = () => {
    switch (currentTab) {
      case TAB.ALL_CONVERSATION:
        return "Previous Conversations";
      case TAB.NEW_CONVERSATION:
        return "Start a conversation";
      case TAB.OPEN_CONVERSATION:
        return "Previous Conversations";
      default:
        return "Hey there welcome";
    }
  };
  return (
    <>
   {  currentTab === TAB.OPEN_CONVERSATION ? <MiniHeader currentTab={currentTab} setCurrentTab={setCurrentTab} /> : <div className="chat-header">
      <div className="chat-widget-header-shape-secondary"></div>
      <div className="chat-widget-header-section">
        <div className="header-section-text slide-left-animation">
          <div className="h-4"></div>
          <div className="text-section flex items-center">
            <div
              style={{
                display: currentTab === TAB.HOME ? "none" : "flex",
              }}
              className={`back-to-home-btn`}
              onClick={() => {
                setCurrentTab(TAB.HOME);
              }}
            >
              <CloseAngularBracket />
            </div>
            <div className="wrap">
              <h1 className="text-3xl font-semibold">{headerText()}</h1>
              <p className="py-3 text-lg">We are here to help!</p>
            </div>
          </div>
        </div>
      </div>
    </div> }
    </>
  );
};

const MiniHeader = ({
  currentTab,
  setCurrentTab,
}: {
  currentTab: string;
  setCurrentTab: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <div className="min-header">
      <div
        className="back-to-home-btn"
        onClick={() => {
          setCurrentTab(TAB.HOME);
        }}
      >
        <CloseAngularBracket />
      </div>
      {
        currentTab === TAB.OPEN_CONVERSATION ? 
        <div className="flex items-center gap-x-3 flex-1">
              <div className="team-group">
                <div className="rounded-full bg-[rgb(235, 73, 149)] border-2 border-white">A</div>
              </div>
              <div className="reply-time cursor-pointer hover:bg-gray-100 mx-auto">
                <p>Reply text time</p>
                <span className="flex items-center space-x-2">
                  <Clock css={{
                    filter: "brightness(41.5)"
                  }} />
                  <span>A few minutes</span>
                </span>
              </div>
            </div>
        :
        <h2 className="text-xl text-center flex-1 text-white">
        Open Conversation
      </h2>}
    </div>
  );
};

export default Header;
