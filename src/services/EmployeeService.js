import http from "../http-client";

const getAll = () => {
  return http.get("/employees");
};

const create = data => {
  return http.post("/employees", data);
};

const get = id => {
  return http.get(`/employees/${id}`);
};

const update = (id, data) => {
  return http.put(`/employees/${id}`, data);
};

const remove = id => {
  return http.delete(`/employees/${id}`);
};

export default {
  getAll,
  get,
  create,
  update,
  remove,
};
