import axios from 'axios';

const dockerhub = async () => {
    try {
        var options = {
            method: 'POST',
            url: 'https://hub.docker.com/v2/users/login',
            headers: {'Content-Type': 'application/json'},
            data: {username: 'raidkarki', password: 'Algeria2000@'}
          };
          
          const response = await axios(options);

    // Assuming the token is in the 'token' property of the response data
    const dtoken = response.data.token;

    return dtoken;
       
    } catch (error) {
        console.log(error);
    }
}

export default dockerhub;
