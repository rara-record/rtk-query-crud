import "./AddEditUser.css";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  useAddContactMutation,
  useFetchContactByIdQuery,
  useUpDateContactMutation,
} from "../store/api/contactsApi";

const initialState = {
  name: "",
  email: "",
  contact: "",
};

const AddEditUser = () => {
  const [formValue, setFormValue] = useState(initialState);
  const [editMode, setEditMode] = useState(false);
  const { name, email, contact } = formValue;

  const navigate = useNavigate();
  const { id } = useParams();

  const [addContacts] = useAddContactMutation();
  const [upDateContact] = useUpDateContactMutation();
  const { data } = useFetchContactByIdQuery(id!);

  useEffect(() => {
    if (id && data) {
      // 내가 클릭한 데이터에 맞는 url과 data가 있다면
      setEditMode(true); // 수정모드 true
      setFormValue(data); // 수정모드시 useFetchContactByIdQuery로 불러온 데이터를 저장하여, input value값으로 설정
    } else {
      setEditMode(false); // 수정모드가 아니라면
      setFormValue({ ...initialState }); // input에 value값을 초기설정으로
    }
  }, [data, id]);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!name || !email || !contact) {
      toast.error("글 내용을 모두 입력해주세요.");
    } else {
      if (!editMode) {
        await addContacts(formValue);
        navigate("/");
        toast.success("글 작성이 완료되었습니다.");
      } else {
        await upDateContact(formValue);
        navigate("/");
        toast.success("글 수정이 완료되었습니다.");
      }
    }
  };

  return (
    <div style={{ marginTop: "100px" }}>
      <form
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "400px",
          alignContent: "center",
        }}
        onSubmit={handleSubmit}
      >
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Your Name..."
          value={name || ""} // 수정모드시 FormValue || 추가모드시 ForValue
          onChange={handleInputChange}
        />

        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          name="email"
          placeholder="Your Email..."
          value={email || ""}
          onChange={handleInputChange}
        />

        <label htmlFor="contact">Contact</label>
        <input
          type="text"
          id="contact"
          name="contact"
          placeholder="Your Contact No. ..."
          value={contact || ""} // 수정모드시 FormValue || 추가모드시 ForValue
          onChange={handleInputChange}
        />

        <input type="submit" value={id ? "Update" : "Save"} />
        <input type="button" value={"취소"} onClick={() => navigate(-1)} />
      </form>
    </div>
  );
};

export default AddEditUser;
