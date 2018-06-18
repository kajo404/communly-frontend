import APIService from './API-service';

export default class AdminService {
  static listeners = {};

  //Platform activity data completion flags
  static receivedUserAmount = false;
  static receivedAnnouncementAmount = false;
  static receivedTasklistAmount = false;
  static receivedTaskAmount = false;

  //User stats data completion flags
  static receivedStatsAnnouncements = false;
  static receivedStatsUserTasklists = false;
  static receivedStatsMembersTasklists = false;
  static receivedStatsTasks = false;
  static receivedStatsDoneTasks = false;
  static receivedStatsUndoneTasks = false;

  static URL() {
    return APIService.apiURL() + '/admin';
  }

  static registerListener(event, fn) {
    if (!AdminService.listeners.hasOwnProperty(event)) {
      AdminService.listeners[event] = [];
    }
    AdminService.listeners[event].push(fn);
  }

  static notifyListeners(event) {
    if (AdminService.listeners.hasOwnProperty(event)) {
      AdminService.listeners[event].forEach(fn => fn());
    }
  }

  /* Platform Activity */

  static getUserAmount() {
    return new Promise((resolve, reject) => {
      APIService.get(
        `${AdminService.URL()}/amount/user`,

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
        `${AdminService.URL()}/amount/announcement`,

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
        `${AdminService.URL()}/amount/tasklist`,

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
        `${AdminService.URL()}/amount/task`,

        function(data) {
          resolve(data);
        },
        function(textStatus) {
          reject(textStatus);
        }
      );
    });
  }

  static receivedPlatformActivityData() {
    if (
      AdminService.receivedUserAmount &&
      AdminService.receivedAnnouncementAmount &&
      AdminService.receivedTasklistAmount &&
      AdminService.receivedTaskAmount
    ) {
      AdminService.notifyListeners('receivedPlatformActivityData');
    }
  }

  /* User Stats */

  static getUserStatsAnnuoncements() {
    return new Promise((resolve, reject) => {
      APIService.get(
        `${AdminService.URL()}/stats/annuoncement`,

        function(data) {
          resolve(data);
        },
        function(textStatus) {
          reject(textStatus);
        }
      );
    });
  }

  static getUserStatsTasklists() {
    return new Promise((resolve, reject) => {
      APIService.get(
        `${AdminService.URL()}/stats/tasklist`,

        function(data) {
          resolve(data);
        },
        function(textStatus) {
          reject(textStatus);
        }
      );
    });
  }

  static getUserStatsTasklistMembers() {
    return new Promise((resolve, reject) => {
      APIService.get(
        `${AdminService.URL()}/stats/tasklistMembers`,

        function(data) {
          resolve(data);
        },
        function(textStatus) {
          reject(textStatus);
        }
      );
    });
  }

  static getUserStatsTasks() {
    return new Promise((resolve, reject) => {
      APIService.get(
        `${AdminService.URL()}/stats/task`,

        function(data) {
          resolve(data);
        },
        function(textStatus) {
          reject(textStatus);
        }
      );
    });
  }

  static getUserStatsDoneTasks() {
    return new Promise((resolve, reject) => {
      APIService.get(
        `${AdminService.URL()}/stats/doneTask`,

        function(data) {
          resolve(data);
        },
        function(textStatus) {
          reject(textStatus);
        }
      );
    });
  }

  static getUserStatsUndoneTasks() {
    return new Promise((resolve, reject) => {
      APIService.get(
        `${AdminService.URL()}/stats/undoneTask`,

        function(data) {
          resolve(data);
        },
        function(textStatus) {
          reject(textStatus);
        }
      );
    });
  }

  static receivedUserStats() {
    if (
      AdminService.receivedStatsAnnouncements &&
      AdminService.receivedStatsUserTasklists &&
      AdminService.receivedStatsMembersTasklists &&
      AdminService.receivedStatsTasks &&
      AdminService.receivedStatsDoneTasks &&
      AdminService.receivedStatsUndoneTasks
    ) {
      AdminService.notifyListeners('receivedUserStatsData');
    }
  }
}
