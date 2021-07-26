import './App.css';
import {useEffect, useState} from "react";
import axios from "axios";
import {TextField} from "@material-ui/core";
import {DataGrid} from "@material-ui/data-grid";


const App = () => {
    useEffect(() => {
        axios.get('https://127.0.0.1:8000/api/projects/1/tasks')
            .then((response) => response.data)
            .then((data) => setTasks(data['hydra:member']))
    }, [])

    const [tasks, setTasks] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState(0);

    const postTask = (e) => {
        e.preventDefault();

        axios.post('https://localhost:8000/api/tasks', {
            name: title,
            description: description,
            status: parseInt(status),
            createdAt: "2021-07-26",
            updatedAt: "2021-07-26",
            users: [
                "/api/users/1"
            ],
            project: "/api/projects/1",
            deadline: "2021-07-28"
        }).then(() => refreshData())


        setDescription('')
        setStatus(0)
        setTitle('')
    }

    const handleChangeTitle = (e) => {
        let textTyped = e.target.value;
        if (textTyped === 'Guillaume') {
            setTitle('');
            alert('NON');
        }
        setTitle(e.target.value)
    }

    const handleChangeDescription = (e) => {
        setDescription(e.target.value)
    }

    const handleChangeStatus = (e) => {
        setStatus(e.target.value)
    }

    const refreshData = () => {
        axios.get('https://127.0.0.1:8000/api/projects/1/tasks')
            .then((response) => response.data)
            .then((data) => setTasks(data['hydra:member']))
    }


    const columns = [
        { field: 'id', headerName: 'id', width: 150 },
        { field: 'name', headerName: 'Nom', width: 150 },
        { field: 'description', headerName: 'description', width: 350 },
    ];
    return (
        <div style={{paddingLeft: '20px'}}>
            <h1>
                Pistache
            </h1>
            <form>
                <TextField onChange={handleChangeTitle} value={title} label="Nom" />
                <TextField onChange={handleChangeDescription} value={description} label="Description" />

                <select onChange={handleChangeStatus} name="status">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>
                <button onClick={postTask}>Ok</button>
            </form>
            <div style={{ height: 300, width: '100%' }}>
                <DataGrid columns={columns} rows={tasks} />
            </div>
        </div>
    )
};

export default App;
