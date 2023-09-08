import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { SignedInProvider } from "./providers/signedInProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <SignedInProvider>
    <App />
  </SignedInProvider>
);
