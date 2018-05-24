import APIService from './API-service';

export default class TaskBoardService {
  static baseURL() {
    return 'http://localhost:3000/tasklists';
  }

  static create(title) {
    return new Promise((resolve, reject) => {
      APIService.post(
        `${TaskBoardService.baseURL()}/`,
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

  static getTaskBoards() {
    return APIService.get$(`${TaskBoardService.baseURL()}/`);
  }
}
