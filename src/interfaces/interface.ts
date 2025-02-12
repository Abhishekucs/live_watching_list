export interface AnimeData {
  id: string;
  name: string;
  upVote: number;
  downVote: number;
  timestamp?: string;
}

export type UpdateData = {
  [key: string]: number;
};
