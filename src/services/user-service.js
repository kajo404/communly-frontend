import APIService from './API-service';

export default class UserService {
  static listeners = {};

  static URL() {
    return APIService.apiURL() + '/auth';
  }

  static usersURL() {
    return APIService.apiURL() + '/users';
  }

  static register(name, email, pass, dateOfBirth) {
    return new Promise((resolve, reject) => {
      APIService.post(
        `${UserService.URL()}/register`,
        {
          name: name,
          email: email,
          password: pass,
          dateOfBirth: dateOfBirth
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

  static login(email, pass) {
    return new Promise((resolve, reject) => {
      APIService.post(
        `${UserService.URL()}/login`,
        {
          email: email,
          password: pass
        },
        function(data) {
          UserService.notifyListeners('userLogedIn');
          resolve(data);
        },
        function(textStatus) {
          reject(textStatus);
        }
      );
    });
  }

  static logout() {
    window.localStorage.removeItem('jwtToken');
    window.location = 'login';
  }

  static getCurrentUser() {
    let token = window.localStorage['jwtToken'];
    if (!token) return {};

    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace('-', '+').replace('_', '/');
    return {
      id: JSON.parse(window.atob(base64)).id
    };
  }

  static getFullUser() {
    return new Promise((resolve, reject) => {
      APIService.get(
        `${UserService.URL()}/me`,
        function(data) {
          resolve(data);
        },
        function(textStatus) {
          reject(textStatus);
        }
      );
    });
  }

  static updateUserData(name, email, dateOfBirth) {
    return new Promise((resolve, reject) => {
      APIService.put(
        `${UserService.usersURL()}/data`,
        {
          name: name,
          email: email,
          dateOfBirth: dateOfBirth
        },
        function(data) {
          UserService.notifyListeners('userDataChanged');
          resolve(data);
        },
        function(textStatus) {
          reject(textStatus);
        }
      );
    });
  }

  static updatePassword(password) {
    return new Promise((resolve, reject) => {
      APIService.put(
        `${UserService.usersURL()}/password`,
        {
          password: password
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

  static updateUserPicture(fileData) {
    return new Promise((resolve, reject) => {
      APIService.put(
        `${UserService.usersURL()}/picture`,
        {
          imageData: fileData
        },
        function(data) {
          UserService.notifyListeners('userPictureChanged');
          resolve(data);
        },
        function(textStatus) {
          reject(textStatus);
        }
      );
    });
  }

  static registerListener(event, fn) {
    if (!UserService.listeners.hasOwnProperty(event)) {
      UserService.listeners[event] = [];
    }
    UserService.listeners[event].push(fn);
  }

  static notifyListeners(event) {
    if (UserService.listeners.hasOwnProperty(event)) {
      UserService.listeners[event].forEach(fn => fn());
    }
  }

  static getAllUsers() {
    return APIService.get$(`${UserService.usersURL()}/`);
  }

  static isAuthenticated() {
    return !!window.localStorage['jwtToken'];
  }

  static getAllAsignedTasks() {
    return new Promise((resolve, reject) => {
      APIService.get(
        `${UserService.usersURL()}/tasks`,

        function(data) {
          resolve(data);
        },
        function(textStatus) {
          reject(textStatus);
        }
      );
    });
  }

  static getTasklistsAsAuthor() {
    return new Promise((resolve, reject) => {
      APIService.get(
        `${UserService.usersURL()}/tasklists/author`,

        function(data) {
          resolve(data);
        },
        function(textStatus) {
          reject(textStatus);
        }
      );
    });
  }

  static getTasklistsAsMemeber() {
    return new Promise((resolve, reject) => {
      APIService.get(
        `${UserService.usersURL()}/tasklists/member`,

        function(data) {
          resolve(data);
        },
        function(textStatus) {
          reject(textStatus);
        }
      );
    });
  }

  static getAnnoncements() {
    return new Promise((resolve, reject) => {
      APIService.get(
        `${UserService.usersURL()}/annoncements`,

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
