import axios from "axios";

export default axios.create({
  baseURL: "http://10.0.2.2:3030",
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Yzc2MWZmYjMwZGIyYTJhNjRjOTRkN2QiLCJpYXQiOjE1NTEyNDUzMDh9.vs4rv5UQrFpfNpKZOX3Yy1WZfGYQ8ld5zujamsGZXus"
  },
  validateStatus: function(status) {
    return status < 500;
  }
});
