import { useState, useEffect } from 'react';
import axios from "axios";
import './App.css';
import List from './components/List';

const REQUEST_URL = "http://localhost:5001";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    minWidth: "40%",
  },
};

type User = {
  id: number;
  name: string;
  email: string;
  birthday: Date;
  gender: number | null | undefined;
  address: string;
};

const App = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    axios.get(REQUEST_URL)
      .then((res) => {
        setUsers(res.data.data);
      })
      .catch((error) => {
        console.log("error");
        console.log(error.status);
      });
  }, []);

  if(!users) return <div>loading...</div>

  const addUser = (user: User) => {
    setUsers((prevState) => ([...prevState, user]));
  }

  const updateUser = (user: User) => {
    setUsers((prevState) => prevState.map((u) => u.id == user.id ? user : u));
  }

  const deleteUser = (deleted_user_id: number) => {
    setUsers((prevState) => prevState.filter((u) => u.id != deleted_user_id));
  }

  return (
    <div>
      <List users={users} addUser={addUser} updateUser={updateUser} deleteUser={deleteUser} customStyles={customStyles} />
    </div>
  );
}

export default App;
