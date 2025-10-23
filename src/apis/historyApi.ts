import { IHistory } from "../shared/ts/interface/history";
import axiosClient from "./axiosClient"

export const HistoryApi = {
    getHistory(): Promise<IHistory[]> {
        return axiosClient.get(`histories`);
    },
}