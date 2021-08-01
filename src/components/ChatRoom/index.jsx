import { Col, Row } from "antd";
import React from "react";
import ChatWindow from "./components/ChatWindow";
import SideBar from "./components/SideBar";

function ChatRoom(props) {
	return (
		<Row>
			<Col span={6}>
				<SideBar />
			</Col>
			<Col span={18}>
				<ChatWindow />
			</Col>
		</Row>
	);
}

export default ChatRoom;
 