import Clock from "../../assets/svg/Clock";
import CloseAngularBracket from "../../assets/svg/CloseAngularBracket";
import { TAB } from "../../constants";
import { useChatStore } from "../../store";

const Header = () => {
  const { currentTab, setCurrentTab } = useChatStore();

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
   {  currentTab === TAB.OPEN_CONVERSATION ? <MiniHeader /> : <nav className="chat-header">
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
            <div className="wrap px-4">
              <h1 className={`${currentTab===TAB.NEW_CONVERSATION ? 'text-2xl' : 'text-3xl'}
              } font-semibold`}>{headerText()}</h1>
              <p className={`${currentTab===TAB.NEW_CONVERSATION ? 'py-1' : 'py-3'} text-lg`}>We are here to help!</p>
            </div>
          </div>
        </div>
      </div>
    </nav> }
    </>
  );
};

const MiniHeader = () => {
  const { currentTab, setCurrentTab } = useChatStore();
  return (
    <nav className="min-header">
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
        
        <div className="flex items-center gap-x-3 flex-1 py-1 cursor-pointer rounded transition-all ease-in-out duration-300 pl-3 text-white hover:bg-black hover:bg-opacity-10">
              <div className="team-group">
                <div className="rounded-full border-2 border-white">A</div>
              </div>
              <div className="reply-time space-y-1 text-sm pl-4">
                <p>Google</p>
                <span className="flex items-center space-x-2">
                  <Clock css={{
                    filter: "brightness(41.5)"
                  }} />
                  <span>Under few minutes</span>
                </span>
              </div>
            </div>   
       
        :
        <h2 className="text-xl text-center flex-1 text-white">
        Open Conversation
      </h2>}
    </nav>
  );
};

export default Header;
