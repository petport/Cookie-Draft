// Third-party script trying to set a cookie
document.cookie = "first=testFirstPartyCookie; path=/";
console.log("[first party script] First-party script set cookie: " + document.cookie);