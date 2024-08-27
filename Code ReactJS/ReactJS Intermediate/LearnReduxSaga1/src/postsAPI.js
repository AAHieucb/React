export const getPostData = () => {
  return fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'GET'
    })
      .then((response) => {
        console.log(response);
        console.log(response.headers.get('Content-Type'));
        console.log(response.type);

        if (!response.ok) {
          console.log("Mã lỗi: ", response.status);
          throw Error(response.statusText);
        }
        return response.json()})
      .then((res) => {
        console.log(res);
        return {data: res };
      })
      .catch((error) => {
        return error;
      });
}