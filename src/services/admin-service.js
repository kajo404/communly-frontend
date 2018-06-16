import APIService from './API-service';

export default class AdminService {
  static URL() {
    return APIService.apiURL() + '/admin';
  }

  static getUserAmount() {
    return new Promise((resolve, reject) => {
      APIService.get(
        `${AdminService.usersURL()}/userAmount`,

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
