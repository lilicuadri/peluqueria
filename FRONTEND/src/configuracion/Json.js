export var gsUrlApi = "";
var sAmbiente = "PRODUCCION";

switch (sAmbiente) {
   case "PRODUCCION":
      gsUrlApi = "http://apitalenthidev-env.eba-mjskwjnm.us-west-2.elasticbeanstalk.com";
      break;
   default:
      gsUrlApi = 'http://localhost:8080';
      break;
}


export var JsonNomina = []




