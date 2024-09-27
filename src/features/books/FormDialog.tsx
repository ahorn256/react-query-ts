import { Close } from '@mui/icons-material';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid2 as Grid, IconButton, TextField } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'
import { Book, InputBook } from './Book';
import formValidationSchema from './formValidationSchema';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchBooks, saveBook } from './booksAPI';
import { convertToFetchError, IFetchError } from '../../FetchError';

function FormDialog() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<InputBook>({
    resolver: yupResolver(formValidationSchema),
  });
  const { id } = useParams<{id:string}>();
  const [ open, setOpen ] = useState(false);
  const [ error, setError ] = useState<IFetchError|null>(null);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: saveBook,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['books']});
      onClose();
    },
    onError(err) {
      setError(convertToFetchError(err));
    },
  });

  const onClose = useCallback(() => {
    setError(null);
    setOpen(false);
    navigate('/');
  }, [navigate]);

  useEffect(() => {
    (async () => {
      let book:Book|undefined;

      if(id) {
        try {
          const books = await queryClient.ensureQueryData({ queryKey: ['books'], queryFn: fetchBooks});
          book = books && books.find(book => book.id === id);

          if(!book) {
            throw new Error(`Book with the id ${id} doesn't exist`);
          }
        } catch(err) {
          setError(convertToFetchError(err));
        }

        setOpen(true);

        if(book) {
          reset(book);
        } else {
          reset({
            title: '',
            author: '',
            isbn: '',
          });
        }
      } else {
        setOpen(true);
      }
    })();
  }, [id, reset]);

  function onSave(book: InputBook) {
    !error && mutation.mutate(book);
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby='form-dialog-title'
      aria-describedby='form-dialog-description'>
      <DialogTitle id='form-dialog-title'>
        {id ? 'Buch bearbeiten' : 'Neues Buch anlegen'}
      </DialogTitle>

      <IconButton
        onClick={onClose}
        sx={{
          position: 'absolute',
          top: 10,
          right: 10,
        }}>
        <Close />
      </IconButton>

      <form onSubmit={handleSubmit(onSave)}>
        <DialogContent id='form-dialog-description'>
          {error && <div className='error'>Error: {error.message}</div>}
          <Grid container direction={'column'} rowSpacing={1} display='flex'>
            <Grid>
              <TextField fullWidth={true} label='Titel' error={!!errors.title} {...register('title')}/>
              { errors.title && <div className='error'>{errors.title.message}</div> }
            </Grid>
            <Grid>
              <TextField fullWidth={true} label='Author' error={!!errors.author} {...register('author')}/>
              { errors.author && <div className='error'>{errors.author.message}</div> }
            </Grid>
            <Grid>
              <TextField fullWidth={true} label='ISBN' error={!!errors.isbn} {...register('isbn')}/>
              { errors.isbn && <div className='error'>{errors.isbn.message}</div> }
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose}>Abbrechen</Button>
          <Button type='submit'>Speichern</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default FormDialog;
