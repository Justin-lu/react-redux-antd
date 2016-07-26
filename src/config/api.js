let baseUri, host;

if(process.env.NODE_ENV == "development" || process.env.NODE_ENV == "test"){
  host = "http://localhost:4000";
  baseUri = host + "/api/v1/";
}else{
  // baseUri = "http://localhost:4000/api/v1/";
  host = location.origin;
  baseUri = host + "/api/v1/";
}

export const API_CONFIG = {
  host: host,
  baseUri: baseUri,
  auth: 'auth',
  users: 'users'
};
