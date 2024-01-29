export const registerUser = async (data: object) => {
  fetch("/api/user", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json", Accept: "application/json" },
  }).then((res) => {
    if (!res.ok) throw new Error("Error registering user");
    return res.json();
  });
};
