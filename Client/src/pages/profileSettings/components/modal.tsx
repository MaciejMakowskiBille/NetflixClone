import React from "react";

export default function Modal({
  title,
  content,
  children,
}: {
  title: string;
  content: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="backdrop" />
      <div className="modal">
        <header className="modal__header">
          <h1>{title}</h1>
        </header>
        <div className="modal__content">
          <p>{content}</p>
        </div>
        <footer className="modal__actions">{children}</footer>
      </div>
    </div>
  );
}
