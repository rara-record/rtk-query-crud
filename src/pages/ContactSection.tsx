import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { IContact } from "../models/contact.model";
import { useDeleteContactMutation } from "../store/api/contactsApi";

interface IProps {
  contact: IContact;
  index: number;
}

const ContactSection = ({ contact, index }: IProps) => {
  const [deleteContact] = useDeleteContactMutation();

  const handleDelete = async (id: string) => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      await deleteContact(id);
      toast.success("삭제가 완료되었습니다.");
    }
  };

  return (
    contact && (
      <tr>
        <th scope="row">{index + 1}</th>
        <td>{contact.name}</td>
        <td>{contact.email}</td>
        <td>{contact.contact}</td>
        <td>
          <Link to={`/update/${contact.id}`}>
            <button className="btn btn-edit">Edit</button>
          </Link>
          <button
            className="btn btn-delete"
            onClick={() => handleDelete(String(contact.id))}
          >
            delete
          </button>
          <Link to={`/view/${contact.id}`}>
            <button className="btn btn-view">View</button>
          </Link>
        </td>
      </tr>
    )
  );
};

export default ContactSection;
