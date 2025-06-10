import { createContext, useContext, useMemo } from "react";
// UI frameworks
import { message } from "antd";

const MessageContext = createContext<ReturnType<
  typeof message.useMessage
> | null>(null);

export const MessageProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [messageApi, contextHolder] = message.useMessage();

  const value = useMemo(
    () => [messageApi, contextHolder] as const,
    [messageApi, contextHolder]
  );

  return (
    <MessageContext.Provider value={value}>
      {contextHolder}
      {children}
    </MessageContext.Provider>
  );
};

export const useMessageApi = () => {
  const context = useContext(MessageContext);

  if (!context) {
    throw new Error("useMessageApi must be used within a MessageProvider");
  }

  return context;
};
