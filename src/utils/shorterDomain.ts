export default function shorterDomain(url: string) {
  return url.replace(/(https?:\/\/)?(www\.)?/, "");
}
