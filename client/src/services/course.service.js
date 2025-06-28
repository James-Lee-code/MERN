import axios from "axios";
const API_URL = `${process.env.REACT_APP_API_URL}/courses`;

class CourseService {
  post(title, description, price) {
    const token = JSON.parse(localStorage.getItem("user"))?.token || "";
    return axios.post(
      API_URL,
      { title, description, price },
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }

  getEnrolledCourses(_id) {
    const token = JSON.parse(localStorage.getItem("user"))?.token || "";
    return axios.get(`${API_URL}/student/${_id}`, {
      headers: {
        Authorization: token,
      },
    });
  }

  get(_id) {
    const token = JSON.parse(localStorage.getItem("user"))?.token || "";
    return axios.get(`${API_URL}/instructor/${_id}`, {
      headers: {
        Authorization: token,
      },
    });
  }

  getCourseByName(name) {
    const token = JSON.parse(localStorage.getItem("user"))?.token || "";
    return axios.get(`${API_URL}/findByName/${name}`, {
      headers: {
        Authorization: token,
      },
    });
  }

  enroll(_id) {
    const token = JSON.parse(localStorage.getItem("user"))?.token || "";
    return axios.post(
      `${API_URL}/enroll/${_id}`,
      {},
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }
}

export default new CourseService();
