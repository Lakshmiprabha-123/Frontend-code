import { StatusEnum } from '../enum';
import { Status } from './status.model';

export interface Project {
  id?: number;
  name: string;
  lead: string;
  techStack: string;
  projectStatus: string;
  startdate: string; 
  deadline: string;
  totalPeopleAllocated: number;
  actualAllocationSOW: number;
  adrItemDocumentation: StatusEnum;
  c4Documentation: StatusEnum;
  salesHandover: StatusEnum;
  architectureHandover: StatusEnum;
  decodersRepository: StatusEnum;
  processAdoptionLatestVersion: StatusEnum;
  projectKickoff: StatusEnum;
  projectSharedDocumentRepository: StatusEnum;
  status?: Status;
  currentStatus?: string; 
}