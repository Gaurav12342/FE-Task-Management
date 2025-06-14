/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { CustomButton } from "../ui/button";
import { useSelector } from "react-redux";

interface IProps {
  open: boolean;
  handleClose?: any;
  onConfirm?: any;
  onCancel?: any;
  confirmTitle?: string;
  cancelTitle?: string;
  body?: any;
  title: string;
}
export default function ConfirmDialog({
  open,
  handleClose,
  onConfirm,
  onCancel,
  confirmTitle,
  cancelTitle,
  body,
  title,
}: IProps) {
  const deleteStore = useSelector((state: any) => state.deleteTask);

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          sx: {
            width: "600px",
            maxWidth: "90%",
          },
        }}
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {body}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <div className="w-[50%] flex gap-4">
            <CustomButton
              onClick={onCancel}
              className="w-[80px] h-9 border-red-700 text-black"
              type="submit"
              variant="outline"
            >
              {cancelTitle ?? "Cancel"}
            </CustomButton>
            <CustomButton
              className="w-[80px] bg-red-700 h-9"
              type="button"
              onClick={onConfirm}
              isLoading={deleteStore.loading ?? false}
            >
              {confirmTitle ?? "Confirm"}
            </CustomButton>
          </div>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
