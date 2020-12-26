import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  // ----------------------------------------- STATE/DATA -----------------------------------------------------
  state: {
    date: new Date(),
    months: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
    monthLength: [],
    selectedDay: [{
      dayNr: '',
      month: '',
      monthName: '',
      year: '',
    }],
    todo: [], // array of todo tasks
    inprogress: [], // array of inprogress tasks
    done: [], // array of done tasks
    newTaskOpen: false, // is window (add task) open
    taskOptionsOpen: false, // are task options (edit, delete) open
    taskOpenIndex: [], // index of active task
    INPUT_DATA: new FormData(),
    INPUT_NEW_TASK: {
      date: '',
      status: '',
      name: '',
      description: '',
    },
    FORM_DATA_ARRAY: [],
    randomColor: '',
    previousDays: [],
    nextDays: [],
    currentDate: new Date().getDate(),
    currentMonth: '',
    currentYear: '',
    chosenFromCalendar: '',
    daySelected: '',
    lastDayInMonth: '',
    searchValue: '',
    searchNotesValue: '',
    currentlyDragged: [],
    motion: false, // detects dragging motion (run some function when in motion, else do not)
    isEdited: false,
    editedArray: [], // edited task values
    notes: [], // array of all notes
    newNoteOpen: false, // is window (add note) open
    INPUT_NEW_NOTE: {
      title: '',
      text: '',
    },
  },
  // ----------------------------------------- GETTERS -----------------------------------------------------
  getters: {
    month: (state) => state.date.getMonth(),
    getMonthName: (state) => state.months[state.date.getMonth() + 1],
    getYear: (state) => state.date.getFullYear(),
    lastDay: (state) => new Date(state.date.getFullYear(), state.date.getMonth() + 1, 0).getDate(), // last day of current month
    prevMonthLastDay: (state) => new Date(state.date.getFullYear(), state.date.getMonth(), 0).getDate(), // last day of previous month
    taskTodo: (state) => state.todo,
    taskInprogress: (state) => state.inprogress,
    taskDone: (state) => state.done,
  },
  // ----------------------------------------- MUTATIONS -----------------------------------------------------
  mutations: {
    renderLastDay(state) {
      // get value/number of last day of month (aim = v-for in 'Calendar.vue')
      state.lastDayInMonth = new Date(state.date.getFullYear(), state.date.getMonth() + 1, 0).getDate();
    },
    displayCalendar(state) {
      state.date.setDate(1); // set date - 1st date of month
      const firstDayIndex = state.date.getDay(); // index of 1st day in calendar (detects position of 1st day in calendr scheme)
      const prevMonthLastDay = new Date(state.date.getFullYear(), state.date.getMonth(), 0).getDate();
      const lastDayIndex = new Date(state.date.getFullYear(), state.date.getMonth() + 1, 0).getDay();

      state.currentMonth = state.months[state.date.getMonth()];
      state.currentYear = state.date.getFullYear();

      if (state.currentDate < 10) { // check date format yyyy-mm-dd
        state.chosenFromCalendar = `${state.date.getFullYear()}-${state.date.getMonth() + 1}-0${state.currentDate}`;
      } else {
        state.chosenFromCalendar = `${state.date.getFullYear()}-${state.date.getMonth() + 1}-${state.currentDate}`;
      }
      state.daySelected = `${state.currentDate}`;

      // how many days to display from previous month logic
      let prevDaysNumber = '';
      if (firstDayIndex === 0) {
        prevDaysNumber = 6;
      }
      if (firstDayIndex === 1) {
        prevDaysNumber = 0;
      }
      if (firstDayIndex === 2) {
        prevDaysNumber = 1;
      }
      if (firstDayIndex === 3) {
        prevDaysNumber = 2;
      }
      if (firstDayIndex === 4) {
        prevDaysNumber = 3;
      }
      if (firstDayIndex === 5) {
        prevDaysNumber = 4;
      }
      if (firstDayIndex === 6) {
        prevDaysNumber = 5;
      }

      // Fill an array with indexes of days from previous month (last day of previous month and then descending...)
      for (let x = prevDaysNumber; x > 0; x -= 1) {
        state.previousDays.push(prevMonthLastDay - x + 1);
      }

      // how many days to display from next month logic
      let nextDaysNumber = '';
      if (lastDayIndex === 0) {
        nextDaysNumber = 0;
      }
      if (lastDayIndex === 1) {
        nextDaysNumber = 6;
      }
      if (lastDayIndex === 2) {
        nextDaysNumber = 5;
      }
      if (lastDayIndex === 3) {
        nextDaysNumber = 4;
      }
      if (lastDayIndex === 4) {
        nextDaysNumber = 3;
      }
      if (lastDayIndex === 5) {
        nextDaysNumber = 2;
      }
      if (lastDayIndex === 6) {
        nextDaysNumber = 1;
      }

      // Fill an array with number of days in next month (first day of next month and ascending...)
      for (let x = 1; x <= nextDaysNumber; x += 1) {
        state.nextDays.push(x);
      }
    },
    searchTasks(state) {
      state.searchValue = document.getElementById('searchInput').value.toUpperCase();
      const taskBoxTodo = document.querySelectorAll('.overlay_todo .task_content');
      const taskBoxInprogress = document.querySelectorAll('.overlay_inprogress .task_content');
      const taskBoxDone = document.querySelectorAll('.overlay_done .task_content');

      // filter TODO tasks
      for (let i = 0; i < state.todo.length; i += 1) {
        if (state.todo !== '') {
          if ((state.todo[i].name.toUpperCase().indexOf(state.searchValue) > -1) || (state.todo[i].description.toUpperCase().indexOf(state.searchValue) > -1)) {
            taskBoxTodo[i].style.display = '';
          } else {
            taskBoxTodo[i].style.display = 'none';
          }
        }
      }

      // filter INPROGRESS tasks
      for (let i = 0; i < state.inprogress.length; i += 1) {
        if (state.inprogress !== '') {
          if ((state.inprogress[i].name.toUpperCase().indexOf(state.searchValue) > -1) || (state.inprogress[i].description.toUpperCase().indexOf(state.searchValue) > -1)) {
            taskBoxInprogress[i].style.display = '';
          } else {
            taskBoxInprogress[i].style.display = 'none';
          }
        }
      }

      // filter DONE tasks
      for (let i = 0; i < state.done.length; i += 1) {
        if (state.done !== '') {
          if ((state.done[i].name.toUpperCase().indexOf(state.searchValue) > -1) || (state.done[i].description.toUpperCase().indexOf(state.searchValue) > -1)) {
            taskBoxDone[i].style.display = '';
          } else {
            taskBoxDone[i].style.display = 'none';
          }
        }
      }
    },
    searchNotes(state) {
      state.searchNotesValue = document.getElementById('searchNotesInput').value.toUpperCase();
      const notesBox = document.querySelectorAll('.notes .note_single');

      // filter NOTES
      for (let i = 0; i < state.notes.length; i += 1) {
        if (state.notes !== '') {
          if ((state.notes[i].title.toUpperCase().indexOf(state.searchNotesValue) > -1) || (state.notes[i].text.toUpperCase().indexOf(state.searchNotesValue) > -1)) {
            notesBox[i].style.display = '';
          } else {
            notesBox[i].style.display = 'none';
          }
        }
      }
    },
    deleteNote(state, note) {
      state.notes = state.notes.filter((chosen) => chosen !== note);
    },
    deleteTodoTask(state, task) {
      state.taskOptionsOpen = false; // close options window
      state.todo = state.todo.filter((chosen) => chosen !== task);
    },
    deleteInprogressTask(state, task) {
      state.taskOptionsOpen = false;
      state.inprogress = state.inprogress.filter((chosen) => chosen !== task);
    },
    deleteDoneTask(state, task) {
      state.taskOptionsOpen = false;
      state.done = state.done.filter((chosen) => chosen !== task);
    },
    openTaskOptions(state, index) {
      state.taskOpenIndex = [];
      state.taskOpenIndex.push({
        name: index.name,
        status: index.status,
      });

      if (state.taskOptionsOpen === false) {
        state.taskOptionsOpen = true;
      } else {
        state.taskOptionsOpen = false;
      }

      // store index value of chosen task, depending on status (todo/inprogress/done)
      if (index.status === 'todo') {
        for (let i = 0; i < state.todo.length; i += 1) {
          if (index.name === state.todo[i].name) {
            state.taskOpenIndex.push({
              index: i,
            });
          }
        }
      } else if (index.status === 'inprogress') {
        for (let i = 0; i < state.inprogress.length; i += 1) {
          if (index.name === state.inprogress[i].name) {
            state.taskOpenIndex.push({
              index: i,
            });
          }
        }
      } else {
        for (let i = 0; i < state.done.length; i += 1) {
          if (index.name === state.done[i].name) {
            state.taskOpenIndex.push({
              index: i,
            });
          }
        }
      }
    },
    editTask(state, task) {
      state.newTaskOpen = true;
      state.isEdited = true;

      state.INPUT_DATA = new FormData();

      state.INPUT_NEW_TASK.date = task.date;
      state.INPUT_NEW_TASK.status = task.status;
      state.INPUT_NEW_TASK.name = task.name;
      state.INPUT_NEW_TASK.description = task.description;
      state.INPUT_NEW_TASK.color = task.color;

      state.INPUT_DATA.append('date', state.INPUT_NEW_TASK.date);
      state.INPUT_DATA.append('status', state.INPUT_NEW_TASK.status);
      state.INPUT_DATA.append('name', state.INPUT_NEW_TASK.name);
      state.INPUT_DATA.append('description', state.INPUT_NEW_TASK.description);
      state.INPUT_DATA.append('color', state.INPUT_NEW_TASK.color);

      state.FORM_DATA_ARRAY = Array.from(state.INPUT_DATA);

      state.editedArray = state.FORM_DATA_ARRAY; // make an array of currently edited task values
    },
    openNewTaskWindow(state) {
      if (state.newTaskOpen === false) {
        state.newTaskOpen = true;
      } else {
        state.newTaskOpen = false;
      }

      // Reset values if window previously opened while task editing
      this.state.INPUT_NEW_TASK.date = '';
      this.state.INPUT_NEW_TASK.status = '';
      this.state.INPUT_NEW_TASK.name = '';
      this.state.INPUT_NEW_TASK.description = '';

      // Close task editing (only when edition options previously opened)
      this.state.taskOptionsOpen = false;
    },
    addNote(state) {
      if (state.newNoteOpen === false) { // open/close window
        state.newNoteOpen = true;
      } else {
        state.newNoteOpen = false;
      }
    },
    GET_FORM_DATE(state, date) { // v-model (onkeyup) in 'NewTaskWindow.vue'
      state.INPUT_NEW_TASK.date = date;
    },
    GET_FORM_STATUS(state, status) { // v-model (onkeyup) in 'NewTaskWindow.vue'
      state.INPUT_NEW_TASK.status = status;
    },
    GET_FORM_NAME(state, name) { // v-model (onkeyup) in 'NewTaskWindow.vue'
      state.INPUT_NEW_TASK.name = name;
    },
    GET_FORM_DESCRIPTION(state, description) { // v-model (onkeyup) in 'NewTaskWindow.vue'
      state.INPUT_NEW_TASK.description = description;
    },
    GET_FORM_TITLE(state, title) { // v-model (onkeyup) in 'NewNotesWindow.vue'
      state.INPUT_NEW_NOTE.title = title;
    },
    GET_FORM_TEXT(state, text) { // v-model (onkeyup) in 'NewNotesWindow.vue'
      state.INPUT_NEW_NOTE.text = text;
    },
    startDrag(state, task) {
      state.currentlyDragged = [];

      setTimeout(() => { // set delay for proper visual dragging effect
        state.todo = state.todo.filter((picked) => picked.name !== task.name);
        state.currentlyDragged.push({
          name: task.name,
          description: task.description,
          color: task.color,
          status: task.status,
          date: task.date,
        });
      }, 0);

      setTimeout(() => {
        state.inprogress = state.inprogress.filter((picked) => picked.name !== task.name);
        state.currentlyDragged.push({
          name: task.name,
          description: task.description,
          color: task.color,
          status: task.status,
          date: task.date,
        });
      }, 0);

      setTimeout(() => {
        state.done = state.done.filter((picked) => picked.name !== task.name);
        state.currentlyDragged.push({
          name: task.name,
          description: task.description,
          color: task.color,
          status: task.status,
          date: task.date,
        });
      }, 0);
    },
    leaveDrag(state) {
      const todoElements = document.querySelector('.overlay_todo');
      const inprogressElements = document.querySelector('.overlay_inprogress');
      const doneElements = document.querySelector('.overlay_done');

      // detects hover position (detects status)
      function detectPosition(event) {
        if (event.screenX > todoElements.getBoundingClientRect().left && event.screenX < todoElements.getBoundingClientRect().right && state.motion === false) {
          state.motion = true;

          state.todo.unshift({
            name: state.currentlyDragged[0].name,
            description: state.currentlyDragged[0].description,
            color: state.currentlyDragged[0].color,
            status: 'todo',
            date: state.currentlyDragged[0].date,
          });
        }
        if (event.screenX > inprogressElements.getBoundingClientRect().left && event.screenX < inprogressElements.getBoundingClientRect().right && state.motion === false) {
          state.motion = true;

          state.inprogress.unshift({
            name: state.currentlyDragged[0].name,
            description: state.currentlyDragged[0].description,
            color: state.currentlyDragged[0].color,
            status: 'inprogress',
            date: state.currentlyDragged[0].date,
          });
        }
        if (event.screenX > doneElements.getBoundingClientRect().left && event.screenX < doneElements.getBoundingClientRect().right && state.motion === false) {
          state.motion = true;

          state.done.unshift({
            name: state.currentlyDragged[0].name,
            description: state.currentlyDragged[0].description,
            color: state.currentlyDragged[0].color,
            status: 'done',
            date: state.currentlyDragged[0].date,
          });
        }
      }
      document.onmousemove = detectPosition; // add event listener on mouse move
    },
    drop(state) {
      state.motion = false; // end motion when drop
    },
  },
  // ----------------------------------------- ACTIONS -----------------------------------------------------
  actions: {
    ADD_NEW_TASK(context) {
      this.state.INPUT_DATA = new FormData();
      // Render random color for task
      this.state.randomColor = Math.floor(Math.random() * 16777215).toString(16);

      // Append specified data to FormData object
      context.state.INPUT_DATA.append('date', context.state.INPUT_NEW_TASK.date);
      context.state.INPUT_DATA.append('status', context.state.INPUT_NEW_TASK.status);
      context.state.INPUT_DATA.append('name', context.state.INPUT_NEW_TASK.name);
      context.state.INPUT_DATA.append('description', context.state.INPUT_NEW_TASK.description);

      // Fill an empty array 'FORM_DATA_ARRAY' with object from 'INPUT_DATA'
      this.state.FORM_DATA_ARRAY = Array.from(context.state.INPUT_DATA);

      // Close new_task window
      this.state.newTaskOpen = false;

      if (context.state.isEdited === true) { // func for task editing
        //
        // --------- TASK DELETE LOGIC --------------------------------------------------------------------------------------------

        if (context.state.editedArray[1][1] === 'todo') {
          this.state.todo = context.state.todo.filter((chosen) => chosen.name !== context.state.taskOpenIndex[0].name);
        }
        if (context.state.editedArray[1][1] === 'inprogress') {
          this.state.inprogress = context.state.inprogress.filter((chosen) => chosen.name !== context.state.taskOpenIndex[0].name);
        }
        if (context.state.editedArray[1][1] === 'done') {
          this.state.done = context.state.done.filter((chosen) => chosen.name !== context.state.taskOpenIndex[0].name);
        }

        // --------- TASK ADD LOGIC --------------------------------------------------------------------------------------------

        // --------- TODO ---------

        if (this.state.INPUT_NEW_TASK.status === 'todo') {
          // if task name or description changes(!)
          // and new task status changes(!)
          // ADD TASK WITH DIFFERENT DETAILS(!)
          // (then previous version of task is being deleted earlier in function)
          if (context.state.editedArray[2][1] !== context.state.FORM_DATA_ARRAY[2][1] || context.state.editedArray[3][1] !== context.state.FORM_DATA_ARRAY[3][1]) {
            this.state.todo.unshift({
              name: this.state.INPUT_NEW_TASK.name,
              description: this.state.INPUT_NEW_TASK.description,
              color: context.state.editedArray[4][1],
              status: 'todo',
              date: this.state.INPUT_NEW_TASK.date,
            });
          } else {
            // if task name and description stay the same
            // and new task status stays the same
            // DO NOTHING
            this.state.todo.unshift({
              name: this.state.INPUT_NEW_TASK.name,
              description: this.state.INPUT_NEW_TASK.description,
              color: context.state.editedArray[4][1],
              status: 'todo',
              date: this.state.INPUT_NEW_TASK.date,
            });
          }
        }

        // --------- INPROGRESS ---------

        if (this.state.INPUT_NEW_TASK.status === 'inprogress') {
          // if task name or description changes(!)
          // and new task status changes(!)
          // ADD TASK WITH DIFFERENT DETAILS(!)
          // (then previous version of task is being deleted earlier in function)
          if (context.state.editedArray[2][1] !== context.state.FORM_DATA_ARRAY[2][1] || context.state.editedArray[3][1] !== context.state.FORM_DATA_ARRAY[3][1]) {
            this.state.inprogress.unshift({
              name: this.state.INPUT_NEW_TASK.name,
              description: this.state.INPUT_NEW_TASK.description,
              color: context.state.editedArray[4][1],
              status: 'inprogress',
              date: this.state.INPUT_NEW_TASK.date,
            });
          } else {
            // if task name and description stay the same
            // and new task status stays the same
            // DO NOTHING
            this.state.inprogress.unshift({
              name: this.state.INPUT_NEW_TASK.name,
              description: this.state.INPUT_NEW_TASK.description,
              color: context.state.editedArray[4][1],
              status: 'inprogress',
              date: this.state.INPUT_NEW_TASK.date,
            });
          }
        }

        // --------- DONE ---------

        if (this.state.INPUT_NEW_TASK.status === 'done') {
          // if task name or description changes(!)
          // and new task status changes(!)
          // ADD TASK WITH DIFFERENT DETAILS(!)
          // (then previous version of task is being deleted earlier in function)
          if (context.state.editedArray[2][1] !== context.state.FORM_DATA_ARRAY[2][1] || context.state.editedArray[3][1] !== context.state.FORM_DATA_ARRAY[3][1]) {
            this.state.done.unshift({
              name: this.state.INPUT_NEW_TASK.name,
              description: this.state.INPUT_NEW_TASK.description,
              color: context.state.editedArray[4][1],
              status: 'done',
              date: this.state.INPUT_NEW_TASK.date,
            });
          } else {
            // if task name and description stay the same
            // and new task status stays the same
            // DO NOTHING
            this.state.done.unshift({
              name: this.state.INPUT_NEW_TASK.name,
              description: this.state.INPUT_NEW_TASK.description,
              color: context.state.editedArray[4][1],
              status: 'done',
              date: this.state.INPUT_NEW_TASK.date,
            });
          }
        }

        this.state.isEdited = false; // finish task editing mode
      } else { // general task adding (non editing mode)
        if (this.state.INPUT_NEW_TASK.status === 'todo') {
          this.state.todo.unshift({
            name: this.state.INPUT_NEW_TASK.name,
            description: this.state.INPUT_NEW_TASK.description,
            color: `#${this.state.randomColor}`,
            status: 'todo',
            date: this.state.INPUT_NEW_TASK.date,
          });
        }

        if (this.state.INPUT_NEW_TASK.status === 'inprogress') {
          this.state.inprogress.unshift({
            name: this.state.INPUT_NEW_TASK.name,
            description: this.state.INPUT_NEW_TASK.description,
            color: `#${this.state.randomColor}`,
            status: 'inprogress',
            date: this.state.INPUT_NEW_TASK.date,
          });
        }

        if (this.state.INPUT_NEW_TASK.status === 'done') {
          this.state.done.unshift({
            name: this.state.INPUT_NEW_TASK.name,
            description: this.state.INPUT_NEW_TASK.description,
            color: `#${this.state.randomColor}`,
            status: 'done',
            date: this.state.INPUT_NEW_TASK.date,
          });
        }
      }

      // Reset values after submitting new_task form
      this.state.INPUT_NEW_TASK.date = '';
      this.state.INPUT_NEW_TASK.status = '';
      this.state.INPUT_NEW_TASK.name = '';
      this.state.INPUT_NEW_TASK.description = '';
      // this.state.isEdited - resets itself everytime editing mode is activated

      // Close task editing (only when edition options previously opened)
      this.state.taskOptionsOpen = false;
    },
    ADD_NEW_NOTE(context) {
      this.state.INPUT_DATA = new FormData();

      // Append specified data to FormData object
      context.state.INPUT_DATA.append('title', context.state.INPUT_NEW_NOTE.title);
      context.state.INPUT_DATA.append('text', context.state.INPUT_NEW_NOTE.text);

      // Fill an empty array 'FORM_DATA_ARRAY' with object from 'INPUT_DATA'
      this.state.FORM_DATA_ARRAY = Array.from(context.state.INPUT_DATA);

      // Push new note into general notes array
      this.state.notes.unshift({
        title: this.state.FORM_DATA_ARRAY[0][1],
        text: this.state.FORM_DATA_ARRAY[1][1],
      });

      // Close new_task window
      this.state.newNoteOpen = false;

      // Reset values after submitting new_note form
      this.state.INPUT_NEW_NOTE.title = '';
      this.state.INPUT_NEW_NOTE.text = '';
    },
  },
});
