import decode from "jwt-decode";

class AuthService {

  getToken() {
    return localStorage.getItem('auth_token');
  }

  setToken(token) {
    localStorage.setItem('auth_token', token);
  }

  logout() {
    localStorage.removeItem('auth_token');
  }

  isLoggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if(decoded.expiry < Date.now() / 1000) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      return false;
    }

  }

  getCurrentUser() {
    const token = this.getToken();
    try {
      const decoded = decode(token);
      return decoded;
    } catch (err) {
      return false;
    }
  }

  isAdmin() {
    const user = this.getCurrentUser();
    if(user && user.admin === true){
      return true;
    } else {
      return false;
    }
  }

}

export default new AuthService();