import NavButtons from "./NavButtons/NavButtons";
import NavParticipants from "./NavParticipants/NavParticipants";
import NavTitle from "./NavTitle/NavTitle";
import NavUserProfile from "./NavUserProfile/NavUserProfile";
import { useRouter } from "next/router";
import styles from "./Nav.module.css";
import setModals from "@/lib/zustand";
import InviteModal from "../Modals/InviteModal/InviteModal";
import { Fragment, useEffect, useState } from "react";
import UserService from "@/api/UserService";
import { UserData } from "@/types/interface";

type userData = Pick<UserData, "email" | "nickname" | "profileImageUrl">;

const Nav = () => {
  const router = useRouter();
  const path = router.pathname;
  const { modalState }: any = setModals();
  const [userData, setUserData] = useState<userData>({
    email: "",
    nickname: "",
    profileImageUrl: "",
  });

  console.log(userData.profileImageUrl);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        const userData = await UserService.getUserData();
        setUserData({
          email: userData.email,
          nickname: userData.nickname,
          profileImageUrl: userData.profileImageUrl,
        });
      }
    };
    fetchUserData();
  }, []);

  return (
    <Fragment>
      <div className={styles.navWrapper}>
        <div className={styles.section1}>
          <NavTitle pathName={path} />
        </div>
        <div className={styles.sectionWrapper}>
          <div
            className={
              path === "/mydashboard" ? styles.myDashBoard : styles.section2
            }
          >
            <NavButtons />
            <NavParticipants />
            <div className={styles.vr} />
          </div>
          <NavUserProfile userData={userData} />
        </div>
      </div>
      {modalState && <InviteModal />}
    </Fragment>
  );
};

export default Nav;
