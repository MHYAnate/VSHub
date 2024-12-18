import { MessagesAnnotation } from "@langchain/langgraph";

export type AgentState = typeof MessagesAnnotation.State;

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  timestamp: number;
}

export interface AgentResponse {
  response: string;
  messages: any[];
  error?: string;
}