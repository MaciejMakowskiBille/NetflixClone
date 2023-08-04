import { useContext } from "react";
import RegistrationContext from "../context/RegistrationContext";

export const useRegistrationContext = () => {
  const values = useContext(RegistrationContext);
  return values;
};
