import APIService from './API-service';

export default class AnnouncementsService {
  static URL() {
    return APIService.apiURL() + '/announcements';
  }

  static getAnnouncements() {
    return new Promise((resolve, reject) => {
      APIService.get(
        `${AnnouncementsService.URL()}/`,
        function(data) {
          resolve(data);
        },
        function(textStatus) {
          reject(textStatus);
        }
      );
    });
  }

  static getAnnoncementsForUser() {
    return new Promise((resolve, reject) => {
      APIService.get(
        `${AnnouncementsService.URL()}/annoncementsForUser`,

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
        `${AnnouncementsService.URL()}/`,
        announcement,
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
