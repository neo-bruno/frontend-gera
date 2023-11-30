// BASE URL
export const url = 'http://localhost:3000'
//"http://200.105.156.214:3000";
//"http://190.104.11.190:3000"

//Envio de token por cabecera
export const getHeader = () => {
  try {
    const auth = JSON.parse(localStorage.getItem('token'))
    const headers = {
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + auth
    }
    return headers;
  } catch (error) {
    localStorage.clear();
  }
}