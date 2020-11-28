import React, { useEffect } from 'react';

import MaUTable from '@material-ui/core/Table';
import PropTypes from 'prop-types';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import { useTable } from 'react-table';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

import EmployeeForm from './EmployeeForm';

const EmployeeTable = ({
  columns,
  data,
  getAllEmployees,
  employee,
  addEmployee,
  setEmployee,
  open,
  setOpen,
  updateEmployee,
  updating,
  setUpdating,
}) => {
  useEffect(() => {
    getAllEmployees();
  }, [employee]);

  const { getTableProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <TableContainer>
      <Button
        variant='contained'
        color='secondary'
        startIcon={<PersonAddIcon />}
        onClick={handleClickOpen}
      >
        Add New Employee
      </Button>
      <EmployeeForm
        open={open}
        employee={employee}
        setOpen={setOpen}
        setEmployee={setEmployee}
        addEmployee={addEmployee}
        updateEmployee={updateEmployee}
        updating={updating}
        setUpdating={setUpdating}
      />
      <MaUTable {...getTableProps()}>
        <TableHead>
          {headerGroups.map((headerGroup) => (
            <TableRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <TableCell {...column.getHeaderProps()}>
                  {column.render('Header')}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <TableRow {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <TableCell {...cell.getCellProps()}>
                      {cell.render('Cell')}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </MaUTable>
    </TableContainer>
  );
};

EmployeeTable.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
};

export default EmployeeTable;
