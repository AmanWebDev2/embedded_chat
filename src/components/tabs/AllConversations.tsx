import CloseAngularBracket from "../../assets/svg/CloseAngularBracket"
import SendMessage from "../../assets/svg/SendMessage"
import { TAB } from "../../constants"
import { useChatStore } from "../../store"
import { PreviousConversationCard } from "../cards/ContinueConversations"


const AllConversations = () => {
    const {setCurrentTab} = useChatStore()
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
            {
                [1,2,3,1,1,1,1,1,1].map(()=>{
                    return (
                    <PreviousConversationCard  />
                    )
                })
            }
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