import { Form, Input, Modal } from "antd";
import React from "react";
import { AppContext } from "../../Context/AppProvider";
import { AuthContext } from "../../Context/AuthProvider";
import { addDocument } from "../../firebase/services";

function AddRoomModal(props) {
	const { isAddRoomVisible, setIsAddRoomVisible } = React.useContext(AppContext);
	const {
		user: { uid },
	} = React.useContext(AuthContext);
	const [form] = Form.useForm();

	const handleOk = () => {
		// logic
		addDocument("rooms", { ...form.getFieldValue(), members: [uid] });
		form.resetFields();
		setIsAddRoomVisible(false);
	};

	const handleCancel = () => {
		form.resetFields();
		setIsAddRoomVisible(false);
	};

	return (
		<Modal title="Tạo phòng" visible={isAddRoomVisible} onOk={handleOk} onCancel={handleCancel}>
			<Form form={form} layout="vertical">
				<Form.Item label="Tên phòng" name="name">
					<Input placeholder="Nhập tên phòng" />
				</Form.Item>
				<Form.Item label="Mô tả" name="description">
					<Input.TextArea placeholder="Nhập mô tả" />
				</Form.Item>
			</Form>
		</Modal>
	);
}

export default AddRoomModal;
