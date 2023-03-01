export async function check(): Promise<boolean> {
  const response = await fetch('/api/session');
  return response.status === 200;
}
