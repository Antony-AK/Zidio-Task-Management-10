import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { useAuth } from "../../Context/AuthContext";

const socket = io("http://localhost:5001");

const DiscussionForum = ({ task, onClose }) => {
  const { user } = useAuth();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const currentUser = user;
  useEffect(() => {
    socket.emit("requestMessages"); 
  
    socket.on("loadMessages", (fetchedMessages) => {
      setMessages(fetchedMessages); 
    });
  
    const handleMessageReceive = (data) => {
      setMessages((prevMessages) => [...prevMessages, data]); 
    };
  
    socket.on("receiveMessage", handleMessageReceive);
  
    return () => {
      socket.off("loadMessages");
      socket.off("receiveMessage", handleMessageReceive);
    };
  }, []);
  
  

  const sendMessage = () => {
    if (!message.trim()) return;

    const newMessage = { text: message, sender: currentUser.name };
    socket.emit("sendMessage", newMessage);
    setMessage(""); 
  };

  return (
    <div className="fixed top-0 right-0 h-full md:w-3/4 lg:w-1/2 bg-white shadow-lg p-5 transition-transform transform translate-x-0">
      <div className="flex justify-between items-center pb-4 border-b">
        <h2 className="text-xl font-semibold">{task.title}</h2>
        <button className="text-2xl" onClick={onClose}>&times;</button>
      </div>

      <div className="messages h-[420px] md:h-[1000px] lg:h-[500px] overflow-y-scroll p-3 bg-gray-100 rounded-lg mt-4">
        {messages.length === 0 ? (
          <p className="text-gray-500">No messages yet.</p>
        ) : (
          messages.map((msg, index) => (
            <div
              key={index}
              className={`p-2 my-2 flex ${
                msg.sender === currentUser.name ? "justify-end" : "justify-start"
              }`}
            >
              <span
                className={`inline-block p-2 rounded-lg ${
                  msg.sender === currentUser.name
                    ? "bg-orange/80 text-white"
                    : "bg-gray-200 text-black"
                }`}
              >
                <strong>{msg.sender !== currentUser.name ? msg.sender + ": " : ""}</strong>
                {msg.text}
              </span>
            </div>
          ))
        )}
      </div>

      <div className="flex mt-4 gap-2">
        <input
          type="text"
          className="flex-1 p-2 border rounded-lg"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()} 
        />
        <button className="add-button2" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default DiscussionForum;
