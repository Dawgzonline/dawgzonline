import axios from "axios";
import csv from "csv-parser";

const getCsvDataFromUrl = async (url) => {
  const response = await axios({
    method: "GET",
    url: url,
    responseType: "stream",
  });
  return new Promise((resolve, reject) => {
    const result = [];
    response.data.pipe(csv()).on("data", (data) => {
      result.push(data);
    });
    response.data.on("end", () => {
      resolve(result);
    });
    response.data.on("error", (err) => {
      console.log(err);
      reject(err);
    });
  });
};

export default getCsvDataFromUrl;
