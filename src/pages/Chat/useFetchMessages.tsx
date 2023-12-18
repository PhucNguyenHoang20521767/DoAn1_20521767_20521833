import React from "react";
import { getAllMessagesForConversation } from "@/api/api_function";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { RootState } from "@/redux/store/store";
import { MessageItem } from "./ChatPage";

const useFetchMessages = () => {
  const conversation = useSelector((state: RootState) => state.conversation);
  const currentUser = useSelector((state: RootState) => state.auth.currentUser);
  const [initialMessages, setMessages] = React.useState([]);

  React.useEffect(() => {
    const fetchMessages = async () => {
      const result = await getAllMessagesForConversation(conversation._id);
      setMessages(result.data.data);
      console.log("resultMessage", result.data.data);
    };
    fetchMessages();
  }, []);

  return initialMessages as MessageItem[];
};

export default useFetchMessages;
