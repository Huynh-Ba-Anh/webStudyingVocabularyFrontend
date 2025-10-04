/* eslint-disable @typescript-eslint/no-explicit-any */
import { Vocabulary } from "../helpers/TypeData";
import { ImportResponse } from "../shared/ts/interface/import";
import axiosClient from "./axiosClient";

export const vocabApi = {
  getAll() {
    return axiosClient.get(`/vocabularies`);
  },

  getNewVocab() {
    return axiosClient.get(`/vocabularies/newVocab`);
  },

  delete(id: string) {
    return axiosClient.delete(`/vocabularies/${id}`);
  },

  update(id: string, params: Partial<Vocabulary>): Promise<Vocabulary> {
    return axiosClient.put(`/vocabularies/${id}`, params);
  },

  add(
    topicId: string | undefined,
    data: Partial<Vocabulary>
  ): Promise<Vocabulary> {
    return axiosClient.post(`/vocabularies/${topicId}`, {
      ...data,
      topicApi: topicId,
    });
  },

  addImport(topicId: string | undefined, data: any[]): Promise<ImportResponse> {
    return axiosClient.post(`/vocabularies/import/${topicId}`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
};
