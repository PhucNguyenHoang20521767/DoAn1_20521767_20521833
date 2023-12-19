import { createConversation, getUserConversation } from "@/api/api_function";

import { IConversationState } from "@/redux/reducers/conversation_reducers";

export const fetchConversation = async (token: string) => {
  try {
    const result = await getUserConversation(token);
    const conversationData = result.data.data;
    console.log("resultConver", result);
    console.log("conversationData", conversationData.length);

    if (conversationData.length === 0) {
      console.log("createConversation", token);
      const resultTwo = await createConversation(token);
      console.log("resultTwo", resultTwo);
      if (resultTwo.data.success) {
        fetchConversation(token);
      } else {
        console.log("error");
        return "error";
      }
    }

    return conversationData[0] as IConversationState;
  } catch (error) {
    console.log(error);
  }
};
