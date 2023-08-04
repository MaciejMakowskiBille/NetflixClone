import { useEffect } from "react";
import PageSwitch from "./PageSwitch";
import { FormProvider } from "./context/RegistrationContext";
import { useRegistrationContext } from "./hooks/useRegistrationContext";

export default function Registration() {
  return (
    <FormProvider>
      <form>
        <PageSwitch />
      </form>
    </FormProvider>
  );
}
