exports.config = function() {
  var host;
  if(process.env.NODE_ENV == "development") {
    host=['http://localhost:4200'];
  } else {
    host=['http://uckermark-jazzfest.de']
  }
  return host;
}
