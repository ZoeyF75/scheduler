import React from "react";
import axios from 'axios';
import Application from "components/Application";
import { render, cleanup, waitForElement, fireEvent, toBeInTheDocument } from "@testing-library/react";


afterEach(cleanup);
describe("Application", () => {
  it("defaults to Monday and changes the scedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);
    await waitForElement(() => getByText("Monday"))
      fireEvent.click(getByText("Tuesday"));
      expect(getByText("Leopold Silvers")).toBeInTheDocument();
    });
})

