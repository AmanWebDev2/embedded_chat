import CloseAngularBracket from "../../assets/svg/CloseAngularBracket"
import { TAB } from "../../constants"

const ContinueConversations = ({ setCurrentTab }: {setCurrentTab: React.Dispatch<React.SetStateAction<string>>}) => {
  return (
    <div className="card continue-conversation">
         <h2 className="font-semibold text-lg px-5 py-3">Continue the conversation</h2>
         {
            [1,2,3].map(()=>{
                return <PreviousConversationCard setCurrentTab={setCurrentTab} />
            
            })
         }
         <button className="inner-card-body text-pink-600 text-sm" onClick={()=>{
            setCurrentTab(TAB.ALL_CONVERSATION)
         }}>See all your conversations</button>
    </div>
  )
}

export const PreviousConversationCard = ({
    setCurrentTab
}:{
    setCurrentTab: React.Dispatch<React.SetStateAction<string>>
}) => {
    return (
        <div onClick={()=>setCurrentTab(TAB.OPEN_CONVERSATION)} className="flex items-center inner-card-body prev-convo-card cursor-pointer">
            <div className="team-group">
                <div className="rounded-full bg-[rgb(235, 73, 149)]">A</div>
            </div>
            <p className="last-msg text-sm flex-1 pl-5">
                Operator
                <span className="message-date">
                    <span className="pr-1">•</span>
                    <span className="time">
                        3m ago
                    </span>
                </span> 
                <br/> 
                <span className="msg">
                    You:
                    <span className="last-msg-info px-1">Hii</span>
                </span>
            </p>
            <div className="tab-arrow w-5">
                <CloseAngularBracket/>
            </div>
        </div>
    )
}

export default ContinueConversations