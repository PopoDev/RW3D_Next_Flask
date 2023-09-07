import * as React from "react";
import { unstable_useNumberInput as useNumberInput } from "@mui/base";
import { styled } from "@mui/system";
import { unstable_useForkRef as useForkRef } from "@mui/utils";
import { UseNumberInputParameters } from "@mui/base/unstable_useNumberInput/useNumberInput.types";

interface NumberInputProps extends UseNumberInputParameters {
  label: string;
}

const NumberInput = React.forwardRef(function NumberInput(
  props: NumberInputProps,
  ref: React.Ref<HTMLInputElement>
) {
  const {
    getRootProps,
    getInputProps,
    getIncrementButtonProps,
    getDecrementButtonProps,
  } = useNumberInput(props);

  const inputProps = getInputProps();

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };

  // Make sure that both the forwarded ref and the ref returned from the getInputProps are applied on the input element
  inputProps.ref = useForkRef(inputProps.ref, ref);

  return (
    <StyledInputRoot {...getRootProps()}>
      <StyledLabel>{props.label}</StyledLabel>
      <StyledInputElement {...inputProps} onKeyDown={handleKeyDown} />
      <StyledStepperButton {...getIncrementButtonProps()} className="increment">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 0 24 24"
          width="24"
        >
          <path d="M0 0h24v24H0z" fill="none" />
          <path
            d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"
            fill="currentColor"
          />
        </svg>
      </StyledStepperButton>
      <StyledStepperButton {...getDecrementButtonProps()} className="decrement">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 0 24 24"
          width="24"
        >
          <path d="M0 0h24v24H0V0z" fill="none" />
          <path
            d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"
            fill="currentColor"
          />
        </svg>
      </StyledStepperButton>
    </StyledInputRoot>
  );
});

export default NumberInput;

const blue = {
  100: "#DAECFF",
  200: "#b6daff",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
};

const grey = {
  50: "#f6f8fa",
  100: "#eaeef2",
  200: "#d0d7de",
  300: "#afb8c1",
  400: "#8c959f",
  500: "#6e7781",
  600: "#57606a",
  700: "#424a53",
  800: "#32383f",
  900: "#24292f",
};

const StyledInputRoot = styled("div")(
  ({ theme }) => `
    display: grid;
    grid-template-columns: 1fr 24px;
    grid-template-rows: 16px 1fr 1fr;
    column-gap: 8px;
    padding: 8px 4px 4px 8px;
    max-width: 300px;

    border-radius: 6px;
    border-style: solid;
    border-width: 1px;

    color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
    background: ${theme.palette.mode === "dark" ? grey[900] : grey[50]};

    border-color: ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
    box-shadow: 0px 2px 2px ${
      theme.palette.mode === "dark" ? grey[900] : grey[50]
    };
  `
);

const StyledInputElement = styled("input")`
  font-size: 1rem;
  font-family: inherit;
  font-weight: 400;
  line-height: 1.5;
  grid-column: 1/2;
  grid-row: 2/4;
  background: none;
  border: 0;
  outline: 0;
  padding: 0;
  &:disabled {
    color: grey;
  }
`;

const StyledStepperButton = styled("button")(
  ({ theme }) => `
    width: 1.25rem;
    height: 0.75rem;
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    font-size: 0.875rem;
    box-sizing: border-box;
    border: 0;
    padding: 0;

    & > svg {
      transform: scale(0.8);
    }

    &.increment,
    &.decrement {
      &:hover {
        cursor: pointer;
        background: ${blue[400]};
        color: ${grey[50]};
      }

      background: ${theme.palette.mode === "dark" ? grey[600] : grey[200]};
      color: ${theme.palette.mode === "dark" ? grey[200] : grey[900]};
    }

    &.increment {
      grid-column: 2/3;
      grid-row: 2/3;
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
    }

    &.decrement {
      grid-column: 2/3;
      grid-row: 3/4;
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 4px;
    }

    &:disabled {
      &:hover {
        cursor: not-allowed;
        background: ${theme.palette.mode === "dark" ? grey[600] : grey[200]};
        color: ${theme.palette.mode === "dark" ? grey[200] : grey[900]};
      }
    }
  `
);

const StyledLabel = styled("label")`
  color: rgba(0, 0, 0, 0.6);
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  font-weight: 400;
  font-size: 0.8rem;
  line-height: 1em;
  display: flex;
  flex-flow: row;
  text-align: left;
  grid-column: 1/3;
  grid-row: 1/2;
  padding: 0;
  display: block;
  top: 0;
  left: 0;
  white-space: nowrap;
`;
