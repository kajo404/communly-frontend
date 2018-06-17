import APIService from './API-service';

export default class AdminService {
  static URL() {
    return APIService.apiURL() + '/admin';
  }

  static getUserAmount() {
    return new Promise((resolve, reject) => {
      APIService.get(
        `${AdminService.URL()}/userAmount`,

        function(data) {
          resolve(data);
        },
        function(textStatus) {
          reject(textStatus);
        }
      );
    });
  }

  static getAnnouncementAmount() {
    return new Promise((resolve, reject) => {
      APIService.get(
        `${AdminService.URL()}/announcementAmount`,

        function(data) {
          resolve(data);
        },
        function(textStatus) {
          reject(textStatus);
        }
      );
    });
  }

  static getTasklistAmount() {
    return new Promise((resolve, reject) => {
      APIService.get(
        `${AdminService.URL()}/tasklistAmount`,

        function(data) {
          resolve(data);
        },
        function(textStatus) {
          reject(textStatus);
        }
      );
    });
  }

  static getTaskAmount() {
    return new Promise((resolve, reject) => {
      APIService.get(
        `${AdminService.URL()}/taskAmount`,

        function(data) {
          resolve(data);
        },
        function(textStatus) {
          reject(textStatus);
        }
      );
    });
  }

  static getMaxAnnouncementAmount() {
    return new Promise((resolve, reject) => {
      APIService.get(
        `${AdminService.URL()}/maxAnnouncementAmount`,

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
