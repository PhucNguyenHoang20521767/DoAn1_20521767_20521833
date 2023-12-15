import React from "react";
import { Box, Button } from "@mui/material";
import "tailwindcss/tailwind.css";
import { styleButtonAddChat } from "@/utils/ui";
import TextField from "@/components/customs/nhTextField";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  Avatar,
} from "@chatscope/chat-ui-kit-react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";

interface Message {
  sender: string;
  content: string;
  timestamp: Date;
}

const ChatPage: React.FC = () => {
  const [message, setMessage] = React.useState("");
  const adminAvatar = "https://cdn-icons-png.flaticon.com/512/6596/6596121.png";
  const messages1: Message[] = [
    {
      sender: "Phuc",
      content: "Hello",
      timestamp: new Date(),
    },
    {
      sender: "Phuc",
      content: "How are you?",
      timestamp: new Date(),
    },
  ];
  const messages2: Message[] = [
    {
      sender: "Admin",
      content: "I'm fine, thank you",
      timestamp: new Date(),
    },
  ];
  const messages3: Message[] = [
    {
      sender: "Phuc",
      content: "I'm fine too",
      timestamp: new Date(),
    },
  ];
  const messages4: Message[] = [
    {
      sender: "Admin",
      content: "OK, any question?",
      timestamp: new Date(),
    },
  ];
  return (
    <Box className="mx-auto h-full max-h-[650px] w-full max-w-[396px]">
      <Box className="relative h-full overflow-auto p-1">
        <div style={{ position: "relative", height: "640px" }}>
          <MainContainer>
            <ChatContainer>
              <MessageList>
                {messages1.map((message, index) => (
                  <Message
                    key={index}
                    model={{
                      message: message.content,
                      sentTime: message.timestamp.toLocaleString(),
                      sender: message.sender,
                      direction: "outgoing", // or 'outgoing'
                      position: "single",
                    }}
                  ></Message>
                ))}
                {messages2.map((message, index) => (
                  <Message
                    key={index}
                    model={{
                      message: message.content,
                      sentTime: message.timestamp.toLocaleString(),
                      sender: message.sender,
                      direction: "incoming", // or 'outgoing'
                      position: "single",
                    }}
                  >
                    <Avatar src={adminAvatar} name={"Admin"} />
                  </Message>
                ))}
                {messages3.map((message, index) => (
                  <Message
                    key={index}
                    model={{
                      message: message.content,
                      sentTime: message.timestamp.toLocaleString(),
                      sender: message.sender,
                      direction: "outgoing", // or 'outgoing'
                      position: "single",
                    }}
                  ></Message>
                ))}
                {messages4.map((message, index) => (
                  <Message
                    key={index}
                    model={{
                      message: message.content,
                      sentTime: message.timestamp.toLocaleString(),
                      sender: message.sender,
                      direction: "incoming", // or 'outgoing'
                      position: "single",
                    }}
                  >
                    <Avatar src={adminAvatar} name={"Admin"} />
                  </Message>
                ))}
              </MessageList>
              <MessageInput placeholder="Type message here" />
            </ChatContainer>
          </MainContainer>
        </div>
      </Box>
      {/* <Box className="flex items-center justify-center p-4">
        <TextField
          label=""
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="Nhập tin nhắn..."
        />
        <Button
          variant="contained"
          color="primary"
          style={{
            marginRight: "2px",
            padding: "8px",
          }}
          sx={styleButtonAddChat}
        >
          <div className="flex items-center justify-center gap-2">
            <p>Gửi</p>
            <PaperAirplaneIcon className="h-4 w-4 text-white" />
          </div>
        </Button>
      </Box> */}
    </Box>
  );
};

export default ChatPage;
