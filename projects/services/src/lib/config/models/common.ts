import { ConfirmationService, Message } from "primeng/api";

export interface IBaseResponse {
  message?: string;
  isSuccessful?: boolean;
  result?: number;
  status?: number;
  errors?: string[];
}

export interface IPagedResponse<T> extends IBaseResponse {
  Total?: number;
  Data?: T[];
}

export interface IPagedRequestDto {
  page?: number;
  pageSize?: number;
  sortField?: string;
  sortOrder?: number;
  userName?: string;
}

export interface IResponse<T> extends IBaseResponse {
  data?: T;
}
export interface IExecCommandSqlDto extends IResponse<any> {
  data: any[];
  columns: any[];
}

export interface IDropdownListItemDto {
  ID?: number
  Value?: string;
  Label?: string;
  SmartPath?: string;
}
export interface ISearchListItemDto {
  id?: number;
  code?: string;
  value?: number;
  name?: string;
  isDefault?: boolean;
}
export interface ResponseController<T> {
  body?: T;
  messageAlert?: Message;
  messageAlerts?: Message[];
  error?: boolean;
  event?: boolean;
  help?: any;
}
export interface MessageDetail {
  key?: string;
  type?: string;
  alert?: string,
  severity?: string,
  summary?: string
  detail?: any
}
export interface IDialog {
  event: any;
  message: string;
  icon?: string;
  service: ConfirmationService;
}

// Interfaces of invoices

export interface IDocumentTransactionInfo {
  transaction?: IDropdownListItemDto;
  documentType?: IDropdownListItemDto;
  serial?: IDropdownListItemDto;
  number?: string;
  modifiedNumber?: boolean;
  flagDA?: boolean;
  maxItems?: number;
}

