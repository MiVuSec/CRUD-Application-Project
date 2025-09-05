import { Link } from "react-router";
import useSWR from "swr";

export function Home() {
	const { data, error, isLoading } = useSWR(
    "http://localhost:8080/User", 
    (url) =>
      fetch(url)
        .then((res) => res.json())
  );

	function doCookie() {
		if (document.cookie) {
			let userId = data.filter((row) => row.Username === document.cookie.split('; ')[0].split('=')[1])[0].Id
			return (<Link 
				to={`/Item/UserId/${userId}`}>
				Your_Items
			</Link>)
		} else return (<></>)
	}

	if (isLoading) return <div>Is Loading...</div>;
  if (error) return <div>failed to load</div>;
	
	return (
		<>
			<h1>CRUD Application Project</h1>
			<h3>By: MiVuSec</h3>
			<Link to="/login">Login</Link>
			<Link to="/register">Register</Link>
			<Link to="/User">Users</Link>
			<Link to="/Item">Items</Link>
			<Link to="/Post_Item">Post_Item</Link>
			<>{doCookie()}</>
		</>
	)
}