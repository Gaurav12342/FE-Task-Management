/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { DataGrid } from "@mui/x-data-grid";
import { Chip, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTaskListAPI } from "../../redux/Task/listsTaskSlice";
import { CustomButton } from "../../components/ui/button";
import Drawer from "@mui/material/Drawer";
import Form from "../Task/Form";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Tooltip from "@mui/material/Tooltip";
import ConfirmDialog from "../../components/confirm-dialoag";
import { deleteTaskAPI } from "../../redux/Task/deleteTaskSlice";
import { CustomInput } from "../../components/ui/input";
import useDebounce from "../../hook/useDebounce";
import { capitalize } from "../../utils/capitalization";

export const Dashboard = () => {
  const [rows, setRows] = useState<any>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  });
  const [totalCount, setTotalCount] = useState(0);

  const [searchInput, setSearchInput] = useState("");
  const debouncedSearch = useDebounce(searchInput, 500);

  const dispatch = useDispatch();
  const selectorData = useSelector((state: any) => state?.taskLists);
  useEffect(() => {
    fetchTasks();
  }, [paginationModel.page, paginationModel.pageSize]);

  const fetchTasks = async () => {
    try {
      const response = await dispatch(
        fetchTaskListAPI({
          page: paginationModel.page + 1,
          limit: paginationModel.pageSize,
        })
      );
      if (response?.payload?.data) {
        const transformed = response.payload.data.map((item: any) => ({
          ...item,
          id: item._id,
        }));
        setRows(transformed);
        setTotalCount(response.payload?.meta?.totalCount || 0);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    if (selectorData?.data?.data) {
      const transformed = selectorData.data.data.map((item: any) => ({
        ...item,
        id: item._id,
      }));
      setRows(transformed);
      setTotalCount(selectorData.data.meta?.totalCount || 0);
    }
  }, [selectorData]);

  useEffect(() => {
    if (debouncedSearch) {
      dispatch(
        fetchTaskListAPI({
          page: paginationModel.page + 1,
          limit: paginationModel.pageSize,
          search: debouncedSearch,
        })
      );
    } else {
      dispatch(
        fetchTaskListAPI({
          page: paginationModel.page + 1,
          limit: paginationModel.pageSize,
        })
      );
    }
  }, [debouncedSearch]);

  const handleEdit = (row: any) => {
    setSelectedTask(row);
    setIsOpen(true);
  };

  const handleDelete = async (row: any) => {
    setSelectedTask(row);
    setIsOpenDelete(true);
  };

  const handleConfirm = async () => {
    try {
      const response = await dispatch(deleteTaskAPI(selectedTask?._id));
      if (response?.payload?.code === "OK") {
        fetchTasks();
        setIsOpenDelete(false);
      }
    } catch (error: any) {
      console.log("error", error);
    }
  };

  const columns: any = [
    { field: "_id", headerName: "ID", width: 300 },
    { field: "title", headerName: "Title", width: 300 },
    { field: "description", headerName: "Description", width: 300 },
    {
      field: "dueDate",
      headerName: "Due Date",
      width: 300,
    },
    {
      field: "priority",
      headerName: "Priority",
      width: 300,
      renderCell: (row: any) => (
        <Chip
          color="primary"
          variant="outlined"
          label={capitalize(row?.row?.priority)}
        />
      ),
    },
    {
      field: "status",
      headerName: "Status",
      width: 300,
      renderCell: (row: any) => (
        <Chip
          color="primary"
          variant="outlined"
          label={capitalize(row?.row?.status)}
        />
      ),
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params: any) => (
        <div className="flex gap-2">
          <Tooltip title="Edit">
            <IconButton
              onClick={() => handleEdit(params.row)}
              size="small"
              color="primary"
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton
              onClick={() => handleDelete(params.row)}
              size="small"
              color="error"
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen flex items-start justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col w-full gap-4">
        <div className="flex flex-row justify-between">
          <div>
            <CustomButton
              className="w-24"
              onClick={() => {
                setSelectedTask(null);
                setIsOpen(true);
              }}
            >
              Add Task
            </CustomButton>
          </div>

          <div className="w-[30%]">
            <CustomInput
              onChange={(e: any) => setSearchInput(e.target.value)}
              placeholder="Search Title"
              className=""
            />
          </div>
        </div>

        <Paper sx={{ height: 500, width: "100%" }}>
          <DataGrid
            loading={selectorData?.loading ?? false}
            rows={rows ?? []}
            columns={columns}
            initialState={{ pagination: { paginationModel } }}
            onPaginationModelChange={setPaginationModel}
            pageSizeOptions={[5, 10]}
            rowCount={totalCount}
            paginationMode="server"
            sx={{ border: 0, padding: 2 }}
            slots={{
              noRowsOverlay: () => (
                <Typography
                  variant="body1"
                  sx={{
                    p: 2,
                    textAlign: "center",
                  }}
                >
                  No records found.
                </Typography>
              ),
            }}
          />
        </Paper>
      </div>

      <Drawer
        anchor="right"
        open={isOpen}
        onClose={() => {
          setIsOpen(false);
          setSelectedTask(null);
        }}
      >
        <Box sx={{ width: 1000 }}>
          <Form
            setIsOpen={setIsOpen}
            selectedTask={selectedTask}
            paginationModel={paginationModel}
          />
        </Box>
      </Drawer>

      {isOpenDelete && (
        <ConfirmDialog
          title="Delete"
          body={"Are you sure. You want to delete"}
          onCancel={() => setIsOpenDelete(false)}
          onConfirm={handleConfirm}
          open={isOpenDelete}
        />
      )}
    </div>
  );
};
