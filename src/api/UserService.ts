import axios from "@/lib/axios";
import { UserData } from "@/types/interface";

class UserService {
  private static getToken(): string | null {
    return localStorage.getItem("accessToken");
  }

  static async signUp(userData: UserData) {
    try {
      const response = await axios.post("/users", userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async login(userData: UserData) {
    try {
      const response = await axios.post("/auth/login", userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async getUserData() {
    try {
      const token = this.getToken();
      if (token) {
        const response = await axios.get("/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return response.data;
      }
    } catch (error) {
      throw error;
    }
  }

  static async uploadProfileImage(file: File) {
    try {
      const token = this.getToken();
      if (token) {
        const formData = new FormData();
        formData.append("image", file);
        const response = await axios.post("/users/me/image", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return response.data.profileImageUrl;
      }
    } catch (error) {
      throw error;
    }
  }

  static async updateProfile(
    data: {
      profileImageUrl: string | undefined;
      nickname: string;
    },
    onSuccess: () => void,
    onFailure: () => void
  ) {
    const { profileImageUrl, nickname } = data;

    try {
      const token = this.getToken();
      if (token) {
        await axios.put(
          "/users/me",
          {
            profileImageUrl,
            nickname,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }
      onSuccess();
    } catch (error) {
      onFailure();
      throw error;
    }
  }

  static async updatePassword(
    data: { password: string; newPassword: string },
    onSuccess: () => void,
    onFailure: () => void
  ) {
    const { password, newPassword } = data;

    try {
      const token = this.getToken();
      if (token) {
        await axios.put(
          "/auth/password",
          {
            password,
            newPassword,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        onSuccess();
      } else {
        throw new Error("Access token not found");
      }
    } catch (error) {
      console.error("비밀번호 업데이트 중 오류가 발생했습니다.", error);
      onFailure();
    }
  }
}

export default UserService;
