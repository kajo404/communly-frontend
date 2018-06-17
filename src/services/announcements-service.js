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

  static upvote(announcement) {
    return new Promise((resolve, reject) => {
      APIService.post(
        `${AnnouncementsService.URL()}/${announcement._id}/upvotes`,
        null,
        function(data) {
          resolve(data);
        },
        function(textStatus) {
          reject(textStatus);
        }
      );
    });
  }

  static downvote(announcement) {
    return new Promise((resolve, reject) => {
      APIService.post(
        `${AnnouncementsService.URL()}/${announcement._id}/downvotes`,
        null,
        function(data) {
          resolve(data);
        },
        function(textStatus) {
          reject(textStatus);
        }
      );
    });
  }

  static deleteVote(announcement) {
    return new Promise((resolve, reject) => {
      APIService.remove(
        `${AnnouncementsService.URL()}/${announcement._id}/votes`,
        null,
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
