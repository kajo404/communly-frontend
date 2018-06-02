import React, { Component } from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import CreateTaskBoardModal from './create-task-board-modal';
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
    currentBoardMembers: [],
    boards: [],
    users: []
  };

  constructor(props) {
    super(props);
    this.updateBoards();
    this.getUsers();

    console.log(UserService.getCurrentUser());
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

  openAddMembersModal = (callingBoard, currentMembers) => {
    this.setState({ currentBoardMembers: currentMembers });
    this.setState({ currentBoardOpening: callingBoard });
    this.setState({ addMembersOpen: true });
  };

  // This gets called by the board that has added new members
  addMembers = members => {
    if (!members.includes(UserService.getCurrentUser().id)) {
      members.push(UserService.getCurrentUser().id);
    }

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
              setCurrentBoardMembers={this.setCurrentBoardMembers}
            />
          ))}
        </div>
        <div className="p-task-boards-add-button">
          <FloatingActionButton onClick={this.handleOpen}>
            <ContentAdd />
          </FloatingActionButton>
        </div>
        <CreateTaskBoardModal
          open={this.state.modalOpen}
          handleClose={this.handleClose}
        />
        <AddMemberModal
          users={this.state.users.filter(
            user => user._id !== UserService.getCurrentUser().id
          )}
          addMembers={this.addMembers}
          currentMembers={this.state.currentBoardMembers}
          open={this.state.addMembersOpen}
          close={this.handleAddMembersClose}
        />
        {/* <AssignMemberModal /> */}
      </div>
    );
  }
}

export default TaskBoardPage;
