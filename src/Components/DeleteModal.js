import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import * as React from 'react';
import { useContext } from 'react';
import { TodosContext } from '../Context/todosContext';
export default function DeleteModal({ open, handleClose, id }) {
    const { todotask, setTodotask } = useContext(TodosContext);
    const onDelete = () => {
        const newTodos = todotask.filter(t => t.id !== id);
        localStorage.setItem("todos", JSON.stringify(newTodos));
        setTodotask(newTodos);
        handleClose();
    };
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
            role="alertdialog"
            disableRestoreFocus
        >
            <DialogTitle>{"Delete This Task?"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    Are you sure you want to delete this task? Once deleted, all task information, including its title, description, progress, and related data, will be permanently removed from your to-do list project. This action cannot be undone.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} autoFocus>
                    Disagree
                </Button>
                <Button onClick={onDelete}>Agree</Button>
            </DialogActions>
        </Dialog>
    );
}