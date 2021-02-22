const state = {
  day: "Monday",
  days: [
    {
      id: 1,
      name: "Monday",
      appointments: [1, 2, 3],
      interviewers: [1, 2],
      spots: 99

    },
    {
      id: 2,
      name: "Tuesday",
      appointments: [4, 5],
      interviewers: [1, 2],
      spots: 3
    },
  ],

  interviewers: {
    1: {
      id: 1,
      name: "Sylvia Palmer",
      avatar: "https://i.imgur.com/LpaY82x.png",
    },
    2: {
      id: 2,
      name: "Tori Malcolm",
      avatar: "https://i.imgur.com/Nmx0Qxo.png",
    },
  },

  appointments: {
    1: { id: 1, time: "12pm", interview: null },
    2: { id: 2, time: "1pm", interview: null },
    3: {
      id: 3,
      time: "2pm",
      interview: { student: "Archie Cohen", interviewer: 2 },
    },
    4: { id: 4, time: "3pm", interview: null },
    5: {
      id: 5,
      time: "4pm",
      interview: { student: "Chad Takahashi", interviewer: 2 },
    },
  },
};

// Counts appointments for day that have null interview
const updateSpots = function (day, days, appointments) {
  const getDay = (day) => {
    const idOfDay = {
      "Monday" : 0,
      "Tuesday": 1,
      "Wednesday": 2,
      "Thursday": 3,
      "Friday": 4
    }
    return idOfDay[day];
  }

  const idOfDay = getDay(state.day);

  day = {
    ...state.days[idOfDay],
    spots: state.days[idOfDay].spots - 1
  }

  days = [...state.days];
  days[idOfDay] = day;

  return days;
};

// This is the initial state
console.log("\n*** Initial Days State\n", state.days);

// Callthe updateSpots function 
const days = updateSpots(state.day, state.days, state.appointments);
console.log("\n*** Updated Days\n", days);

// Hopefully this is unchanged
console.log("\n*** Final Days State\n", state.days);

test("Spot changes without mutating state", () => {
  const initial = state.days;
  const update = updateSpots(state.day, state.days, state.appointments);
  const final = state.days;
  expect(initial).toEqual(
    [
      {
        id: 1,
        name: 'Monday',
        appointments: [ 1, 2, 3 ],
        interviewers: [ 1, 2 ],
        spots: 99
      },
      {
        id: 2,
        name: 'Tuesday',
        appointments: [ 4, 5 ],
        interviewers: [ 1, 2 ],
        spots: 3
      }
    ]
  );

  expect(update).toEqual(
      [{"appointments": [1, 2, 3],
       "id": 1, 
       "interviewers": [1, 2],
      "name": "Monday", "spots": 98}, 
      {"appointments": [4, 5], "id": 2, 
      "interviewers": [1, 2], 
      "name": "Tuesday", "spots": 3}]
  );

  expect(final).toEqual(
    [
      {
        id: 1,
        name: 'Monday',
        appointments: [ 1, 2, 3 ],
        interviewers: [ 1, 2 ],
        spots: 99
      },
      {
        id: 2,
        name: 'Tuesday',
        appointments: [ 4, 5 ],
        interviewers: [ 1, 2 ],
        spots: 3
      }
    ]
  );
});