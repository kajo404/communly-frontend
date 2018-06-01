import APIService from './API-service';

export default class TaskBoardService {
  static URL() {
    return APIService.apiURL() + '/tasklists';
  }

  static create(title) {
    return new Promise((resolve, reject) => {
      APIService.post(
        `${TaskBoardService.URL()}/`,
        {
          title: title
        },
        function(data) {
          resolve(data);
        },
        function(textStatus) {
          reject(textStatus);
        }
      );
    });
  }

  static createTask(newTask) {
    return new Promise((resolve, reject) => {
      APIService.post(
        `${TaskBoardService.URL()}/${newTask.taskBoardId}/tasks`,
        {
          task: {
            name: newTask.name
          }
        },
        function(data) {
          resolve(data);
        },
        function(textStatus) {
          reject(textStatus);
        }
      );
    });
  }

  static delete(taskBoardId) {
    return new Promise((resolve, reject) => {
      APIService.remove(
        `${TaskBoardService.URL()}/${taskBoardId}`,
        function(data) {
          resolve(data);
        },
        function(textStatus) {
          reject(textStatus);
        }
      );
    });
  }

  static addMembers(taskBoardId, members) {
    return new Promise((resolve, reject) => {
      APIService.post(
        `${TaskBoardService.URL()}/${taskBoardId}/members`,
        {
          members: members
        },
        function(data) {
          resolve(data);
        },
        function(textStatus) {
          reject(textStatus);
        }
      );
    });
  }

  static getTaskBoards() {
    return APIService.get$(`${TaskBoardService.URL()}/`);
  }

  static getAllTasks(taskListId) {
    return APIService.get$(`${TaskBoardService.URL()}/${taskListId}`);
  }
}
