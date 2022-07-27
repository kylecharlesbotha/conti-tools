import { Box, Button } from '@mui/material';
import {
  DataGrid,
  GridCellModes,
  GridCellModesModel,
  GridColumns,
  GridEventListener,
  GridRowId
} from '@mui/x-data-grid';

import React from 'react';
import { useEffect, useState } from 'react';
import { FetchRows, TableRowData } from 'src/types';
import { useTableContext } from '../table';

interface ITable {
  columns: GridColumns;
  fetchRows: FetchRows<TableRowData>;
  search?: string;
  filters?: Record<string, string>;
  processRowUpdate: (newRow: TableRowData) => Promise<TableRowData>;
}

interface SelectedCellParams {
  id: GridRowId;
  field: string;
}

interface EditToolbarProps {
  selectedCellParams?: SelectedCellParams;
  cellModesModel: GridCellModesModel;
  setCellModesModel: (value: GridCellModesModel) => void;
  cellMode: 'view' | 'edit';
}

function EditToolbar(props: EditToolbarProps) {
  const { selectedCellParams, cellMode, cellModesModel, setCellModesModel } =
    props;

  const handleSaveOrEdit = () => {
    if (!selectedCellParams) {
      return;
    }
    const { id, field } = selectedCellParams;
    if (cellMode === 'edit') {
      setCellModesModel({
        ...cellModesModel,
        [id]: { ...cellModesModel[id], [field]: { mode: GridCellModes.View } }
      });
    } else {
      setCellModesModel({
        ...cellModesModel,
        [id]: { ...cellModesModel[id], [field]: { mode: GridCellModes.Edit } }
      });
    }
  };

  const handleCancel = () => {
    if (!selectedCellParams) {
      return;
    }
    const { id, field } = selectedCellParams;
    setCellModesModel({
      ...cellModesModel,
      [id]: {
        ...cellModesModel[id],
        [field]: { mode: GridCellModes.View, ignoreModifications: true }
      }
    });
  };

  const handleMouseDown = (event: React.MouseEvent) => {
    // Keep the focus in the cell
    event.preventDefault();
  };

  return (
    <Box
      sx={{
        borderBottom: 1,
        borderColor: 'divider',
        p: 1
      }}
    >
      <Button
        onClick={handleSaveOrEdit}
        onMouseDown={handleMouseDown}
        disabled={!selectedCellParams}
        variant="outlined"
      >
        {cellMode === 'edit' ? 'Save' : 'Edit'}
      </Button>
      <Button
        onClick={handleCancel}
        onMouseDown={handleMouseDown}
        disabled={cellMode === 'view'}
        variant="outlined"
        sx={{ ml: 1 }}
      >
        Cancel
      </Button>
    </Box>
  );
}

export const DataGridTable = ({
  columns,
  fetchRows,
  search,
  filters,
  processRowUpdate
}: ITable) => {
  const [currentRows, setCurrentRows] = useState<TableRowData[]>([]);
  const [totalRows, setTotalRows] = useState(0);
  const rowHeight = 50;
  const {
    order,
    orderBy,
    handlePageChange,
    handlePageSizeChange,
    page,
    pageSize
  } = useTableContext();

  useEffect(() => {
    (async () => {
      const paginatedResponse = await fetchRows({
        page,
        pageSize,
        order: order as string,
        orderBy,
        search,
        filters
      });

      setTotalRows(paginatedResponse.totalCount);
      setCurrentRows([...paginatedResponse.items]);
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageSize, order, orderBy, search, filters]);

  const [selectedCellParams, setSelectedCellParams] =
    React.useState<SelectedCellParams | null>(null);
  const [cellModesModel, setCellModesModel] =
    React.useState<GridCellModesModel>({});

  const handleCellFocus = React.useCallback(
    (event: React.FocusEvent<HTMLDivElement>) => {
      const row = event.currentTarget.parentElement;
      const id = row!.dataset.id!;
      const field = event.currentTarget.dataset.field!;
      setSelectedCellParams({ id, field });
    },
    []
  );

  const cellMode = React.useMemo(() => {
    if (!selectedCellParams) {
      return 'view';
    }
    const { id, field } = selectedCellParams;
    return cellModesModel[id]?.[field]?.mode || 'view';
  }, [cellModesModel, selectedCellParams]);

  // const processRowUpdate = React.useCallback((newRow: TableRowData) => {
  //   // eslint-disable-next-line no-console
  //   console.log(newRow);
  //   return newRow;
  // }, []);

  const handleCellKeyDown = React.useCallback<GridEventListener<'cellKeyDown'>>(
    (params, event) => {
      if (cellMode === 'edit') {
        // Prevents calling event.preventDefault() if Tab is pressed on a cell in edit mode
        event.defaultMuiPrevented = true;
      }
    },
    [cellMode]
  );

  return (
    <Box mt={2}>
      <DataGrid
        autoHeight={true}
        rows={currentRows}
        rowHeight={rowHeight}
        columns={columns}
        onCellKeyDown={handleCellKeyDown}
        cellModesModel={cellModesModel}
        components={{
          Toolbar: EditToolbar
        }}
        componentsProps={{
          toolbar: {
            cellMode,
            selectedCellParams,
            setSelectedCellParams,
            cellModesModel,
            setCellModesModel
          },
          cell: {
            onFocus: handleCellFocus
          }
        }}
        paginationMode="server"
        experimentalFeatures={{ newEditingApi: true }}
        processRowUpdate={processRowUpdate}
        rowsPerPageOptions={[5, 10, 25, 50]}
        rowCount={totalRows}
        pageSize={pageSize}
        page={page}
        onPageChange={(page) => handlePageChange(page)}
        onPageSizeChange={(pageSize) => handlePageSizeChange(pageSize)}
      />
    </Box>
  );
};
