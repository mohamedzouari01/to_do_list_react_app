import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { useContext } from 'react';
import { TodosContext } from '../Context/todosContext';
export default function Todo({ task, handleClickOpenDelete, handleOpenUpdate }) {
    const { todotask, setTodotask } = useContext(TodosContext);
    return (
        <Card sx={{ background: "transparent", backdropFilter: "blur(100px)", marginTop: 4, height: "90px" }}>
            <CardContent sx={{ height: "100%", position: "relative" }}>
                <Grid container spacing={2} >
                    <Grid size={8} >
                        <Typography component="div" variant='h5' sx={{ fontFamily: "math", color: task.isCompleted ? "#7a7c7d" : "", textDecoration: task.isCompleted ? "line-through" : "" }}>
                            {task.task}
                        </Typography>
                    </Grid>
                    <Grid size={4} sx={{
                        display: "flex",
                        justifyContent: "end",
                        gap: "60px"
                    }} className='actionButtons'>
                        <IconButton aria-label="delete">
                            <CheckOutlinedIcon onClick={() => {
                                const newTodos = todotask.map(t => {
                                    if (t.id === task.id) {
                                        return { ...t, isCompleted: !t.isCompleted };
                                    }
                                    return t;
                                })
                                localStorage.setItem("todos", JSON.stringify(newTodos));
                                setTodotask(newTodos);
                            }} fontSize='large' sx={{ position: "fixed", color: task.isCompleted ? "white" : "green", padding: "10px", borderRadius: "50%", background: task.isCompleted ? "green" : "", fontSize: task.isCompleted ? "23px" : "2.1875rem" }} />
                        </IconButton>
                        <IconButton aria-label="delete">
                            <EditOutlinedIcon fontSize='large' sx={{ position: "fixed", color: "#1976d2" }} onClick={() => { handleOpenUpdate(task) }} />
                        </IconButton>
                        <IconButton aria-label="delete">
                            <DeleteIcon fontSize='large' color='error' sx={{ position: "fixed" }} onClick={() => { handleClickOpenDelete(task.id) }} />
                        </IconButton>
                    </Grid>
                </Grid>
                <Grid size={8}>
                    <Typography component="div" variant='h6' sx={{ fontFamily: "math", color: "#7a7c7d", textDecoration: task.isCompleted ? "line-through" : "" }}>
                        {task.description}
                    </Typography>
                </Grid>
            </CardContent>
        </Card >
    );
}