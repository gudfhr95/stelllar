import { createContext, PropsWithChildren, useContext } from "react";
import { MOUSE_BUTTON } from "../../../hooks/useContextMenu/buildContextMenuTrigger";
import useContextMenu from "../../../hooks/useContextMenu/useContextMenu";
import ContextMenu from "./ContextMenu";

export const ContextMenuContext = createContext({
  useContextTrigger: (props: any) => [{}],
});

export default function ContextMenuProvider({ children }: PropsWithChildren) {
  const [
    bindMenu,
    bindMenuItem,
    useContextTrigger,
    { data, coords, setVisible, isRight },
  ] = useContextMenu() as any;

  const hideMenu = () => setVisible(false);

  return (
    <>
      <ContextMenuContext.Provider value={{ useContextTrigger }}>
        {children}
        <ContextMenu
          bindMenu={bindMenu}
          data={data}
          bindMenuItem={bindMenuItem}
          hideMenu={hideMenu}
          isRight={isRight}
        />
      </ContextMenuContext.Provider>
    </>
  );
}

export const useContextMenuTrigger = (data: any, leftClick = false) => {
  const { useContextTrigger } = useContext(ContextMenuContext);
  return useContextTrigger({
    collect: () => data,
    mouseButton: leftClick ? MOUSE_BUTTON.LEFT : MOUSE_BUTTON.RIGHT,
  });
};
