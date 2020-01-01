import React from "react";

export default function Layout(props) {
  return (
    <main>
      <style global jsx>{`
        body,
        html {
          margin: 0;
          padding: 0;
        }
      `}</style>
      {props.children}
    </main>
  );
}
