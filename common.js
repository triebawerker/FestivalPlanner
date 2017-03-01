exports.config = function() {
  console.log('env', process.env.NODE_ENV);
  var env=(process.env.NODE_ENV || "development")
  var host;
  if(env == "development") {
    host='http://localhost:4200';
  } else if (env == "production") {
    host= 'http://46.101.225.110'
  }
console.log("app env set to", process.env.NODE_ENV);
  return host;
}
