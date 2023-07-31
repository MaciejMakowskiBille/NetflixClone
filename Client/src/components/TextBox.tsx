import { ReactNode } from "react";

export default function TextBox({
  child,
}: {
  child?: ReactNode[] | ReactNode;
}) {
  return <div className="text-box">{child}</div>;
}
