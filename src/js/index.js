import '../styles/default.scss';
import { TodoCreatorComponent } from './UI/components/TodoCreatorComponent';
import { TodoListComponent } from './UI/components/TodoListComponent';


const fullData = [
    {
        'text': 'asd',
        isReady: false,
    },
    {
        'text': 'asd',
        isReady: false,
    },
];




const todoListElement = document.querySelector('.todos-list');
const todoListComponent = new TodoListComponent(todoListElement);

const todoCreatorElement = document.querySelector('.todo-creator');
const todoCreatorComponent = new TodoCreatorComponent(todoCreatorElement);

todoCreatorComponent.on('todoAdded', text => {
    // fullData.push({
    //     text: text,
    //     isReady: false
    // });
    // todoListComponent.render(fullData);
    todoListComponent.addTodo(text);
});

todoCreatorComponent.on('markAllAsDone', () => {
    console.log('All is done!!!!!');
    todoListComponent.markAllAsDone();
});

let counter = 0;
todoCreatorComponent.on('todoAdded', text => {
    console.log(counter++, text);
});



console.log('init');