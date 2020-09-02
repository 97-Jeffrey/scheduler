export function getAppointmentsForDay(state, day) {
  const appointmentArray = [];
  const selectedDay = state.days.filter(theDay => theDay.name === day);
  if (selectedDay === [] || !day || selectedDay[0] === undefined) {
    return [];
  }
  const selectedAppointmentsId = selectedDay[0].appointments;

  for (const each in state.appointments) {
    if (selectedAppointmentsId.includes(state.appointments[each].id)) {
      appointmentArray.push(state.appointments[each]);
    }
  }
  return appointmentArray;
}