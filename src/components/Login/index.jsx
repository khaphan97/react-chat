import { FacebookOutlined } from "@ant-design/icons";
import { Button, Col, Row, Typography } from "antd";
import React from "react";
import styled from "styled-components";
import firebase, { auth } from "../../firebase/config";
import { addDocument, generateKeywords } from "../../firebase/services";

const fbProvider = new firebase.auth.FacebookAuthProvider();

const WrapperStyled = styled(Row)`
	background: url("https://images.pexels.com/photos/1261728/pexels-photo-1261728.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940");
	background-size: cover;
	background-repeat: no-repeat;
	height: 100vh;
	align-items: center;
	justify-content: center;

	.ant-typography{
		text-shadow: 0 0 5px #a3a3a3;
	}
	
`;

function Login(props) {
	const handleFacebookLogin = async () => {
		const { additionalUserInfo, user } = await auth.signInWithPopup(fbProvider);
		if (additionalUserInfo?.isNewUser) {
			addDocument("users", {
				displayName: user.displayName,
				email: user.email,
				photoURL: user.photoURL,
				uid: user.uid,
				providerId: additionalUserInfo.providerId,
				keywords: generateKeywords(user.displayName),
			});
		}
	};

	return (
		<div>
			<WrapperStyled>
				<Col span={8}>
					<Typography.Title style={{ textAlign: "center" , color: "white"}} level={3}>
						REACTJS CHAT APP
					</Typography.Title>
					<Button style={{ width: "100%" }} size="large" type="primary" onClick={handleFacebookLogin}>
						<FacebookOutlined twoToneColor="#eb2f96" /> Đăng nhập bằng Facebook
					</Button>
				</Col>
			</WrapperStyled>
		</div>
	);
}

export default Login;
