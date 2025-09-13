import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaMicrophone, FaMicrophoneSlash, FaVideo, FaVideoSlash } from 'react-icons/fa';
import { ImPhoneHangUp } from 'react-icons/im';
import { IoMdSend } from 'react-icons/io';
import { BsChatDotsFill } from 'react-icons/bs';
import { AiOutlinePaperClip } from 'react-icons/ai';
import { BASE_URL, token } from '../config';

const VideoCall = () => {
  const { roomId } = useParams();
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const ws = useRef(null);
  const pc = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    ws.current = new WebSocket('ws://localhost:8000');

    ws.current.onopen = () => {
      ws.current.send(JSON.stringify({ type: 'join', roomId }));
    };

    ws.current.onmessage = (message) => {
      const data = JSON.parse(message.data);

      switch (data.type) {
        case 'offer':
          handleOffer(data.offer);
          break;
        case 'answer':
          handleAnswer(data.answer);
          break;
        case 'ice-candidate':
          handleIceCandidate(data.candidate);
          break;
        case 'chat-message':
          setMessages((prevMessages) => [...prevMessages, data]);
          break;
        default:
          break;
      }
    };

    return () => {
      ws.current.close();
    };
  }, [roomId]);

  const startCall = async () => {
    pc.current = new RTCPeerConnection({
      iceServers: [
        {
          urls: 'stun:stun.l.google.com:19302',
        },
      ],
    });

    pc.current.onicecandidate = (event) => {
      if (event.candidate) {
        ws.current.send(JSON.stringify({ type: 'ice-candidate', candidate: event.candidate }));
      }
    };

    pc.current.ontrack = (event) => {
      setRemoteStream(event.streams[0]);
    };

    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    setLocalStream(stream);
    stream.getTracks().forEach((track) => pc.current.addTrack(track, stream));

    const offer = await pc.current.createOffer();
    await pc.current.setLocalDescription(offer);
    ws.current.send(JSON.stringify({ type: 'offer', offer }));
  };

  const handleOffer = async (offer) => {
    if (pc.current) {
      await pc.current.setRemoteDescription(offer);
      const answer = await pc.current.createAnswer();
      await pc.current.setLocalDescription(answer);
      ws.current.send(JSON.stringify({ type: 'answer', answer }));
    }
  };

  const handleAnswer = async (answer) => {
    if (pc.current) {
      await pc.current.setRemoteDescription(answer);
    }
  };

  const handleIceCandidate = async (candidate) => {
    if (pc.current) {
      await pc.current.addIceCandidate(candidate);
    }
  };

  const hangUp = () => {
    if (pc.current) {
      pc.current.close();
    }
    if (localStream) {
      localStream.getTracks().forEach((track) => track.stop());
    }
    setLocalStream(null);
    setRemoteStream(null);
  };

  const toggleMute = () => {
    if (localStream) {
      localStream.getAudioTracks().forEach((track) => {
        track.enabled = !track.enabled;
      });
      setIsMuted(!isMuted);
    }
  };

  const toggleVideo = () => {
    if (localStream) {
      localStream.getVideoTracks().forEach((track) => {
        track.enabled = !track.enabled;
      });
      setIsVideoOff(!isVideoOff);
    }
  };

  const sendMessage = () => {
    if (message.trim() !== '') {
      const chatMessage = { type: 'chat-message', message, sender: 'me' };
      ws.current.send(JSON.stringify(chatMessage));
      setMessages((prevMessages) => [...prevMessages, chatMessage]);
      setMessage('');
    }
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('document', file);

      try {
        const res = await fetch(`${BASE_URL}/upload/document`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message);
        }

        const fileMessage = { type: 'chat-message', message: data.data.url, sender: 'me', isFile: true };
        ws.current.send(JSON.stringify(fileMessage));
        setMessages((prevMessages) => [...prevMessages, fileMessage]);

      } catch (err) {
        console.error('Error uploading file:', err);
      }
    }
  };

  return (
    <div className="bg-gray-900 text-white h-screen flex">
      <div className="flex-1 flex flex-col">
        <div className="relative flex-1 flex items-center justify-center">
          {remoteStream ? (
            <video ref={(video) => { if (video) video.srcObject = remoteStream; }} autoPlay playsInline className="w-full h-full object-cover"></video>
          ) : (
            <div className="text-2xl">Waiting for the other user to join...</div>
          )}
          {localStream && (
            <div className="absolute bottom-20 right-4 w-48 h-36 bg-gray-800 rounded-lg overflow-hidden shadow-lg">
              <video ref={(video) => { if (video) video.srcObject = localStream; }} autoPlay playsInline muted className="w-full h-full object-cover"></video>
            </div>
          )}
        </div>
        <div className="w-full bg-gray-800 bg-opacity-50 flex justify-center items-center p-4 space-x-4">
          <button onClick={toggleMute} className="p-3 bg-gray-700 rounded-full">
            {isMuted ? <FaMicrophoneSlash size={24} /> : <FaMicrophone size={24} />}
          </button>
          <button onClick={toggleVideo} className="p-3 bg-gray-700 rounded-full">
            {isVideoOff ? <FaVideoSlash size={24} /> : <FaVideo size={24} />}
          </button>
          <button onClick={hangUp} className="p-3 bg-red-600 rounded-full">
            <ImPhoneHangUp size={24} />
          </button>
          <button onClick={() => setIsChatOpen(!isChatOpen)} className="p-3 bg-gray-700 rounded-full">
            <BsChatDotsFill size={24} />
          </button>
          {!localStream && <button onClick={startCall} className="px-6 py-3 bg-green-600 rounded-full font-bold">Start Call</button>}
        </div>
      </div>
      {isChatOpen && (
        <div className="w-80 bg-gray-800 flex flex-col">
          <div className="p-4 border-b border-gray-700">
            <h3 className="text-lg font-bold">Chat</h3>
          </div>
          <div className="flex-1 p-4 overflow-y-auto">
            {messages.map((msg, index) => (
              <div key={index} className={`mb-2 ${msg.sender === 'me' ? 'text-right' : 'text-left'}`}>
                <span className={`inline-block p-2 rounded-lg ${msg.sender === 'me' ? 'bg-blue-600' : 'bg-gray-700'}`}>
                  {msg.isFile ? <a href={msg.message} target="_blank" rel="noopener noreferrer" className="text-white underline">{msg.message}</a> : msg.message}
                </span>
              </div>
            ))}
          </div>
          <div className="p-4 border-t border-gray-700 flex items-center">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              className="flex-1 bg-gray-700 text-white rounded-l-lg p-2 focus:outline-none"
              placeholder="Type a message..."
            />
            <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" />
            <button onClick={() => fileInputRef.current.click()} className="p-2 bg-gray-700">
              <AiOutlinePaperClip size={24} />
            </button>
            <button onClick={sendMessage} className="bg-blue-600 text-white p-2 rounded-r-lg">
              <IoMdSend size={24} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoCall;
