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

const UpdateEmployeeForm = ({
  open,
  setOpen,
  currentEmployee,
  setCurrentEmployee,
  updateEmployee
}) => {
  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (name) => ({ target: { value } }) => {
    setCurrentEmployee({ ...currentEmployee, [name]: value });
  };

  const handleCheck = (e) => {
    setCurrentEmployee({ ...currentEmployee, assigned: e.target.checked });
  };

  const handleEdit = () => {
      updateEmployee(currentEmployee.id)
  }

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'
      >
        <DialogTitle id='form-dialog-title'>Edit Employee</DialogTitle>
        <DialogContent>
          <DialogContentText>Edit record to employee table.</DialogContentText>
          <TextField
            autoFocus
            margin='dense'
            label='Name'
            type='text'
            fullWidth
            value={currentEmployee.name}
            onChange={handleChange('name')}
          />
          <TextField
            margin='dense'
            label='Code'
            type='text'
            fullWidth
            value={currentEmployee.code}
            onChange={handleChange('code')}
          />
          <TextField
            margin='dense'
            label='Color'
            type='text'
            fullWidth
            value={currentEmployee.color}
            onChange={handleChange('color')}
          />
          <TextField
            margin='dense'
            label='City'
            type='text'
            fullWidth
            value={currentEmployee.city}
            onChange={handleChange('city')}
          />
          <TextField
            margin='dense'
            label='Profession'
            type='text'
            fullWidth
            value={currentEmployee.profession}
            onChange={handleChange('profession')}
          />
          <TextField
            margin='dense'
            label='Branch'
            type='text'
            fullWidth
            value={currentEmployee.branch}
            onChange={handleChange('branch')}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={currentEmployee.assigned}
                value={currentEmployee.assigned}
                onChange={handleCheck}
              />
            }
            label='Assigned'
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEdit} color='primary' variant='contained'>
            Edit
          </Button>
          <Button onClick={handleClose} color='secondary' variant='contained'>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UpdateEmployeeForm;
