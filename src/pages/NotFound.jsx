import notFound from "../images/notFound.gif";

export default function NotFound() {
  return (
    <>
      <h1>🚫 404 Not Found</h1>
      <img src={notFound} alt="" />
    </>
  );
}
