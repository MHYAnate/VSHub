import { TavilySearchResults } from "@langchain/community/tools/tavily_search";
import { ChatOpenAI } from "@langchain/openai";
import { ToolNode } from "@langchain/langgraph/prebuilt";

// Initialize tools
export const tools = [new TavilySearchResults({ maxResults: 3 })];
export const toolNode = new ToolNode(tools);

// Initialize model
export const model = new ChatOpenAI({
  modelName: "gpt-4",
  temperature: 0,
}).bindTools(tools);