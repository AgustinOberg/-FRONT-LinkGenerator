import axios from 'axios';
import download from 'downloadjs'

export const customAxios = async (endpoint,myData={},method='get' ) => {
    const basePath = process.env.REACT_APP_API_URL
    const config = {
    method,
    url: basePath+endpoint,
    headers: { 
        'Authorization': 'Basic YWd1c3RpbjphZ3VpbGVyYQ==', 
        'Content-Type': 'application/json'
    },
    data: myData
    };
    const finalData = await axios(config)
    return finalData.data.msg

}

export const getPdf = (id, setLoading) => {
    setLoading(true)
    const data = JSON.stringify({
        "id": id
      });
    const basePath = process.env.REACT_APP_API_URL

    const config = {
    method: 'put',
    url: basePath + 'pay/voucher',
    headers: { 
        'Authorization': 'Basic YWd1c3RpbjphZ3VpbGVyYQ==', 
        'Content-Type': 'application/json'
    },
    data,
    responseType: 'blob', 

    };

    axios(config)
    .then(function (response) {
    const content = response.headers['content-type'];
    download(response.data, '[SUPERSISTEMAS]-Comprobante.pdf', content)
    setLoading(false)
    })
    .catch(function (error) {
    console.log(error);
    });
}

export const sendImage = async (id, data) => {
    const formData = new FormData();
    formData.append('img', data);
    formData.append('id', id)
    const newData = await axios.put('http://localhost:8080/api/pay/buyInProcess', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': 'Basic YWd1c3RpbjphZ3VpbGVyYQ=='
          }
    })
   return newData
}