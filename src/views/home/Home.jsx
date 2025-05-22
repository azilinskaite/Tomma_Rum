import React from "react"
import Nyheter from "./components/Nyheter"
import kartaImage from "../../assets/karta.png"
import StickyPost from "./StickyPost"

function Home() {
  return (
    <div className="space-y-12 mb-10">
      {/* Image + Text Row */}
      <div className="flex flex-col mx-6 my-6 mb-10 md:flex-row md:mx-12 md:my-10 md:mb-14 gap-10 md:items-start lg:mx-20 lg:gap-16">
        {/* Left Side - Background Image with Overlay Text */}
        <div className="relative flex items-start justify-center w-full md:w-1/2 h-96 md:h-auto">
          <img
            src={kartaImage}
            alt="Karta över Sverige"
            className="w-full h-full md:w-[401px] md:h-[885px] object-contain"
          />
          <div className="absolute inset-0 flex items-start justify-center ">
            <div className="w-full space-y-6">
              <h4 className="text-3xl md:max-lg:text-[49px] lg:text-6xl font-bold leading-tight">
                <div className="flex flex-col mt-6">
                  <div className="self-start">Tomma Rum</div>
                  <div className="self-center ml-8">är en</div>
                  <div className="self-end">självorganiserad</div>
                  <div className="self-start ml-4">plattform</div>
                  <div className="self-end mr-16">för</div>
                  <div className="flex justify-between">
                    <span>kulturellt och</span>
                  </div>
                  <div className="self-end mr-10">konstnärligt</div>
                  <div className="self-start ml-12">utbyte</div>
                </div>
              </h4>
            </div>
          </div>
        </div>

        <StickyPost />

      </div>

      <hr className="border-none h-[2px] bg-[var(--color-accent)]" />

      <div className="max-w-7xl mx-auto px-6">
        <Nyheter />
      </div>
    </div>
  )
}

export default Home
