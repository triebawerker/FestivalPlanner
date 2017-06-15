exports.config = function() {
  var env=(process.env.NODE_ENV || "development")
  var host;
  if(env == "development") {
    host=['http://localhost:4200'];
  } else {
    host=['http://uckermark-jazzfest.de']
  }
  return host;
}
