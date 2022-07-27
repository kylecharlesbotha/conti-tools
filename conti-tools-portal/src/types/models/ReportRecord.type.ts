export type ReportRecord = {
  id: number;
  salesDoc: string;
  poDate: Date;
  purchaseOrderNo: string;
  materialDescription: string;
  qtyOutstanding: number;
  reqDlvDt: Date;
  schedLnDate: Date;
  outstValue: number;
  aberdareComments: string;
  contiComments: string;
};
