import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from "@mui/material";
import { Close } from '@mui/icons-material';
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function DeletionDialog() {
  const [ open, setOpen ] = useState(false);
  const { id } = useParams<{id:string}>();
  const navigate = useNavigate();

  const onClose = useCallback(() => {
    setOpen(false);
    navigate('/');
  }, [navigate]);

  useEffect(() => {
    setOpen(true);
  }, []);

  function onConfirm(confirmed: boolean) {
    if(confirmed && id) {
      console.log('TODO: delete book with id ', id)
    } else {
      onClose();
    }
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="confirm-dialog-title"
      aria-describedby="confirm-dialog-description">

      <DialogTitle id="confirm-dialog-title">
        { 'TODO: Error or Confirm deletion message here' }
      </DialogTitle>

      <IconButton
        onClick={() => onConfirm(false)}
        sx={{
          position: 'absolute',
          right: 10,
          top: 10,
        }}>
        <Close />
      </IconButton>

      <DialogContent id="confirm-dialog-description">
        { <><div className="error">TODO: Error</div> or 
          `Do you want remove "${id}"?` message</>
        }
      </DialogContent>

      { <>
        TODO: hide actions on error
        <DialogActions>
          <Button onClick={() => onConfirm(false)}>Abbrechen</Button>
          <Button onClick={() => onConfirm(true)}>Ok</Button>
        </DialogActions>
        </>}
    </Dialog>
  );
}

export default DeletionDialog;
