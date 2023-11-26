import Wallet from "./Wallet";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <>
      <nav>
        <main className="mx-auto max-w-4xl">
          <section className="flex justify-between text-xl font-semibold text-violet-500 ">
            <button
              onClick={() => navigate("/")}
              className="px-2 p-1 shadow-md rounded-md text-base"
            >
              Home
            </button>
            <button className="font-bold">Voting Application</button>
            <Wallet />
          </section>
          <section className="flex justify-around text-xl font-semibold text-violet-500 m-2 p-2">
            <button
              onClick={() => navigate("/createpoll")}
              className="px-2 p-1 shadow-md rounded-md text-base"
            >
              Create Poll
            </button>
            <button
              onClick={() => navigate("/allpolls")}
              className="px-2 p-1 shadow-md rounded-md text-base"
            >
              All Polls
            </button>
          </section>
        </main>
      </nav>
    </>
  );
};

export default Navbar;
