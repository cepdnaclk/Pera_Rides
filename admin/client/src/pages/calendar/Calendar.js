import styled from "styled-components";
import HeaderTitle from "../../components/headerTitle/HeaderTitle";
import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import {
  Box,
  List,
  ListItem,
  ListItemText,
  useTheme,
  Typography,
} from "@mui/material";
import { tokens } from "../../theme";

const CalendarMain = styled.div`
  width: 100%;
  height: 100%;
`;

const Calendar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [currentEvents, setCurrentEvents] = useState([]);

  const handleDateClick = (selected) => {
    const title = prompt("Please enter a new title for your event.");
    const calendarApi = selected.view.calendar;
    calendarApi.unselect();

    if (title) {
      calendarApi.addEvent({
        id: `${selected.dateStr} - ${title}`,
        title,
        start: selected.startStr,
        end: selected.endStr,
        allDay: selected.allDay,
      });
    }
  };

  const handleEventClick = (selected) => {
    const needToDelete = window.confirm(
      `Are you sure you want to delete the event ${selected.event.title}?`
    );
    if (needToDelete) {
      selected.event.remove();
    }
  };

  return (
    <CalendarMain>
      <HeaderTitle title={"calendar"} desc={"manage your days and events"} />
      <Box display="flex" justifyContent="space-between">
        {/* calendar sidebar */}
        <Box
          flex="1 1 20%"
          backgroundColor={colors.primary[400]}
          padding="15px"
          borderRadius="4px"
        >
          <Typography variant="h5">Events</Typography>
          <List>
            {currentEvents?.map((event) => (
              <ListItem
                key={event.id}
                sx={{
                  backgroundColor: colors.greenAccent[500],
                  margin: "10px 0",
                  borderRadius: "2px",
                }}
              >
                <ListItemText
                  primary={event.title}
                  secondary={
                    <Typography>
                      {FullCalendar.formatDate(event.start, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
    </CalendarMain>
  );
};

export default Calendar;
