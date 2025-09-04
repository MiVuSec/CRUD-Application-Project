import { Link } from "react-router";

export function Home() {
	return (
		<>
			<h1>CRUD Application Project</h1>
			<h3>By: MiVuSec</h3>
			<Link to="/login">Login</Link>
			<Link to="/register">Register</Link>
			<Link to="/User">Users</Link>
			<Link to="/Item">Items</Link>
		</>
	)
}