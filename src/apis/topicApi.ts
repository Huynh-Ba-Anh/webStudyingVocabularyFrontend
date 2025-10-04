import { Topic } from "../shared/ts/interface/topic";
import axiosClient from "./axiosClient";

export const topicApi = {
  getTopics(): Promise<Topic[]> {
    return axiosClient.get("/topics");
  },

  getTopicById(id: string): Promise<Topic> {
    return axiosClient.get(`/topics/${id}`);
  },

  createTopic(params: Partial<Topic>): Promise<Topic> {
    return axiosClient.post("/topics", params);
  },

  updateTopic(id: string, params: Partial<Topic>): Promise<Topic> {
    return axiosClient.put(`/topics/${id}`, params);
  },

  deleteTopic(id: string): Promise<{ message: string }> {
    return axiosClient.delete(`/topics/${id}`);
  },
};
