const axios = require('axios');
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5YzNjNjhkNDVlNGYyZWM0NTFlMjI1ZCIsImlhdCI6MTc4MDA1OTAxNywiZXhwIjoxNzgyNjUxMDE3fQ.Jmi63pCFIqXJIArUl-U7zjdNXfoWfTZRFlf2gY1353I';
axios.get('http://localhost:5000/api/analytics', {
  headers: { Authorization: `Bearer ${token}` }
}).then(res => {
  console.log(JSON.stringify(res.data, null, 2));
}).catch(err => {
  console.error("ERROR:", err.response ? err.response.data : err.message);
});
