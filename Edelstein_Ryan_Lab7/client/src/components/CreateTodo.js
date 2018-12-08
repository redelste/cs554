import React from 'react';
// import UserName from './UserName';

class CreateTodo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: 'Set a title here...',
            user: '1'
        };
    }

    populateOptions(options) {
        return options.map((option, index) => (
            <option key={index} value={option.id}>{option.first_name + " " + option.last_name}</option>
        ));
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        return this.props.submitHandler(this.state)
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>Description</label>
                <textarea name="title" value={this.state.title} onChange={this.handleChange} />

                <br />
                <label>Pick a user:</label>
                <select name="user" value={this.state.user} onChange={this.handleChange} >
                    {this.populateOptions(this.props.users)}
                </select>
                <br />
                <input type="submit" value="Submit" />
            </form >
        )
    }
}

export default CreateTodo;  