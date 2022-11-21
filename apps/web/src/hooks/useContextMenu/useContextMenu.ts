import { useCallback, useEffect, useRef, useState } from "react";
import buildUseContextMenuTrigger from "./buildContextMenuTrigger";
import { getMenuPosition } from "./helpers";

export const keyCodes = {
  ESCAPE: 27,
  ENTER: 13,
  UP_ARROW: 38,
  DOWN_ARROW: 40,
};

const baseStyles = {
  position: "fixed",
  opacity: 0,
  pointerEvents: "none",
};

const focusElement = (el: any) => el.focus();

const useContextMenu = ({ handleElementSelect = focusElement } = {}) => {
  const menuRef = useRef();
  const selectables = useRef([] as any);

  const [style, setStyles] = useState(baseStyles);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isVisible, setVisible] = useState(false);
  const [coords, setCoords] = useState([0, 0]);
  const [collectedData, setCollectedData] = useState();

  const hideMenu = useCallback(() => setVisible(false), [setVisible]);

  const hideIfVisible = useCallback(() => {
    if (isVisible) {
      setVisible(false);
    }
  }, [isVisible, setVisible]);

  const triggerVisible = useCallback(
    (coords: any, data: any) => {
      setVisible(true);
      setCoords(coords);
      setCollectedData(data);
    },
    [setVisible, setCollectedData]
  );

  const markSelectable = (el: any) =>
    (selectables.current = el === null ? [] : [...selectables.current, el]);

  useEffect(() => {
    const handleOutsideClick = (e: any) => {
      if (!(menuRef.current as any).contains(e.target)) {
        setSelectedIndex(-1);
        hideMenu();
      }
    };
    const handleKeyNavigation = (e: any) => {
      switch (e.keyCode) {
        case keyCodes.ESCAPE:
          e.preventDefault();
          hideMenu();
          break;
        case keyCodes.UP_ARROW:
          e.preventDefault();
          if (selectedIndex > 0) {
            setSelectedIndex((s) => s - 1);
            handleElementSelect(selectables.current[selectedIndex - 1]);
          }
          break;
        case keyCodes.DOWN_ARROW:
          e.preventDefault();
          if (selectedIndex + 1 < selectables.current.length) {
            setSelectedIndex((s) => s + 1);
            handleElementSelect(selectables.current[selectedIndex + 1]);
          }
          break;
        case keyCodes.ENTER:
          if (selectedIndex !== -1) {
            selectables.current[selectedIndex].click();
          }
          hideMenu();
          break;
        default:
      }
    };
    if (isVisible) {
      document.addEventListener("mousedown", handleOutsideClick);
      document.addEventListener("touchstart", handleOutsideClick);
      document.addEventListener("scroll", hideMenu);
      document.addEventListener("contextmenu", hideMenu);
      document.addEventListener("keydown", handleKeyNavigation);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("touchstart", handleOutsideClick);
      document.removeEventListener("scroll", hideMenu);
      document.removeEventListener("contextmenu", hideMenu);
      document.removeEventListener("keydown", handleKeyNavigation);
    };
  }, [
    menuRef,
    hideMenu,
    selectedIndex,
    setSelectedIndex,
    selectables,
    handleElementSelect,
    isVisible,
  ]);

  const [right, setRight] = useState(false);

  useEffect(() => {
    if (isVisible) {
      const rect = (menuRef.current as any).getBoundingClientRect();
      const { top, left, isRight } = getMenuPosition(rect, coords);
      setRight(isRight);
      setStyles((st) => ({
        ...st,
        top: `${top}px`,
        left: `${left}px`,
        opacity: 1,
        pointerEvents: "auto",
      }));
    } else {
      setStyles(baseStyles);
    }
  }, [menuRef, isVisible, coords]);

  const bindMenu = { style, ref: menuRef, role: "menu", tabIndex: -1 };
  const bindMenuItems = {
    ref: markSelectable,
    role: "menuitem",
    tabIndex: -1,
  };
  return [
    bindMenu,
    bindMenuItems,
    buildUseContextMenuTrigger(triggerVisible, hideIfVisible),
    {
      data: collectedData,
      isVisible,
      setVisible,
      coords,
      setCoords,
      isRight: right,
    },
  ];
};

export default useContextMenu;
