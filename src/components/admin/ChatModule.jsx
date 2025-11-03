
import React, { useState } from 'react';
import { useData } from '@/contexts/DataContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send } from 'lucide-react';

const ChatModule = () => {
  const { users, chats, addMessageToChat } = useData();
  const { user: adminUser } = useAuth();
  const [selectedChat, setSelectedChat] = useState(null);
  const [message, setMessage] = useState('');

  const staffAndWorkers = users.filter(u => ['staff', 'worker'].includes(u.userType));

  const handleSelectChat = (user) => {
    const chatId = [adminUser.id, user.id].sort().join('-');
    const chat = chats.find(c => c.id === chatId) || { id: chatId, messages: [], participants: [adminUser.id, user.id] };
    setSelectedChat(chat);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim() || !selectedChat) return;
    const newMessage = {
      senderId: adminUser.id,
      text: message,
      timestamp: new Date().toISOString(),
    };
    addMessageToChat(selectedChat.id, newMessage);
    setMessage('');
  };

  const getUserName = (userId) => {
    if (userId === adminUser.id) return "Admin";
    const user = users.find(u => u.id === userId);
    return user ? `${user.personalInfo.firstName} ${user.personalInfo.lastName}` : 'Unknown';
  };

  return (
    <div className="glass-effect rounded-2xl p-6 h-[600px] flex gap-6">
      <div className="w-1/3 border-r pr-6">
        <h3 className="text-xl font-bold mb-4">Staff & Workers</h3>
        <ScrollArea className="h-full">
          {staffAndWorkers.map(user => (
            <div key={user.id} onClick={() => handleSelectChat(user)} className="p-2 rounded-lg hover:bg-gray-100 cursor-pointer">
              <p className="font-semibold">{user.personalInfo.firstName} {user.personalInfo.lastName}</p>
              <p className="text-sm text-gray-500">{user.userType}</p>
            </div>
          ))}
        </ScrollArea>
      </div>
      <div className="w-2/3 flex flex-col">
        {selectedChat ? (
          <>
            <h3 className="text-xl font-bold mb-4 border-b pb-2">
              Chat with {getUserName(selectedChat.participants.find(p => p !== adminUser.id))}
            </h3>
            <ScrollArea className="flex-grow mb-4 p-4 bg-gray-50 rounded-lg">
              {selectedChat.messages.map((msg, index) => (
                <div key={index} className={`mb-4 flex ${msg.senderId === adminUser.id ? 'justify-end' : 'justify-start'}`}>
                  <div className={`p-3 rounded-lg max-w-xs ${msg.senderId === adminUser.id ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
                    <p className="text-sm">{msg.text}</p>
                    <p className="text-xs opacity-70 mt-1 text-right">{new Date(msg.timestamp).toLocaleTimeString()}</p>
                  </div>
                </div>
              ))}
            </ScrollArea>
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <Input value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type a message..." />
              <Button type="submit" size="icon"><Send className="h-4 w-4" /></Button>
            </form>
          </>
        ) : (
          <div className="flex-grow flex items-center justify-center text-gray-500">
            <p>Select a user to start chatting.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatModule;
