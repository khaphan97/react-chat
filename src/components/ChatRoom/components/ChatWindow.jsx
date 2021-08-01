import { UserAddOutlined } from "@ant-design/icons";
import { Alert, Avatar, Button, Form, Input, Tooltip } from "antd";
import React from "react";
import styled from "styled-components";
import { AppContext } from "../../../Context/AppProvider";
import { AuthContext } from "../../../Context/AuthProvider";
import { addDocument } from "../../../firebase/services";
import useFirestore from "../../../hooks/useFirestore";
import Message from "./Message";

const WrapperStyled = styled.div`
	height: 100vh;
`;

const HeaderStyled = styled.div`
	display: flex;
	justify-content: space-between;
	height: 56px;
	padding: 0 16px;
	align-items: center;
	border-bottom: 1px solid rgb(230, 230, 230);

	.header {
		&__info {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
		}

		&__title {
			margin: 0;
			font-weight: bold;
		}

		&__desc {
			font-size: 12px;
		}
	}
`;

const ButtonGroupStyled = styled.div`
	display: flex;
	align-items: center;
`;

const ContentStyled = styled.div`
	height: calc(100% - 56px);
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
`;

const FormStyled = styled(Form)`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 2px 2px 2px 0px;
	border: 1px solid rgba(230, 230, 230);
	border-radius: 2px;

	.ant-form-item {
		flex: 1;
		margin-bottom: 0;
		padding: 10px;
	}
`;

const MessageListStyled = styled.div`
	max-height: 100%;
	overflow-y: scroll;
`;
function ChatWindow(props) {
	const { selectedRoom, members, setIsInviteMemberVisible } = React.useContext(AppContext);
	const {
		user: { uid, photoURL, displayName },
	} = React.useContext(AuthContext);

	const [inputValue, setInputValue] = React.useState("");
	const [form] = Form.useForm();

	const handleInputChange = (e) => {
		setInputValue(e.target.value);
	};

	const handleOnSubmit = () => {
		addDocument("messages", {
			text: inputValue,
			uid,
			photoURL,
			roomId: selectedRoom.id,
			displayName,
		});
		form.resetFields(["message"]);
	};

	const messageConditions = React.useMemo(() => {
		return {
			fieldName: "roomId",
			operator: "==",
			compareValue: selectedRoom.id,
		};
	}, [selectedRoom.id]);

	const messages = useFirestore("messages", messageConditions);

	return (
		<WrapperStyled>
			{selectedRoom?.id ? (
				<>
					<HeaderStyled>
						<div className="header__info">
							<p className="header__title"> {selectedRoom?.name}</p>
							<span className="header__desc">{selectedRoom?.description}</span>
						</div>
						<ButtonGroupStyled>
							<Button
								icon={<UserAddOutlined />}
								type="text"
								onClick={() => setIsInviteMemberVisible(true)}
							>
								Mời
							</Button>
							<Avatar.Group size="small" maxCount={2}>
								{members.map((member) => (
									<Tooltip key={member.id} title={member.displayName}>
										<Avatar src={members.photoURL}>
											{members.photoURL ? "" : member.displayName?.charAt(0).toUpperCase()}
										</Avatar>
									</Tooltip>
								))}
							</Avatar.Group>
						</ButtonGroupStyled>
					</HeaderStyled>
					<ContentStyled>
						<MessageListStyled>
							{messages.map((message) => (
								<Message
									key={message.id}
									text={message.text}
									displayName={message.displayName}
									createdAt={message.createdAt?.seconds}
									photoURL={message.photoURL}
								/>
							))}
						</MessageListStyled>
						<FormStyled form={form}>
							<Form.Item name="message">
								<Input
									placeholder="Nhập tin nhắn..."
									bordered={false}
									autoComplete="off"
									onChange={handleInputChange}
									onPressEnter={handleOnSubmit}
									value={inputValue}
								/>
							</Form.Item>
							<Button type="primary" onClick={handleOnSubmit}>
								Gửi
							</Button>
						</FormStyled>
					</ContentStyled>{" "}
				</>
			) : (
				<Alert
					message="Hãy chọn phòng để bắt đầu chat"
					type="info"
					showIcon
					style={{ margin: "5px" }}
				/>
			)}
		</WrapperStyled>
	);
}

export default ChatWindow;
