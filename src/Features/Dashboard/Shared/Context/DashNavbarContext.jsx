import { createContext, useContext, useState } from "react";

const NavbarContext = createContext();

const NavbarProvider = ({ children }) => {
  const [centerContent, setCenterContent] = useState(null);

  return <NavbarContext.Provider value={{ centerContent, setCenterContent }}>{children}</NavbarContext.Provider>;
};

export default NavbarProvider;

// eslint-disable-next-line react-refresh/only-export-components
export const useNavbar = () => useContext(NavbarContext);
