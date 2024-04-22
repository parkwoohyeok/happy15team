import styles from "./MyPagePasswordForm.module.css";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import UserService from "@/api/UserService";
import setModals from "@/lib/zustand";
import SamePasswordError from "../Modals/SamePasswordErrorModal/SamePasswordErrorModal";
import { isAxiosError } from "axios";
import SuccessChangePassword from "../Modals/SuccessChangePasswordModal/SuccessChangePasswordModal";

function PasswordForm() {
  const {
    samePassword,
    changePassword,
    openSamePasswordErrorModal,
    openSuccessChangePasswordModal,
  }: any = setModals();

  // react-hook-form, yup 라이브러리를 통해 유효성 검사
  const formSchema = yup.object({
    password: yup.string().required(""),
    newPassword: yup
      .string()
      .required("새 비밀번호를 입력해 주세요.")
      .min(8, "8자 이상 입력해 주세요.")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,15}$/,
        "비밀번호는 영문, 숫자 조합 8자 이상 입력해 주세요."
      ),
    confirmNewPassword: yup
      .string()
      .oneOf([yup.ref("newPassword")], "비밀번호가 일치하지 않습니다."),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(formSchema),
  });

  const onSubmit = async (data: { password: string; newPassword: string }) => {
    try {
      // 성공적으로 변경되었을 경우 처리
      await UserService.updatePassword(data);
      // openSuccessChangePasswordModal();
    } catch (error) {
      // 현재 비밀번호가 틀렸을 경우
      if (isAxiosError(error) && error.response) {
        alert("현재 비밀번호가 틀립니다.");
        if (error.response.status === 400) {
          openSamePasswordErrorModal();
        }
      }
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.profileLabel}>비밀번호 변경</div>
      <div className={styles.inputContainer}>
        <div className={styles.editContainer}>
          <label htmlFor="password">현재 비밀번호</label>
          <input
            className={styles.nowPasswordInput}
            type="text"
            placeholder="현재 비밀번호 입력"
            {...register("password")}
          />
        </div>
        <div className={styles.editContainer}>
          <label htmlFor="newPassword">새 비밀번호</label>
          <input
            className={errors.newPassword ? styles.errorFocus : styles.notError}
            type="text"
            placeholder="새 비밀번호 입력"
            {...register("newPassword")}
          />
        </div>
        {errors.newPassword && (
          <div className={styles.error}>
            {errors.newPassword.message as string}
          </div>
        )}
        <div className={styles.editContainer}>
          <label htmlFor="confirmNewPassword">새 비밀번호 확인</label>
          <input
            className={
              errors.confirmNewPassword ? styles.errorFocus : styles.notError
            }
            type="text"
            placeholder="새 비밀번호 입력"
            {...register("confirmNewPassword")}
          />
        </div>
        {errors.confirmNewPassword && (
          <div className={styles.error}>
            {errors.confirmNewPassword.message as string}
          </div>
        )}
      </div>
      <button className={styles.formBtn} disabled={!isValid}>
        변경
      </button>
      {samePassword && <SamePasswordError />}
      {changePassword && <SuccessChangePassword />}
    </form>
  );
}

export default PasswordForm;
