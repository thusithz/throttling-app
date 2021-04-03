import axios from "axios";
import config from "../config/app.config";

const instance = axios.create({
  baseURL: config.BASE_URL,
  validateStatus: function (status: number) {
    return status < 500; // Resolve only if the status code is less than 500
  },
  // Added heardes as require
  // headers: {
  //     'content-type':'application/json',
  // },
});

export async function get<T>(url: string): Promise<T> {
  return new Promise((resolve, reject) => {
    instance({
      method: "GET",
      url,
    })
      .then((res: any) => {
        return resolve(res);
      })
      .catch((err: any) => {
        return reject(err);
      });
  });
}

export async function post<T>(url: string, data: any): Promise<T> {
  return new Promise((resolve, reject) => {
    instance({
      method: "POST",
      url,
      data,
    })
      .then((res: any) => {
        return resolve(res);
      })
      .catch((err: any) => {
        return reject(err);
      });
  });
}
