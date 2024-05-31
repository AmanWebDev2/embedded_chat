import Clock from "../../assets/svg/Clock"
import Clock2 from "../../assets/svg/Clock2"
import SendMessage from "../../assets/svg/SendMessage"

const css:string = `
    .team-group > div {
        background-color: rgb(235, 73, 149);
        width: 40px;
        height: 40px;
        display:flex;
        align-items:center;
        justify-content:center;
        font-weight: bold;
    }

    .btn {
        background: transparent;
        transition: all 0.3s linear 0s;
        color: rgb(235, 73, 149);
        border: 1px solid rgb(235, 73, 149);
        outline: none;
        height: 40px;
        pointer-events: auto;
        cursor: pointer;
        text-align: center;
        font-weight: 600;
        padding: 0px 17px;
        border-radius: 25px;
        font-size: 14px;
    }
    .btn:hover {
        background-color: rgb(235, 73, 149);
        border-color: rgb(235, 73, 149);
        color: rgb(0, 0, 0);
        color:white;
    }
    .btn:hover svg {
        fill: white !important;
    }
`
const StartConversation = () => {
  return (
    <>
    <style>{css}</style>
        <div className="card start-conversation">
            <div className="inner-card-body flex items-center">
                <div className="left space-y-5">
                    <h2 className="font-semibold text-lg">Start a conversation</h2>
                    <div className="flex items-center gap-x-3">
                        <div className="team-group">
                            <div className="rounded-full bg-[rgb(235, 73, 149)]">A</div>
                        </div>
                        <div className="reply-time">
                        <p>Reply text time</p>
                        <span className="flex items-center space-x-2">
                            <Clock/>
                            <span>A few minutes</span>
                        </span>
                        </div>
                        
                    </div>
                    <button className="btn flex items-center gap-x-3">
                            <SendMessage/> New Conversation
                        </button>
                </div>
                <div className="right flex justify-end flex-1">
                    <div className="w-24">
                        <Clock2/>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default StartConversation