import { useRef, useState } from "react";
import { set } from "lodash";
import { formContentType } from "../constant/constant";
import getLocalFetch from "../libs/fetch";

export default function useForm({
  postTo,
  validate,
  error,
  afterSave,
  afterSubmission,
  contentType
}) {
  const fetch = getLocalFetch();
  const formData = useRef(null);
  const currentData = useRef({});
  const currentObj = useRef({});
  const [loading, setLoading] = useState(false);

  const previousData = (key) => {
    return currentData.current[key];
  };

  const handleNesting = (data) => {
    let nestedFormData = {};
    let normalFormData = {};
    currentObj.current = {};
    for (var pair of data.entries()) {
      if (pair[0].includes(".")) {
        set(nestedFormData, pair[0], pair[1]);
      } else {
        set(normalFormData, pair[0], pair[1]);
      }
      currentData.current[pair[0]] = pair[1];
    }
    let combinedFormData = new FormData();
    for (const pair of Object.entries(nestedFormData)) {
      combinedFormData.append(pair[0], JSON.stringify(pair[1]));
      currentObj.current[pair[0]] = pair[1];
    }
    for (const pair of Object.entries(normalFormData)) {
      combinedFormData.append(pair[0], pair[1]);
      currentObj.current[pair[0]] = pair[1];
    }
    return combinedFormData;
  };

  const addData = (key, value) => {
    if(formData.current.get(key)){
      formData.current.set(key,value);
      return;
    }
    formData.current.append(key,value);
  }

  const handleSave = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const combinedFormData = handleNesting(data);
    const validation = validate(currentObj.current);
    if (validation?.error) {
      if (validation?.message) {
        error(validation.message);
      }
      return;
    }
    if (formData.current) {
      for (var pair of combinedFormData.entries()) {
        addData(pair[0], pair[1]);
      }
    } else {
      formData.current = combinedFormData;
    }
    afterSave(currentObj.current);
    console.log("Saved");
  };

  const handleSubmission = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = new FormData(e.currentTarget);
    const combinedFormData = handleNesting(data);
    const validation = validate(currentObj.current);
    console.log(validation);
    if (validation?.error) {
      if (validation?.message) {
        error(validation.message);
      }
      setLoading(false);
      return;
    }
    if (formData.current) {
      for (var pair of combinedFormData.entries()) {
        addData(pair[0], pair[1]);
      }
    } else {
      formData.current = combinedFormData;
    }
    let body;
    if(contentType === formContentType.formdata){
      body = formData.current;
    }else{
      body = {};
    for (var pair of formData.current.entries()) {
      body[pair[0]]= pair[1];
    }
    }
    for (var pair of formData.current.entries()) {
      console.log(pair[0], pair[1]);
    }
    console.log(body);
    try {
      const res = await fetch.post(postTo, body);
      afterSubmission(res);
    } catch (e) {
      error(
        e.response
          ? e.response.data.message
          : "Please check your net connection"
      );
    }
    setLoading(false);
    console.log("Submitted");
    return;
  };

  return { previousData, handleSave, handleSubmission, loading };
}
