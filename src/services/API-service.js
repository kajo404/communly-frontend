export default class APIService {
  static apiURL() {
    return 'http://localhost:3000';
  }

  static header() {
    let token = window.localStorage['jwtToken'];
    let header = new Headers();
    if (token) {
      header.append('Authorization', `JWT ${token}`);
    }
    header.append('Content-Type', 'application/json');

    return header;
  }

  static get(url, onSuccess, onError) {
    fetch(url, {
      method: 'GET',
      headers: APIService.header()
    })
      .then(resp => {
        if (resp.ok) {
          return resp.json();
        } else if (this.checkIfUnauthorized(resp)) {
          window.location = '/#login';
        } else {
          resp.json().then(json => {
            onError(json.error);
          });
        }
      })
      .then(resp => {
        if (resp.hasOwnProperty('token')) {
          window.localStorage['jwtToken'] = resp.token;
        }
        onSuccess(resp);
      })
      .catch(e => {
        onError(e.message);
      });
  }

  //Async get method
  static get$(url) {
    return new Promise(resolve => {
      fetch(url, {
        method: 'GET',
        headers: APIService.header()
      })
        .then(resp => {
          if (resp.ok) {
            return resp.json();
          } else if (this.checkIfUnauthorized(resp)) {
            window.location = '/#login';
          } else {
            resp.json().then(json => {
              console.error(json);
            });
          }
        })
        .then(resp => {
          if (resp.hasOwnProperty('token')) {
            window.localStorage['jwtToken'] = resp.token;
          }
          resolve(resp);
        })
        .catch(e => {
          console.error(e);
        });
    });
  }

  static put(url, data, onSuccess, onError) {
    fetch(url, {
      method: 'PUT',
      headers: APIService.header(),
      body: JSON.stringify(data)
    })
      .then(resp => {
        if (resp.ok) {
          return resp.json();
        } else if (this.checkIfUnauthorized(resp)) {
          window.location = '/#login';
        } else {
          resp.json().then(json => {
            onError(json.error);
          });
        }
      })
      .then(resp => {
        if (resp.hasOwnProperty('token')) {
          window.localStorage['jwtToken'] = resp.token;
        }
        onSuccess(resp);
      })
      .catch(e => {
        onError(e.message);
      });
  }

  static post(url, data, onSuccess, onError) {
    fetch(url, {
      method: 'POST',
      headers: APIService.header(),
      body: JSON.stringify(data)
    })
      .then(resp => {
        if (resp.ok) {
          return resp.json();
        } else if (this.checkIfUnauthorized(resp)) {
          window.location = '/#login';
        } else {
          resp.json().then(json => {
            onError(json.error);
          });
        }
      })
      .then(resp => {
        if (resp.hasOwnProperty('token')) {
          window.localStorage['jwtToken'] = resp.token;
        }
        onSuccess(resp);
      })
      .catch(e => {
        onError(e.message);
      });
  }

  static remove(url, onSuccess, onError) {
    fetch(url, {
      method: 'DELETE',
      headers: APIService.header()
    })
      .then(resp => {
        if (resp.ok) {
          return resp.json();
        } else if (this.checkIfUnauthorized(resp)) {
          window.location = '/#login';
        } else {
          resp.json().then(json => {
            onError(json.error);
          });
        }
      })
      .then(resp => {
        onSuccess(resp);
      })
      .catch(e => {
        onError(e.message);
      });
  }

  static checkIfUnauthorized(res) {
    if (res.status === 401) {
      return true;
    }
    return false;
  }
}
