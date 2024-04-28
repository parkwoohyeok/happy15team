import dashboard from "@/pages/dashboard/[id]";
import { create } from "zustand";

//Todo
//모달 이름 case화 해서 페이지 최상단에 코드 한줄로 적용시키기

const setModals = create((set) => ({
  modalState: false,
  passwordMismatch: false, //비밀번호 다른 모달 상태
  emailExisted: false, // 이메일 중복 모달 상태
  dashboardData: {
    id: "",
    title: "",
    userId: "",
    createdByMe: false,
  },

  loginUserData: { id: "", email: "", nickname: "", profileImageUrl: "" },
  cardImageUrl: "",
  rerender: "",

  columnState: "",

  dashboardMembers: [
    {
      userId: "",
    },
  ],
  cardLength: "",

  openedModalId: "",
  confirmCardData: [],
  openedCardData: "",
  isFetching: false,
  commentRender: false,
  setOpenedCardData: (data) => set({ openedCardData: data }),
  setColumnState: (data) => set({ columnState: data }),
  setRerender: (state) => set({ rerender: state }),
  setRerenderDone: () => set({ rerender: false }),
  setCommentRenderDone: () => set({ commentRender: false }),
  setCommentRender: () => set({ commentRender: true }),
  setCardLength: (length: number) => set({ cardLength: length }),
  setCardImageUrl: (data: string) => set({ cardImageUrl: data }),
  setIsFetched: () => set({ isFetching: false }),
  setIsFetching: () => set({ isFetching: true }),
  setConfirmCardData: (data: any) => set({ confirmCardData: data }),
  setOpenedModalId: (data: any) => set({ openedModalId: data }),
  setDashboardMembers: (data: any) => set({ dashboardMembers: data }),
  setLoginUserData: (data: any) => set({ loginUserData: data }),
  setConfirmCardData: (data: any) => set({ confirmCardData: data }),
  setOpenedModalId: (data: any) => set({ openedModalId: data }),
  setDashboardMembers: (data: any) => set({ dashboardMembers: data }),
  setLoginUserData: (data: any) => set({ loginUserData: data }),
  setDashboardData: (data: any) => set({ dashboardData: data }),
}));

export default setModals;
