exports.config = function() {
  var env=(process.env.NODE_ENV || "development")
  var host;
  if(env == "development") {
    host=['http://localhost:4200'];
  } else if (env == "production") {
    host=['http://46.101.225.110', 'http://uckermark-jazzfest.de', 'http://www.uckermark-jazzfest.de']
  }
  return host;
}
