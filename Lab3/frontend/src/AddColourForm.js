import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";

function TeacherCreateModuleForm(props) {
  const [colourName, setColourName] = useState("");
  const [hexValue, setHexValue] = useState("#");
  const hexValueRegex = /^#([0-9A-F]{6})$/i; //Start = #, 6 values 0-F in Hex / 3 Hex numbers
  const colourNameRegex = /^[\w\s-]+$/; //Word characters only

  useEffect(() => {
    if (colourName.length < 1) {
      setErrorMessage({
        ...errorMessage,
        colourName: "Colour Name must be at least 1 character",
      });
      return;
    }
    if (colourName.length >= 25) {
      setErrorMessage({
        ...errorMessage,
        colourName: "Colour Name must be 25 characters or less",
      });
      return;
    }
    if (!colourNameRegex.test(colourName)) {
      setErrorMessage({
        ...errorMessage,
        colourName:
          "Colour Name must not contain any special characters apart from - or _",
      });
      return;
    }

    setErrorMessage((errorMessage) => ({ ...errorMessage, colourName: null }));
  }, [colourName]);

  useEffect(() => {
    if (hexValue.length < 7 || hexValue.length > 7) {
      setErrorMessage({
        ...errorMessage,
        hexValue: "Hex Value must be 6 characters following the # character",
      });
      return;
    }

    if (!hexValueRegex.test(hexValue)) {
      setErrorMessage({
        ...errorMessage,
        hexValue: "Hex value must be in the format #123ABC",
      });
      return;
    }

    setErrorMessage((errorMessage) => ({ ...errorMessage, hexValue: null }));
  }, [hexValue]);

  return (
    <Form>
      <Form.Group>
        <Form.Label htmlFor="colourName">Colour Name:</Form.Label>
        <Form.Control
          type="text"
          id="colourName"
          autoComplete="off"
          onChange={(event) => setColourName(event.target.value)} //update state on change
          value={colourName} //value = state value
          required
        />
        <Form.Control.Feedback type="invalid">
          {errorMessage.colourName}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group>
        <Form.Label htmlFor="hexValue">Hex Value of Colour:</Form.Label>
        <Form.Control
          type="text"
          id="hexValue"
          autoComplete="off"
          placeholder="#123ABC"
          onChange={(event) => setHexValue(event.target.value)} //update state on change
          value={hexValue} //value = state value
          required
        />
        <Form.Control.Feedback type="invalid">
          {errorMessage.hexValue}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Text className="text-muted">
        {errorMessage.requestError || null}
      </Form.Text>
    </Form>
  );
}
export default TeacherCreateModuleForm;
