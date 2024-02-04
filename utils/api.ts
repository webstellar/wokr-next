export const registerUser = async (data: object) => {
  fetch("/api/createuser", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json", Accept: "application/json" },
  }).then((res) => {
    if (!res.ok) throw new Error("Error registering user");
    return res.json();
  });
};

export const updateUser = async (data: object) => {
  fetch("/api/updateuser", {
    method: "PUT",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json", Accept: "application/json" },
  }).then((res) => {
    if (!res.ok) throw new Error("Error updating user");
    return res.json();
  });
};
