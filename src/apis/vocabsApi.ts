import { Vocabulary } from "../helpers/TypeData";
import axiosClient from "./axiosClient";

export const vocabApi = {
  getAll() {
    return axiosClient.get(`/vocabularies`);
  },

  delete(id: string) {
    return axiosClient.delete(`/vocabularies/${id}`);
  },

  update(id: string, params: Partial<Vocabulary>): Promise<Vocabulary> {
    return axiosClient.put(`/vocabularies/${id}`, params);
  },

  add(data: Partial<Vocabulary>): Promise<Vocabulary> {
    return axiosClient.post("/vocabularies", data);
  },

  addImport(data: Partial<Vocabulary>[]) {
    return axiosClient.post("/vocabularies/import", data);
  },
};
