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
      throw error;
    }
  }
};

export const getAllUsers = async () => {
  try {
    const response = await axios.get("/api/user/getall", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error("Error finding users");
    } else {
      throw error;
    }
  }
};

//api pending (not working)
export const deleteUserByAdminProfile = async (id: string, token: string) => {
  try {
    const response = await axios.delete(`/api/user/delete`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      params: { id },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error("Error deleting user");
    } else {
      // Handle non-Axios errors
      throw error;
    }
  }
};

export const deleteProfile = async (userId: string) => {
  try {
    const response = await axios.delete(`/api/user/delete`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      params: { userId },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error("Error deleting user");
    } else {
      // Handle non-Axios errors
      throw error;
    }
  }
};

//Jobs
export const createService = async (data: jobData, token: string) => {
  try {
    const response = await axios.post("/api/automation/create", data, {
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
    const response = await axios.get(`/api/automation/get`, {
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
      throw error;
    }
  }
};

export const getAllFilteredJobs = async ({
  query,
  pageNumber,
  pageSize,
  sortBy,
}: {
  query?: string;
  pageNumber?: number;
  pageSize?: number;
  sortBy?: string;
}) => {
  try {
    const response = await axios.get("/api/automation/getall", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      params: { query, pageNumber, pageSize, sortBy },
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

export const updateService = async (
  id: string,
  data: jobData,
  token: string
) => {
  try {
    const response = await axios.put("/api/automation/update", data, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      params: { id },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error("Error updating job");
    } else {
      throw error;
    }
  }
};

export const deleteService = async (id: string, token: string) => {
  try {
    const response = await axios.delete(`/api/automation/delete`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      params: { id },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error("Error deleting service");
    } else {
      throw error;
    }
  }
};

export const duplicateService = async (id: string, token: string) => {
  try {
    const response = await axios.get(`/api/automation/duplicate`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      params: { id },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error("Error duplicating service");
    } else {
      throw error;
    }
  }
};

//tools
export const createTool = async (data: object, token: string) => {
  try {
    const response = await axios.post("/api/tool/create", data, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error("Error creating tool");
    } else {
      throw error;
    }
  }
};

export const deleteTool = async (id: string, token: string) => {
  try {
    const response = await axios.delete(`/api/tool/delete`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      params: { id },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error("Error deleting tool");
    } else {
      // Handle non-Axios errors
      throw error;
    }
  }
};

export const getAllTools = async () => {
  try {
    const response = await axios.get("/api/tool/getall", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error("Error getting all tools");
    } else {
      throw error;
    }
  }
};

export const updateTool = async (id: string, data: object, token: string) => {
  try {
    const response = await axios.put("/api/tool/update", data, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      params: { id },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error("Error updating tool");
    } else {
      throw error;
    }
  }
};

//categories

export const createCategory = async (data: object, token: string) => {
  try {
    const response = await axios.post("/api/category/create", data, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error("Error creating tool");
    } else {
      throw error;
    }
  }
};

export const deleteCategory = async (id: string, token: string) => {
  try {
    const response = await axios.delete(`/api/category/delete`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      params: { id },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error("Error deleting tool");
    } else {
      // Handle non-Axios errors
      throw error;
    }
  }
};

export const getAllCategories = async () => {
  try {
    const response = await axios.get("/api/category/getall", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error("Error getting all categories");
    } else {
      throw error;
    }
  }
};

export const updateCategory = async (
  id: string,
  data: object,
  token: string
) => {
  try {
    const response = await axios.put("/api/category/update", data, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      params: { id },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error("Error updating tool");
    } else {
      throw error;
    }
  }
};

//skill
export const createSkill = async (data: object, token: string) => {
  try {
    const response = await axios.post("/api/skill/create", data, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error("Error creating skill");
    } else {
      throw error;
    }
  }
};

export const deleteSkill = async (id: string, token: string) => {
  try {
    const response = await axios.delete(`/api/skill/delete`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      params: { id },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error("Error deleting skill");
    } else {
      // Handle non-Axios errors
      throw error;
    }
  }
};

export const getAllSkills = async () => {
  try {
    const response = await axios.get("/api/skill/getall", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error("Error getting all skills");
    } else {
      throw error;
    }
  }
};

export const updateSkill = async (id: string, data: object, token: string) => {
  try {
    const response = await axios.put("/api/skill/update", data, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      params: { id },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error("Error updating skill");
    } else {
      throw error;
    }
  }
};

//tags
export const createTag = async (data: object, token: string) => {
  try {
    const response = await axios.post("/api/tag/create", data, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error("Error creating tag");
    } else {
      throw error;
    }
  }
};

export const deleteTag = async (id: string, token: string) => {
  try {
    const response = await axios.delete(`/api/tag/delete`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      params: { id },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error("Error deleting tag");
    } else {
      throw error;
    }
  }
};

export const getAllTags = async () => {
  try {
    const response = await axios.get("/api/tag/getall", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error("Error getting all tags");
    } else {
      throw error;
    }
  }
};

export const updateTag = async (id: string, data: object, token: string) => {
  try {
    const response = await axios.put("/api/tag/update", data, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      params: { id },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error("Error updating tag");
    } else {
      throw error;
    }
  }
};
//order
