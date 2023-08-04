import PageSwitch from "./PageSwitch";
import { FormProvider } from "./context/RegistrationContext";

export default function Registration() {
  return (
    <FormProvider>
      <PageSwitch />
    </FormProvider>
  );
}
