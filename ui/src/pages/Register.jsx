import { createContext, useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router";
import useSWR from "swr";

export function Register() {
	const [ firstName, setFirstName ] = useState("");
	const [ lastName, setLastName ] = useState("");
	const [ username, setUsername ] = useState("");
	const [ password, setPassword ] = useState("");
	const navigate = useNavigate();

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
			<Link to="/">Home</Link>
			<Link to="/login">Login</Link>
			<Link to="/User">Users</Link>
			<Link to="/Item">Items</Link>
			<Link to="/Post_Item">Post_Item</Link>
			<>{doCookie()}</>
			<p>Successfully registering will auto-login then navigate you to your user data</p>
			<form onSubmit={(event) => {
				if (!data.some(user => {
					if (user['Username'] === username) {
						//document.cookie = `username=${username};path=/;max-age=3600;SameSite=Strict`;
						//document.cookie = `sessionToken=${password};path=/;max-age=3600;SameSite=Strict`;
						console.log(user["Id"]);
						//navigate(`/User/Id/${user["Id"]}`);
						return true;
					}
					return false
				})) {
					fetch(`http://localhost:8080/User`, {
						method: "POST",
						body: JSON.stringify({
							"First Name": firstName,
							"Last Name": lastName,
							"Username": username,
							"Password": password
						}),
						headers: {
							'Content-Type': 'application/json',
						}
					}).then(() => {
						document.cookie = `username=${username};path=/;max-age=3600;SameSite=Strict`;
						document.cookie = `sessionToken=${password};path=/;max-age=3600;SameSite=Strict`;
						navigate(`/User/Username/${username}`);
					})
				}
				event.preventDefault();
			}} >
				<input type="text" placeholder="First Name" onChange={(event) => setFirstName(event.target.value)} />
				<input type="text" placeholder="Last Name" onChange={(event) => setLastName(event.target.value)} />
        <input type="text" placeholder="Username" onChange={(event) => setUsername(event.target.value)} />
				<input type="password" placeholder="Password" onChange={(event) => setPassword(event.target.value)} />
        <input type="submit" />
      </form>
		</>
	)
}