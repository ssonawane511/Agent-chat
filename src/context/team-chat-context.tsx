import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
  type ReactNode,
} from "react";

import { AGENT_LIST } from "../constants/agents";
import type { AgentId, ChatSession, Message } from "../types/chat";

const ALL_AGENT_IDS = AGENT_LIST.map((agent) => agent.id);

function createId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function createEmptySession(): ChatSession {
  return {
    id: createId(),
    title: "New chat",
    messages: [],
    updatedAt: Date.now(),
  };
}

function titleFromMessages(messages: Message[], fallback = "New chat"): string {
  const firstUser = messages.find((message) => message.role === "user");
  if (!firstUser) return fallback;
  const text = firstUser.text.trim();
  if (text.length <= 42) return text;
  return `${text.slice(0, 42).trim()}…`;
}

type TeamChatContextValue = {
  messages: Message[];
  inputText: string;
  setInputText: (text: string) => void;
  isEmpty: boolean;
  activeSessionId: string;
  activeAgents: AgentId[];
  previousChats: ChatSession[];
  isHistoryOpen: boolean;
  isAgentSheetOpen: boolean;
  openHistory: () => void;
  closeHistory: () => void;
  openAgentSheet: () => void;
  closeAgentSheet: () => void;
  toggleAllAgents: () => void;
  toggleAgent: (agentId: AgentId) => void;
  loadChat: (sessionId: string) => void;
  deleteChat: (sessionId: string) => void;
  startNewChat: () => void;
  sendMessage: () => void;
};

const TeamChatContext = createContext<TeamChatContextValue | null>(null);

export function TeamChatProvider({ children }: { children: ReactNode }) {
  const initialSessionRef = useRef<ChatSession | null>(null);
  if (initialSessionRef.current === null) {
    initialSessionRef.current = createEmptySession();
  }
  const initialSession = initialSessionRef.current;

  const [sessions, setSessions] = useState<ChatSession[]>(() => [initialSession]);
  const [activeSessionId, setActiveSessionId] = useState(initialSession.id);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isAgentSheetOpen, setIsAgentSheetOpen] = useState(false);
  const [activeAgents, setActiveAgents] = useState<AgentId[]>(ALL_AGENT_IDS);
  const [inputText, setInputText] = useState("");

  const activeSession =
    sessions.find((session) => session.id === activeSessionId) ?? sessions[0];
  const messages = activeSession?.messages ?? [];
  const isEmpty = messages.length === 0;

  const previousChats = sessions
    .filter((session) => session.messages.length > 0)
    .sort((a, b) => b.updatedAt - a.updatedAt);

  const resetTransientState = useCallback(() => {
    setInputText("");
  }, []);

  const updateActiveSession = useCallback(
    (updater: (session: ChatSession) => ChatSession) => {
      setSessions((current) =>
        current.map((session) =>
          session.id === activeSessionId ? updater(session) : session,
        ),
      );
    },
    [activeSessionId],
  );

  const appendMessage = useCallback(
    (message: Message) => {
      updateActiveSession((session) => {
        const nextMessages = [...session.messages, message];
        return {
          ...session,
          messages: nextMessages,
          title: titleFromMessages(nextMessages, session.title),
          updatedAt: Date.now(),
        };
      });
    },
    [updateActiveSession],
  );

  const openHistory = useCallback(() => {
    setIsAgentSheetOpen(false);
    setIsHistoryOpen(true);
  }, []);

  const closeHistory = useCallback(() => {
    setIsHistoryOpen(false);
  }, []);

  const openAgentSheet = useCallback(() => {
    setIsHistoryOpen(false);
    setIsAgentSheetOpen(true);
  }, []);

  const closeAgentSheet = useCallback(() => {
    setIsAgentSheetOpen(false);
  }, []);

  const toggleAllAgents = useCallback(() => {
    setActiveAgents((current) =>
      current.length === ALL_AGENT_IDS.length ? [ALL_AGENT_IDS[0]] : ALL_AGENT_IDS,
    );
  }, []);

  const toggleAgent = useCallback((agentId: AgentId) => {
    setActiveAgents((current) => {
      const allSelected = current.length === ALL_AGENT_IDS.length;

      if (allSelected) {
        const next = ALL_AGENT_IDS.filter((id) => id !== agentId);
        return next.length === 0 ? [agentId] : next;
      }

      if (current.includes(agentId)) {
        const next = current.filter((id) => id !== agentId);
        return next.length === 0 ? [agentId] : next;
      }

      return [...current, agentId];
    });
  }, []);

  const loadChat = useCallback(
    (sessionId: string) => {
      resetTransientState();
      setActiveSessionId(sessionId);
      setIsHistoryOpen(false);
    },
    [resetTransientState],
  );

  const deleteChat = useCallback(
    (sessionId: string) => {
      resetTransientState();

      setSessions((current) => {
        const filtered = current.filter((session) => session.id !== sessionId);

        if (filtered.length === 0) {
          const newSession = createEmptySession();
          setActiveSessionId(newSession.id);
          return [newSession];
        }

        if (sessionId === activeSessionId) {
          const nextActive =
            filtered.find((session) => session.messages.length > 0) ?? filtered[0];
          setActiveSessionId(nextActive.id);
        }

        return filtered;
      });
    },
    [activeSessionId, resetTransientState],
  );

  const startNewChat = useCallback(() => {
    resetTransientState();

    const current = sessions.find((session) => session.id === activeSessionId);
    const alreadyEmpty = !current || current.messages.length === 0;

    if (alreadyEmpty) {
      setIsHistoryOpen(false);
      return;
    }

    const newSession = createEmptySession();
    setSessions((currentSessions) => [newSession, ...currentSessions]);
    setActiveSessionId(newSession.id);
    setIsHistoryOpen(false);
  }, [activeSessionId, resetTransientState, sessions]);

  const sendMessage = useCallback(() => {
    const text = inputText.trim();
    if (!text) return;

    appendMessage({ id: createId(), role: "user", text });
    setInputText("");
  }, [appendMessage, inputText]);

  const value: TeamChatContextValue = {
    messages,
    inputText,
    setInputText,
    isEmpty,
    activeSessionId,
    activeAgents,
    previousChats,
    isHistoryOpen,
    isAgentSheetOpen,
    openHistory,
    closeHistory,
    openAgentSheet,
    closeAgentSheet,
    toggleAllAgents,
    toggleAgent,
    loadChat,
    deleteChat,
    startNewChat,
    sendMessage,
  };

  return (
    <TeamChatContext.Provider value={value}>{children}</TeamChatContext.Provider>
  );
}

export function useTeamChatContext(): TeamChatContextValue {
  const context = useContext(TeamChatContext);
  if (!context) {
    throw new Error("useTeamChatContext must be used within TeamChatProvider");
  }
  return context;
}
