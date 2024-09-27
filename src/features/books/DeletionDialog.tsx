import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from "@mui/material";
import { Close } from '@mui/icons-material';
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBook } from "./booksAPI";
import { convertToFetchError, IFetchError } from "../../FetchError";

function DeletionDialog() {
  const [ open, setOpen ] = useState(false);
  const [ error, setError ] = useState<IFetchError|null>(null);
  const { id } = useParams<{id:string}>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteBook,
    onSuccess() {
      queryClient.invalidateQueries({queryKey: ['books']});
      onClose();
    },
    onError(err) {
      setError(convertToFetchError(err));
    }
  });

  const onClose = useCallback(() => {
    setError(null);
    setOpen(false);
    navigate('/');
  }, [navigate]);

  useEffect(() => {
    setOpen(true);
  }, []);

  function onConfirm(confirmed: boolean) {
    if(confirmed && id) {
      mutation.mutate(id);
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
        { error ? 'Error' : 'Confirm deletion' }
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
        { error ?
          <div className="error">Error: {error.message}</div>: 
          `Do you want remove "${id}"?`
        }
      </DialogContent>

      { !error &&
        <DialogActions>
          <Button onClick={() => onConfirm(false)}>Abbrechen</Button>
          <Button onClick={() => onConfirm(true)}>Ok</Button>
        </DialogActions>
      }
    </Dialog>
  );
}

export default DeletionDialog;
