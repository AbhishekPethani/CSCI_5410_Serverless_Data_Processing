export const isLoggedIn = () => {
  return !!localStorage.getItem("email");
  // return true;
};

export const generateRandomString = () => {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var charactersLength = characters.length;
  for (var i = 0; i < 4; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
