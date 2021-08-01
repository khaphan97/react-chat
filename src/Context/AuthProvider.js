import { Spin } from "antd";
import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { auth } from "../firebase/config";

export const AuthContext = React.createContext();

const SpinStyled = styled(Spin)`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
`;

function AuthProvider({ children }) {
	const [user, setUser] = React.useState({});
	const [isLoading, setIsLoading] = React.useState(true);
	const history = useHistory();
	console.log("history", history);
	const x = 1;
	React.useEffect(() => {
		const unsubscribed = auth.onAuthStateChanged((user) => {
			if (user) {
				const { displayName, email, uid, photoURL } = user;
				setUser({
					displayName,
					email,
					uid,
					photoURL,
				});
				setIsLoading(false);
				history.push("/");
				return;
			}
			setIsLoading(false);
			history.push("/login");
			console.log(x);
		});

		//Clean function
		return () => {
			unsubscribed();
		};
	}, [history]);

	return (
		<AuthContext.Provider value={{ user }}>
			{isLoading ? <SpinStyled /> : children}
		</AuthContext.Provider>
	);
}

export default AuthProvider;
