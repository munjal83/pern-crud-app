import React, { useEffect, useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';

import EmployeeTable from './EmployeeTable';
import UpdateEmployeeForm from './UpdateEmployeeForm';
import EmployeeDataService from '../services/EmployeeService';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';

const TableGrid = () => {
  const [employees, setEmployees] = useState([]);
  const [currentEmployee, setCurrentEmployee] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    EmployeeDataService.getAll()
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [currentEmployee]);

  const deleteEmployee = (id) => {
    EmployeeDataService.remove(id)
      .then((response) => {
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const fetchEmployee = (id) => {
    EmployeeDataService.get(id)
      .then((response) => {
        setCurrentEmployee(response.data);
        setOpen(true);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const updateEmployee = (id) => {
    const {
      name,
      code,
      color,
      profession,
      city,
      branch,
      assigned,
    } = currentEmployee;
    
    const data = {
      name,
      code,
      color,
      profession,
      city,
      branch,
      assigned,
    };

    EmployeeDataService.update(id, data)
      .then((response) => {
        setCurrentEmployee({
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

  const columns = React.useMemo(
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

        Cell: (tableProps) => (
          <span
            style={{
              cursor: 'pointer',
            }}
            onClick={() => {
              const employeesCopy = [...employees];
              const toBeRemoved = employeesCopy.splice(tableProps.row.index, 1);
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

        Cell: (tableProps) => (
          <span
            style={{
              cursor: 'pointer',
            }}
            onClick={() => {
              const employeesCopy = [...employees];
              const toBeFetched = employeesCopy.splice(tableProps.row.index, 1);
              fetchEmployee(toBeFetched[0]['id']);
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
      <UpdateEmployeeForm
        open={open}
        currentEmployee={currentEmployee}
        setOpen={setOpen}
        setCurrentEmployee={setCurrentEmployee}
        updateEmployee={updateEmployee}
      />
      <EmployeeTable
        columns={columns}
        data={employees}
        setEmployees={setEmployees}
      />
    </div>
  );
};

export default TableGrid;
