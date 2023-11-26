import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Create from "./pages/Create";
import Home from "./pages/Home";
import Show from "./components/Show";
import { useEffect, useState } from "react";
import { PollProvider } from "./contexts/PollContext";
import { UserProvider } from "./contexts/UserContext";
import FilebaseIPFSExample from "./components/FilebaseIPFSExample";

interface Candidate {
  name: string;
  vote: number;
  image: string;
}
interface Poll {
  title: string;
  candidates: Candidate[];
}
interface Users {
  user: string;
  voted: boolean;
}
function App() {
  const [voted, setVoted] = useState<Users[]>([]);
  const [polls, setPolls] = useState<Poll[] | undefined>([]);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const addPoll = (poll) => {
    setPolls((prev) => [...prev, { ...poll }]);
  };
  const readPoll = () => {
    return polls;
  };
  const readUser = () => {
    return voted;
  };
  const addVote = (index, can) => {
    console.log("Polls", polls);

    const poll = polls[index];
    console.log("Poll ", poll);
    const updatedArray: Candidate[] = poll.candidates.map((obj, i) => {
      console.log("Object : ", obj);

      if (i === can) {
        console.log("Votes are ", obj.vote);

        return { ...obj, vote: obj.vote + 1 };
      } else return obj;
    });
    console.log(updatedArray);
    const updatedPolls: Poll[] = polls?.map((item, i) => {
      if (i === index) {
        return { ...item, candidates: updatedArray };
      } else return item;
    });
    setPolls(updatedPolls);
  };
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("data"));
    if (storedData && storedData.length > 0) {
      setPolls(storedData);
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(polls));
    console.log(polls);
  }, [polls]);

  return (
    <PollProvider
      value={{ polls, voted, addPoll, readPoll, readUser, addVote }}
    >
      <main className=" m-0 p-0 h-screen">
        <section>
          <Navbar />
          <FilebaseIPFSExample />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/createpoll" element={<Create />} />
            <Route path="/allpolls" element={<Show />} />
          </Routes>
        </section>
      </main>
    </PollProvider>
  );
}

export default App;
