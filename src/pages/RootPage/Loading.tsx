import { createConversation, getUserConversation } from "@/api/api_function";

import { IConversationState } from "@/redux/reducers/conversation_reducers";

export const fetchConversation = async (token: string) => {
  try {
    const result = await getUserConversation(token);
    const conversationData = result.data.data;

    if (conversationData.length === 0) {
      const resultTwo = await createConversation(token);
      if (resultTwo.data.success) {
        fetchConversation(token);
      } else {
        return "error";
      }
    }

    return conversationData[0] as IConversationState;
  } catch (error) {
    console.log("error in fetchConversation");
  }
};
