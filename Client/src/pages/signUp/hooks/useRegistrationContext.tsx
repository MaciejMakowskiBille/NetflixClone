import { useContext } from "react";
import RegistrationContext from "../contexts/RegistrationContext";

export const useRegistrationContext = () => {
  const values = useContext(RegistrationContext);
  return values;
};
