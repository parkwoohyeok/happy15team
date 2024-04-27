import {
  getColumnData,
  getDashboardData,
  getDashboardMebers,
} from "@/api/DashboardData";
import Column from "@/components/Column/Column";
import DashboardLayout from "@/components/DashboardLayout/DashboardLayout";
import Nav from "@/components/Nav/Nav";
import Sidebar from "@/components/Sidebar/Sidebar";
import setModals from "@/lib/zustand";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const dashboard = () => {
  const {
    editCardModal,
    dashboardData,
    setDashboardData,
    loginUserData,
    setDashboardMembers,
  }: any = setModals();
  const [columnData, setColumnData] = useState<any>([]);
  const router = useRouter();
  const { id }: any = router.query;

  const fetchDashboardData = async () => {
    if (!id) return null;
    const token = localStorage.getItem("accessToken");
    if (token) {
      const dashboardData = await getDashboardData(token, id);
      const dashboardMembers = await getDashboardMebers(token, id);
      const columnData = await getColumnData(token, id);
      setDashboardData({
        id: dashboardData.id,
        title: dashboardData.title,
        userId: dashboardData.userId,
        createdByMe: dashboardData.createdByMe,
      });
      setDashboardMembers(dashboardMembers);
      setColumnData(columnData);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [id]);
  return (
    <>
      <Nav />
      <Sidebar />
      <DashboardLayout>
        <Column columnData={columnData} />
      </DashboardLayout>
    </>
  );
};

export default dashboard;