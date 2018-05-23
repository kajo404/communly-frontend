import APIService from './API-service';

export default class AnnouncementsService {
  static baseURL() {
    return 'http://localhost:3000/announcements';
  }

  static getAnnouncements() {
    return new Promise((resolve, reject) => {
      APIService.get(
        `${AnnouncementsService.baseURL()}/`,
        function(data) {
          resolve(data);
        },
        function(textStatus) {
          reject(textStatus);
        }
      );
    });
  }

  static createAnnouncement(announcement) {
    return new Promise((resolve, reject) => {
      APIService.post(
        `${AnnouncementsService.baseURL()}/`,
        announcement,
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
