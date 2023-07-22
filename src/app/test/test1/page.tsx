"use client"

import { useScrollDisplayManager } from "@/hooks/use-scroll-display-manager/use-scroll-display-manager.hook";
import { createRef } from "react";

export default function Page() {
  const scrollManager = useScrollDisplayManager({
    scrollTargetContainer: 'window',
    onChangeItems(items) {
      console.log('@items', items);
    },
    items: [
      { name: 'section1', ref: createRef<HTMLDivElement>(), containedMargin: 200 },
      { name: 'section2', ref: createRef<HTMLDivElement>(), containedMargin: 200 },
      { name: 'section3', ref: createRef<HTMLDivElement>(), containedMargin: 200 },
      { name: 'section4', ref: createRef<HTMLDivElement>(), containedMargin: 200 },
      { name: 'section5', ref: createRef<HTMLDivElement>(), containedMargin: 200 },
      { name: 'section6', ref: createRef<HTMLDivElement>(), containedMargin: 200 },
      { name: 'section7', ref: createRef<HTMLDivElement>(), containedMargin: 200 },
      { name: 'section8', ref: createRef<HTMLDivElement>(), containedMargin: 200 },
      { name: 'section9', ref: createRef<HTMLDivElement>(), containedMargin: 200 },
    ],
  });

  return (
    <>
      <div ref={scrollManager.getRef('section1')} className="w-full h-screen bg-red-50">
        section 1
        { scrollManager.isShowed('section1') ? 'showed!' : '' }
      </div>
      <div ref={scrollManager.getRef('section2')} className="w-full h-screen bg-red-100">
        section 2
        { scrollManager.isShowed('section2') ? 'showed!' : '' }
      </div>
      <div ref={scrollManager.getRef('section3')} className="w-full h-screen bg-red-200">
        section 3
        { scrollManager.isShowed('section3') ? 'showed!' : '' }
      </div>
      <div ref={scrollManager.getRef('section4')} className="w-full h-screen bg-red-300">
        section 4
        { scrollManager.isShowed('section4') ? 'showed!' : '' }
      </div>
      <div ref={scrollManager.getRef('section5')} className="w-full h-screen bg-red-400">
        section 5
        { scrollManager.isShowed('section5') ? 'showed!' : '' }
      </div>
      <div ref={scrollManager.getRef('section6')} className="w-full h-screen bg-red-500">
        section 6
        { scrollManager.isShowed('section6') ? 'showed!' : '' }
      </div>
      <div ref={scrollManager.getRef('section7')} className="w-full h-screen bg-red-600">
        section 7
        { scrollManager.isShowed('section7') ? 'showed!' : '' }
      </div>
      <div ref={scrollManager.getRef('section8')} className="w-full h-screen bg-red-700">
        section 8
        { scrollManager.isShowed('section8') ? 'showed!' : '' }
      </div>
      <div ref={scrollManager.getRef('section9')} className="w-full h-screen bg-red-800">
        section 9
        { scrollManager.isShowed('section9') ? 'showed!' : '' }
      </div>
    </>
  );
}
