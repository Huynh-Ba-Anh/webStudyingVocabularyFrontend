import { Vocabulary } from "../../../helpers/TypeData";

export interface Topic {
  _id: string;
  topicName: string;
  vocabIds: Vocabulary[];
  isDefault: boolean;
}
