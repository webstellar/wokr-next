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

//gets specific user based on their login status
export const getUser = async (data: object) => {
  fetch("/api/user/get", {
    method: "GET",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json", Accept: "application/json" },
  }).then((res) => {
    if (!res.ok) throw new Error("Error finding user");
    return res.json();
  });
};

//create job/automation in the database
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

//get all users
//get single job
//get all jobs
//create single order
//get single order
//get all orders
