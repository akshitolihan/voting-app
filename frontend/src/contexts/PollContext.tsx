import { createContext, useContext } from "react";

export const PollContext = createContext({
  polls: [
    {
      title: "Choose ...",
      candidates: [
        {
          name: "Akshit",
          image: "Some image",
          votes: 0,
        },
      ],
    },
  ],
  users: [{ user: "", voted: false }],
  addPoll: (poll) => {},
  readPoll: () => {},
  readUser:()=>{},
  addVote: (index, can) => {},
});

export const usePoll = () => {
  return useContext(PollContext);
};

export const PollProvider = PollContext.Provider;
