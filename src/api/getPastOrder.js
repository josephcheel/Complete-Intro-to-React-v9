export default async function getPastOrders(order) {
  const response = await fetch(`/api/past-order/${order}`);
  if (!response.ok) {
    throw new Error("Failed to fetch past orders");
  }
  const data = await response.json();
  return data;
}
