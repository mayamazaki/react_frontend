import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import Modal from "react-modal";
import { yupResolver } from '@hookform/resolvers/yup'
import dayjs from "dayjs";
import { toast } from "react-toastify";

import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";

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
  isAddOpen: boolean;
  closeAddModal: () => void;
  onAdd: (user: User) => void;
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
}

type UserForm = {
  id: number;
  name: string;
  email: string;
  birthday: Date;
  gender: number | null | undefined;
  address: string;
}

const Add = (props: PropsType) => {

  const { register, formState: { errors }, handleSubmit, resetField } = useForm<UserForm>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<UserForm> = (data) => {
    axios.post(REQUEST_URL, data)
      .then((res) => {
        toast.success("User saved.");
        props.closeAddModal();
        props.onAdd(res.data);
        resetField("name");
        resetField("email");
        resetField("birthday");
        resetField("gender");
        resetField("address");
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
    props.closeAddModal();
  }

  return(
    <Modal
      isOpen={props.isAddOpen}
      onRequestClose={handleCloseModal}
      contentLabel="Add Modal"
      ariaHideApp={false}
      style={props.customStyles}
    >
      <h2>新規追加</h2>
      <Container maxWidth="sm" sx={{ pt: 5 }}>
        <Stack spacing={3}>
          <TextField
            label="名前"
            required
            sx={{ display: "flex", maxWidth: 360 }}
            {...register("name")}
            error={"name" in errors}
            helperText={errors.name?.message}
          />
          <TextField
            label="メールアドレス"
            required
            type="email"
            sx={{ display: "flex", maxWidth: 360 }}
            {...register("email")}
            error={"email" in errors}
            helperText={errors.email?.message}
          />
          <TextField
            label="生年月日"
            type="date"
            defaultValue={dayjs().subtract(30, 'year').format('YYYY-01-01')}
            sx={{ display: "flex", maxWidth: 360 }}
            {...register("birthday")}
            error={"birthday" in errors}
            helperText={errors.birthday?.message}
          />
          <Select
            label="性別"
            sx={{width: 200}}
            displayEmpty
            {...register("gender")}
            error={"gender" in errors}
            defaultValue={""}
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
          />
          <Button variant="contained" color="primary" size="large" onClick={handleSubmit(onSubmit)}>登録</Button>
          <Button variant="contained" color="inherit" onClick={handleCloseModal}>閉じる</Button>
        </Stack>
      </Container>
    </Modal>
  );
}

export default Add;
