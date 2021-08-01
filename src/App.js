import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import ChatRoom from "./components/ChatRoom";
import Login from "./components/Login";
import AddRoomModal from "./components/Modals/AddRoomModal";
import InviteMemberModal from "./components/Modals/InviteMemberModal";
import AppProvider from "./Context/AppProvider";
import AuthProvider from "./Context/AuthProvider";

function App() {
	return (
		<Router>
			<AuthProvider>
				<AppProvider>
					<Switch>
						<Route component={Login} path="/login" />
						<Route component={ChatRoom} path="/" />
					</Switch>
					<AddRoomModal/>
					<InviteMemberModal/>
				</AppProvider>
			</AuthProvider>
		</Router>
	);
}

export default App;
