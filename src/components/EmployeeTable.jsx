import React, { useState, useEffect } from 'react';

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

import AddEmployeeForm from './AddEmployeeForm';

import EmployeeDataService from '../services/EmployeeService';

const initialEmployee = {
  name: '',
  code: '',
  color: '',
  profession: '',
  city: '',
  branch: '',
  assigned: true,
};

const EmployeeTable = ({ columns, data, setEmployees }) => {
  const [employee, setEmployee] = useState(initialEmployee);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    EmployeeDataService.getAll()
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [employee]);

  const { getTableProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const addEmployee = () => {
    const { name, code, color, profession, city, branch, assigned } = employee;

    const data = {
      name,
      code,
      color,
      profession,
      city,
      branch,
      assigned,
    };

    EmployeeDataService.create(data)
      .then((response) => {
        setEmployee({
          name: response.data.name,
          code: response.data.code,
          color: response.data.color,
          profession: response.data.profession,
          city: response.data.city,
          branch: response.data.branch,
        });
      })
      .catch((e) => {
        console.log(e);
      });
    setOpen(false);
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
      <AddEmployeeForm
        open={open}
        employee={employee}
        setOpen={setOpen}
        setEmployee={setEmployee}
        addEmployee={addEmployee}
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
  setData: PropTypes.func.isRequired,
};

export default EmployeeTable;
