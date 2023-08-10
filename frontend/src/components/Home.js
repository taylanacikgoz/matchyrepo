import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [usernames, setUsernames] = useState([]);

  let navigate = useNavigate();

  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      axios
        .get("http://localhost:9000/api/users", {
          headers: {
            Authorization: `${token}`,
          },
        })
        .then((res) => {
          console.log(res.data.allUsers);
          setUsernames(res.data.allUsers);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      navigate("/login");
    }
  }, [token]);
  return (
    <div>
      <ul>
        {usernames.length > 0 &&
          usernames.map((names) => <li key={names.length}>{names}</li>)}
      </ul>
      <h1>Hello, Matchy!</h1>
    </div>
  );
};

export default Home;
