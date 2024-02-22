import { jobData, userData } from "@/types/types";
import axios from "axios";

//registers new users when login
export const registerUser = async (data: object) => {
  fetch("/api/user/register", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json", Accept: "application/json" },
  }).then((res) => {
    if (!res.ok) throw new Error("Error registering user");
    return res.json();
  });
};

//updates a user's profile
/*
export const updateUser = async (data: object, headers: any) => {
  fetch("/api/user/update", {
    method: "PUT",
    body: JSON.stringify(data),
    headers: headers,
  }).then((res) => {
    if (!res.ok) throw new Error("Error updating user");
    return res.json();
  });
};

*/

export const updateUser = async (data: userData, token: string) => {
  try {
    const response = await axios.put("/api/user/update", data, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error("Error updating user");
    } else {
      throw error;
    }
  }
};

//gets specific user based on their login status
/*
export const getUser = async (data: string, token: string) => {
  fetch("/api/user/get", {
    method: "GET",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    if (!res.ok) throw new Error("Error finding user");
    return res.json();
  });
};

*/

export const getUser = async (token: string) => {
  try {
    const response = await axios.get("/api/user/get", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error("Error finding user");
    } else {
      // Handle non-Axios errors
      throw error;
    }
  }
};

//create job/automation in the database
/*
export const createJob = async (data: object, headers: any) => {
  try {
    const response = await fetch("/api/automation/create", {
      method: "POST",
      body: JSON.stringify(data),
      headers: headers,
    });

    if (!response.ok) {
      // If the server response is not ok, throw an error
      const errorData = await response.json();
      throw new Error(errorData.error || "Error creating job");
    }

    // If the response is ok, return the response data
    return await response.json();
  } catch (error) {
    throw error;
  }
};
*/

export const createJob = async (data: jobData, token: string) => {
  try {
    const response = await axios.put("/api/automation/create", data, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error("Error creating job");
    } else {
      throw error;
    }
  }
};

export const getJob = async (data: string) => {
  try {
    const response = await axios.get("/api/automation/get", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      params: { data },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error("Error finding automation job");
    } else {
      // Handle non-Axios errors
      throw error;
    }
  }
};

export const getAllJobs = async () => {
  try {
    const response = await axios.get("/api/automation/getall", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error("Error finding automation job");
    } else {
      throw error;
    }
  }
};

//get all users
//get single job
//get all jobs
//create single order
//get single order
//get all orders
