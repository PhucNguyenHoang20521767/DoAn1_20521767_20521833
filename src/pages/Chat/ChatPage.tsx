import React from "react";
import { Box } from "@mui/material";
import "tailwindcss/tailwind.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  Avatar,
} from "@chatscope/chat-ui-kit-react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import "./chat.css";
import useFetchMessages from "./useFetchMessages";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import {
  createMessage,
  getAllMessagesForConversation,
} from "@/api/api_function";
import { io } from "socket.io-client";
import { hostURL } from "@/api/main_api";

// interface Message {
//   sender: string;
//   content: string;
//   timestamp: Date;
//   direction: "outgoing" | "incoming";
// }

export interface MessageItem {
  conversationId: string;
  senderId: string;
  messageText: string;
  messageSentDate: Date;
}

const ChatPage: React.FC = () => {
  const socket = io(hostURL);
  const id = useSelector((state: RootState) => state.auth.id);
  const conversation = useSelector((state: RootState) => state.conversation);
  const [messages, setMessages] = React.useState<MessageItem[]>([]);
  const [inputValue, setInputValue] = React.useState("");
  const [arrivalMessage, setArrivalMessage] = React.useState<MessageItem>({
    conversationId: "",
    senderId: "",
    messageText: "",
    messageSentDate: new Date(),
  });

  const adminAvatar =
    "data:image/jpeg;base64,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";

  const handleInputChange = (
    innerHtml: string,
    textContent: string,
    innerText: string,
    nodes: NodeList
  ) => {
    setInputValue(innerText);
  };

  const handleMessageSubmit = (
    innerHtml: string,
    textContent: string,
    innerText: string,
    nodes: NodeList
  ) => {
    const message = innerText;
    if (message.trim() === "") {
      // Show an error message
      return;
    }
    // Add the message to the messages array
    const newMessage: MessageItem = {
      conversationId: conversation._id,
      senderId: id,
      messageText: message,
      messageSentDate: new Date(),
    };
    try {
      const result = createMessage(
        newMessage.senderId,
        newMessage.conversationId,
        newMessage.messageText
      );

      socket.emit("sendMessage", {
        conversationId: newMessage.conversationId,
        senderId: newMessage.senderId,
        receiverId: "ADMIN-SOCKET",
        messageText: newMessage.messageText,
      });

      setMessages((prev) => [...prev, newMessage]);
    } catch (error) {
      console.log(error);
    }
    setInputValue("");
  };
  React.useEffect(() => {
    if (conversation._id !== "") {
      const fetchMessages = async () => {
        const result = await getAllMessagesForConversation(conversation._id);
        const initialMessages: MessageItem[] = result.data.data;
        setMessages(initialMessages);
      };
      fetchMessages();
    }
  }, [conversation]);

  React.useEffect(() => {
    if (socket) {
      socket.on("receiveMessage", (sender: string, text: string) => {
        if (sender === "ADMIN-SOCKET") {
          setArrivalMessage({
            conversationId: conversation._id,
            senderId: "ADMIN-SOCKET",
            messageText: text,
            messageSentDate: new Date(),
          });
        }
      });
    }
  }, [socket]);

  React.useEffect(() => {
    arrivalMessage.conversationId !== "" &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  React.useEffect(() => {
    socket.emit("addUser", id);
  }, []);

  return (
    <Box className="mx-auto h-full max-h-[650px] w-full max-w-[396px]">
      <Box className="relative h-full overflow-auto p-1">
        <div style={{ position: "relative", height: "640px" }}>
          <MainContainer>
            <ChatContainer>
              <MessageList>
                {messages.map((message, index) => (
                  <Message
                    key={index}
                    model={{
                      message: message.messageText,
                      sentTime: message.messageSentDate.toLocaleString(),
                      sender: message.senderId,
                      direction:
                        message.senderId === id ? "outgoing" : "incoming",
                      position: "single",
                    }}
                    className={`${
                      message.senderId !== id ? "admin-message" : "user-message"
                    }`}
                  >
                    {message.senderId !== id && (
                      <Avatar src={adminAvatar} name={"Admin"} />
                    )}
                  </Message>
                ))}
              </MessageList>
              <MessageInput
                placeholder="Nhập tin nhắn ở đây ..."
                value={inputValue}
                onChange={handleInputChange}
                onSend={handleMessageSubmit}
                attachButton={false}
              />
            </ChatContainer>
          </MainContainer>
        </div>
      </Box>
    </Box>
  );
};

export default ChatPage;
