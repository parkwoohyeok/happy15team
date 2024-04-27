import styles from "./InviteModal.module.css";
import { PostInviteMember } from "@/api/PostInviteMember";
import { useState } from "react";
import { useRouter } from "next/router";
import modalState from "@/lib/modalState";

interface InviteData {
  dashboardId: number;
  email: string;
}

const InviteModal = () => {
  const { setOpenModal } = modalState();
  const [emailValue, setEmailValue] = useState<string>("");
  const router = useRouter();
  const { id }: any = router.query;

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchText = e.target.value;
    setEmailValue(searchText);
  };

  const handlePostInviteMember = async () => {
    const inviteData: InviteData = {
      dashboardId: id,
      email: emailValue,
    };
    const token = localStorage.getItem("accessToken");
    if (token) {
      if (inviteData.dashboardId) {
        try {
          const data = await PostInviteMember(token, inviteData);
          setOpenModal("");
          //성공, 실패 모달 켜기
        } catch (error) {
          console.error(error);
        }
      } else {
        console.error("토큰 없음");
      }
    }
  };

  const handleCloseModal = () => {
    setOpenModal("");
  }


  return (
    <>
      <h1 className={styles.modalTitle}>초대하기</h1>
      <form>
        <label htmlFor="inviteInput">이메일</label>
        <input className={styles.inviteInput} onChange={handleTextChange} />
      </form>
      <div className={styles.modalButtons}>
        <button onClick={handleCloseModal}>취소</button>
        <button
          className={emailValue ? styles.btnOpen : styles.btnClose}
          onClick={emailValue ? handlePostInviteMember : undefined}
        >
          초대
        </button>
      </div>
    </>
  );
};

export default InviteModal;
