import { useState } from "react";
import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";

function ExplainProgramComponent() {
  const [showTechnology, setShowTechnology] = useState(true);
  const [showAjax, setShowAjax] = useState(true);

  return (
    <>
      <div>
        <h2 className="text-decoration-underline mb-4">
          Technology Explanation
        </h2>

        <Collapse timeout={1000} in={showTechnology}>
          <div>
            <h3 className="d-inline-block me-2">AJAX</h3>
            {showAjax ? (
              <>
                <i
                  onClick={() => setShowAjax(false)}
                  className="bi bi-caret-up border border-2"
                  role="button"
                ></i>
                <p className="animate__animated animate__slideInLeft">
                  This webpage utilizes AJAX technology using the Axios network
                  request library in order to fetch JSON objects and display
                  them on the webpage. This allows for the dynamic loading of
                  data in the background that does not require a full page
                  reload for the data to be consumed and added to the page.
                </p>
              </>
            ) : (
              <>
                <i
                  onClick={() => setShowAjax(true)}
                  className="bi bi-caret-down border border-2"
                  role="button"
                ></i>
              </>
            )}

            <h3>JSON</h3>
            <p>
              JSON is a format for data storage and exchanging data. JSON is a
              human-readable format and is very lightweight in comparision to
              it's competitors like XML and offers a more streamlined interface
              inside of Javascript to allow for manipulation of the webpage
              using JSON objects or arrays.
            </p>
            <h3>React</h3>
            <p>
              React is a Javascript library developed by Facebook (Meta) to make
              developing webpages easier and more efficient, it offers support
              for JSX, a subset of Javascript that is transpiled into native
              Javascript. JSX is a crossover of HTML and Javascript in the way
              it is written. It allows Javascript expressions inside web
              elements among much other useful functionality such as array
              mapping and filtering methods to be transformed into web elements.
              React is a component based library that operates on the premise of
              seperation of concerns as oppposed to seperation of technologies.
            </p>
            <h3>Bootstrap</h3>
            <p>
              Bootstrap was used to make the page responsive, but more so to use
              their pre-made components such as buttons and tables to create a
              better visual experience for the user
            </p>
            <h3>Express</h3>
            <p>
              Express is a lightweight Node.js library that allows for easy
              making of APIs using Javascript capable of using MVC architecture.
            </p>
            <h3>Technology Decisions Made</h3>
            <p>
              <li>
                React was chosen as its use of state management is much more
                efficient than jQuery. React's support for manipulating the DOM
                and handling events is much cleaner and allows a much easier to
                write web application. The ability to map the JSON arrays to
                table rows is something that is much more difficult to do in
                native JS.
              </li>
              <li>
                Express is also much more readable than the standard built-in
                http library of Node.
              </li>
              <li>
                Axios was preferred to fetch as it has much better
                error-handling. Fetch for some reason does not produce
                exceptions on non 2xx status codes and causes unreadable code
                for those cases.
              </li>
            </p>
          </div>
        </Collapse>

        <Button onClick={() => setShowTechnology((prev) => !prev)}>
          {showTechnology
            ? "Hide Technology Section"
            : "Show Technology Section"}
        </Button>
      </div>
      <div>
        <h2 className="text-decoration-underline my-4">Purpose of Program</h2>
        <p>
          This program is designed to show useful information about countries
          from all around the world. This program is also used to demonstrate
          the usefulness of AJAX technologies in the modern web.
        </p>
      </div>
      <hr />
    </>
  );
}

export default ExplainProgramComponent;
