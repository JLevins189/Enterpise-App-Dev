import { useEffect, useRef } from "react";
import Form from "react-bootstrap/Form";
import { SliderPicker } from "react-color";

function AddEditColourForm(props) {
  const hexValueRef = useRef(null);
  const { colourName, setColourName } = props?.colourName;
  const { hexValue, setHexValue } = props?.hexValue;
  const { errorMessage, setErrorMessage } = props?.errorMessage;

  const hexValueRegex = /^#([0-9A-F]{6})$/i; //Start = #, 6 values 0-F in Hex / 3 Hex numbers
  const colourNameRegex = /^[\w\s-]+$/; //Word characters only

  useEffect(() => {
    //Focus the input
    hexValueRef.current?.focus();
  }, []);

  useEffect(() => {
    if (colourName.length < 3) {
      setErrorMessage((prev) => ({
        ...prev,
        colourName: "Colour Name must be at least 3 characters",
      }));
      return;
    }

    if (colourName.length >= 25) {
      setErrorMessage((prev) => ({
        ...prev,
        colourName: "Colour Name must be 25 characters or less",
      }));
      return;
    }
    if (!colourNameRegex.test(colourName)) {
      setErrorMessage((prev) => ({
        ...prev,
        colourName:
          "Colour Name must not contain any special characters apart from - or _",
      }));
      return;
    }

    setErrorMessage((prev) => ({ ...prev, colourName: null }));
  }, [colourName]);

  useEffect(() => {
    if (hexValue.length < 7 || hexValue.length > 7) {
      setErrorMessage((prev) => ({
        ...prev,
        hexValue:
          "Hex Value must be 6 hex characters following the # character",
      }));
      return;
    }

    if (!hexValueRegex.test(hexValue)) {
      setErrorMessage((prev) => ({
        ...prev,
        hexValue:
          "Hex value must be in the format #123ABC, using hex characters only",
      }));
      return;
    }

    setErrorMessage((prev) => ({ ...prev, hexValue: null }));
  }, [hexValue]);

  return (
    <Form>
      <Form.Group>
        <Form.Label htmlFor="colourName">Colour Name:</Form.Label>
        <Form.Control
          ref={hexValueRef}
          type="text"
          id="colourName"
          autoComplete="off"
          isInvalid={errorMessage?.colourName}
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
          isInvalid={errorMessage?.hexValue}
          onChange={(event) => setHexValue(event.target.value)} //update state on change
          value={hexValue} //value = state value
          required
        />
        <Form.Control.Feedback type="invalid">
          {errorMessage.hexValue}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="my-3">
        <SliderPicker
          color={hexValue}
          onChange={(color) => {
            setHexValue(color.hex);
          }}
        />
      </Form.Group>

      <Form.Group>
        <span>Selected Colour:</span>
        <div
          className="w-100 text-center"
          style={{
            backgroundColor: `${hexValue}`,
            height: 50,
            border: "2px solid white",
          }}
        ></div>
      </Form.Group>
    </Form>
  );
}
export default AddEditColourForm;
// https://medium.com/how-to-react/how-to-use-the-color-picker-in-reactjs-42a77087d93d
