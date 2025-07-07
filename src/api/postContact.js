export default async function postContact(name, email, message) {
  const response = await fetch("/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, message }),
  });

  if (!response.ok) {
    throw new Error("Failed to send contact message");
  }

  //   const data = await response.json();
  //   return data;
  return response.json(); // An async always returns a Promise, so implicitly returning the Promise from response.json() is fine.
}
