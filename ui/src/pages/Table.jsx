import { createContext, useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router";
import useSWR from "swr";
// import styled from 'styled-components';
// Link = styled.div`
//   padding: 5px;
// `;

export function Table() {
	const { table, column, userId } = useParams();
  const { data, error, isLoading, mutate } = useSWR(
    `http://localhost:8080/${table}/${column}/${userId}`, 
    (url) =>
      fetch(url)
        .then((res) => res.json())
  );

  function doCookie() {
		if (document.cookie && table === 'User') {
			let userId = data.filter((row) => row.Username === document.cookie.split('; ')[0].split('=')[1])[0].Id
			return (<Link 
				to={`/Item/UserId/${userId}`}>
				Your_Items
			</Link>)
		} else return (<></>)
	}

  const [columnOne, setColumnOne] = useState("")
  const [columnTwo, setColumnTwo] = useState("")
  const [columnThree, setColumnThree] = useState("")
  const [columnFour, setColumnFour] = useState("")

	if (isLoading) return <div>Is Loading...</div>;
  if (error) {
		return <><p>failed to load</p><Link to="/">Home</Link></>;
	}

	return (
		<>
			<Link to="/">Home</Link>
			<Link to="/register">Register</Link>
			<Link to="/login">Login</Link>
      <Link to="/Post_Item">Post_Item</Link>
      <>{doCookie()}</>
      {table.toLowerCase() === 'item' ? <Link to="/User" reloadDocument >Users</Link> : <Link to="/Item" reloadDocument >Items</Link>}
			<p>Edit a cell then press ENTER within the cell to PATCH the data within the cell to the DB</p>
      <p>DELETE a row of data from the DB by double-clicking the DELETE button on the right of the corresponding row</p>
      <p>Add data to the bottom row then click POST in order to add a row of data to the DB</p>
      {console.log(data)}
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
                  <textarea type="text"
                    defaultValue={
                      value.length > 100 ?
                        value.substring(0,99).concat('...') :
                        value
                    }
                    onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                      event.target.blur();
                      row[Object.keys(row)[index]] = event.target.value;
                      console.log("Patch Row", row)
                      fetch(`http://localhost:8080/${table}/${row.Id}`, {
                        method: "PATCH",
                        body: JSON.stringify(row),
                        headers: {
                          'Content-Type': 'application/json',
                        }
                      }).then(location.reload());
                    }; mutate();
                  }} />
                </td>
              ))}
              <td key='99999'>
                <button onClick={(event) => {
                  fetch(`http://localhost:8080/${table}/${row.Id}`, {
                    method: "DELETE",
                    body: JSON.stringify(row),
                    headers: {
                      'Content-Type': 'application/json',
                    }
                  }).then(mutate())
                }} >DELETE</button>
              </td>
            </tr>
          ))}
          <tr>
            <td></td>
            <td><textarea key={Object.keys(data[0])[0]} onChange={(event) => setColumnOne(event.target.value)} placeholder="Enter Data Here Too" /></td>
            <td><textarea key={Object.keys(data[0])[0]} onChange={(event) => setColumnTwo(event.target.value)} placeholder="Enter Data Here Too" /></td>
            <td><textarea key={Object.keys(data[0])[0]} onChange={(event) => setColumnThree(event.target.value)} placeholder="Enter Data Here Too" /></td>
            <td><textarea key={Object.keys(data[0])[0]} onChange={(event) => setColumnFour(event.target.value)} placeholder="Enter Data Here Too" /></td>
            <td><button onClick={() => {
              let row = {}
              //row['id'] = 99;
              row[Object.keys(data[0])[1]] = columnOne;
              row[Object.keys(data[0])[2]] = columnTwo;
              row[Object.keys(data[0])[3]] = columnThree;
              row[Object.keys(data[0])[4]] = columnFour;
              console.log(typeof Object.keys(data[0])[0], Object.keys(data[0])[0])
              console.log("POST Row", row);
              fetch(`http://localhost:8080/${table}`, {
                method: "POST",
                body: JSON.stringify(row),
                headers: {
                  'Content-Type': 'application/json',
                }
              }).then(location.reload())
            }}>POST</button></td>
          </tr>
        </tbody>
      </table>
		</>
	)
}