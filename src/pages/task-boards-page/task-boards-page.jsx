import React, { Component } from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import CreateTaskModal from './create-task-modal';
import TaskBoard from './task-board';
import TaskBoardService from '../../services/task-board-service';
import AssignMemberModal from './assign-member';

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

  updateBoards = () => {
    this.taskBoardsSubscription = TaskBoardService.getTaskBoards()
      .then(data => {
        console.log(data.tasklists);
        this.setState({ boards: data.tasklists });
      })
      .catch(error => console.error(error));
  };

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
        <div className="p-task-boards__boards-wrapper">
          {this.state.boards.map((item, index) => (
            <TaskBoard
              board={item}
              key={index}
              updateView={this.updateBoards}
            />
          ))}
        </div>
        <div className="p-task-boards-add-button">
          <FloatingActionButton onClick={this.handleOpen}>
            <ContentAdd />
          </FloatingActionButton>
        </div>
        <CreateTaskModal
          open={this.state.modalOpen}
          handleClose={this.handleClose}
          createTaskBoard={this.createTaskBoard}
        />
        {/* <AssignMemberModal /> */}
      </div>
    );
  }
}

export default TaskBoardPage;
