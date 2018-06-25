import APIService from './API-service';

export default class UserService {
  //Authentication

  static URL() {
    return APIService.apiURL() + '/auth';
  }

  static register(firstname, lastname, email, pass, dateOfBirth) {
    return new Promise((resolve, reject) => {
      APIService.post(
        `${UserService.URL()}/register`,
        {
          firstname: firstname,
          lastname: lastname,
          email: email,
          password: pass,
          dateOfBirth: dateOfBirth
        },
        function(data) {
          UserService.notifyListeners('userAuthenticated');
          resolve(data);
        },
        function(errorCode) {
          reject(errorCode);
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
          UserService.notifyListeners('userAuthenticated');
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
    window.location = 'home';
  }

  static isAuthenticated() {
    const user = this.getCurrentUser();
    return user && new Date(user.exp * 1000) > new Date();
  }

  //User data

  static listeners = {};
  static receivedAnnouncements = false;
  static receivedTasklistsAuthor = false;
  static receivedTasklistsMember = false;
  static receivedTasks = false;

  static usersURL() {
    return APIService.apiURL() + '/users';
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

  static notifyOnlyLastListener(event) {
    if (UserService.listeners.hasOwnProperty(event)) {
      //use newest listener
      UserService.listeners[event][UserService.listeners[event].length - 1](
        fn => fn()
      );
    }
  }

  static getCurrentUser() {
    let token = window.localStorage['jwtToken'];
    if (!token) return {};

    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace('-', '+').replace('_', '/');
    return {
      id: JSON.parse(window.atob(base64)).id,
      firstname: JSON.parse(window.atob(base64)).firstname,
      lastname: JSON.parse(window.atob(base64)).lastname,
      exp: JSON.parse(window.atob(base64)).exp
    };
  }

  static isUserAdmin() {
    let token = window.localStorage['jwtToken'];
    if (!token) return {};

    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64)).isAdmin;
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

  static updateUserData(lastname, firstname, email, dateOfBirth) {
    return new Promise((resolve, reject) => {
      APIService.put(
        `${UserService.usersURL()}/data`,
        {
          lastname: lastname,
          firstname: firstname,
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

  static getAllUsers() {
    return new Promise((resolve, reject) => {
      APIService.get$(`${UserService.usersURL()}/`)
        .then(result => {
          result.users.sort(function compare(a, b) {
            var firstNameA = a.firstname.toUpperCase();
            var firstNameB = b.firstname.toUpperCase();

            if (firstNameA < firstNameB) {
              return -1;
            }
            if (firstNameA > firstNameB) {
              return 1;
            }
            //first name is equal
            var nameA = a.lastname.toUpperCase();
            var nameB = b.lastname.toUpperCase();

            if (nameA < nameB) {
              return -1;
            }
            if (nameA > nameB) {
              return 1;
            }
            //full name is equal
            return 0;
          });
          resolve(result);
        })
        .catch(error => {
          reject(error);
        });
    });
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

  static receivedUserActivityData() {
    if (
      UserService.receivedAnnouncements &&
      UserService.receivedTasklistsAuthor &&
      UserService.receivedTasklistsMember &&
      UserService.receivedTasks
    ) {
      UserService.notifyOnlyLastListener('receivedUserActivityData');
      UserService.receivedAnnouncements = false;
      UserService.receivedTasklistsAuthor = false;
      UserService.receivedTasklistsMember = false;
      UserService.receivedTasks = false;
    }
  }

  static animateValue(id, start, end) {
    var obj = document.getElementById(id);
    if (end > 0 && end > start) {
      var range = end - start;
      var current = start;
      var stepTime = Math.abs(Math.floor(500 / range));
      var timer = setInterval(function() {
        obj.innerHTML = current;

        if (current === Math.floor(end)) {
          clearInterval(timer);
          obj.innerHTML = end;
        }
        current += 1;
      }, stepTime);
    } else {
      obj.innerHTML = 0;
    }
  }
}
