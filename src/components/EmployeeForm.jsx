import React from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

const EmployeeForm = ({
  open,
  setOpen,
  employee,
  setEmployee,
  addEmployee,
  updateEmployee,
  updating,
  setUpdating,
}) => {
  const handleClose = () => {
    setUpdating(false);
    setOpen(false);
    setEmployee({});
  };

  const handleAdd = () => {
    addEmployee();
  };

  const handleChange = (name) => ({ target: { value } }) => {
    setEmployee({ ...employee, [name]: value });
  };

  const handleCheck = (e) => {
    setEmployee({ ...employee, assigned: e.target.checked });
  };

  const handleUpdate = () => {
    updateEmployee(employee.id);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'
      >
        <DialogTitle id='form-dialog-title'>
          {!updating ? 'Add Employee' : 'Update Employee'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Add/Update record to employee table
          </DialogContentText>
          <InputLabel>Color</InputLabel>
          <Select value={employee.color || ''} onChange={handleChange('color')}>
            <MenuItem value={''}>
              <em>None</em>
            </MenuItem>
            <MenuItem value={'yellow' || '#FFFF00'}>Yellow</MenuItem>
            <MenuItem value={'blue' || '##000080'}>Blue</MenuItem>
            <MenuItem value={'green' || '#008000'}>Green</MenuItem>
            <MenuItem value={'red' || '#FF0000'}>Red</MenuItem>
            <MenuItem value={'orange' || '#FF6600'}>Orange</MenuItem>
            <MenuItem value={'#333333'}>Gray</MenuItem>
          </Select>
          <TextField
            autoFocus
            margin='dense'
            label='Name'
            type='text'
            fullWidth
            defaultValue={employee.name}
            onChange={handleChange('name')}
          />
          <TextField
            margin='dense'
            label='Code'
            type='text'
            fullWidth
            defaultValue={employee.code}
            onChange={handleChange('code')}
          />
          <TextField
            margin='dense'
            label='City'
            type='text'
            fullWidth
            defaultValue={employee.city}
            onChange={handleChange('city')}
          />
          <TextField
            margin='dense'
            label='Profession'
            type='text'
            fullWidth
            defaultValue={employee.profession}
            onChange={handleChange('profession')}
          />
          <TextField
            margin='dense'
            label='Branch'
            type='text'
            fullWidth
            defaultValue={employee.branch}
            onChange={handleChange('branch')}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={employee.assigned ? employee.assigned : false}
                value={employee.assigned || false}
                onChange={handleCheck}
              />
            }
            label='Assigned'
          />
        </DialogContent>
        <DialogActions>
          {!updating ? (
            <Button onClick={handleAdd} color='primary' variant='contained'>
              ADD
            </Button>
          ) : (
            <Button onClick={handleUpdate} color='primary' variant='contained'>
              UPDATE
            </Button>
          )}
          <Button onClick={handleClose} color='secondary' variant='contained'>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EmployeeForm;
