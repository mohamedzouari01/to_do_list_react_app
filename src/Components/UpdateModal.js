import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { useContext, useState, useEffect } from 'react';
import { TodosContext } from '../Context/todosContext';
export default function UpdateModal({ open, handleClose, task }) {
    const { todotask, setTodotask } = useContext(TodosContext);
    const [inputTask, setInputTask] = useState({
        task: task?.task || "",
        description: task?.description || ""
    });
    const [errorValidation, setErrorValidation] = useState({ task: "", description: "" });
    useEffect(() => {
        if (task) {
            setInputTask({
                task: task.task || "",
                description: task.description || ""
            });
        }
    }, [task]);
    const onUpdate = () => {
        let errors = {
            task: "",
            description: "",
        };
        if (inputTask.task.trim() === "") {
            errors.task = "The task field must not be empty";
        }
        if (inputTask.description.trim() === "") {
            errors.description = "The description field must not be empty";
        }
        setErrorValidation(errors);
        if (errors.task || errors.description) {
            return;
        }
        setErrorValidation({ task: "", description: "" });
        const newTodos = todotask.map((t) => {
            if (t.id === task.id) {
                return { ...t, ...inputTask };
            }
            return t;
        });
        localStorage.setItem("todos", JSON.stringify(newTodos));
        setTodotask(newTodos);
        handleClose();
    };
    return (
        <Dialog open={open} onClose={handleClose} disableRestoreFocus>
            <DialogTitle>Update Task</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Modify the task information and save your changes when you're done.
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    label="task"
                    fullWidth
                    variant="standard"
                    onChange={(e) => { setInputTask({ ...inputTask, task: e.target.value }) }}
                    error={errorValidation.task}
                    value={inputTask.task}
                    helperText={errorValidation.task ? errorValidation.task : ""}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    label="description"
                    fullWidth
                    variant="standard"
                    onChange={(e) => { setInputTask({ ...inputTask, description: e.target.value }) }}
                    value={inputTask.description}
                    error={errorValidation.description}
                    helperText={errorValidation.description ? errorValidation.description : ""}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={onUpdate}>
                    Save updates
                </Button>
            </DialogActions>
        </Dialog>
    );
}
