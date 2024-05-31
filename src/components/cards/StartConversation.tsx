import Clock from "../../assets/svg/Clock";
import Clock2 from "../../assets/svg/Clock2";
import SendMessage from "../../assets/svg/SendMessage";

const StartConversation = () => {
  return (
    <>
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
                  <Clock />
                  <span>A few minutes</span>
                </span>
              </div>
            </div>
            <button className="btn flex items-center gap-x-3">
              <SendMessage /> New Conversation
            </button>
          </div>
          <div className="right flex justify-end flex-1">
            <div className="w-24">
              <Clock2 />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StartConversation;
