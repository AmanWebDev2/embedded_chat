import CloseAngularBracket from "../../assets/svg/CloseAngularBracket";
import { TAB } from "../../constants";

const Header = ({ currentTab,setCurrentTab }: { currentTab: string; setCurrentTab:React.Dispatch<React.SetStateAction<string>> }) => {
    const headerText = () => {
        switch (currentTab) {
            case TAB.ALL_CONVERSATION:
            return "Previous Conversations";
            case TAB.NEW_CONVERSATION:
            return "Start a conversation";
            case TAB.PREV_CONVERSATION:
            return "Previous Conversations";
            default:
            return "Hey there welcome";
        }
    }
  return (
    <div className="chat-header">
      <div className="chat-widget-header-shape-secondary"></div>
      <div className="chat-widget-header-section">
        <div className="slide-left-animation">
          <div className="header-section-text">
            <div className="h-4"></div>
            <div className="text-section flex items-center">
            <div
            style={{
                display: currentTab === TAB.HOME ? "none" : "flex",
            }} 
            className={`back-to-home-btn`} onClick={()=>{
                setCurrentTab(TAB.HOME)
            }}>
                <CloseAngularBracket/>
            </div>
            <div className="wrap">
              <h1 className="text-3xl font-semibold">{headerText()}</h1>
              <p className="py-3 text-lg">We are here to help!</p>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
