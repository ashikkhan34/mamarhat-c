import React from "react";

export default function AboutMamarhat() {
  return (
    <div>
      <h1 className="text-3xl text-center text-green-600 py-12 font-semibold">
        About Mamarhat{" "}
      </h1>
      <div className="flex flex-col md:flex-row justify-center items-center ">
        {/* Background Box */}
        <div className="relative bg-[url('/image/house.png')] bg-cover bg-center w-[500px] h-96 flex flex-col justify-center items-center">
          <img src="/image/logo.png" className="w-14 mb-2" alt="Logo" />
          <h1 className="text-white text-xl font-bold">Mamarhat</h1>
        </div>

        {/* Right Image */}
        <img
          src="/image/x.png"
          className="h-96 w-[500px] object-cover"
          alt="X Image"
        />
      </div>

      <div>
        <div className="w-full max-w-6xl mx-auto mt-12">
          {/* === TOP SECTION === */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 rounded-xl overflow-hidden">
            {/* Left Image */}
            <div className="h-[450px] w-full">
              <img
                src="/image/b.png"
                className="w-full h-full object-cover"
                alt="Rider"
              />
            </div>

            {/* Right Green Box */}
            <div className="flex justify-center items-center bg-[#7AC943] p-8">
              <div className="p-6  max-w-[350px] text-center">
                <p className="text-black font-semibold">
                  Be the hero your city is hungry for <br />
                  Deliver smiles and <br />
                  fresh meals every day. <br />
                  Earn on your own schedule with <br />
                  every ride. Join now and start your <br />
                  food delivery journey!
                </p>

                <button className="mt-6 px-5 py-2 bg-green-700 hover:bg-green-900 rounded text-white">
                  Become a Hero
                </button>
              </div>
            </div>
          </div>

          {/* === BOTTOM SECTION === */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 rounded-xl overflow-hidden">
            {/* Left Green Box */}
            <div className="bg-[#6FAE56] flex justify-center items-center p-10">
              <div className="max-w-[350px] text-center text-white text-lg">
                <p>
                  Grow your business with every bite <br />
                  Join our food delivery platform <br />
                  today. <br />
                  Reach more customers in every <br />
                  corner — Sign up now and become a <br />
                  valued partner!
                </p>

                <button className="mt-6 px-5 py-2 bg-green-900 hover:bg-green-700 rounded text-white">
                  Become a Partner
                </button>
              </div>
            </div>

            {/* Right Image */}
            <div className="h-[450px] w-full">
              <img
                src="/image/a.png"
                className="w-full h-full object-cover"
                alt="Office Image"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
