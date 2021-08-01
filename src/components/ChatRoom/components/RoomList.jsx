import { PlusCircleOutlined } from "@ant-design/icons";
import { Button, Collapse, Typography } from "antd";
import React from "react";
import styled from "styled-components";
import { AppContext } from "../../../Context/AppProvider";

const { Panel } = Collapse;

const PanelStyled = styled(Panel)`
	&&& {
		.ant-collapse-header,
		p {
			color: #fff;
		}

		.ant-collapse-content-box {
			padding: 0 40px;
		}

		.add-room {
			color: #fff;
		}
		.ant-btn {
			color: #000;
			margin-top: 50px;
		}
	}
`;

const LinkStyled = styled(Typography.Link)`
	&&& {
		display: block;
		margin-bottom: 5px;
		color: #fff;
	}
`;

function RoomList(props) {
	const { rooms, setIsAddRoomVisible, setSelectedRoomId } = React.useContext(AppContext);
	const handleAddRoom = () => {
		setIsAddRoomVisible(true);
	};
	return (
		<Collapse ghost defaultActiveKey={"1"}>
			<PanelStyled header="Danh sách các phòng" key="1">
				{rooms.map((room) => (
					<LinkStyled key={room.id} onClick={() => setSelectedRoomId(room.id)}>
						{room.name}
					</LinkStyled>
				))}
				<Button
					type="dashed"
					icon={<PlusCircleOutlined />}
					className="add-room"
					onClick={handleAddRoom}
				>
					Thêm phòng
				</Button>
			</PanelStyled>
		</Collapse>
	);
}

export default RoomList;
