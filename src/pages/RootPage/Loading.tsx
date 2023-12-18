import { createConversation, getUserConversation } from "@/api/api_function";

import { IConversationState } from "@/redux/reducers/conversation_reducers";

export const fetchConversation = async (userId: string) => {
  try {
    const result = await getUserConversation(userId);
    const conversationData = result.data.data;
    console.log("conversationData", conversationData);

    if (conversationData.length < 0) {
      const resultTwo = await createConversation(userId);
      if (resultTwo.data.success) {
        return "create conversation success";
      }
    }

    return conversationData[0] as IConversationState;
  } catch (error) {
    console.log(error);
  }
};
