import { Me } from "../shared/ts/interface/me";
import axiosClient from "./axiosClient";

export const meApi = {
  getMe(): Promise<Me> {
    return axiosClient.get(`users/infor`);
  },

  updateMe(userId: string, params: Partial<Me>): Promise<Me> {
    return axiosClient.put(`/users/${userId}`, params);
  },
};
