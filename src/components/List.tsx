import { useState } from "react";
import dayjs from "dayjs";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import Add from "./Add";
import Edit from "./Edit";
import Delete from "./Delete";

import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Button from "@mui/material/Button";
import { SelectChangeEvent } from "@mui/material";

type User = {
  id: number;
  name: string;
  email: string;
  birthday: Date;
  gender: number | null | undefined;
  address: string;
}

type PropsType = {
  users: User[];
  addUser: (user: User) => void;
  updateUser: (user: User) => void;
  deleteUser: (deleted_user_id: number) => void;
  customStyles: {
    content: {
      top: string;
      left: string;
      right: string;
      bottom: string;
      marginRight: string;
      transform: string;
      minWidth: string;
    };
  };
};

const List = (props: PropsType) => {

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const [id, setId] = useState<number>(1);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [birthday, setBirthday] = useState<Date>(new Date());
  const [gender, setGender] = useState<number | null | undefined>(undefined);
  const [address, setAddress] = useState<string>("");

  // add modal
  const openAddModal = () => {
    setIsAddOpen(true);
  }
  const closeAddModal = () => {
    setIsAddOpen(false);
  }

  // edit modal
  const openEditModal = (id: number, name: string, email: string, birthday: Date, gender: number | null | undefined, address: string) => {
    setId(id);
    setName(name);
    setEmail(email);
    setBirthday(birthday);
    setGender(gender);
    setAddress(address);
    setIsEditOpen(true);
  }
  const closeEditModal = () => {
    setIsEditOpen(false);
  }

  // delete modal
  const openDeleteModal = (id: number, name: string) => {
    setId(id);
    setName(name);
    setIsDeleteOpen(true);
  }
  const closeDeleteModal = () => {
    setIsDeleteOpen(false);
  }

  // handle change
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }
  const handleBirthdayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBirthday(new Date(e.target.value));
  }
  const handleGenderChange = (e: SelectChangeEvent<number | null | undefined>) => {
    // setGender(e.target.value ? Number(e.target.value) : undefined);
    setGender(e.target.value ? Number(e.target.value) : null);
  }
  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
  }

  const handleAddUser = (user: User) => {
    props.addUser(user);
  };
  const handleUpdateUser = (user: User) => {
    props.updateUser(user);
  };
  const handleDeleteUser = (deleted_user_id: number) => {
    props.deleteUser(deleted_user_id);
  };

  const { users = [] } = props;

  return(
    <div>
      <h2>React & Node CRUD</h2>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <ToastContainer />

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>名前</TableCell>
            <TableCell>メールアドレス</TableCell>
            <TableCell>生年月日</TableCell>
            <TableCell>性別</TableCell>
            <TableCell>住所</TableCell>
            <TableCell>&nbsp;</TableCell>
            <TableCell>&nbsp;</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users && users.map((user: User, i) => {
            return(
              <TableRow key={i}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.birthday && dayjs(user.birthday).format('YYYY年MM月DD日')}</TableCell>
                <TableCell>
                {
                  (() => {
                    if (user.gender == 1) {
                      return("男性");
                    } else if (user.gender == 2) {
                      return ("女性");
                    } else if (user.gender == 3) {
                      return ("その他");
                    } else {
                      return ("");
                    }
                  })()
                }
                </TableCell>
                <TableCell>{user.address}</TableCell>
                <TableCell>
                  <Button variant="contained" color="success" onClick={ () => { openEditModal(user.id, user.name, user.email, user.birthday, user.gender, user.address)} }>編集</Button>
                </TableCell>
                <TableCell>
                  <Button variant="contained" color="error" onClick={ () => { openDeleteModal(user.id, user.name) } }>削除</Button>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
      <Button variant="contained" color="primary" onClick={openAddModal}>新規作成</Button>

      {/* Modal */}
      <Add
        isAddOpen={isAddOpen}
        closeAddModal={closeAddModal}
        onAdd={handleAddUser}
        customStyles={props.customStyles}
      />
      <Edit
        isEditOpen={isEditOpen}
        closeEditModal={closeEditModal}
        onUpdate={handleUpdateUser}
        id={id}
        name={name}
        email={email}
        birthday={birthday}
        gender={gender}
        address={address}
        handleNameChange={handleNameChange}
        handleEmailChange={handleEmailChange}
        handleBirthdayChange={handleBirthdayChange}
        handleGenderChange={handleGenderChange}
        handleAddressChange={handleAddressChange}
        customStyles={props.customStyles}
      />
      <Delete
        isDeleteOpen={isDeleteOpen}
        closeDeleteModal={closeDeleteModal}
        id={id}
        name={name}
        onDelete={handleDeleteUser}
        customStyles={props.customStyles}
      />
    </div>
  );
}

export default List;
