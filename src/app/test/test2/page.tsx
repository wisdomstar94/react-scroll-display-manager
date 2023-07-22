"use client"

import { useScrollDisplayManager } from "@/hooks/use-scroll-display-manager/use-scroll-display-manager.hook";
import { createRef, useRef } from "react";

export default function Page() {
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollManager = useScrollDisplayManager({
    scrollTargetContainer: containerRef,
    onChangeItems(items) {
      console.log('@items', items);
    },
    items: [
      { name: 'section1', ref: createRef<HTMLDivElement>(), containedMargin: 100 },
      { name: 'section2', ref: createRef<HTMLDivElement>(), containedMargin: 100 },
      { name: 'section3', ref: createRef<HTMLDivElement>(), containedMargin: 100 },
      { name: 'section4', ref: createRef<HTMLDivElement>(), containedMargin: 100 },
      { name: 'section5', ref: createRef<HTMLDivElement>(), containedMargin: 100 },
      { name: 'section6', ref: createRef<HTMLDivElement>(), containedMargin: 100 },
      { name: 'section7', ref: createRef<HTMLDivElement>(), containedMargin: 100 },
      { name: 'section8', ref: createRef<HTMLDivElement>(), containedMargin: 100 },
      { name: 'section9', ref: createRef<HTMLDivElement>(), containedMargin: 100 },
    ],
  });

  return (
    <>
      <div ref={containerRef} className="w-[500px] h-[500px] absolute top-[700px] left-[100px] overflow-y-scroll">
        <div ref={scrollManager.getRef('section1')} className="w-full h-full bg-red-50">
          section 1
          { scrollManager.isContain('section1') ? 'contain!' : '' }
        </div>
        <div ref={scrollManager.getRef('section2')} className="w-full h-full bg-red-100">
          section 2
          { scrollManager.isContain('section2') ? 'contain!' : '' }
        </div>
        <div ref={scrollManager.getRef('section3')} className="w-full h-full bg-red-200">
          section 3
          { scrollManager.isContain('section3') ? 'contain!' : '' }
        </div>
        <div ref={scrollManager.getRef('section4')} className="w-full h-full bg-red-300">
          section 4
          { scrollManager.isContain('section4') ? 'contain!' : '' }
        </div>
        <div ref={scrollManager.getRef('section5')} className="w-full h-full bg-red-400">
          section 5
          { scrollManager.isContain('section5') ? 'contain!' : '' }
        </div>
        <div ref={scrollManager.getRef('section6')} className="w-full h-full bg-red-500">
          section 6
          { scrollManager.isContain('section6') ? 'contain!' : '' }
        </div>
        <div ref={scrollManager.getRef('section7')} className="w-full h-full bg-red-600">
          section 7
          { scrollManager.isContain('section7') ? 'contain!' : '' }
        </div>
        <div ref={scrollManager.getRef('section8')} className="w-full h-full bg-red-700">
          section 8
          { scrollManager.isContain('section8') ? 'contain!' : '' }
        </div>
        <div ref={scrollManager.getRef('section9')} className="w-full h-full bg-red-800">
          section 9
          { scrollManager.isContain('section9') ? 'contain!' : '' }
        </div>
      </div>
    </>
  );
}
