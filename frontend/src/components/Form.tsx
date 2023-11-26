import { useEffect, useState } from "react";
import { usePoll } from "../contexts/PollContext";
import { ethers } from "ethers";
// import IPFS from 'ipfs-http-client';
import { create } from "ipfs-http-client";
import Voting from "../../../artifacts/contracts/Voting.sol/PollRegistry.json";
const apiKey = "W8U2vFbxo2rAgwO6NzeBn01sLivFxv_j";
import FileBase from "react-file-base64";
import { FilebaseClient } from '@filebase/client'
import { Buffer } from 'buffer';

window.Buffer = Buffer;

interface Candidate {

  name: string;
  votes: number;
  image: string;
}
interface Poll {
  title: string;
  candidates: Candidate[];
}
const Form = () => {
  type State = {
    image: string;
  };
  const [data, setData] = useState<State>({
    image: "",
  });
  const [images, setImages] = useState("");
  // const handleSubmit = (e: React.SyntheticEvent) => {
  //   e.preventDefault();
  // };
  const [count, setCount] = useState(0);
  const [submit, setSubmit] = useState(false);
  const { addPoll } = usePoll();
  const [number, setNumber] = useState(0);
  const [candidate, setCandidate] = useState("");
  const [filename, setFileName] = useState([]);
  const [image, setImage] = useState([]);
  const [title, setTitle] = useState("");
  // function formHandler() {
  //   document != null && document.querySelector(".profile-pic").click();
  // }
  const submitPoll = async (e) => {
    console.log("Data is .. ", data);
    
    setSubmit(true);
    setImage([]);
    if (!candidates) return;
    else addPoll({ title: title, candidates: candidates });

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = provider.getSigner();

    const contract = new ethers.Contract(
      process.env.VITE_CONTRACT_ADDRESS,
      Voting.abi,
      signer
    );

    const pollData = await contract.createPoll(title);

    await pollData.wait();
    pollData.PollCreated((err, data) => {
      console.log("Data is ", data);
    });
    console.log(pollData.getAddress());
  };
  function formHandler() {
    const profilePic = document?.querySelector(
      ".profile-pic"
    ) as HTMLElement | null;
    if (profilePic) {
      profilePic.click();
    }
  }
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setImage(data.image);
  };

  const [candidates, setCandidates] = useState<Candidate[] | undefined>();
  const [form, showForm] = useState(false);
  useEffect(() => {
    console.log(title);
    console.log(candidate);
    setNumber(number);
    console.log(candidates);
  }, [number, candidates]);

  return (
    <>
      {!submit && (
        <form
          action=""
          className="flex flex-col justify-between gap-5 rounded m-4 shadow-xl h-full max-w-sm mx-auto mt-20"
        >
          {
            <>
              <input
                className="flex m-2 border-[2.5px] p-2 rounded-md border-violet-500 outline-0 px-2 font-[500] text-base "
                type="text"
                placeholder="Title of the Poll"
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              <input
                className="remove-arrow flex m-2 border-[2.5px] p-2 rounded-md border-violet-500 outline-0 px-2 font-[500] text-base "
                type="number"
                placeholder="Enter Number of Candidates"
                onChange={(e) => setNumber(parseInt(e.target.value))}
                required
              />
              <hr className="h-2 " />
              {count < number && (
                <section key={count}>
                  <input
                    key={count}
                    className="flex m-2 border-[2.5px] p-2 rounded-md border-violet-500 outline-0 px-2 font-[500] text-base"
                    type="text"
                    placeholder={`Enter Candidate ${count + 1} Name`}
                    onChange={(e) => setCandidate(e.target.value)}
                  />
                  <label
                    // key={index}
                    onClick={formHandler}
                    htmlFor=""
                    className="bg-gray-200 px-2 text-sm font-[500] rounded-xl self-center top-5 w-[fit-content]"
                  >
                    Upload Symbol
                    <input
                      required
                      type="file"
                      accept="image/*"
                      className="profile-pic"
                      hidden
                      onChange={async ({ target: { files } }) => {
                        files != null &&
                          files[0] &&
                          setFileName((prev) => [...prev, files[0].name]);
                        if (files) {
                          setImage((prev) => [
                            ...prev,
                            URL.createObjectURL(files[0]),
                          ]);
                          setImages(images)
                          console.log(filename);
                          console.log(image);
                          console.log(typeof image[count]);
                          const filebaseClient = new FilebaseClient({ token: 'QjAyRkJFQjI0RTcxRjFCQkY5NjU6TFJwNGVsUlJHSzdQV2xVeXYybUtkcjlRZ3lLUFBoaGw5Vm54aG53Szpha3NoaXRvbGloYW4=' })
                          const content = new Blob([image[count]])
                          const cid = await filebaseClient.storeBlob(content)
                          console.log("CiD is ",cid);
                        }
                      }}
                    />
                    {/* <FileBase
                      type="file"
                      multiple={false}
                      onDone={({ base64 }: { base64: string }) =>
                        setData({ ...data, image: base64 })
                      }

                    /> */}
                  </label>
                  {image[count] && (
                    <img
                      className="rounded-full self-center max-h-20 max-w-[80px] min-w-[80px] min-h-[80px]"
                      src={image[count]}
                      alt=""
                    />
                  )}
                  <button
                    className="bg-violet-500 text-white font-bold rounded-md  p-[5px] self-center m-2"
                    onClick={(e) => {
                      e.preventDefault();
                      setCount(count + 1);
                      return setCandidates((prev: Candidate[]) => {
                        console.log(image);

                        if (prev) {
                          return [
                            ...prev,
                            { name: candidate, vote: 0, image: image[count] },
                          ];
                        } else {
                          return [
                            { name: candidate, vote: 0, image: image[count] },
                          ];
                        }
                      });
                    }}
                  >
                    Add
                  </button>
                  <hr />
                </section>
              )}
            </>
          }
          <hr />
          <button
            type="submit"
            // onClick={(e) => {
            //   e.preventDefault();
            //   setSubmit(true);
            //   setImage([]);
            //   if (!candidates) return;

            //   return addPoll({ title: title, candidates: candidates });
            // }}
            onClick={submitPoll}
            className="bg-violet-500 text-white font-bold rounded-md  p-[5px] self-center m-2"
          >
            Submit
          </button>
        </form>
      )}
      {submit && (
        <>
          <h1 className="text-xl font-bold text-center text-violet-500 absolute right-1/2 top-1/2">
            Poll Submitted
          </h1>
          <section className="flex justify-center">
            <button
              className="p-1 px-2 shadow-md rounded-md text-base bg-violet-500 text-white font-semibold"
              onClick={() => setSubmit(false)}
            >
              Create New Poll
            </button>
          </section>
        </>
      )}
    </>
  );
};

export default Form;
