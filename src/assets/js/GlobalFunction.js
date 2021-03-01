export function getCookie(cname) {
  let name = cname + "=";
  let ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i].trim();
    if (c.indexOf(name) === 0) return c.substring(name.length, c.length);
  }
  return "";
}

export function uploadFile(file) {
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "/uploadFile", true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        console.log(xhr.response);
        return xhr.response;
      }
      return "";
    }
  };
  let formData = new FormData();
  formData.append("file", file);
  xhr.send(formData);
}

export function debounce(func, delay) {
  let timeOut = null;
  return function() {
    if (timeOut) {
      clearTimeout(timeOut);
    }
    setTimeout(func, delay);
  };
}
export function throttle(func, delay) {
  let timeout = true;
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
export function randomColor() {
  let baseColor = [
    "red",
    "pink",
    "purple",
    "deep-purple",
    "indigo",
    "blue",
    "light-blue",
    "cyan",
    "teal",
    "green",
    "amber",
    "orange",
    "deep-orange"
  ];
  let params = [
    "lighten-2",
    "lighten-1",
    "darken-1",
    "darken-2",
    "darken-3",
    "darken-4",
    "accent-1",
    "accent-2",
    "accent-3",
    "accent-4"
  ];
  return (
    baseColor[parseInt(Math.random() * baseColor.length)] +
    " " +
    params[parseInt(Math.random() * params.length)]
  );
}
