import { useRouteError } from "react-router-dom";

/*  Note that useRouteError provides the error that was thrown. 
When the user navigates to routes that don't exist you'll get an error response with a "Not Found" statusText.
 We'll see some other errors later in the tutorial and discuss them more. */
function ErrorPage() {
  const error = useRouteError();
  console.error(error);
  return (
    <div id='error-page'>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>{/* <i>{error.statusText || error.message}</i> */}</p>
    </div>
  );
}

export default ErrorPage;
