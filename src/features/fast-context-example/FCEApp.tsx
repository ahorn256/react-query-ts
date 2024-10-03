import { Container, Paper, Table, TableBody, TableCell, TableHead, TableRow, TextField } from "@mui/material";
import styles from './FCEApp.module.scss';
import { useFCEStore } from "./FCEContext";

function TextField1() {
  const [ field, setStore ] = useFCEStore((store) => store.item1);
  function handleChanges(val: string) {
    setStore({ item1: { caption: val } });
  }

  return (
    <TextField
    value={field.caption}
    onChange={(e) => handleChanges(e.currentTarget.value)}
    label="field 1"/>

  );
}

function Label1() {
  const [ field ] = useFCEStore((store) => store.item1);

  return (
    <div>
      Field 1: {field.caption}
    </div>
  );
}

function TextField2() {
  const [ field, setStore ] = useFCEStore((store) => store.item2);
  function handleChanges(val: string) {
    setStore({ item2: { caption: val } });
  }

  return (
    <TextField
    value={field.caption}
    onChange={(e) => handleChanges(e.currentTarget.value)}
    label="field 2"/>

  );
}

function Label2() {
  const [ field ] = useFCEStore((store) => store.item2);

  return (
    <div>
      Field 2: {field.caption}
    </div>
  );
}

function List() {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>
            <TextField1 />
          </TableCell>
          <TableCell>
            <TextField2 />
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>
            <Label1 />
          </TableCell>
          <TableCell>
            <Label2 />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}

function FCEApp() {
  return (
    <Container className={styles.app}>
      <Paper>
        <List />
      </Paper>
    </Container>
  );
}

export default FCEApp;
