import React from "react";
import axios from 'axios';
import Application from "components/Application";
import { 
  render, 
  cleanup, 
  waitForElement, 
  fireEvent, 
  queryByAltText, 
  getByText, 
  getAllByTestId, 
  getByAltText, 
  getByPlaceholderText, 
  queryByText, 
  getByDisplayValue 
} from "@testing-library/react";

afterEach(cleanup);

describe("Application", () => {
  it("defaults to Monday and changes the scedule when a new day is selected", async() => {
    const { container } = render(<Application />);
    //waits for container to render and finds Monday
    await waitForElement(() => getByText(container, "Monday")) 
      //clicks Tuesday after Monday has been found, confirm container has rendered
      fireEvent.click(getByText(container, "Tuesday"));
      expect(getByText(container, "Leopold Silvers")).toBeInTheDocument();
    });

    it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
      const { container } = render(<Application />);
      await waitForElement(() => getByText(container, "Archie Cohen"));
      //Returns an array of all matching nodes for a query => array of appointments
      const appointments = getAllByTestId(container, "appointment");
      const appointment = appointments[0];
    
      fireEvent.click(getByAltText(appointment, "Add"));
      //replaces placeholder text with student name
      fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
        target: { value: "Lydia Miller-Jones" }
      });
      //selects interviewer, and saves
      fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
      fireEvent.click(getByText(appointment, "Save"));
      //confirms saving process
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
      //finds exsisting appointment with exsisting text Archie Cohen
      const appointment = getAllByTestId(container, "appointment").find(
        appointment => queryByText(appointment, "Archie Cohen")
      );
    
      fireEvent.click(queryByAltText(appointment, "Delete"));
      //confirms that delete button works
      expect(getByText(appointment, "Are you sure?")).toBeInTheDocument();

      fireEvent.click(queryByText(appointment, "Confirm"));
      //confirms confirmations button works
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

    it('shows the save error when failing to save an appointment', async () => {
      axios.put.mockRejectedValueOnce();

      const { container} = render(<Application />);
  
      await waitForElement(() => getByText(container, 'Archie Cohen'));
  
      const appointment = getAllByTestId(container,'appointment').find(
        appointment => queryByText(appointment, 'Archie Cohen'));
  
      fireEvent.click(queryByAltText(appointment, 'Edit'));
      expect(getByDisplayValue(appointment, 'Archie Cohen'));
  
      fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
        target: { value: "Lydia Miller-Jones" }
      });
  
      fireEvent.click(getByText(appointment, 'Save'));
      expect(getByText(appointment, 'Saving')).toBeInTheDocument();
  
      await waitForElement(() =>
        getByText(appointment, "Could not save appointment.")
      );
      //confirms error message exists when appointment doesn't save
      expect(
        getByText(appointment, 'Could not save appointment.')
      ).toBeInTheDocument();
  
    });
    
    it("shows the delete error when failing to delete an existing appointment", async() => {
      axios.delete.mockRejectedValueOnce();

      const { container} = render(<Application />);
  
      await waitForElement(() => getByText(container, 'Archie Cohen'));
  
      const appointment = getAllByTestId(container,'appointment').find(
        appointment => queryByText(appointment, 'Archie Cohen'));
  
      fireEvent.click(queryByAltText(appointment, "Delete"));
      fireEvent.click(queryByText(appointment, "Confirm"));
      expect(getByText(appointment, "Deleting")).toBeInTheDocument();
  
      await waitForElement(() =>
        getByText(appointment, "Could not delete appointment.")
      );
      //confirms error message exists when appointment doesn't delete
      expect(
        getByText(appointment, "Could not delete appointment.")
      ).toBeInTheDocument();
    });
})

