import dashboard from "@/pages/dashboard/[id]";
import { create } from "zustand";

//Todo
//모달 이름 case화 해서 페이지 최상단에 코드 한줄로 적용시키기

const setModals = create((set) => ({
  modalState: false,
  passwordMismatch: false, //비밀번호 다른 모달 상태
  emailExisted: false, // 이메일 중복 모달 상태
  registerSuccess: false, // 회원가입 성공 모달 상태
  openModal: () => set({ modalState: true }),
  closeModal: () => set({ modalState: false }),
  nicknameError: false, // 닉네임 10자 이상 에러
  samePassword: false, // 현재 비밀번호와 새 비밀번호 중복
  changePassword: false, // 비밀번호 변경 성공
  changeProfileModal: false, // 프로필 수정 성공
  dashboardData: {
    id: "",
    title: "",
    userId: "",
    createdByMe: false,
  },

  loginUserData:{ id: "",
        email: "",
        nickname: "",
    profileImageUrl: "",
  },
  cardImageUrl: "",
  rerender:"",

  columnState: "",
  

  dashboardMembers: [{
     userId: "" 
  }],
  cardLength:"",

  openedModalId: "",
  confirmCardData: [],
  openedCardData : "",
  isFetching: false,
  commentRender: false,
  setOpenedCardData:(data) => set({ openedCardData: data }),
  setColumnState:(data) => set({ columnState: data }),
  setRerender:(state) => set({ rerender: state }),
  setRerenderDone: () => set({ rerender: false }),
    setCommentRenderDone: () => set({ commentRender: false }),
  setCommentRender: ()=>set({commentRender:true}),
  setCardLength: (length:number) => set({ cardLength: length }),
  setCardImageUrl: (data:string) => set({ cardImageUrl: data }),
  setIsFetched: () => set({ isFetching: false }),
  setIsFetching: ()=>set({isFetching:true}),
  setConfirmCardData:(data:any) => set({confirmCardData:data}),
setOpenedModalId:(data:any) => set({openedModalId:data}),
  setDashboardMembers:(data:any) => set({dashboardMembers:data}),
  setLoginUserData:(data:any) => set({loginUserData:data}),
  setConfirmCardData: (data: any) => set({ confirmCardData: data }),
  setOpenedModalId: (data: any) => set({ openedModalId: data }),
  setDashboardMembers: (data: any) => set({ dashboardMembers: data }),
  setLoginUserData: (data: any) => set({ loginUserData: data }),
  setDashboardData: (data: any) => set({ dashboardData: data }),
  openPasswordMismatchModal: () => set({ passwordMismatch: true }),
  closePasswordMismatchModal: () => set({ passwordMismatch: false }),
  openCreateDashboardModal: () => set({ createDashboardModalState: true }),
  closeCreateDashboardModal: () => set({ createDashboardModalState: false }),
  openChangeProfileModal: () => set({ changeProfileModal: true }),
  closeChangeProfileModal: () => set({ changeProfileModal: false }),
}));

export default setModals;