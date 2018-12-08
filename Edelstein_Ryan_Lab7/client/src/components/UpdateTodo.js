import React from 'react';
import find from 'lodash/find';
import filter from 'lodash/filter';
// import UserName from './UserName';

class UpdateTodo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            user: "6",
            id: 6,
            completed: false
        };
        this.populateUsers = this.populateUsers.bind(this);
        this.populateTodos = this.populateTodos.bind(this);
        console.log("UPDATE_TODO_PROPS", props)
    }

    populateUsers(options) {
        return options.map((option, index) => (
            <option key={index} value={option.id}>{option.first_name + " " + option.last_name}</option>
        ));
    }

    populateTodos(options) {
        return options.map((option, index) => (
            <option key={index} value={option.id}>{option.title}</option>
        ));
    }

    handleChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({ [name]: value });
    }

    handleSubmit(event) {
        event.preventDefault();
        return this.props.submitHandler(this.state)
    }

    getTodosForUser(userId) {
        console.log(userId)
        const currentUser = find(this.props.users, function (user) { return user.id == userId });
        console.log(currentUser)
        return filter(this.props.todos, function (todo) { return todo.user.first_name == currentUser.first_name });
    }

    componentDidMount() {
        const id = 0;
        this.setState({ id });
    }

    render() {
        return(
        <form onSubmit={this.handleSubmit}>
            <label>Pick a user</label>
            <select name="user" value={this.state.user} onChange={this.handleChange} >
                {this.populateUsers(this.props.users)}
            </select>
            <br />
            <label>Which todo?</label>
            <select name="id" value={this.state.id} onChange={this.handleChange}>
                {(this.state.id === 0) ? (<div></div>) : this.populateTodos(this.getTodosForUser(this.state.id))}
            </select>
            <br />
            <label className="update__todo__label">Description</label>
            <textarea rows="5" cols="33" name="title" value={this.state.title} onChange={this.handleChange}/>
            <br />
            <label className="update__todo__label">Completed?</label>
            <input name="completed" type="checkbox" checked={this.state.isCompleted} onChange={this.handleChange} />
            <input type="submit" value="Submit" />
        </form>
        )
    }
}

export default UpdateTodo;  