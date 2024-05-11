"use server";

export async function getLastUpdateDate() {
  const res = await fetch(
    "https://api.github.com/repos/omarafet/personal-website",
  );
  return res.json();
}
