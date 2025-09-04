import { createContext, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router";
import useSWR from "swr";

export function Register() {
	
	return (
		<>
			<Link to="/">Home</Link>
			<Link to="/login">Login</Link>
			<Link to="/User">Users</Link>
			<Link to="/Item">Items</Link>
		</>
	)
}