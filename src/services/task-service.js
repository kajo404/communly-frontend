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

  static changeTaskStatus(taskId, status) {
    return new Promise((resolve, reject) => {
      APIService.put(
        `${TaskService.URL()}/${taskId}`,
        { taskStatus: status },
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
