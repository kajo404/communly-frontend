import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import CreateTaskModal from './create-task-modal';
import TaskBoard from './task-board';

import APIService from '../../services/API-service';
import TaskBoardService from '../../services/task-board-service';

class TaskBoardPage extends Component {
  taskBoardsSubscription;
  state = {
    modalOpen: false,
    boards: []
  };

  constructor(props) {
    super(props);
    this.updateBoards();
  }

  updateBoards() {
    this.taskBoardsSubscription = TaskBoardService.getTaskBoards()
      .then(data => this.setState({ boards: data.tasklists }))
      .catch(error => console.error(error));
  }

  createTask(listId) {
    const newTask = {
      title: 'Test task',
      taskList: listId
    };
    APIService.post(
      'http://localhost:3000/tasklists/create',
      newTask,
      res => {
        console.log('TASK ADDED');
      },
      err => {
        console.error(err);
      }
    );
  }

  handleOpen = () => {
    this.setState({ modalOpen: true });
  };

  handleClose = () => {
    this.setState({ modalOpen: false });
    this.updateBoards();
  };

  render() {
    return (
      <div className="p-task-boards">
        <div className="p-task-baords__boards-wrapper">
          {this.state.boards.map((item, index) => (
            <TaskBoard board={item} key={index} />
          ))}
        </div>
        <RaisedButton label="Create new task board" onClick={this.handleOpen} />
        <CreateTaskModal
          open={this.state.modalOpen}
          handleClose={this.handleClose}
          createTaskBoard={this.createTaskBoard}
        />
      </div>
    );
  }
}

export default TaskBoardPage;
