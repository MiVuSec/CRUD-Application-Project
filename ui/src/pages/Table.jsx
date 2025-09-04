import { createContext, useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router";
import useSWR from "swr";

export function Table() {
	const { table, column, userId } = useParams();
  const { data, error, isLoading } = useSWR(
    `http://localhost:8080/${table}/${column}/${userId}`, 
    (url) =>
      fetch(url)
        .then((res) => res.json())
  );

	if (isLoading) return <div>Is Loading...</div>;
  if (error) {
		return <div>failed to load</div>;
	}

	return (
		<>
			<Link to="/">Home</Link>
			<Link to="/register">Register</Link>
			<Link to="/login">Login</Link>
      {table.toLowerCase() === 'item' ? <Link to="/User">Users</Link> : <Link to="/Item">Items</Link>}
			<table border="1">
        <thead>
          <tr>
            {Object.keys(data[0]).map((key) => (
              <th key={key}>{key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.Id}>
              {Object.values(row).map((value, index) => (
                <td key={index}>
                  <input type="text" defaultValue={value} onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                      row[Object.keys(row)[index]] = event.target.value;
                      console.log(table, row.Id, Object.keys(row)[index], event.target.value, row)
                      fetch(`http://localhost:8080/${table}/${row.Id}`, {
                        method: "PATCH",
                        body: JSON.stringify(row),
                        headers: {
                          'Content-Type': 'application/json',
                        }
                      })
                    }
                  }} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
		</>
	)
}