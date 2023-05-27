import axios from 'axios'
axios.all([
    await axios({
    url: `https://www.dushu.com/book/10050000/`,
    method: "get",
  }),
]).then((response)=>{
   console.log(response.data);
})