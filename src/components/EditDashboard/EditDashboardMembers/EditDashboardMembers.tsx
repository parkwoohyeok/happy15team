import { useEffect, useState } from "react";
import styles from "./EditDashboard.module.css";
import useStore from "@/lib/zustand2";
import { getDashboardMembers } from "@/api/getDashboardMembers";
import dashboardIdState from "@/lib/dashboardIdState";
import { deleteMember } from "@/api/deleteMember";
import setModals from "@/lib/zustand";

function EditDashboardMembers() {
  const {
    setRerender,
    setReload,
    reload,
    setDashboardMembers,
    dashboardMembers,
  }: any = setModals();
  const { savedDashboardId } = dashboardIdState();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [items, setItems] = useState([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const { dataChange, setDataChange } = useStore();
  let size = 4;

  useEffect(() => {
    const dashId = savedDashboardId;
    const fetchData = async () => {
      const token = localStorage.getItem("accessToken");
      try {
        const dataForMember = {
          dashboardId: savedDashboardId,
          page: currentPage,
          size: size,
        };
        const Members = await getDashboardMembers(token, dataForMember);
        setItems(Members.members);
        setTotalCount(Members.totalCount);
        setDashboardMembers(Members.members);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, dataChange]);

  const handleDeleteMember = (userId: number, createdByMe: boolean) => {
    if (!createdByMe) {
      alert("본인은 삭제할 수 없습니다");
      return;
    }
    const response = confirm("정말로 삭제 하시겠습니까?");
    if (!response) return;
    const fetchData = async () => {
      const token = localStorage.getItem("accessToken");
      try {
        await deleteMember(token, userId);
        setDataChange(dataChange + 1);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const page = currentPage;

  const totalPage = Math.ceil(totalCount / size);

  return (
    <section className={styles.form}>
      <div className={styles.group}>
        <h1 className={styles.groupText}>구성원</h1>
        <div className={styles.pageContainer}>
          <div className={styles.pageDisplay}>
            {totalPage} 페이지 중 {currentPage}
          </div>
          <button
            onClick={currentPage === 1 ? undefined : handlePrevPage}
            className={currentPage === 1 ? styles.close : styles.open}
          >
            {"<"}
          </button>
          <button
            onClick={currentPage < totalPage ? handleNextPage : undefined}
            className={currentPage < totalPage ? styles.open : styles.close}
          >
            {">"}
          </button>
        </div>
      </div>
      <div>
        <h2 className={styles.name}>이름</h2>
        {items.map((item: any, index: any) => (
          <div key={index} className={styles.list}>
            <span>{item.nickname}</span>
            <button
              onClick={() => handleDeleteMember(item.id, item.createdByMe)}
            >
              삭제
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default EditDashboardMembers;
