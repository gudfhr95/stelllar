import { useRef } from "react";
import { getCoords } from "./helpers";

export const MOUSE_BUTTON = {
  LEFT: 0,
  RIGHT: 2,
};

const defaultConfig = {
  disable: false,
  holdToDisplay: 1000,
  posX: 0,
  posY: 0,
  mouseButton: MOUSE_BUTTON.RIGHT,
  disableIfShiftIsPressed: false,
  collect() {},
};

export default function buildUseContextMenuTrigger(
  triggerVisible: any,
  hideIfVisible: any
) {
  return (_config: any) => {
    const config = Object.assign({}, defaultConfig, _config);
    const touchHandled = useRef(false);
    const mouseDownTimeoutId = useRef();
    const touchstartTimeoutId = useRef();

    const handleContextClick = (event: any) => {
      if (event.ctrlKey) return;
      // if (config.disable) return
      // if (config.disableIfShiftIsPressed && event.shiftKey) return

      event.preventDefault();
      event.stopPropagation();

      triggerVisible(getCoords(event, config), {
        ...config.collect(),
        href: event.target.href,
      });
    };

    const handleMouseDown = (event: any) => {
      if (config.holdToDisplay >= 0 && event.button === MOUSE_BUTTON.LEFT) {
        event.persist();
        event.stopPropagation();
        if (config.mouseButton === MOUSE_BUTTON.RIGHT) hideIfVisible();
        if (config.mouseButton === MOUSE_BUTTON.LEFT)
          triggerVisible(getCoords(event, config), config.collect());

        /*mouseDownTimeoutId.current = setTimeout(
          () => handleContextClick(event),
          config.holdToDisplay
        )*/
      }
    };

    const handleMouseUp = (event: any) => {
      if (event.button === MOUSE_BUTTON.LEFT) {
        clearTimeout(mouseDownTimeoutId.current);
      }
    };

    const handleMouseOut = (event: any) => {
      if (event.button === MOUSE_BUTTON.LEFT) {
        clearTimeout(mouseDownTimeoutId.current);
      }
    };

    const handleTouchstart = (event: any) => {
      touchHandled.current = false;

      if (config.holdToDisplay >= 0) {
        event.persist();
        event.stopPropagation();

        touchstartTimeoutId.current = setTimeout(() => {
          handleContextClick(event);
          touchHandled.current = true;
        }, config.holdToDisplay) as any;
      }
    };

    const handleTouchEnd = (event: any) => {
      if (touchHandled.current) {
        event.preventDefault();
      }
      clearTimeout(touchstartTimeoutId.current);
    };

    const handleContextMenu = (event: any) => {
      if (event.button === config.mouseButton) {
        handleContextClick(event);
      }
    };

    const handleMouseClick = (event: any) => {
      if (event.button === config.mouseButton) {
        handleContextClick(event);
      }
    };

    const triggerBind = {
      onContextMenu: handleContextMenu,
      onClick: handleMouseClick,
      // onMouseDown: handleMouseDown,
      // onMouseUp: handleMouseUp,
      // onTouchStart: handleTouchstart,
      // onTouchEnd: handleTouchEnd,
      // onMouseOut: handleMouseOut
    };

    return [triggerBind];
  };
}
