import { Link } from "react-router";
import useSWR from "swr";
import { createContext, useContext, useEffect, useState } from "react";

export function Post_Item () {
	const [ itemName, setItemName ] = useState("");
	const [ description, setdescription ] = useState("");
	const [ quantity, setQuantity ] = useState("");
	
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

	if (!document.cookie) return <><p>Please login to recieve a cookie</p><Link to="/register">Register</Link><Link to="/login">Login</Link></>;
	if (isLoading) return <div>Is Loading...</div>;
  if (error) return <><p>failed to load</p><Link to="/">Home</Link></>;

	return (<>
		<Link to="/">Home</Link>
		<Link to="/login">Login</Link>
		<Link to="/User">Users</Link>
		<Link to="/Item">Items</Link>
		<>{doCookie()}</>
		<form onSubmit={(event) => {
			data.some(user => {
				if (user['Username'] === document.cookie.split('; ')[0].split('=')[1]) {
					fetch(`http://localhost:8080/Item`, {
						method: "POST",
						body: JSON.stringify({
							"UserId": user["Id"],
							"Item Name": itemName,
							"Description": description,
							"Quantity": quantity
						}),
						headers: {
							'Content-Type': 'application/json',
						}
					})
					return true;
				}
				return false
			})
			//event.preventDefault();
		}} >
			<input type="text" placeholder="Item Name" onChange={(event) => setItemName(event.target.value)} />
			<input type="text" placeholder="Description" onChange={(event) => setdescription(event.target.value)} />
			<input type="text" placeholder="Quantity" onChange={(event) => setQuantity(event.target.value)} />
			<input type="submit" />
		</form>
	</>)
}