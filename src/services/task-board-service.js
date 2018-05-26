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

  static getTaskBoards() {
    return APIService.get$(`${TaskBoardService.URL()}/`);
  }
}
