import { h, IS_BROWSER, useState, useEffect, useCallback } from "../deps.ts";

interface Message {
  text: string;
}
export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState("");

  const getMessages = useCallback(async () => {
    const res = await fetch("https://deno-chat-test.deno.dev/messages");
    const data = await res.json();
    setMessages(data);
  }, []);

  useEffect(() => {
    getMessages();
  }, []);

  const onSendMessage = useCallback(async () => {
    await fetch("https://deno-chat-test.deno.dev/messages", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ text }),
    });
    setText("");
    getMessages();
  }, [text]);

  return (
    <div>
      <div>{JSON.stringify(messages)}</div>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></input>
      <button onClick={onSendMessage}>Add</button>
    </div>
  );
}
