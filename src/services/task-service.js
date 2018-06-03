import APIService from './API-service';

export default class TaskService {
  static URL() {
    return APIService.apiURL() + '/tasks';
  }

  static create(newTask) {
    return new Promise((resolve, reject) => {
      APIService.post(
        `${TaskService.URL()}/`,
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

  static getAllAsignedTasksForUser() {
    return new Promise((resolve, reject) => {
      APIService.get(
        `${TaskService.URL()}/allAsignedTasksForUser`,

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
        `${TaskService.URL()}/${taskId}`,
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
        `${TaskService.URL()}/${task._id}`,
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
}
