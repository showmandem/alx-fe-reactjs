export async function getGithubUser() {
  const token = import.meta.env.VITE_APP_GITHUB_API_KEY;

  const response = await fetch("https://api.github.com/user", {
    headers: {
      Authorization: `token ${token}`,
    },
  });

  const data = await response.json();
  return data;
}
