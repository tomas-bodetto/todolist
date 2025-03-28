import { Select, Input, Button, Grid, Header, Icon } from 'semantic-ui-react';
import { useState } from 'react';
import { v4 as uuidv4} from 'uuid';

const options = [
    { key: "deporte", text:"Deporte", value:"deporte"},
    { key: "casa", text:"Casa", value:"casa"},
    { key: "oficina", text:"Oficina", value:"oficina"},
    { key: "otra", text:"Otra", value:"otra"}
]

export default function InputTask(props) {

const [task, setTask] = useState({
    idTask: "",
    taskName: "",
    categoryTask: ""
});

const [error, setError] = useState(false);

const { createTask } = props;

//recuperar valores de los inputs del formulario

const onChangeTask = (e) => {
    setTask({
        ...task,
        [e.target.name]: e.target.value
    });
};

const onChangeCategoryTask = (e, data) => {
    setTask({
        ...task,
        [data.name]: data.value //si actualizamos el data.name => que se actualice con
                                //data.value
    });
};

const onSubmitTask = (e) => {

    // que no recargue la página
    e.preventDefault();

    // validación de los inputs (que no estén vacíos)
    if(task.taskName.trim() === ""){
        setError(true);
        return;
    }

    // eliminar el mensaje previo de error
    setError(false);

    // asignar un ID
    task.idTask = uuidv4();
    

    // crear la tarea
    createTask(task);

    // limpiar los inputs
    setTask({
        idTask: "",
        taskName: "",
        categoryTask: ""
    });
};

    return (
        <>
            <Grid centered columns={2}>
                <Input type="text" action>
                    <Input 
                        size="small"
                        icon="add"
                        placeholder="Escribe tu tarea..."
                        iconPosition="left"
                        name="taskName"
                        value={task.taskName}
                        onChange={onChangeTask} 
                    />
                    <Select 
                        compact
                        options={options}
                        className="select-form-task"
                        name="categoryTask"
                        placeholder="Categoria"
                        value={task.categoryTask}
                        onChange={onChangeCategoryTask}
                    />
                    <Button type="submit" color="violet" onClick={onSubmitTask}>
                        Añadir tarea
                    </Button>
                </Input>
            </Grid>   
            {error && (
                <Grid centered>
                    <Header as="h4" color="red" className="alert-error-form">
                        <Icon name="close" />
                        <Header.Content>La tarea es obligatoria</Header.Content>
                        <Icon name="close" />
                    </Header>
                </Grid>
            )}
        
        
        </>
    )
}