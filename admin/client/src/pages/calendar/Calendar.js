import styled from "styled-components";
import HeaderTitle from "../../components/headerTitle/HeaderTitle";
import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import { formatDate } from "@fullcalendar/core";
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
import apiConnection from "../../apiConnection";

const CalendarMain = styled.div`
  width: 100%;
  height: 100%;
`;

const Calendar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [currentEvents, setCurrentEvents] = useState([]);

  // useEffect(() => {
  //   const getCalendarEvents = async () => {
  //     try {
  //       const response = await apiConnection.get("/calendar/all");
  //       console.log(response.data);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   getCalendarEvents();
  // }, []);

  useEffect(() => {
    const getCalendarEvents = async () => {
      try {
        const response = await apiConnection.get("/calendar/all");
        const formattedEvents = response.data.map((event) => ({
          id: event.id,
          title: event.title,
          date: event.date,
        }));
        setCurrentEvents(formattedEvents);
      } catch (err) {
        console.log(err);
      }
    };
    getCalendarEvents();
  }, [currentEvents]);

  const handleDateClick = async (selected) => {
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

    try {
      const response = await apiConnection.post("/calendar/event", {
        title: title,
        date: selected.startStr,
      });
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  const handleEventClick = async (selected) => {
    const needToDelete = window.confirm(
      `Are you sure you want to delete the event ${selected.event.title}?`
    );
    if (needToDelete) {
      const deleteEventId = selected.event._def.publicId;
      try {
        const response = await apiConnection.delete(
          `/calendar/delete/${deleteEventId}`
        );
        selected.event.remove();
        console.log(response.data);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <CalendarMain>
      <HeaderTitle
        title={"calendar"}
        desc={"manage your days and events ( click on the date to add event )"}
      />
      <Box display="flex" justifyContent="space-between" marginTop={"20px"}>
        {/* calendar sidebar */}
        <Box
          flex="1 1 20%"
          backgroundColor={colors.primary[400]}
          paddingLeft="10px"
          borderRadius="4px"
          sx={{
            marginTop: "10px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            overflowY: "auto",
            maxHeight: "75vh",
          }}
        >
          <Typography variant="h5" alignSelf={"flex-start"} paddingTop={"10px"}>
            Events
          </Typography>
          <List>
            {currentEvents?.map((event) => (
              <ListItem
                key={event.id}
                sx={{
                  color: colors.primary[500],
                  backgroundColor: colors.greenAccent[500],
                  margin: "10px 0",
                  borderRadius: "2px",
                }}
              >
                <ListItemText
                  primary={event.title}
                  secondary={
                    <Typography>
                      {formatDate(event.date, {
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

        {/* calendar */}
        <Box
          sx={{
            flex: "1 1 100%",
            margin: "0 15px",
            color:
              theme.palette.mode === "dark"
                ? colors.greenAccent[600]
                : colors.primary[500],
          }}
        >
          <FullCalendar
            height="75vh"
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              listPlugin,
              interactionPlugin,
            ]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
            }}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            select={handleDateClick}
            eventClick={handleEventClick}
            // eventsSet={(events) => setCurrentEvents(events)}
            events={currentEvents}
            initialEvents={[
              {
                id: "123",
                title: "All-day event",
                date: "2024-01-01",
              },
              {
                id: "1234",
                title: "Timed event",
                date: "2024-01-02",
              },
            ]}
          />
        </Box>
      </Box>
    </CalendarMain>
  );
};

export default Calendar;
