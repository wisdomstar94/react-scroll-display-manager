import { useCallback, useEffect, useRef, useState } from "react";
import { IUseScrollDisplayManager } from "./use-scroll-display-manager.interface";

export function useScrollDisplayManager<E extends string>(props: IUseScrollDisplayManager.Props<E>) { 
  const {
    scrollTargetContainer,
  } = props;

  const prevScrollY = useRef<number>(0);

  const [isInit, setIsInit] = useState<boolean>(false);
  const [items, setItems] = useState<IUseScrollDisplayManager.Item<E>[]>(props.items);
  const onScrolledRef = useRef<(event?: Event) => void>();

  function isRef(value: any): value is { current: any } {
    if (typeof value !== 'object') return false;
    if (value.current === undefined) return false;
    return true;
  }

  function getContainerScrolls(): IUseScrollDisplayManager.Scrolls | undefined {
    let scrolls: IUseScrollDisplayManager.Scrolls | undefined = undefined;

    if (isRef(scrollTargetContainer)) {
      if (scrollTargetContainer.current !== null) {
        scrolls = {
          top: scrollTargetContainer.current.scrollTop,
          left: scrollTargetContainer.current.scrollLeft,
        };
      }
    } else if (scrollTargetContainer === 'window' && typeof window !== 'undefined') {
      scrolls = {
        top: window.scrollY,
        left: window.scrollX,
      };
    } else if (typeof scrollTargetContainer === 'string' && scrollTargetContainer.startsWith('selector:')) {
      const selector = scrollTargetContainer.replace('selector:', '');
      const element = document.querySelector<HTMLElement>(selector);
      if (element !== null) {
        scrolls = {
          top: element.scrollTop,
          left: element.scrollLeft,
        };
      }
    }

    return scrolls;
  }

  function getContainerSizes() {
    let sizes: IUseScrollDisplayManager.Sizes | undefined = undefined;
    
    if (isRef(scrollTargetContainer)) {
      if (scrollTargetContainer.current !== null) {
        sizes = {
          width: scrollTargetContainer.current.clientWidth,
          height: scrollTargetContainer.current.clientHeight,
        };
      }
    } else if (scrollTargetContainer === 'window' && typeof window !== 'undefined') {
      sizes = {
        width: window.innerWidth,
        height: window.innerHeight,
      };
    } else if (typeof scrollTargetContainer === 'string' && scrollTargetContainer.startsWith('selector:')) {
      const selector = scrollTargetContainer.replace('selector:', '');
      const element = document.querySelector<HTMLElement>(selector);
      if (element !== null) {
        sizes = {
          width: element.clientWidth,
          height: element.clientHeight,
        };
      }
    }

    return sizes;
  }

  function onChangeItems(items: IUseScrollDisplayManager.Item<E>[]) {
    if (items === undefined) return;
    setItems(items);
    if (typeof props.onChangeItems === 'function') {
      props.onChangeItems(items);
    }
  }

  function onScroll(scrollTop: number, directions: IUseScrollDisplayManager.ScrollDestinationDirection[]) {
    if (typeof props.onScroll === 'function') {
      props.onScroll(scrollTop, directions);
    }
  }

  function check(scrollTop: number) {
    if (items === undefined) return;

    const sizes = getContainerSizes();
    if (sizes === undefined) return;

    const newItems = [ ...items ].map((item, index) => {
      const prevItem = items[index - 1];
      
      let start = 0;
      if (prevItem !== undefined) {
        start = prevItem.ref?.current.offsetTop ?? 0;
      } else {
        start = -item.ref?.current.clientHeight ?? 0;
      }
      let end = (item.ref?.current.offsetTop) + (item.ref?.current.clientHeight ?? 0);

      const containedMargin = item.containedMargin ?? 0;
      start += containedMargin;
      end -= containedMargin;

      const isContain = scrollTop >= start && scrollTop < end;
      let isShowed = item.isShowed;
      if (isShowed !== true && isContain) {
        isShowed = isContain;  
      }
      
      return {
        ...item,
        isContain,
        isShowed,
      };
    });

    const isDiffExist = items.some((x, index) => {
      return x.isContain !== newItems[index].isContain || x.isShowed !== newItems[index].isShowed;
    });

    if (isDiffExist) {
      onChangeItems(newItems);
    }
  }
  
  function onScrolled(event?: Event) {
    const scrolls = getContainerScrolls();
    if (scrolls === undefined) return;

    // const scrollY = window.scrollY;
    check(scrolls.top);
    
    const directions: IUseScrollDisplayManager.ScrollDestinationDirection[] = [];
    if (prevScrollY.current < scrolls.top) {
      directions.push('VERTICAL_BOTTOM');
    } 
    if (prevScrollY.current > scrolls.top) {
      directions.push('VERTICAL_TOP');
    }
    onScroll(scrolls.top, directions);

    prevScrollY.current = scrolls.top;
  }
  onScrolledRef.current = onScrolled;

  const getItem = useCallback((name: E) => {
    return items.find(x => x.name === name);
  }, [items]);

  const getRef = useCallback((name: E) => {
    return items.find(x => x.name === name)?.ref;
  }, [items]);

  const isShowed = useCallback((name: E) => {
    return items.find(x => x.name === name)?.isShowed;
  }, [items]);

  const isContain = useCallback((name: E) => {
    return items.find(x => x.name === name)?.isContain;
  }, [items]);

  const scrollToItem = useCallback((name: E, _isSmooth?: boolean) => {
    const isSmooth = _isSmooth ?? true;
    const item = getItem(name);
    const offsetTop = item?.ref?.current?.offsetTop ?? 0; 
    window.scroll({
      top: offsetTop,
      behavior: isSmooth ? 'smooth' : 'auto',
    });
  }, [getItem]);

  const onScrollCallbackRef = useRef<(event: Event) => void>((event: Event) => {
    if (onScrolledRef.current !== undefined) {
      onScrolledRef.current(event);
    }
  });

  useEffect(() => {
    if (isRef(scrollTargetContainer)) {
      scrollTargetContainer.current.addEventListener('scroll', onScrollCallbackRef.current);
    } else if (scrollTargetContainer === 'window') {
      if (typeof window !== 'undefined') {
        window.addEventListener('scroll', onScrollCallbackRef.current);
      }
    } else if (typeof scrollTargetContainer === 'string' && scrollTargetContainer.startsWith('selector:')) {
      const selector = scrollTargetContainer.replace('selector:', '');
      const element = document.querySelector<HTMLElement>(selector);
      if (element !== null) {
        element.addEventListener('scroll', onScrollCallbackRef.current);
      }
    }

    return () => {
      if (isRef(scrollTargetContainer)) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        scrollTargetContainer.current?.removeEventListener('scroll', onScrollCallbackRef.current);
      } else if (scrollTargetContainer === 'window') {
        if (typeof window !== 'undefined') {
          window.removeEventListener('scroll', onScrollCallbackRef.current);
        }
      } else if (typeof scrollTargetContainer === 'string' && scrollTargetContainer.startsWith('selector:')) {
        const selector = scrollTargetContainer.replace('selector:', '');
        const element = document.querySelector<HTMLElement>(selector);
        if (element !== null) {
          // eslint-disable-next-line react-hooks/exhaustive-deps
          element.removeEventListener('scroll', onScrollCallbackRef.current);
        }
      }
    };
  }, [scrollTargetContainer]);

  useEffect(() => {
    if (props.items === undefined) return;
    setIsInit(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isInit) return;
    if (onScrolledRef.current !== undefined) {
      onScrolledRef.current();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInit]);

  return {
    getRef,
    getItem,
    isShowed,
    isContain,
    scrollToItem,
    isInit,
  };
}