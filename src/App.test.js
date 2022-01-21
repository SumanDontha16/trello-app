import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import App from "./App";
import renderer from "react-test-renderer";

describe('App render successfully', () => {
  it("Test to match snapshot of component", () => {
    const appTree = renderer
      .create(<App />)
      .toJSON();
    expect(appTree).toMatchSnapshot();
  });

  it("Should renders with correct title", () => {
    render(<App />);
    const headerEl = screen.getByTestId("title");
    expect(headerEl.textContent).toBe("My Trello App");
  });
})