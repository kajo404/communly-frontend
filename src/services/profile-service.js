import APIService from './API-service';

export default class ProfileService {
  static baseURL() {
    return 'http://localhost:3000/profile';
  }

  static getFullUserInformation(id) {
    return new Promise((resolve, reject) => {
      APIService.post(
        `${ProfileService.baseURL()}/fullProfile`,
        {
          id: id
        },
        function(data) {
          console.log(data);
          resolve(data);
        },
        function(textStatus) {
          reject(textStatus);
        }
      );
    });
  }
}
