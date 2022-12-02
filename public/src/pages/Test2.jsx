import React, { useContext, useEffect } from "react";
import { SocketContext } from "../store/socket-context";

export default function Test2() {
  const socket = useContext(SocketContext);

  useEffect(() => {
    socket.on("testing-back", (data) => {
      console.log("received testing on test2:", data);
    });
    return () => socket.off("testing-back");
  }, [socket]);

  return (
    <button onClick={() => socket.emit("testing", "testing from test2")}>
      Run2
    </button>
  );
}
