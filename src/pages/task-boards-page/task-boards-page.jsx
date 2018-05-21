import React, { Component } from 'react';
import TodoComponent from './todo-list';
import CreateTaskModal from './create-task-modal';
import APIService from '../../services/API-service';

import { Observable } from 'rxjs';

class TaskBoardPage extends Component {
  boards = null;

  taskBoardsSubscription;

  constructor(props) {
    super(props);

    this.taskBoardsSubscription = APIService.get$(
      'http://localhost:3000/tasklists/'
    ).subscribe(data => {
      this.boards = data;
      console.log(data.tasklists[13]._id);
      this.createTask(data.tasklists[13]._id);
    });

    APIService.post(
      'http://localhost:3000/tasklists/create',
      { title: 'test board' },
      res => {
        // console.log(res);
        this.boards = res.tasklists;
      },
      err => {
        console.error(err);
      }
    );
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

  render() {
    return (
      <div className="p-task-boards">
        {(this.boards || []).length}
        <TodoComponent />
        <TodoComponent />
        <TodoComponent />
        <CreateTaskModal />
      </div>
    );
  }
}

export default TaskBoardPage;
