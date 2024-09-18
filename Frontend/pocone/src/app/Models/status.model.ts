import { StatusEnum } from '../enum';

export interface Status {
  id?: number;
  risksInDelivery: boolean;
  teamComposition: { [key: string]: number };
  defectsReport: boolean;
  numberOfDefects: number;
  processFlows: StatusEnum;
  dailyUpdates: StatusEnum;
  qaUpdates: StatusEnum;
  sonarqube: StatusEnum;
  weeklyReports: StatusEnum;
  closeClientCommunication: StatusEnum;
  gitReport: StatusEnum;
  escalation: StatusEnum;
  boardUpdates: StatusEnum;
}