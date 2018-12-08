import React from 'react';
import ApiService from '../ApiService';
import CreateTodo from '../components/CreateTodo';
import UpdateTodo from '../components/UpdateTodo';
import DeleteTodo from '../components/DeleteTodo';
// import default from '../components/TodoList';
// import * as uuid from 'uuid/v4';

class CreateTodoContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            todos: []
        };
        this.retrieveUsers = this.retrieveUsers.bind(this);
        this.retrieveTodos = this.retrieveTodos.bind(this);
    }

    async retrieveUsers() {
        try {
            const users = await ApiService.getUsers()
            this.setState({ users })
        } catch (e) {
            console.error(`An error ${e.message} occured while searching users`);
        }
    }

    async retrieveTodos() {
        try {
            const todos = await ApiService.getTodos();
            this.setState({ todos })
        } catch (e) {
            console.error(`An error ${e.message} occured while searching todos`);
        }
    }

    async submitHandler({ title, user }) {
        try {
            var userId = Number.parseInt(user, 10);
            if (Number.isNaN(userId)) {
                throw "Error: something went wrong with the userId!"
            }
            const createdTodo = await ApiService.createTodo({ userId, title });
        } catch (e) {
            console.log(e);
        }
    }

    async submitUpdateHandler({ title, user, id, completed }) {
        try {
            var userId = Number.parseInt(user, 10);
            if (Number.isNaN(userId)) {
                throw "Error: something went wrong with the userId!"
            }
            console.log(id);
            const updatedTodo = await ApiService.updateTodo({ userId, title, completed, id })
        } catch (e) {
            console.log(e);
        }
    }

    async submitDeleteHandler({ user, id }) {
        try {
            var userId = Number.parseInt(user, 10);
            if (Number.isNaN(userId)) {
                throw "Error: something went wrong with the userId!";
            }
            console.log(id);
            const deleteTodo = await ApiService.deleteTodo({ userId, id });
        } catch (e) {
            console.log(e);
        }
    }

    async componentDidMount() {
        await this.retrieveUsers()
        await this.retrieveTodos()
    }

    render() {
        const { users, todos } = this.state
        return (
        <div>
            <CreateTodo users={users} submitHandler={this.submitHandler} />;
            <UpdateTodo users={users} todos={todos} submitHandler={this.submitUpdateHandler} />;
            <DeleteTodo users={users} todos={todos} submitHandler={this.submitDeleteHandler} />;
        </div>
        )
    }
}

export default CreateTodoContainer; 