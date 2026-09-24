const STORAGE_KEY = 'habit-tracker-habits';

const habitForm = document.querySelector('#habit-form');
const habitInput = document.querySelector('#habit-input');
const habitList = document.querySelector('#habit-list');

let habits = loadHabits();
const todayKey = getDateKey(new Date());

// Converts a date into a stable localStorage key.
function getDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// Reads saved habits and discards malformed storage entries.
function loadHabits() {
  try {
    const savedHabits = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!Array.isArray(savedHabits)) {
      return [];
    }

    return savedHabits.filter(isValidHabit);
  } catch (error) {
    return [];
  }
}

// Checks that a saved value has the shape the app expects.
function isValidHabit(habit) {
  return Boolean(
    habit &&
    typeof habit.id === 'string' &&
    typeof habit.name === 'string' &&
    Array.isArray(habit.completedDates)
  );
}

// Saves the current habit list to the browser's local storage.
function saveHabits() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(habits));
}

// Creates the DOM card for a single habit.
function createHabitRow(habit) {
  const isComplete = habit.completedDates.includes(todayKey);
  const row = document.createElement('li');
  row.className = `habit-row${isComplete ? ' is-complete' : ''}`;

  const checkbox = document.createElement('input');
  checkbox.className = 'habit-check';
  checkbox.type = 'checkbox';
  checkbox.checked = isComplete;
  checkbox.setAttribute('aria-label', `Mark ${habit.name} as complete`);
  checkbox.addEventListener('change', function handleCheckChange() {
    toggleHabit(habit.id);
  });

  const name = document.createElement('span');
  name.className = 'habit-name';
  name.textContent = habit.name;

  const deleteButton = document.createElement('button');
  deleteButton.className = 'delete-habit';
  deleteButton.type = 'button';
  deleteButton.setAttribute('aria-label', `Delete ${habit.name}`);
  deleteButton.textContent = '×';
  deleteButton.addEventListener('click', function handleDeleteClick() {
    deleteHabit(habit.id);
  });

  row.append(checkbox, name, deleteButton);
  return row;
}

// Renders every saved habit in the list.
function renderHabits() {
  habitList.replaceChildren(...habits.map(createHabitRow));
}

// Adds a new habit from the form input.
function addHabit(event) {
  event.preventDefault();
  const name = habitInput.value.trim();

  if (!name) {
    return;
  }

  habits.push({
    id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    name,
    completedDates: []
  });
  saveHabits();
  renderHabits();
  habitForm.reset();
  habitInput.focus();
}

// Toggles today's completion status for one habit.
function toggleHabit(habitId) {
  // Locates the habit selected by the user.
  const habit = habits.find(function findHabit(item) {
    return item.id === habitId;
  });

  if (!habit) {
    return;
  }

  const completionIndex = habit.completedDates.indexOf(todayKey);
  if (completionIndex === -1) {
    habit.completedDates.push(todayKey);
  } else {
    habit.completedDates.splice(completionIndex, 1);
  }

  saveHabits();
  renderHabits();
}

// Removes a habit from the tracker.
function deleteHabit(habitId) {
  // Keeps every habit except the one selected for deletion.
  habits = habits.filter(function keepOtherHabits(habit) {
    return habit.id !== habitId;
  });
  saveHabits();
  renderHabits();
}

habitForm.addEventListener('submit', addHabit);
renderHabits();
