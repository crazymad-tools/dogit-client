import UserStore from "./user";
import React from "react";

const storeContext = React.createContext({
  userStore: new UserStore()
});

const useStores = () => React.useContext(storeContext);

export default useStores;