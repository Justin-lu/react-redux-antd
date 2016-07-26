let baseUri;

if(process.env.NODE_ENV == "development"){
  baseUri = "http://localhost:4000/api/v1/";
}else{
  // baseUri = "http://localhost:4000/api/v1/";
  baseUri = location.origin + "/api/v1/";
}

export const API_CONFIG = {
  base_uri: baseUri,
  auth: 'auth',
  users: 'users'
};
