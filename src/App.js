import React from 'react';
import './components/TodoComponents/Todo.css'
import TodoForm from './components/TodoComponents/TodoForm';
import TodoList from './components/TodoComponents/TodoList';
import SearchBar from './components/TodoComponents/SearchBar';

const data = [
  {
    task: 'Organize Garage',
    id: 1528817077286,
    completed: false
  },
  {
    task: 'Bake Cookies',
    id: 1528817084358,
    completed: false
  }
];

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      todos: data,
      TodoForm: '',
      filter: '',
    }
  }
  
  componentDidMount() {
    const storedTodoList = JSON.parse(localStorage.getItem('todo'));
    if(storedTodoList) { this.setState({ todos: storedTodoList }) }
  }
  toggleComplete = (id) => {
    // console.log("ID", id);
    // console.log("THISSTATE", this.state);
    let todos = [...this.state.todos];
    // console.log("TODOS", todos);
    todos = todos.map(todo => {
      if(todo.id === id) {
        todo.completed = !todo.completed;
        return todo;
      } else {
        return todo;
      }
    })
    this.setState({
      todos,
    });
  }
  
  getTodos() {
    // let todos = [...this.state.todos];
    {console.log([...this.state.todos])}
    if (this.state.filter === "") return this.state.todos;
    
    return this.state.todos.filter(todo => {
      let task = todo.task
        .toLowerCase()
        .includes(this.state.filter.toLowerCase());
        return task;
      });
  }

  addTodo = (e) => {
    e.preventDefault()

    let newTodos = [...this.state.todos,
    {task: this.state.todoForm, completed: false, id: Date.now()}];
    localStorage.setItem('todo', JSON.stringify(newTodos))

    this.setState({
      todos: [...this.state.todos,
      {task: this.state.todoForm, completed: false, id: Date.now()} 
      ], 
      todoForm: ''
    })
  }

  removeComplete = (e) => {
    e.preventDefault()
    
    let todos = [...this.state.todos];
    console.log(todos);
    todos = todos.filter(todo => todo.completed === false)
    this.setState({
      todos
    })
  }

  handleInputChange = (e) => {
    console.log("change: ", e.target.name);
    
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    return (
      <div className="main-container">
        <TodoList 
          getTodos={this.getTodos()}
          // todos={this.state.todos}
          toggleComplete={this.toggleComplete}
        />
        <SearchBar 
          filter={this.state.filter}
          handleInputChange={this.handleInputChange}
        />
        <TodoForm 
          value={this.state.todoForm}
          handleInputChange={this.handleInputChange}
          addTodo={this.addTodo}
          removeComplete={this.removeComplete}
        />
      </div>
    )
  }
}

export default App;
