import { Col, Row } from "antd";
import React from "react";
import styled from "styled-components";
import RoomList from "./RoomList";
import UserInfo from "./UserInfo";

const SidebarStyled = styled.div`
	background: #5468ff;
	color: #fff;
	height: 100vh;
`;

function SideBar(props) {
	return (
		<SidebarStyled>
			<Row>
				<Col span={24}>
					<UserInfo />
				</Col>
				<Col span={24}>
					<RoomList />
				</Col>
			</Row>
		</SidebarStyled>
	);
}

export default SideBar;
