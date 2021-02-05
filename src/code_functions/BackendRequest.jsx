
export async function BackendRequestGET(path, setData) {
  const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/${path}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  if (response.status >= 400) {
    throw new Error("not authorized");
  } else {
    const data = await response.json()
    setData(data);
  }
}

export async function BackendRequestDELETE(path) {
  await fetch(`${process.env.REACT_APP_BACKEND_URL}/${path}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    method: "DELETE"
  });
}