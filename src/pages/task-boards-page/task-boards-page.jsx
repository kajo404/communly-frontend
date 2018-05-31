import React, { Component } from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import CreateTaskModal from './create-task-modal';
import TaskBoard from './task-board';
import TaskBoardService from '../../services/task-board-service';
import AssignMemberModal from './assign-member';
import AddMemberModal from './add-member';
import UserService from '../../services/user-service';
class TaskBoardPage extends Component {
  taskBoardsSubscription;
  state = {
    modalOpen: false,
    addMembersOpen: false,
    //so that i know which board called the modal and be able to make a correct backend call for addING MEMEBERS
    currentBoardOpening: '',
    boards: [],
    users: []
  };

  constructor(props) {
    super(props);
    this.updateBoards();
    this.getUsers();
  }

  // Die drei funktionen drunter bracht man nur für das Modale Fenster AddMembers
  getUsers() {
    this.usersSubscription = UserService.getAllUsers()
      .then(response => this.setState({ users: response.users }))
      .catch(error => console.error(error));
  }

  handleAddMembersClose = () => {
    this.setState({ addMembersOpen: false });
  };

  openAddMembersModal = callingBoard => {
    console.log(callingBoard);
    this.setState({ addMembersOpen: true });
    this.setState({ currentBoardOpening: callingBoard });
  };

  // This gets called by the board that has added new members
  addMembers = members => {
    TaskBoardService.addMembers(this.state.currentBoardOpening, members)
      .then(response => {
        //TODO backend call for getting only one board again
        this.updateBoards();
        this.handleAddMembersClose();
      })
      .catch(error => console.error(error));
  };

  updateBoards = () => {
    this.taskBoardsSubscription = TaskBoardService.getTaskBoards()
      .then(data => {
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
              openAddMembersModal={this.openAddMembersModal}
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
        <AddMemberModal
          users={this.state.users}
          addMembers={this.addMembers}
          open={this.state.addMembersOpen}
          close={this.handleAddMembersClose}
        />
        {/* <AssignMemberModal /> */}
      </div>
    );
  }
}

export default TaskBoardPage;
