import { createContext } from "react";
import type { MessageInstance } from "antd/es/message/interface";

export const MessageContext = createContext<
	readonly [MessageInstance, React.ReactElement] | null
>(null);
