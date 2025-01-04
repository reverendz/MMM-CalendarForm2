# MMM-CalendarForm2
Second iteration of CalendarForm. Designed to enable user to manually add calendar items on a touch screen. 

Example configuration. 

```js
{
    module: "MMM-CalendarForm2",
    position: "top_right",
    config: {
        calendarPath: "/path/to/your/specific/calendar.ics",  // Adjust based on your preferred placement
        keyboardModule: "MMM-Keyboard" // Module name for on-screen keyboard integration
    }
},
{
    module: "MMM-Keyboard",
    position: "bottom_center", // Adjust based on your preferred placement
    config: {
        // Example configuration for MMM-Keyboard
        layout: "custom", // Use a custom layout if required
        customLayout: {
            "default": [
                ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
                ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
                ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
                ["z", "x", "c", "v", "b", "n", "m"],
                ["space"]
            ]
        },
        useButton: true // Add a button to toggle the keyboard
    }
},
{
    module: "calendar",
    position: "top_left", // Position to display the calendar
    config: {
        calendars: [
            {
                symbol: "calendar",
                url: "/path/to/your/calendar.ics" // Use the same .ics file
            }
        ]
    }
},
```

**Key Points in the Configuration**

  **MMM-CalendarForm:**
        calendarPath: Path to the .ics file you’re using for the calendar events. Ensure this path is writable.
        keyboardModule: Name of the keyboard module to use for the on-screen keyboard.

  **MMM-Keyboard:**
        Configured with a custom layout, but you can adjust it to fit your needs.

  **calendar:**
        Uses the same .ics file (calendarPath) for displaying events on the MagicMirror.
