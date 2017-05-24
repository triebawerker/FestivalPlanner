exports.config = function() {
  var env=(process.env.NODE_ENV || "development")
  var host;
  if(env == "development") {
    host=['http://localhost:4200'];
  } else if (env == "production") {
    host=['http://46.101.225.110', 'uckermark-jazzfest.de', 'www.uckermark-jazzfest.de']
  }
  return host;
}
