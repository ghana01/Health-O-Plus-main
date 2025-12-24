import  { useState, useRef, useEffect } from "react";
import axios from "axios";
import { FaUserCircle, FaRobot } from 'react-icons/fa'; // Using react-icons for avatars
import { AI_CONSULT_URL } from "../config";

// MessageContent Component: Formats and displays AI responses
const MessageContent = ({ content }) => {
  // Bolds text between asterisks
  const formatBoldText = (text) => {
    return text.split('**').map((part, index) => 
      index % 2 === 1 ? <strong key={index}>{part}</strong> : part
    );
  };

  // Formats lines with bullet points
  const formatBulletPoints = (text) => {
    return text.split('\n').map((line, index) => {
      if (line.trim().startsWith('*')) {
        return (
          <li key={index} className="ml-6 my-1 list-disc">
            {formatBoldText(line.replace('*', '').trim())}
          </li>
        );
      }
      return <div key={index}>{formatBoldText(line)}</div>;
    });
  };

  return (
    <div className="prose prose-sm max-w-none text-gray-800 leading-relaxed">
      {formatBulletPoints(content)}
    </div>
  );
};

// AIConsult Component: Main chat interface
const AIConsult = () => {
  const [messages, setMessages] = useState([
    {
      type: 'ai',
      content: "Hello! I'm your AI health consultant. Feel free to describe your symptoms or upload a medical report for analysis."
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  
  const fileInputRef = useRef(null);
  const chatContainerRef = useRef(null);

  // Auto-scroll to the latest message
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Handles sending a text message
  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = { type: 'user', content: inputMessage };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInputMessage("");
    setIsLoading(true);

    try {
      const formattedHistory = chatHistory.map(msg => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }]
      }));

      const response = await axios.post(`${AI_CONSULT_URL}/chat`, {
        message: inputMessage,
        history: formattedHistory
      });

      if (response.data && response.data.reply) {
        const aiResponse = { type: 'ai', content: response.data.reply };
        setMessages([...newMessages, aiResponse]);
        setChatHistory([
          ...chatHistory,
          { role: 'user', content: inputMessage },
          { role: 'assistant', content: response.data.reply }
        ]);
      } else {
        throw new Error('Invalid response from server.');
      }
    } catch (error) {
      const errorMessage = `Error: ${error.response?.data?.message || error.message || 'An unknown error occurred.'}`;
      setMessages([...newMessages, { type: 'system', content: errorMessage }]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handles file upload for analysis
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const userMessage = { type: 'user', content: `File uploaded: ${file.name}` };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setIsLoading(true);

    const formData = new FormData();
    formData.append('report', file);
    formData.append('history', JSON.stringify(chatHistory));

    try {
      const response = await axios.post(`${AI_CONSULT_URL}/analyze-report`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      const aiResponse = { type: 'ai', content: response.data.analysis };
      setMessages([...newMessages, aiResponse]);
      setChatHistory([
        ...chatHistory,
        { role: 'user', content: `Uploaded file: ${file.name}` },
        { role: 'assistant', content: response.data.analysis }
      ]);
    } catch (error) {
      const errorMessage = `Error: ${error.response?.data?.message || error.message || 'File analysis failed.'}`;
      setMessages([...newMessages, { type: 'system', content: errorMessage }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-100px)] max-w-4xl mx-auto bg-white shadow-2xl rounded-lg border border-gray-200">
      {/* Header */}
      <div className="p-4 border-b bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-t-lg">
        <h1 className="text-2xl font-bold">AI Health Consultation</h1>
        <p className="text-sm text-blue-100">Your intelligent health assistant</p>
      </div>

      {/* Chat Area */}
      <div ref={chatContainerRef} className="flex-1 p-6 overflow-y-auto bg-gray-50">
        {messages.map((msg, index) => (
          <div key={index} className={`flex items-start gap-4 my-4 ${msg.type === 'user' ? 'justify-end' : ''}`}>
            {/* Avatar */}
            {msg.type === 'ai' && <FaRobot className="w-8 h-8 text-blue-500" />}
            
            {/* Message Bubble */}
            <div
              className={`max-w-[80%] p-4 rounded-xl shadow-md ${ 
                msg.type === 'user'
                  ? 'bg-blue-500 text-white rounded-br-none'
                  : msg.type === 'system'
                  ? 'bg-red-100 text-red-800'
                  : 'bg-white text-gray-800 rounded-bl-none'
              }`}
            >
              {msg.type === 'ai' ? <MessageContent content={msg.content} /> : <div>{msg.content}</div>}
            </div>

            {/* User Avatar */}
            {msg.type === 'user' && <FaUserCircle className="w-8 h-8 text-gray-400" />}
          </div>
        ))}
        
        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex items-center gap-3 p-4">
            <FaRobot className="w-8 h-8 text-blue-500 animate-pulse" />
            <div className="bg-gray-200 text-gray-800 p-4 rounded-xl rounded-bl-none shadow-md">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" />
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce delay-150" />
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce delay-300" />
                <span className="ml-2 text-sm">AI is thinking...</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 border-t bg-gray-100 rounded-b-lg">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Ask a health question or describe your symptoms..."
            className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition"
            onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSendMessage()}
            disabled={isLoading}
          />
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            className="hidden"
            accept=".pdf,.jpg,.jpeg,.png"
            disabled={isLoading}
          />
          <button
            onClick={() => fileInputRef.current.click()}
            className="px-4 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition disabled:opacity-50"
            disabled={isLoading}
          >
            Upload
          </button>
          <button
            onClick={handleSendMessage}
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
            disabled={isLoading}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIConsult;
