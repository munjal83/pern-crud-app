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

const AddEmployeeForm = ({
  open,
  setOpen,
  employee,
  setEmployee,
  addEmployee,
}) => {
  const handleClose = () => {
    setOpen(false);
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

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'
      >
        <DialogTitle id='form-dialog-title'>Add Employee</DialogTitle>
        <DialogContent>
          <DialogContentText>Add record to employee table.</DialogContentText>
          <TextField
            autoFocus
            margin='dense'
            label='Name'
            type='text'
            fullWidth
            value={employee.name}
            onChange={handleChange('name')}
          />
          <TextField
            margin='dense'
            label='Code'
            type='text'
            fullWidth
            value={employee.code}
            onChange={handleChange('code')}
          />
          <TextField
            margin='dense'
            label='Color'
            type='text'
            fullWidth
            value={employee.color}
            onChange={handleChange('color')}
          />
          <TextField
            margin='dense'
            label='City'
            type='text'
            fullWidth
            value={employee.city}
            onChange={handleChange('city')}
          />
          <TextField
            margin='dense'
            label='Profession'
            type='text'
            fullWidth
            value={employee.profession}
            onChange={handleChange('profession')}
          />
          <TextField
            margin='dense'
            label='Branch'
            type='text'
            fullWidth
            value={employee.branch}
            onChange={handleChange('branch')}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={employee.assigned}
                value={employee.assigned}
                onChange={handleCheck}
              />
            }
            label='Assigned'
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAdd} color='primary' variant='contained'>
            Add
          </Button>

          <Button onClick={handleClose} color='secondary' variant='contained'>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddEmployeeForm;
