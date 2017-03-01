exports.config = function() {
  console.log('env', process.env.NODE_ENV);
  var env=(process.env.NODE_ENV || "production")
  var host;
  if(env == "development") {
    host='http://localhost:4200';
  } else {
    host= 'https://music-festival-planner.herokuapp.com'
  }
console.log("app env set to", process.env.NODE_ENV);
  return host;
}
