import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import ResponseError from './ResponseError';

const columns = [
  { id: 'iso', label: '', minWidth: 15 },
  { id: 'country', label: 'País', minWidth: 50 },
  {
    id: 'confirmed',
    label: 'Confirmados',
    minWidth: 150,
    align: 'right',
    format: value => <strong>{value.toLocaleString()}</strong>,
  },
  // {
  //   id: 'recovered',
  //   label: 'Recuperado',
  //   minWidth: 170,
  //   align: 'right',
  //   format: value => value.toLocaleString(),
  // },
  {
    id: 'deaths',
    label: 'Mortes',
    minWidth: 170,
    align: 'right',
    format: value => value.toLocaleString(),
  },
];

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});

const StickyHeadTable = ({ responseCountries }) => {
  const classes = useStyles();
  const { status, response } = responseCountries;
  const { data } = response || [];

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  if (status === 'ERROR') {
    return <ResponseError response={data} />;
  }

  const rows = data || [];

  return (
    // <Paper className={classes.root}>
    <>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(row => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.iso}>
                    {columns.map(column => {
                      const value =
                        (column.id === 'rate' &&
                          (row.deaths / row.confirmed) * 100) ||
                        row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {(column.id === 'iso' && (
                            <img
                              alt={value}
                              src={`/images/flags/${value.toLowerCase()}.svg`}
                              width={30}
                              style={{ maxHeight: 30 }}
                            />
                          )) ||
                            (column.id === 'deaths' &&
                              `${value} (${(
                                (value / row.confirmed) *
                                100
                              ).toFixed(1)}%)`) ||
                            (column.format && typeof value === 'number'
                              ? column.format(value)
                              : value)}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        labelDisplayedRows={({ from, to, count }) =>
          `${from}-${to === -1 ? count : to} de ${
            count !== -1 ? count : `more than ${to}`
          }`
        }
        labelRowsPerPage={<small>Itens</small>}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </>
  );
};

export default StickyHeadTable;
