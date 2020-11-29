import React, { useEffect, useState, useMemo } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';

import EmployeeTable from './EmployeeTable';
import EmployeeDataService from '../services/EmployeeService';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';

const initialEmployee = {
  name: '',
  code: '',
  color: '',
  profession: '',
  city: '',
  branch: '',
  assigned: true,
};

const TableGrid = () => {
  const [employees, setEmployees] = useState([]);
  const [employee, setEmployee] = useState(initialEmployee);
  const [open, setOpen] = useState(false);
  const [updating, setUpdating] = useState(false);

  const setStyle = (color) => {
    return {
      backgroundColor: color,
      width: '15px',
      height: '15px',
    };
  };

  useEffect(() => {
    getAllEmployees();
  }, [employee]);

  const getAllEmployees = async () => {
    try {
      const response = await EmployeeDataService.getAll();
      setEmployees(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addEmployee = async () => {
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
    try {
      const response = await EmployeeDataService.create(data);
      console.log(response);
      setEmployee(initialEmployee);
    } catch (error) {
      console.log(error);
    }
    setOpen(false);
  };

  const deleteEmployee = async (id) => {
    try {
      const response = await EmployeeDataService.remove(id);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchEmployee = async (id) => {
    try {
      const response = await EmployeeDataService.get(id);
      console.log(response.data);
      setEmployee(response.data);
      setOpen(true);
    } catch (e) {
      console.log(e);
    }
  };

  const updateEmployee = async (id) => {
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
    try {
      const response = await EmployeeDataService.update(id, data);
      setOpen(false);
      setEmployee({
        name: response.data.name,
        code: response.data.code,
        color: response.data.color,
        branch: response.data.branch,
        city: response.data.city,
        profession: response.data.profession,
        assigned: response.data.assigned,
      });
      setUpdating(false);
    } catch (error) {
      console.log(error);
    }
  };

  const sliceEmployeeRecord = (props) => {
    const employeesCopy = [...employees];
    const sliceRecord = employeesCopy.splice(props.row.index, 1);
    return sliceRecord
  }

  const columns = useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'id',
      },
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Code',
        accessor: 'code',
      },
      {
        Header: 'Color',
        accessor: 'color',
        Cell: (props) => {
          const sliceRecord = sliceEmployeeRecord(props)
          const color = sliceRecord[0].color
            return <div style={setStyle(color)}></div>
        },
      },
      {
        Header: 'Profession',
        accessor: 'profession',
      },
      {
        Header: 'City',
        accessor: 'city',
      },
      {
        Header: 'Branch',
        accessor: 'branch',
      },
      {
        Header: 'Assigned',
        accessor: (d) => {
          return d.assigned ? (
            <CheckIcon color='primary' />
          ) : (
            <ClearIcon color='secondary' />
          );
        },
      },
      {
        Header: 'Delete',
        accessor: 'delete',

        Cell: (props) => (
          <span
            style={{
              cursor: 'pointer',
            }}
            onClick={() => {
              const employeesCopy = [...employees];
              const toBeRemoved = employeesCopy.splice(props.row.index, 1);
              deleteEmployee(toBeRemoved[0]['id']);
              setEmployees(employeesCopy);
            }}
          >
            <DeleteForeverIcon color='secondary' />
          </span>
        ),
      },
      {
        Header: 'Edit',
        accessor: 'edit',

        Cell: (props) => (
          <span
            style={{
              cursor: 'pointer',
            }}
            onClick={() => {
              const sliceRecord = sliceEmployeeRecord(props)
              fetchEmployee(sliceRecord[0]['id']);
              setUpdating(true);
            }}
          >
            <EditIcon color='primary' />
          </span>
        ),
      },
    ],
    [employees]
  );

  return (
    <div style={{ padding: 50 }}>
      <CssBaseline />
      <EmployeeTable
        columns={columns}
        data={employees}
        open={open}
        employee={employee}
        updating={updating}
        setEmployee={setEmployee}
        getAllEmployees={getAllEmployees}
        addEmployee={addEmployee}
        setOpen={setOpen}
        updateEmployee={updateEmployee}
        setUpdating={setUpdating}
      />
    </div>
  );
};

export default TableGrid;
