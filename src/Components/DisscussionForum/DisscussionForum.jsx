import React from 'react'
import { useState } from 'react';

const DisscussionForum = ({task, onClose}) => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [file, setFile] = useState(null);

    const sendMessage = () => {
        if(message.trim() === '') return;
        setMessages([...messages, { text : message, sender : 'You'}]);
        setMessage('');
    };

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

  return (
    <div> 
         <div className="fixed top-0 right-0 h-full w-1/2 bg-white shadow-lg p-5 transition-transform transform translate-x-0">
            <div className="flex justify-between items-center pb-4 border-b">
                <h2 className="text-xl font-semibold">{task.title}</h2>
                <button className="text-2xl" onClick={onClose}>&times;</button>
            </div>

            <div className="messages h-[500px] overflow-y-scroll p-3 bg-gray-100 rounded-lg mt-4">
                {messages.length === 0 ? (
                    <p className="text-gray-500">No messages yet.</p>
                ) : (
                    messages.map((msg, index) => (
                        <div key={index} className={`p-2 my-2 ${msg.sender === 'You' ? 'text-right' : 'text-left'}`}>
                            <span className="inline-block p-2 bg-darkase text-black rounded-lg">{msg.text}</span>
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
                />
                <button className="add-button2" onClick={sendMessage}>
                    Send
                </button>
            </div>

            <div className="mt-3">
                <input type="file" onChange={handleFileChange} />
            </div>
        </div>
      
    </div>
  )
}

export default DisscussionForum
