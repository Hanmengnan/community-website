export default {
  getCookie: function(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i].trim();
      if (c.indexOf(name) === 0) return c.substring(name.length, c.length);
    }
    return "";
  },
  debounce: function(func, delay) {
    var timeOut = null;
    return function() {
      if (timeOut) {
        clearTimeout(timeOut);
      }
      setTimeout(func, delay);
    };
  },
  throttle: function(func, delay) {
    var timeout = true;
    return function() {
      if (timeout) {
        timeout = false;
        setTimeout(() => {
          func();
          timeout = true;
        }, delay);
      } else {
        return true;
      }
    };
  }
};
