import { getDataAPI, postDataAPI } from "@/lib/api";
import { AppThunk } from "../store";
import {
  addMessage,
  setConversations,
  setConversationsLoading,
  setMessages,
  setSendLoading,
  updateConversations,
} from "../slices/conversationsSlice";

interface GetConversationsPayload {
  q?: string;
  token: string;
  conversationId?: string;
}
interface SendMessagePayload {
  text: string;
  token: string;
  conversationId: string;
  recipient: string;
  call: object;
  media: string[];
}

export const GetConversations =
  ({ q, token }: GetConversationsPayload): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(setConversationsLoading(true));
      //   const socket = getState().socket.socket;
      const res = await getDataAPI(
        `conversations${q && `?q=${q}`}`,

        token
      );
      dispatch(setConversations(res.data.conversations));
    } catch (error: any) {
    } finally {
      dispatch(setConversationsLoading(false));
    }
  };
export const sendMessage =
  ({
    text,
    token,
    conversationId,
    recipient,
    media,
    call,
  }: SendMessagePayload): AppThunk =>
  async (dispatch, getState) => {
    // const { sender, recipient, text, media, call } = req.body;
    const socket = getState().socket.socket;
    try {
      dispatch(setSendLoading(true));
      //   const socket = getState().socket.socket;
      const res = await postDataAPI(
        `conversations/messages?token=${token}`,
        {
          text,
          conversationId,
          recipient,
          media,
          call,
        },
        token
      );

      dispatch(addMessage(res.data.message));
      dispatch(
        updateConversations({
          ...res.data.conversation,
          unreadMessagesCount: 0,
        })
      );
      socket?.emit("send-message", {
        message: res.data.message,
        conversation: {
          ...res.data.conversation,
        },
      });
    } catch (error: any) {
      throw error;
    } finally {
      dispatch(setSendLoading(false));
    }
  };
export const getMessages =
  ({ token, conversationId }: GetConversationsPayload): AppThunk =>
  async (dispatch, getState) => {
    try {
      const socket = getState().socket.socket;
      const user = getState().auth.user;

      const res = await getDataAPI(
        `conversations/messages?conversationId=${conversationId}`,
        token
      );

      dispatch(setMessages(res.data.messages));
    } catch (error) {
      console.log(error);
    }
  };
