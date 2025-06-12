import { message } from "antd";
import { MessageContext } from "@root/contexts/message.context";

export const MessageProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const [messageApi, contextHolder] = message.useMessage();

	return (
		<MessageContext.Provider value={[messageApi, contextHolder]}>
			{contextHolder}
			{children}
		</MessageContext.Provider>
	);
};
