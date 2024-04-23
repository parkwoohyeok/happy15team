import React, { useState, useEffect } from "react";
import styles from "./ExistInvitations.module.css";
import { PostInviteData } from "@/api/postInviteData";

interface Item {
  dashboard: {
    title: string;
    id: number;
  };
  inviter: {
    nickname: string;
    id: number;
  };
  id: number;
}

interface Props {
  items: Item[];
}

const ExistInvitations = ({ items }: Props) => {
  const [invitedData, setInvitedData] = useState({
    invitedid: 0,
    inviteAccepted: false,
  });

  const handleInviteAccepted = (id: number) => {
    setInvitedData(prevState => ({
      ...prevState,
      invitedid: id,
      inviteAccepted: true
    }));
  };
  
  const handleInviteRejected = (id: number) => {
    setInvitedData(prevState => ({
      ...prevState,
      invitedid: id,
      inviteAccepted: false
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        try {
          const data = await PostInviteData(token, invitedData);
        } catch (error) {
          console.error(error);
        }
      } else {
        console.error("토큰 없음");
      }
    };

    fetchData();
  }, [invitedData]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.inputContainer}>
        <input placeholder="검색" />
        <div className={styles.searchIcon}>🔍</div>
      </div>
      <div className={`${styles.tableHeader} ${styles.tableItems}`}>
        <div>대시보드 이름</div>
        <div>초대자</div>
        <div>수락여부</div>
      </div>
      {items.map((item) => (
        <div key={item.id}>
          <div className={styles.tableItems}>
            <div>{item.dashboard.title}</div>
            <div>{item.inviter.nickname}</div>
            <div className={styles.btnContainer}>
              <button onClick={() => handleInviteAccepted(item.id)}>
                수락
              </button>
              <button onClick={() => handleInviteRejected(item.id)}>
                거절
              </button>
            </div>
          </div>
          <div className={styles.line} />
        </div>
      ))}
    </div>
  );
};

export default ExistInvitations;
