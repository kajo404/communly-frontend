import React, { Component } from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import CreateTaskBoardModal from './create-task-board-modal';
import TaskBoard from './task-board';
import TaskBoardService from '../../services/task-board-service';
import AssignMemberModal from './assign-member';
import AddMemberModal from './add-member';
import DeleteBoardConfirmation from './delete-confirmation';
import UserService from '../../services/user-service';
import Snackbar from 'material-ui/Snackbar';

class TaskBoardPage extends Component {
  taskBoardsSubscription;
  state = {
    modalOpen: false,
    addMembersOpen: false,
    assignMemberOpen: false,
    deleteBoardOpen: false,
    snackbarOpen: false,
    currentBoardOpening: '',
    currentBoardMembers: [],
    boards: [],
    users: [],
    taskToBeAssigned: ''
  };

  constructor(props) {
    super(props);
    this.updateBoards();
    this.getUsers();
  }

  getUsers() {
    this.usersSubscription = UserService.getAllUsers()
      .then(response => this.setState({ users: response.users }))
      .catch(error => console.error(error));
  }

  handleAddMembersClose = () => {
    this.setState({ addMembersOpen: false });
  };

  handleDeleteBoardClose = () => {
    this.setState({ deleteBoardOpen: false });
  };

  handleAssignMemberClose = () => {
    this.setState({ assignMemberOpen: false });
  };

  openDeleteBoardModal = callingBoard => {
    this.setState({ currentBoardOpening: callingBoard });
    this.setState({ deleteBoardOpen: true });
  };

  openAddMembersModal = (callingBoard, currentMembers) => {
    this.setState({ currentBoardMembers: currentMembers });
    this.setState({ currentBoardOpening: callingBoard });
    this.setState({ addMembersOpen: true });
  };

  openAssignMemberModal = (callingBoard, currentMembers, taskId) => {
    this.setState({ currentBoardMembers: currentMembers });
    this.setState({ currentBoardOpening: callingBoard });
    this.setState({ taskToBeAssigned: taskId });
    this.setState({ assignMemberOpen: true });
  };

  // This gets called by the board that has added new members
  addMembers = members => {
    if (!members.includes(UserService.getCurrentUser().id)) {
      members.unshift(UserService.getCurrentUser().id);
    }

    TaskBoardService.addMembers(this.state.currentBoardOpening, members)
      .then(response => {
        //TODO backend call for getting only one board again
        this.updateBoards();
        this.handleAddMembersClose();
      })
      .catch(error => console.error(error));
  };

  deleteBoard = () => {
    TaskBoardService.delete(this.state.currentBoardOpening)
      .then(response => {
        this.handleDeleteBoardClose();
        this.updateBoards();
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

  updateBoardTitle = (boardId, title) => {
    TaskBoardService.updateBoardTitle(boardId, title)
      .then(response =>
        setTimeout(() => this.setState({ snackbarOpen: true }), 700)
      )
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
              openDeleteConfirmationModal={this.openDeleteBoardModal}
              setCurrentBoardMembers={this.setCurrentBoardMembers}
              updateBoardTitle={this.updateBoardTitle}
              openAssignMemberModal={this.openAssignMemberModal}
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
        <DeleteBoardConfirmation
          open={this.state.deleteBoardOpen}
          close={this.handleDeleteBoardClose}
          deleteBoard={this.deleteBoard}
        />
        <Snackbar
          open={this.state.snackbarOpen}
          message="The title of your board was saved!"
          autoHideDuration={3000}
          onRequestClose={this.closeSnackbar}
        />
        <AssignMemberModal
          members={this.state.currentBoardMembers}
          task={this.state.taskToBeAssigned}
          open={this.state.assignMemberOpen}
          close={this.handleAssignMemberClose}
        />
      </div>
    );
  }
}

export default TaskBoardPage;
