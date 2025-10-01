import { Account, LoginResponse, RegisterResponse } from "../shared/ts/interface/register";
import axiosClient from "./axiosClient";

export const authApi = {
    register( params: Account): Promise<RegisterResponse> {
        return axiosClient.post('/users/register', params);
    },

    login(params: Account): Promise<LoginResponse> {
    return axiosClient.post("/login/jwt", params)
  }
}