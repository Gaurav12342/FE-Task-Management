/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { CustomButton } from "../../components/ui/button";
import { CustomInput } from "../../components/ui/input";
import { CustomLabel } from "../../components/ui/label";
import { CustomTextarea } from "../../components/ui/textarea";
import { CustomDatePicker } from "../../components/ui/datePicker";
import { CustomSelect } from "../../components/ui/select";
import { useDispatch, useSelector } from "react-redux";
import { createTaskAPI } from "../../redux/Task/createTaskSlice";
import { fetchTaskListAPI } from "../../redux/Task/listsTaskSlice";
import { useEffect, useState } from "react";
import { updateTaskAPI } from "../../redux/Task/updateTaskSlice";
import { PRIORITY, STATUS } from "../../constants/constant";

interface IProps {
  setIsOpen?: any;
  selectedTask?: any;
  paginationModel?: any;
}

const Form = ({ setIsOpen, selectedTask, paginationModel }: IProps) => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  const isLoadingTaskCreate = useSelector((state: any) => state.createdTask);
  const isLoadingTaskUpdate = useSelector((state: any) => state.updateTask);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (selectedTask) {
      setValue("title", selectedTask?.title);
      setValue("description", selectedTask?.description);
      setValue("dueDate", selectedTask?.dueDate);
      setValue("priority", selectedTask?.priority);
      setValue("status", selectedTask?.status);
    }
  }, [selectedTask, setValue]);

  const onSubmit = async (data: any) => {
    try {
      if (selectedTask) {
        const updatedTask = {
          ...data,
          id: selectedTask?._id,
        };
        await dispatch(updateTaskAPI(updatedTask));
        dispatch(
          fetchTaskListAPI({
            page: paginationModel.page + 1,
            limit: paginationModel.pageSize,
          })
        );
        setIsLoading(isLoadingTaskUpdate?.loading ?? false);
      } else {
        await dispatch(createTaskAPI(data));
        dispatch(
          fetchTaskListAPI({
            page: paginationModel.page + 1,
            limit: paginationModel.pageSize,
          })
        );
        setIsLoading(isLoadingTaskCreate?.loading ?? false);
      }
      setIsOpen(false);
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  const handleCloseDrawer = () => {
    setIsOpen(false);
  };

  const handleResetForm = () => {
    reset();
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-full space-y-8 bg-white p-8 rounded-lg">
        <div>
          <h2 className="mt-6 text-start text-3xl font-extrabold text-gray-900">
            {selectedTask ? "Edit Task" : "Create Task"}
          </h2>
        </div>
        <form className="mt-4 space-y-10" onSubmit={handleSubmit(onSubmit)}>
          <div className="rounded-md space-y-4">
            <div>
              <CustomLabel htmlFor="fname" className="text-black">
                Title
              </CustomLabel>
              <CustomInput
                id="title"
                placeholder="Title"
                label="Title"
                {...register("title", { required: true })}
              />
              <span className="text-sm block text-red-500">
                {errors.title ? "This field is required" : ""}
              </span>
            </div>
            <div>
              <CustomLabel htmlFor="lname" className="text-black">
                Description
              </CustomLabel>
              <CustomTextarea
                rows={4}
                placeholder="Description"
                {...register("description", { required: true })}
              />
              <span className="text-sm block text-red-500">
                {errors.description ? "This field is required" : ""}
              </span>
            </div>
            <div>
              <CustomLabel htmlFor="email" className="text-black">
                Due Date
              </CustomLabel>
              <CustomDatePicker
                id="due-date"
                label="Due Date"
                {...register("dueDate", { required: true })}
              />
              <span className="text-sm block text-red-500">
                {errors.dueDate ? "This field is required" : ""}
              </span>
            </div>
            <div className="relative">
              <CustomLabel htmlFor="password" className="text-black">
                Priority
              </CustomLabel>
              <CustomSelect
                id="priority"
                label="Priority"
                {...register("priority", { required: true })}
                options={PRIORITY}
              />
              <span className="text-sm block text-red-500">
                {errors.priority ? "This field is required" : ""}
              </span>
            </div>
            <div className="relative">
              <CustomLabel htmlFor="password" className="text-black">
                Status
              </CustomLabel>
              <CustomSelect
                id="status"
                label="Status"
                {...register("status", { required: true })}
                options={STATUS}
              />
              <span className="text-sm block text-red-500">
                {errors.status ? "This field is required" : ""}
              </span>
            </div>
          </div>

          <div className="flex gap-4 w-[50%]">
            <CustomButton isLoading={isLoading ?? false} type="submit">
              {selectedTask ? "Update" : "Create"}
            </CustomButton>
            <CustomButton
              className="bg-white text-black border-blue-500"
              type="button"
              variant="outline"
              onClick={handleResetForm}
            >
              Reset
            </CustomButton>
            <CustomButton onClick={handleCloseDrawer} type="button">
              Back
            </CustomButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
