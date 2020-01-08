const axios = require('axios');

var UserProfile = (function() {
  var auth = localStorage.getItem("user");
  // if(auth !== null){
  //   axios.get(`${process.env.REACT_APP_API_URL}/user/` + auth.id + '.' + auth.isDoctor)
  //   .then((response) => {
  //   })
  //   .catch(function (error) {
  //     localStorage.setItem("user", null);
  //     auth = null;
  //   });
  // }

  var getAuth = function(){
      console.log("auth", auth);
    return auth;
  }

  var setAuth = function(user){

    if (user !== null) {
      
      localStorage.setItem("user", user); 
      localStorage.setItem("cnp", user.cnp);
      localStorage.setItem("isAdmin", user.isAdmin);

      console.log("settting user", user.isAdmin);
      if (user.isAdmin){
        window.location.href = `/admin/tpoll`;
      }else {
        window.location.href = `/admin/tpoll`;
      }
    } else {
      localStorage.clear();
      window.location.href = `/auth/login`;
    }

    

  }

  return {
    getAuth: getAuth,
    setAuth: setAuth
  }

})();

export default UserProfile;
