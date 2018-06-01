import APIService from './API-service';

export default class UserService {
  static URL() {
    return APIService.apiURL() + '/auth';
  }

  static usersURL() {
    return 'http://localhost:3000/users';
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
      id: JSON.parse(window.atob(base64)).id,
      name: JSON.parse(window.atob(base64)).name
    };
  }

  static getFullUser() {
    return new Promise((resolve, reject) => {
      APIService.get(
        `${UserService.URL()}/me`,

        function(data) {
          resolve(data);
          console.log(data);
        },
        function(textStatus) {
          reject(textStatus);
        }
      );
    });
  }

  static getAllUsers() {
    return APIService.get$(`${UserService.usersURL()}/`);
  }

  static isAuthenticated() {
    return !!window.localStorage['jwtToken'];
  }
}
