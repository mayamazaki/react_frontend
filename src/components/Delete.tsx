import axios from "axios";
import Modal from "react-modal";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { toast } from "react-toastify";

const REQUEST_URL = "http://localhost:5001";

type PropsType = {
  isDeleteOpen: boolean;
  closeDeleteModal: () => void;
  id: number;
  name: string;
  onDelete: (deleted_user_id: number) => void;
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

const Delete = (props: PropsType) => {

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    axios.delete(REQUEST_URL + "/" + props.id, {}).then((res) => {
      toast.success("User deleted.");
      props.closeDeleteModal();
      props.onDelete(res.data.id);
    })
    .catch((error) => {
      console.log("error");
      console.log(error.status);
    });    
  }

  return(
    <Modal
      isOpen={props.isDeleteOpen}
      onRequestClose={props.closeDeleteModal}
      contentLabel="Delete Modal"
      ariaHideApp={false}
      style={props.customStyles}
    >
      <h2>削除しますか？</h2>
      <Container maxWidth="sm" sx={{ pt: 5 }}>
        <Stack spacing={3}>
          <TextField
            label={props.id}
            sx={{ display: "flex", maxWidth: 360 }}
            disabled
          />
          <TextField
            label={props.name}
            sx={{ display: "flex", maxWidth: 360 }}
            disabled
          />
          <input type="hidden" name="id" value={props.id} />
          <Button variant="contained" color="error" onClick={e => handleSubmit(e)}>削除する</Button>
          <Button variant="contained" color="inherit" onClick={props.closeDeleteModal}>閉じる</Button>
        </Stack>
      </Container>
    </Modal>
  );
}

export default Delete;
