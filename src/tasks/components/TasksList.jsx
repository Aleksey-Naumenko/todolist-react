import React, { Component } from 'react';
import TaskInput from './TaskInput';
import Task from './Task';
import { createTask, updateTask, deleteTask } from '../tasksListGateways';
import {connect} from 'react-redux';
import { tasksListSelector } from '../tasks.selectors';
import * as tasksActions from '../tasks.actions';

class TasksList extends Component {

    componentDidMount() {
        this.props.getTasks();
    }

    createTaskHandler = text => {
        const newTask = {
            text,
            done: false,
        }

        createTask(newTask)
            .then(() => this.fetchTasks());
    }

    deleteTaskHandler = id => {
        deleteTask(id)
            .then(() => this.fetchTasks());
    }

    changeStatusHandler = id => {
        const { done, text } = this.props.tasks.find(task => task.id === id);
        const updatedTask = {
            text,
            done: !done,
        }
        updateTask(id, updatedTask)
            .then(() => this.props.getTasks());
    }


    render() {
        const sortedTasks = this.props.tasks
            .slice()
            .sort((a, b) => a.done - b.done);

        return (
            <div className="todo-list">
                <TaskInput
                    onCreateTask={this.createTaskHandler} />
                <ul className="list">
                    {sortedTasks.map(task =>
                        <Task
                            {...task}
                            key={task.id}
                            onDeleteTask={this.deleteTaskHandler}
                            onChangeStatus={this.changeStatusHandler} />
                    )}
                </ul>
            </div>
        )
    }
};

const mapState = state => {
    return {
        tasks: tasksListSelector(state),
    };
};

const mapDispatch = {
    getTasks: tasksActions.getTasksList,
};

export default connect(mapState, mapDispatch)(TasksList);