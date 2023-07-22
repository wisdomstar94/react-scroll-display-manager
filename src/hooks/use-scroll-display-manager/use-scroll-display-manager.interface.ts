import { RefObject } from "react";

export declare namespace IUseScrollDisplayManager {
  export interface Item<E> {
    name: E;
    ref?: RefObject<any>;
    containedMargin?: number;
    isContain?: boolean;
    isShowed?: boolean;
  }

  export type ScrollDestinationDirection = 'HORIZONTAL_LEFT' | 'HORIZONTAL_RIGHT' | 'VERTICAL_TOP' | 'VERTICAL_BOTTOM';

  export type ScrollTargetType = 'ref' | 'window' | 'selector';
  export type ScrollTargetContainer = { current: any } | 'window' | `selector:${string}`;

  export interface Sizes {
    width: number;
    height: number;
  }

  export interface Scrolls {
    top: number;
    left: number;
  }

  export interface Props<E extends string> {
    items: Item<E>[],
    scrollTargetContainer: ScrollTargetContainer;
    onChangeItems?: (items: Item<E>[]) => void;
    onScroll?: (scrollTop: number, directions: ScrollDestinationDirection[]) => void;
  }
}