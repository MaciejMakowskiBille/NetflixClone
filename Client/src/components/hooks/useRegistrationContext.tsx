import { useContext } from "react";
import RegistrationContext from "../context/RegistrationContext";

const useRegistrationContext = () => {
  const values = useContext(RegistrationContext);
  return values;
};
