import React from "react";
import axios from 'axios';
import Application from "components/Application";
import { render, cleanup, waitForElement, fireEvent, queryByAltText, getByText, prettyDOM, getAllByTestId, getByAltText, getByPlaceholderText, queryByText } from "@testing-library/react";

afterEach(cleanup);
describe("Application", () => {
  it("defaults to Monday and changes the scedule when a new day is selected", async() => {
    const { container } = render(<Application />);
    await waitForElement(() => getByText(container, "Monday"))
      fireEvent.click(getByText(container, "Tuesday"));
      expect(getByText(container, "Leopold Silvers")).toBeInTheDocument();
    });

    it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
      const { container, debug } = render(<Application />);
      await waitForElement(() => getByText(container, "Archie Cohen"));
      const appointments = getAllByTestId(container, "appointment");
      const appointment = appointments[0];
    
      fireEvent.click(getByAltText(appointment, "Add"));

      fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
        target: { value: "Lydia Miller-Jones" }
      });

      fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
      fireEvent.click(getByText(appointment, "Save"));

      expect(getByText(appointment, "Saving")).toBeInTheDocument();

      await waitForElement(() => queryByText(appointment, "Lydia Miller-Jones"));
      const day = getAllByTestId(container, "day").find(day =>
        queryByText(day, "Monday")
      );
      
      expect(getByText(day, "no spots remaining")).toBeInTheDocument;
    });

    it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
      const { container } = render(<Application />);
      await waitForElement(() => getByText(container, "Archie Cohen"));
      const appointment = getAllByTestId(container, "appointment").find(
        appointment => queryByText(appointment, "Archie Cohen")
      );
    
      fireEvent.click(queryByAltText(appointment, "Delete"));
     
      expect(getByText(appointment, "Are you sure?")).toBeInTheDocument();

      fireEvent.click(queryByText(appointment, "Confirm"));

      expect(getByText(appointment, "Deleting")).toBeInTheDocument();

      await waitForElement(() => getByAltText(appointment, "Add"));

      const day = getAllByTestId(container, "day").find(day =>
        queryByText(day, "Monday")
      );
    
      expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
    });

    it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
      const { container } = render(<Application />);
      await waitForElement(() => getByText(container, "Archie Cohen"));
      const appointment = getAllByTestId(container, "appointment").find(
        appointment => queryByText(appointment, "Archie Cohen")
      );
    
      fireEvent.click(queryByAltText(appointment, "Edit"));
      fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
      fireEvent.click(getByText(appointment, "Save"));
    
      expect(getByText(appointment, "Saving")).toBeInTheDocument();
      await waitForElement(() => getByText(appointment, "Archie Cohen"));
      
      expect(getByText(container, "Sylvia Palmer")).toBeInTheDocument();

      const day = getAllByTestId(container, "day").find(day =>
        queryByText(day, "Monday")
      );
    
      expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
    });
})

