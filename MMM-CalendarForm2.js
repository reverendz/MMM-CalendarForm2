Module.register("MMM-CalendarForm2", {
    defaults: {
        calendarPath: "/path/to/your/specific/calendar.ics",
        keyboardModule: "MMM-Keyboard", // Specify the keyboard module for on-screen keyboard integration
    },

    start() {
        Log.info("Starting module: " + this.name);
        this.formVisible = false; // Form is hidden by default
        this.sendSocketNotification("SET_CONFIG", this.config); // Send configuration to node_helper
    },

    notificationReceived(notification, payload, sender) {
        Log.info(`MMM-CalendarForm2: Received notification: ${notification}`);
        if (notification === "addEvent") {
            Log.info("MMM-CalendarForm2: Showing form on addEvent notification.");
            this.showForm();
        }
    },

    showForm() {
        Log.info("MMM-CalendarForm2: showForm called, setting formVisible to true.");
        this.formVisible = true;
        this.updateDom(0); // Force immediate DOM update
    },

    hideForm() {
        Log.info("MMM-CalendarForm2: hideForm called, setting formVisible to false.");
        this.formVisible = false;
        this.updateDom(0); // Force immediate DOM update
    },

    getDom() {
        const wrapper = document.createElement("div");
        Log.info("MMM-CalendarForm2: Rendering DOM. formVisible =", this.formVisible);

        if (!this.formVisible) {
            wrapper.style.display = "none";
            return wrapper;
        }

        Log.info("MMM-CalendarForm2: Form is visible. Rendering form.");

        const formContainer = document.createElement("div");
        formContainer.className = "calendar-form";

        // Title
        const title = document.createElement("h2");
        title.textContent = "Add Event to Calendar";
        formContainer.appendChild(title);

        // Input for Event Title
        const titleInput = document.createElement("input");
        titleInput.type = "text";
        titleInput.placeholder = "Event Title";
        titleInput.id = "eventTitle";
        titleInput.addEventListener("focus", () => {
            Log.info("MMM-CalendarForm2: Title input focused, sending notification to keyboard.");
            this.sendNotification("KEYBOARD", {
                name: "MMM-Keyboard",
                payload: { key: "eventTitle" },
                style: "default",
            });
        });
        formContainer.appendChild(titleInput);

        // Input for Start Date
        const startDateInput = document.createElement("input");
        startDateInput.type = "date";
        startDateInput.id = "startDate";
        formContainer.appendChild(startDateInput);

        // Input for Start Time
        const startTimeInput = document.createElement("input");
        startTimeInput.type = "time";
        startTimeInput.id = "startTime";
        formContainer.appendChild(startTimeInput);

        // Input for End Date
        const endDateInput = document.createElement("input");
        endDateInput.type = "date";
        endDateInput.id = "endDate";
        formContainer.appendChild(endDateInput);

        // Input for End Time
        const endTimeInput = document.createElement("input");
        endTimeInput.type = "time";
        endTimeInput.id = "endTime";
        formContainer.appendChild(endTimeInput);

        // Input for Description
        const descriptionInput = document.createElement("textarea");
        descriptionInput.placeholder = "Event Description";
        descriptionInput.id = "eventDescription";
        descriptionInput.addEventListener("focus", () => {
            Log.info("MMM-CalendarForm2: Description input focused, sending notification to keyboard.");
            this.sendNotification("KEYBOARD", {
                name: "MMM-Keyboard",
                payload: { key: "eventDescription" },
                style: "default",
            });
        });
        formContainer.appendChild(descriptionInput);

        // Add Event Button
        const addButton = document.createElement("button");
        addButton.textContent = "Add Event";
        addButton.addEventListener("click", () => {
            const title = document.getElementById("eventTitle").value;
            const startDate = document.getElementById("startDate").value;
            const startTime = document.getElementById("startTime").value;
            const endDate = document.getElementById("endDate").value;
            const endTime = document.getElementById("endTime").value;
            const description = document.getElementById("eventDescription").value;

            if (!title || !startDate || !startTime || !endDate || !endTime) {
                alert("Please fill in all fields.");
                return;
            }

            this.sendSocketNotification("ADD_EVENT", {
                title,
                startDate,
                startTime,
                endDate,
                endTime,
                description,
            });
            this.hideForm();
        });
        formContainer.appendChild(addButton);

        // Cancel Button
        const cancelButton = document.createElement("button");
        cancelButton.textContent = "Cancel";
        cancelButton.addEventListener("click", () => {
            this.hideForm();
        });
        formContainer.appendChild(cancelButton);

        wrapper.appendChild(formContainer);
        return wrapper;
    },

    socketNotificationReceived(notification, payload) {
        if (notification === "EVENT_ADDED") {
            Log.info("Event added successfully:", payload);
            alert("Event added successfully!");
        } else if (notification === "EVENT_ADD_ERROR") {
            Log.error("Error adding event:", payload);
            alert(`Error adding event: ${payload}`);
        }
    },
});
