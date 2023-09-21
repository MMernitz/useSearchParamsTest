import { NavLink } from "react-router-dom";
export default function ErrorPage() {
  return (
    <div>
      <h1>You triggered my Error Page</h1>
      <p>
        Unfortunately, the page you are looking for does not exist. Click the
        button to return to the main page.
      </p>
      <button type="button">
        <NavLink to="/">Go back</NavLink>
      </button>
    </div>
  );
}
