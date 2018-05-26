import APIService from './API-service';

export default class TaskService {
  static baseURL() {
    return 'http://localhost:3000/tasks';
  }

  static create(newTask) {
    return new Promise((resolve, reject) => {
      APIService.post(
        `${TaskService.baseURL()}/`,
        newTask,
        function(data) {
          resolve(data);
        },
        function(textStatus) {
          reject(textStatus);
        }
      );
    });
  }

  static delete(taskId) {
    return new Promise((resolve, reject) => {
      APIService.remove(
        `${TaskService.baseURL()}/${taskId}`,
        function(data) {
          resolve(data);
        },
        function(textStatus) {
          reject(textStatus);
        }
      );
    });
  }

  static updateTask(task) {
    return new Promise((resolve, reject) => {
      APIService.put(
        `${TaskService.baseURL()}/${task._id}`,
        task,
        function(data) {
          resolve(data);
        },
        function(textStatus) {
          reject(textStatus);
        }
      );
    });
  }

  static getAllTasks(taskListId) {
    return APIService.get$(`${TaskService.baseURL()}/${taskListId}`);
  }
}
