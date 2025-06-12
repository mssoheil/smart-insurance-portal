import { useContext } from "react";
import { MessageContext } from "@root/contexts/message.context";

export const useMessageApi = () => {
	const context = useContext(MessageContext);

	if (!context) {
		throw new Error("useMessageApi must be used within a MessageProvider");
	}

	return context;
};
