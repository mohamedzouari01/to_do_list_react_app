import * as React from 'react';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import AddTaskIcon from '@mui/icons-material/AddTask';
import Button from '@mui/material/Button';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Todo from './Todo';
import { useState, useContext, useEffect } from 'react';
import DeleteModal from './DeleteModal';
import { TodosContext } from '../Context/todosContext';
import UpdateModal from './UpdateModal';
export default function Todos() {
    const { todotask, setTodotask } = useContext(TodosContext);
    const [inputData, setInputData] = useState({ task: "", description: "" });
    const [openDelete, setOpenDelete] = useState(false);
    const [openUpdate, setOpenUpdate] = useState(false);
    const [selectedIdUpdate, setSelectedIdUpdate] = useState(null);
    const [selectedIdDelete, setSelectedIdDelete] = useState(null);
    const [errorValidation, setErrorValidation] = useState({ task: "", description: "" });
    const [filter, setFilter] = useState("All");
    const [TodoFilter, setTodoFilter] = useState(todotask);
    const handleOpenUpdate = (id) => {
        setSelectedIdUpdate(id);
        setOpenUpdate(true);
    }
    const handleCloseUpdate = () => {
        setOpenUpdate(false);
        setSelectedIdUpdate({});
    };
    const handleClickOpenDelete = (id) => {
        setSelectedIdDelete(id);
        setOpenDelete(true);
    };
    const handleCloseDelete = () => {
        setOpenDelete(false);
        setSelectedIdDelete(null);
    };
    useEffect(() => {
        const StorageTodos = JSON.parse(localStorage.getItem("todos")) ?? [];
        if (StorageTodos) {
            setTodotask(StorageTodos);
        }
    }, []);
    function handleData() {
        let errors = {
            task: "",
            description: "",
        };
        if (inputData.task.trim() === "") {
            errors.task = "The task field must not be empty";
        }
        if (inputData.description.trim() === "") {
            errors.description = "The description field must not be empty";
        }
        setErrorValidation(errors);
        if (errors.task || errors.description) {
            return;
        }
        setErrorValidation({ task: "", description: "" });
        const newTask = {
            id: crypto.randomUUID(),
            task: inputData.task,
            description: inputData.description,
            isCompleted: false,
        };
        localStorage.setItem("todos", JSON.stringify([...todotask, newTask]));
        setTodotask(prev => [...prev, newTask]);
        setInputData({ task: "", description: "" });
    }
    function handleFilter() {
        //All Incompleted  Completed
        let task = todotask;
        if (filter === "All") {
            task = todotask;
        } else if (filter === "Incompleted") {
            task = todotask.filter((t) => !t.isCompleted);
        } else if (filter === "Completed") {
            task = todotask.filter((t) => t.isCompleted);
        }
        let taskList = task
        return taskList;
    }
    useEffect(() => {
        setTodoFilter(handleFilter);
    }, [filter, todotask]);
    let taskList = TodoFilter.map((t) => {
        return <Todo key={t.id} task={t} handleClickOpenDelete={handleClickOpenDelete} handleOpenUpdate={handleOpenUpdate} />;
    });;
    return (
        <>
            <DeleteModal open={openDelete} handleClose={handleCloseDelete} id={selectedIdDelete} />
            <UpdateModal open={openUpdate} handleClose={handleCloseUpdate} task={selectedIdUpdate} />
            <Container maxWidth="md" sx={{ margin: "5px auto" }}>
                <Card sx={{
                    background: "transparent", backdropFilter: "blur(100px)", height: "80vh"
                }}>
                    <CardContent>
                        <Typography component="div" sx={{
                            background: "linear-gradient(90deg, #4facfe, #00f2fe)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            letterSpacing: 1,
                            fontSize: 50,
                            fontFamily: "system-ui"
                        }}>
                            Daily Task Manager App
                        </Typography>
                        <Typography sx={{ color: 'text.secondary', mb: 5, marginTop: 2 }}>
                            A simple and efficient application that helps you organize your daily tasks, track your progress, and stay productive throughout the day.
                        </Typography>

                        <Grid container spacing={2} sx={{ marginBottom: 3, position: "relative" }}>
                            <Grid size={9}>
                                <TextField label="My Task" variant="outlined" sx={{ width: "100%" }} error={errorValidation.task} helperText={errorValidation.task ? errorValidation.task : ""} className='AddTaskInput' value={inputData.task} onChange={(e) => setInputData({ ...inputData, task: e.target.value })} />
                            </Grid>
                            <Grid size={3} className="butonAddTask">
                                <Button variant="contained" startIcon={<AddTaskIcon className='iconTask' />} sx={{ width: "100%", height: "100%", fontSize: "18px" }} onClick={() => { handleData(); }}>Add Task</Button>
                            </Grid>
                            <Grid size={9}>
                                <TextField label="description Task" variant="outlined" sx={{ width: "100%" }} error={errorValidation.description} helperText={errorValidation.description ? errorValidation.description : ""} className='AddTaskInput' value={inputData.description} onChange={(e) => setInputData({ ...inputData, description: e.target.value })} />
                            </Grid>
                        </Grid>
                        <ToggleButtonGroup
                            color="primary"
                            value={filter}
                            exclusive
                            sx={{ display: "flex", justifyContent: "center", gap: 5 }}
                            onChange={(event, newFilter) => { setFilter(newFilter); }}
                        >
                            <ToggleButton value="All" className='buttonTog'>All</ToggleButton>
                            <ToggleButton value="Incompleted" className='buttonTog'>Incompleted</ToggleButton>
                            <ToggleButton value="Completed" className='buttonTog'>Completed</ToggleButton>
                        </ToggleButtonGroup>
                        <div>
                            {taskList}
                        </div>
                    </CardContent>
                </Card>
            </Container >
        </>
    );
}
