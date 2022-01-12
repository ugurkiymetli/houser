import { useState } from "react";
import styles from "./styles.module.css";

function MessageForm() {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(message);
    setMessage("");
  };

  return <div></div>;
}

export default MessageForm;
