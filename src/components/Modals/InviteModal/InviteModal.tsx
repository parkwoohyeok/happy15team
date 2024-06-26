import styles from "./InviteModal.module.css";
import modalState from "@/lib/modalState";
import { PostInviteMember } from "@/api/postInviteMember";
import dashboardIdState from "@/lib/dashboardIdState";
import { useState } from "react";
import useStore from "@/lib/zustand2";

const InviteModal = () => {
  const { dataChange, setDataChange } = useStore();
  const { setOpenModal } = modalState();
  const { savedDashboardId } = dashboardIdState();
  const [email, setEmail] = useState("");

  const handleCloseModal = () => {
    setOpenModal("");
  };

  const handleInviteMember = async () => {
    const inviteMemberData = {
      dashboardId: savedDashboardId,
      email: email,
    };
    const token = localStorage.getItem("accessToken");
    if (token) {
      try {
        const data: any = await PostInviteMember(token, inviteMemberData);
        if (data.response) {
          alert(data.response.data.message);
          return;
        }
        setOpenModal("");
        alert("성공적으로 초대 되었습니다.");
        setDataChange(dataChange + 1);
        return;
      } catch (error) {
        console.error(error);
      }
    } else {
      console.error("토큰 없음");
    }
  };

  return (
    <>
      <h1 className={styles.modalTitle}>초대하기</h1>
      <form className={styles.form}>
        <label htmlFor="inviteInput">이메일</label>
        <input
          className={styles.inviteInput}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </form>
      <div className={styles.modalButtons}>
        <button onClick={handleCloseModal}>취소</button>
        <button
          onClick={email ? handleInviteMember : undefined}
          className={`${styles.inviteButton} ${!email && styles.none}`}
        >
          초대
        </button>
      </div>
    </>
  );
};

export default InviteModal;
