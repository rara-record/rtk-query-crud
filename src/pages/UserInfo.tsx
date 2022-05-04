import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useFetchContactByIdQuery } from "../store/api/contactsApi";
import "./UserInfo.css";

const UserInfo = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useFetchContactByIdQuery(id!);

  useEffect(() => {
    error && toast.error("데이터를 불러오지 못했습니다.");
  }, [error]);

  return (
    <div style={{ marginTop: "150px" }}>
      <div className="card">
        <div className="card-header">
          <p>유저 상세정보 페이지</p>
        </div>

        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <div className="container">
            <strong>ID</strong>
            <span>{id}</span>
            <br />
            <br />
            <strong>Name: </strong>
            <span>{data && data.name}</span>
            <br />
            <br />
            <strong>Email: </strong>
            <span>{data && data.email}</span>
            <br />
            <br />
            <strong>Contact: </strong>
            <span>{data && data.contact}</span>
            <br />
            <br />
            <Link to="/">
              <button className="btn btn-edit">Go Back</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserInfo;
