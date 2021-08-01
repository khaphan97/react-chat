import React from "react";
import useFirestore from "../hooks/useFirestore";
import { AuthContext } from "./AuthProvider";

export const AppContext = React.createContext();

function AppProvider({ children }) {
	const [isAddRoomVisible, setIsAddRoomVisible] = React.useState(false);
	const [isInviteMemberVisible, setIsInviteMemberVisible] = React.useState(false);
	const [selectedRoomId, setSelectedRoomId] = React.useState("");

	const {
		user: { uid },
	} = React.useContext(AuthContext);

	const roomConditions = React.useMemo(() => {
		return {
			fieldName: "members",
			operator: "array-contains",
			compareValue: uid,
		};
	}, [uid]);

	const rooms = useFirestore("rooms", roomConditions);

	const selectedRoom = React.useMemo(() => {
		return rooms.find((room) => room.id === selectedRoomId) || {};
	}, [rooms, selectedRoomId]);

	const userConditions = React.useMemo(() => {
		return {
			fieldName: "uid",
			operator: "in",
			compareValue: selectedRoom?.members,
		};
	}, [selectedRoom]);

	const members = useFirestore("users", userConditions);

	return (
		<AppContext.Provider
			value={{
				rooms,
				members,
				isAddRoomVisible,
				setIsAddRoomVisible,
				selectedRoomId,
				setSelectedRoomId,
				selectedRoom,
				isInviteMemberVisible,
				setIsInviteMemberVisible,
			}}
		>
			{children}
		</AppContext.Provider>
	);
}

export default AppProvider;
