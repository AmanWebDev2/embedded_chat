import CloseAngularBracket from "../../assets/svg/CloseAngularBracket"
import SendMessage from "../../assets/svg/SendMessage"
import { TAB } from "../../constants"
import { PreviousConversationCard } from "../cards/ContinueConversations"


const AllConversations = ({ setCurrentTab }:{setCurrentTab:React.Dispatch<React.SetStateAction<string>>}) => {
  return (
    <>
        <div className="min-header">
            <div className="back-to-home-btn" onClick={()=>{
                setCurrentTab(TAB.HOME)
            }}>
                <CloseAngularBracket/>
            </div>
            <h2 className="text-xl text-center flex-1 text-white">Previous Conversations</h2>
        </div>
        <div className="all-conversations-body">
            <PreviousConversationCard/>
            <PreviousConversationCard/>
            <PreviousConversationCard/>
            <PreviousConversationCard/>
            <PreviousConversationCard/>
            <PreviousConversationCard/>
            <PreviousConversationCard/>
        </div>
        <div className="all-conversations-footer">
        <button onClick={()=>setCurrentTab(TAB.NEW_CONVERSATION)} className="btn flex items-center gap-x-3">
            <SendMessage /> New Conversation
        </button>
        </div>
    </>
  )
}

export default AllConversations