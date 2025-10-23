/* eslint-disable @typescript-eslint/no-explicit-any */
import { Vocabulary } from "../helpers/TypeData";
import { ImportResponse } from "../shared/ts/interface/import";
import axiosClient from "./axiosClient";

export const vocabApi = {
  getAll(params = {}): Promise<{ data: Vocabulary[]; total: number }> {
    return axiosClient.get(`/vocabularies`, { params });
  },

  getNewVocab() {
    return axiosClient.get(`/vocabularies/newVocab`);
  },

  getSearch(query: string): Promise<Vocabulary[]> {
    return axiosClient.get(`/vocabularies/search`, {
      params: { query },
    });
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
