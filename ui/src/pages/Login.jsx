import { createContext, useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router";
import useSWR from "swr";


export function Login() {
	const [ username, setUsername ] = useState("");
	const [ password, setPassword ] = useState("");
	const navigate = useNavigate();

	const { data, error, isLoading } = useSWR(
    "http://localhost:8080/User", 
    (url) =>
      fetch(url)
        .then((res) => res.json())
  );

	if (isLoading) return <div>Is Loading...</div>;
  if (error) return <div>failed to load</div>;

	function doCookie() {
		if (document.cookie) {
			let userId = data.filter((row) => row.Username === document.cookie.split('; ')[0].split('=')[1])[0].Id
			return (<Link 
				to={`/Item/UserId/${userId}`}>
				Your_Items
			</Link>)
		} else return (<></>)
	}
	
	return (
		<>
			<Link to="/">Home</Link>
			<Link to="/register">Register</Link>
			<Link to="/User">Users</Link>
			<Link to="/Item">Items</Link>
			<Link to="/Post_Item">Post_Item</Link>
			<>{doCookie()}</>
			<p>Successful login will automatically navigate you to your items</p>
			<form onSubmit={(event) => {
				data.some(user => {
					if (user['Username'] === username && user['Password'] === password) {
						document.cookie = `username=${username};path=/;max-age=3600;SameSite=Strict`;
						document.cookie = `sessionToken=${password};path=/;max-age=3600;SameSite=Strict`;
						console.log(user["Id"]);
						navigate(`/Item/UserId/${user["Id"]}`);
						return true;
					}
					return false
				})
				event.preventDefault();
			}} >
        <input type="text" placeholder="Username" onChange={(event) => setUsername(event.target.value)} />
				<input type="password" placeholder="Password" onChange={(event) => setPassword(event.target.value)} />
        <input type="submit" />
      </form>
		</>
	)
}