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
  static receivedStatsOpenTasks = false;

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
      //use newest listener
      AdminService.listeners[event].forEach(fn => fn());
    }
  }

  static notifyOnlyLastListener(event) {
    if (AdminService.listeners.hasOwnProperty(event)) {
      //use newest listener
      AdminService.listeners[event][AdminService.listeners[event].length - 1](
        fn => fn()
      );
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
      AdminService.notifyOnlyLastListener('receivedPlatformActivityData');
      AdminService.receivedUserAmount = false;
      AdminService.receivedAnnouncementAmount = false;
      AdminService.receivedTasklistAmount = false;
      AdminService.receivedTaskAmount = false;
    }
  }

  /* User Stats */

  static getUserStatsAnnouncements() {
    return new Promise((resolve, reject) => {
      APIService.get(
        `${AdminService.URL()}/stats/announcement`,

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

  static getUserStatsOpenTasks() {
    return new Promise((resolve, reject) => {
      APIService.get(
        `${AdminService.URL()}/stats/openTask`,

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
      AdminService.receivedStatsOpenTasks
    ) {
      AdminService.notifyOnlyLastListener('receivedUserStatsData');
      AdminService.receivedStatsAnnouncements = false;
      AdminService.receivedStatsUserTasklists = false;
      AdminService.receivedStatsMembersTasklists = false;
      AdminService.receivedStatsTasks = false;
      AdminService.receivedStatsDoneTasks = false;
      AdminService.receivedStatsOpenTasks = false;
    }
  }
}
