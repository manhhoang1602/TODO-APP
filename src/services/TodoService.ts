import { BaseService } from '../commons/service';
import { Endpoint } from './Endpoint';

export namespace TodoService {
  export interface IResTodoItem {
    id: string;
    taskName: string;
    description: string;
    status: string;
  }

  export interface IReqTask {
    taskName: string;
    description: string;
    status: boolean;
  }

  export const getListTask = async (params?: { status: boolean }): Promise<IResTodoItem[]> => {
    return BaseService.get(Endpoint.GET_LIST_TASK, params);
  };

  export const postListTask = async (payload: IReqTask): Promise<any> => {
    return BaseService.post(Endpoint.POST_LIST_TASK, payload);
  };
}
