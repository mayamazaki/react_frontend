import { SubmitHandler, useForm } from 'react-hook-form'
import axios from "axios";
import Modal from "react-modal";
import { yupResolver } from '@hookform/resolvers/yup'
import dayjs from "dayjs";
import { toast } from "react-toastify";

import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Select from '@mui/material/Select';
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import { SelectChangeEvent } from "@mui/material";

import { schema } from "../schema/Validation";

const REQUEST_URL = "http://localhost:5001";

type User = {
  id: number;
  name: string;
  email: string;
  birthday: Date;
  gender: number | null | undefined;
  address: string;
}

type PropsType = {
  isEditOpen: boolean;
  closeEditModal: () => void;
  onUpdate: (user: User) => void;
  id: number;
  name: string;
  email: string;
  birthday: Date;
  gender: number | null | undefined;
  address: string;
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
  handleNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBirthdayChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleGenderChange: (e: SelectChangeEvent<number | null | undefined>) => void;
  handleAddressChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

type UserFormInput = {
  id: number;
  name: string;
  email: string;
  birthday: Date;
  gender: number;
  address: string;
}

const Edit = (props: PropsType) => {

  const { register, formState: { errors }, handleSubmit, resetField } = useForm<UserFormInput>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<UserFormInput> = (data) => {
    axios.put(REQUEST_URL + "/" + props.id, {data}).then((res) => {
      toast.success("User updated.");
      props.closeEditModal();
      props.onUpdate(res.data);
    })
    .catch((error) => {
      console.log("error");
      console.log(error.status);
    });    
  }

  const handleCloseModal = () => {
    resetField("name");
    resetField("email");
    resetField("birthday");
    resetField("gender");
    resetField("address");
    props.closeEditModal();
  }

  return(
    <Modal
      isOpen={props.isEditOpen}
      onRequestClose={handleCloseModal}
      contentLabel="Edit Modal"
      ariaHideApp={false}
      style={props.customStyles}
    >
      <h2>編集</h2>
      <Container maxWidth="sm" sx={{ pt: 5 }}>
        <Stack spacing={3}>
          <TextField
            label="名前"
            required
            sx={{ display: "flex", maxWidth: 360 }}
            {...register("name")}
            error={"name" in errors}
            helperText={errors.name?.message}
            onChange={props.handleNameChange}
            value={props.name}
          />
          <TextField
            label="メールアドレス"
            required
            type="email"
            sx={{ display: "flex", maxWidth: 360 }}
            {...register("email")}
            error={"email" in errors}
            helperText={errors.email?.message}
            onChange={props.handleEmailChange}
            value={props.email}
          />
          <TextField
            label="生年月日"
            type="date"
            sx={{ display: "flex", maxWidth: 360 }}
            {...register("birthday")}
            error={"birthday" in errors}
            helperText={errors.birthday?.message}
            onChange={props.handleBirthdayChange}
            defaultValue={props.birthday}
          />
          <Select
            label="性別"
            sx={{width: 200}}
            displayEmpty
            {...register("gender")}
            error={"gender" in errors}
            onChange={props.handleGenderChange}
            value={props.gender == null ? "" : props.gender}
          >
            <MenuItem value=""><em>&nbsp;</em></MenuItem>
            <MenuItem value={1}>男性</MenuItem>
            <MenuItem value={2}>女性</MenuItem>
            <MenuItem value={3}>その他</MenuItem>
          </Select>
          <TextField
            label="住所"
            multiline
            rows={5}
            sx={{ display: "flex", maxWidth: 720 }}
            {...register("address")}
            onChange={props.handleAddressChange}
            value={props.address}
          />
          <input type="hidden" name="id" value={props.id} />
          <Button variant="contained" color="success" size="large" onClick={handleSubmit(onSubmit)}>更新</Button>
          <Button variant="contained" color="inherit" onClick={handleCloseModal}>閉じる</Button>
        </Stack>
      </Container>
    </Modal>
  );
}

export default Edit;
