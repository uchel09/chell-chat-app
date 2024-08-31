import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Conversation, IMessages } from "@/types/conversation";
import axios from "axios";
import { putDataAPI } from "@/lib/api";
import { myToken } from "./authSlice";

interface ConversationState {
  conversations: Conversation[] | null;
  conversationsLoading: boolean;
  conversationLoading: boolean;
  sendLoading: boolean;
  conversation: Conversation | null;
  messages: IMessages[] | null;
}

const initialState: ConversationState = {
  conversations: null,
  sendLoading: false,
  conversation: null,
  conversationsLoading: false,
  conversationLoading: false,
  messages: null,
};

const conversationSlice = createSlice({
  name: "conversation",
  initialState,
  reducers: {
    setConversations(state, action: PayloadAction<Conversation[] | null>) {
      state.conversations = action.payload;
    },
    addMessage(state, action: PayloadAction<IMessages | null>) {
      if (action.payload) {
        state.messages?.unshift(action.payload);
      }
    },
    updateConversations(state, action: PayloadAction<Conversation | null>) {
      if (action.payload && state.conversations) {
        const conversationIndex = state.conversations.findIndex(
          (item) => item._id === action.payload?._id
        );

        if (conversationIndex !== -1) {
          // Ganti percakapan lama dengan percakapan baru
          state.conversations[conversationIndex] = action.payload;
        }
      }
    },
    updateConversationsSocket(state, action: PayloadAction<any>) {
      if (action.payload && state.conversations) {
        const conversationIndex = state.conversations.findIndex(
          (item) => item._id === action.payload.conversation?._id
        );

        const isConversation =
          action.payload.conversation._id === state.conversation?._id;
        if (conversationIndex !== -1) {
          if (isConversation) {
            state.conversations[conversationIndex] = {
              ...action.payload.conversation,
              unreadMessagesCount: 0,
            };
            const messageId = action.payload.message._id;
            const token = action.payload.token;
            state.messages?.unshift(action.payload.message);

            const updateIsRead = async () => {
              const res = await putDataAPI(
                "conversations/messages/update-isread",
                { messageId },
                token
              );
            };
            updateIsRead();
          } else {
            state.conversations[conversationIndex] = {
              ...action.payload.conversation,
              unreadMessagesCount:
                state.conversations[conversationIndex].unreadMessagesCount + 1,
            };
          }
        }
      }
    },

    setMessages(state, action: PayloadAction<IMessages[] | null>) {
      state.messages = action.payload;
    },
    setConversationsLoading(state, action: PayloadAction<boolean>) {
      state.conversationsLoading = action.payload;
    },
    setConversationLoading(state, action: PayloadAction<boolean>) {
      state.conversationLoading = action.payload;
    },
    setSendLoading(state, action: PayloadAction<boolean>) {
      state.sendLoading = action.payload;
    },

    setConversation(state, action: PayloadAction<Conversation | null>) {
      state.conversation = action.payload;
    },
    deleteMessage(state, action: PayloadAction<string>) {
      if (state.messages) {
        // Pastikan state.messages tidak null
        state.messages = state.messages.filter(
          (item) => item._id !== action.payload
        );
      }
    },
  },
});

export const {
  setConversations,
  setConversation,
  setConversationsLoading,
  setConversationLoading,
  setSendLoading,
  setMessages,
  addMessage,
  updateConversations,
  updateConversationsSocket,
  deleteMessage,
} = conversationSlice.actions;
export default conversationSlice.reducer;
