const Home = () => {
  return (
    <>
      <main>
        <section className="flex flex-col justify-center mt-40 space-y-10">
          <h1 className="text-6xl font-bold text-center text-[#464cb8]">
            Welcome to Voteguard{" "}
          </h1>
          <h1 className="text-medium font-bold text-center text-violet-500 ">
            Create Poll or Vote
          </h1>
          <h1 className="text-medium font-bold text-center text-violet-500 ">
            Install Metamask to Continue
          </h1>
          <button className="max-w-[80px] mx-auto p-1 px-2 shadow-md rounded-md text-base bg-violet-500 text-white font-semibold">
            <a
              className="max-w-[20px] inline"
              href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn"
              target="_blank"
            >
              Install
            </a>
          </button>
        </section>
      </main>
    </>
  );
};

export default Home;
