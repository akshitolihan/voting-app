import { useState } from "react";
import { usePoll } from "../contexts/PollContext";
const Show = () => {
  const { readPoll, readUser, addVote } = usePoll();
  const polls = readPoll();
  const users = readUser();
  const [given, setGiven] = useState(false);
  return (
    <>
      <section className="flex flex-wrap max-w-5xl mx-auto">
        {polls.length == 0 && (
          <h1 className="text-xl font-bold text-center text-violet-500 absolute right-1/2 top-1/2">
            No Polls Yet
          </h1>
        )}
        {polls.map((poll, index) => (
          <section className="max-w-sm mx-auto shadow-lg p-4 rounded-xl">
            <h1 className="text-xl font-bold text-center text-violet-500">
              {poll.title}
            </h1>
            {poll.candidates.map((item, can) => (
              <section
                onClick={
                  given
                    ? ""
                    : () => {
                        addVote(index, can);
                        setGiven(true);
                      }
                }
                className="flex gap-4 justify-between border border-gray-300 m-2 px-2 rounded-lg"
              >
                <img
                  className="rounded-full self-center max-h-20 max-w-[80px] min-w-[80px] min-h-[80px]"
                  src={item.image}
                  alt=""
                />
                <h1 className="text-md text-md font-semibold self-center">
                  {" "}
                  {item.name}{" "}
                </h1>
                <h1 className="text-md text-md font-semibold self-center">
                  {" "}
                  {item.vote}{" "}
                </h1>
              </section>
            ))}
            {given && (
              <h1 className="text-md text-md font-semibold self-center text-black">
                You have already Voted
              </h1>
            )}
          </section>
        ))}
      </section>
    </>
  );
};

export default Show;
