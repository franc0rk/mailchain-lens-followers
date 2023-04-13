import { useState } from "react";
import { createFollow } from "../services/lens";

export default function Home() {
  return (
    <main>
      <section className="py-4">
        <h1 className="text-center text-2xl my-4">
          Integrating Mailchain and Lens Protocol
        </h1>
        <ProfileCard />
      </section>
    </main>
  );
}

function ProfileCard() {
  const [isFollowing, setIsFollowing] = useState(false);

  async function follow() {
    // following the profile
    setIsFollowing(true);
    const { address } = await createFollow();

    // calling api for sending email
    sendEmail(address);
  }

  async function sendEmail(address) {
    fetch("/api/welcome", {
      method: "POST",
      body: JSON.stringify({ address }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  return (
    <div className="border border-gray-400 rounded-lg p-8 w-3/4 md:w-1/3 mx-auto">
      <div className="flex flex-col justify-center">
        <img
          className="border-2 border-gray-400 mx-auto w-16 h-16 rounded-full"
          src="https://docs.mailchain.com/img/logo.svg"
        />
        <h4 className="text-lg text-center my-2 font-semibold">
          francork.test
        </h4>
        <p className="text-center mb-2">Web3 Developer</p>
        <button
          className="rounded-full bg-[#abff2d] text-[#00501e] px-8 py-4 disabled:bg-gray-200"
          onClick={follow}
          disabled={isFollowing}
        >
          {isFollowing ? "Following" : "Follow"}
        </button>
      </div>
    </div>
  );
}
