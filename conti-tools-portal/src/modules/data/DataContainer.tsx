import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGridTable } from 'src/common/data-grid-table';
import { useBackorderReportsdService } from 'src/services/backorder-reports-service';
import { GridColumns, GridValueFormatterParams } from '@mui/x-data-grid';
import { PaginatedResponse, Request, TableRowData } from 'src/types';
import { TableContextProvider } from 'src/common/table';
import {
  Paper,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  SelectChangeEvent
} from '@mui/material';
import { ChangeEvent } from 'react';
import { debounce } from 'lodash';
import { useFileUploadService } from 'src/services/file-upload-service';
import { CommentIdentifierResponse } from 'src/types/models/CommentIdentifierResponse.type';
import moment from 'moment';
import { ReportRecord } from 'src/types/models/ReportRecord.type';
export const DataContainer = () => {
  const { getBackorderReportsList } = useBackorderReportsdService();
  const { getDistinctCommentIdentifiers } = useFileUploadService();
  const [tableFilters, setTableFilters] = React.useState<
    Record<string, string>
  >({});
  const [commentIdentifiersList, setCommentIdentifiersList] = React.useState<
    CommentIdentifierResponse[]
  >([]);

  const { updateReportRecord } = useBackorderReportsdService();

  const fetchRows = async ({
    page,
    pageSize,
    filters
  }: Request): Promise<PaginatedResponse<TableRowData>> => {
    const paginatedResponse = await getBackorderReportsList({
      page,
      pageSize,
      filters
    });
    const tableRows = paginatedResponse.items;

    return { ...paginatedResponse, items: tableRows };
  };

  React.useEffect(() => {
    (async () => {
      setCommentIdentifiersList(await getDistinctCommentIdentifiers());
    })();
  }, [getDistinctCommentIdentifiers]);

  const handleCommentIdentifierChange = (event: SelectChangeEvent) => {
    // eslint-disable-next-line no-console
    console.log(event.target.value);
    setTableFilters({
      ...tableFilters,
      commentIdentifierSearch: event.target.value
    });
  };

  const processRowUpdate = React.useCallback(
    async (newRow: TableRowData) => {
      const record: ReportRecord = {
        id: newRow.id as number,
        salesDoc: newRow.salesDoc as string,
        poDate: newRow.poDate as Date,
        purchaseOrderNo: newRow.purchaseOrderNo as string,
        materialDescription: newRow.materialDescription as string,
        qtyOutstanding: newRow.qtyOutstanding as number,
        reqDlvDt: newRow.reqDlvDt as Date,
        schedLnDate: newRow.schedLnDate as Date,
        outstValue: newRow.outstValue as number,
        aberdareComments: newRow.aberdareComments as string,
        contiComments: newRow.contiComments as string
      };
      const response = await updateReportRecord(record);
      // eslint-disable-next-line no-console
      console.log(response);
      return newRow;
    },
    [updateReportRecord]
  );

  const updateSalesDocSearch = debounce(
    (event: ChangeEvent<HTMLInputElement>) =>
      setTableFilters({ ...tableFilters, salesDocSearch: event.target.value }),
    300,
    {
      trailing: true
    }
  );

  const updatePoNumberSearch = debounce(
    (event: ChangeEvent<HTMLInputElement>) =>
      setTableFilters({ ...tableFilters, poNumberSearch: event.target.value }),
    300,
    {
      trailing: true
    }
  );

  const updateMaterialDescriptionSearch = debounce(
    (event: ChangeEvent<HTMLInputElement>) =>
      setTableFilters({
        ...tableFilters,
        materialDescriptionSearch: event.target.value
      }),
    300,
    {
      trailing: true
    }
  );

  const columns: GridColumns = [
    {
      field: 'salesDoc',
      headerName: 'Sales Doc',
      width: 180,
      flex: 1,
      editable: true
    },
    {
      field: 'poDate',
      headerName: 'PO Date',
      flex: 1,
      type: 'date',
      editable: true,
      valueFormatter: (params: GridValueFormatterParams<Date>) => {
        return moment(params.value).format('DD/MM/YYYY');
      }
    },
    {
      field: 'purchaseOrderNo',
      headerName: 'Purchase Order No',
      flex: 1,
      editable: true
    },
    {
      field: 'materialDescription',
      headerName: 'Material Description',
      width: 400,
      editable: true
    },
    {
      field: 'qtyOutstanding',
      headerName: 'Qty outstanding',
      flex: 1,
      type: 'number',
      align: 'right',
      editable: true
    },
    {
      field: 'reqDlvDt',
      headerName: 'Reqdlv Date',
      flex: 1,
      editable: true,
      type: 'date',
      valueFormatter: (params: GridValueFormatterParams<Date>) => {
        return moment(params.value).format('DD/MM/YYYY');
      }
    },
    {
      field: 'schedLnDate',
      headerName: 'Sched Ln Date',
      type: 'date',
      flex: 1,
      editable: true,
      valueFormatter: (params: GridValueFormatterParams<Date>) => {
        return moment(params.value).format('DD/MM/YYYY');
      }
    },
    {
      field: 'outstValue',
      headerName: 'Outst Value',
      type: 'number',
      flex: 1,
      align: 'right',
      editable: true,
      valueFormatter: (params: GridValueFormatterParams<number>) => {
        return params.value.toFixed(2);
      }
    },
    {
      field: 'aberdareComments',
      headerName: 'Aberdare Comments',
      flex: 1,
      editable: true
    },
    {
      field: 'contiComments',
      headerName: 'Conti Comments',
      flex: 1,
      editable: true
    }
  ];
  return (
    <Paper sx={{ padding: 2 }}>
      <Grid container spacing={2} display="flex" alignItems="center">
        <Grid item xs={3} lg={2}>
          <TextField label="Sales Doc" onChange={updateSalesDocSearch} />
        </Grid>
        <Grid item xs={3} lg={2}>
          <TextField label="PO Number" onChange={updatePoNumberSearch} />
        </Grid>
        <Grid item xs={3} lg={2}>
          <TextField
            label="Material Description"
            onChange={updateMaterialDescriptionSearch}
          />
        </Grid>
        <Grid item xs={3} lg={2}>
          <FormControl>
            <InputLabel id="comment-identifier-filter-select">
              Comment Identifier
            </InputLabel>
            <Select
              labelId="comment-identifier-filter-select"
              id="demo-simple-select-filled"
              onChange={handleCommentIdentifierChange}
            >
              {commentIdentifiersList.map((commentIdentifier, index) => {
                return (
                  <MenuItem key={index} value={commentIdentifier.fileUploadId}>
                    {commentIdentifier.commentIdentifier}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <TableContextProvider disableSort>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <DataGridTable
            columns={columns}
            fetchRows={fetchRows}
            filters={tableFilters}
            processRowUpdate={processRowUpdate}
          />
        </Box>
      </TableContextProvider>
    </Paper>
  );
};

export default DataContainer;
