const STORAGE_KEY = "todo-list-items";
const FILTER_STORAGE_KEY = "todo-list-filter";

const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const emptyState = document.querySelector("#empty-state");
const remainingCount = document.querySelector("#remaining-count");
const clearCompletedButton = document.querySelector("#clear-completed");
const themeToggle = document.querySelector("#theme-toggle");
const filterButtons = document.querySelectorAll(".filter-button");

let todos = loadTodos();
let currentFilter = loadFilter();

const themeStorageKey = "todo-list-theme";
const themeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

// 從瀏覽器儲存空間讀取清單，資料損壞時回到空清單。
function loadTodos() {
  try {
    const savedTodos = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(savedTodos) ? savedTodos : [];
  } catch {
    return [];
  }
}

// 將目前清單保存，讓重新整理後仍能保留資料。
function saveTodos() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

function loadFilter() {
  const savedFilter = localStorage.getItem(FILTER_STORAGE_KEY);
  return ["all", "active", "completed"].includes(savedFilter) ? savedFilter : "all";
}

function saveFilter() {
  localStorage.setItem(FILTER_STORAGE_KEY, currentFilter);
}

function getCurrentTheme() {
  const savedTheme = localStorage.getItem(themeStorageKey);
  return savedTheme || (themeMediaQuery.matches ? "dark" : "light");
}

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  const isDark = theme === "dark";
  themeToggle.textContent = isDark ? "☀️ 淺色模式" : "🌙 深色模式";
  themeToggle.setAttribute("aria-label", isDark ? "切換至淺色模式" : "切換至深色模式");
}

function getFilteredTodos() {
  if (currentFilter === "active") {
    return todos.filter((todo) => !todo.completed);
  }
  if (currentFilter === "completed") {
    return todos.filter((todo) => todo.completed);
  }
  return todos;
}

function getEmptyMessage() {
  if (currentFilter === "active") {
    return "目前沒有未完成的待辦事項，項目可能已被目前的篩選條件排除。";
  }
  if (currentFilter === "completed") {
    return "目前沒有已完成的待辦事項，項目可能已被目前的篩選條件排除。";
  }
  return "還沒有任何待辦事項,新增一個吧!";
}

function renderTodos() {
  todoList.replaceChildren();

  getFilteredTodos().forEach((todo) => {
    const item = document.createElement("li");
    item.className = "todo-item";
    if (todo.completed) {
      item.classList.add("is-completed");
    }

    const checkbox = document.createElement("input");
    checkbox.className = "todo-check";
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;
    checkbox.setAttribute("aria-label", `完成「${todo.text}」`);
    checkbox.addEventListener("change", () => toggleTodo(todo.id));

    const text = document.createElement("span");
    text.className = "todo-text";
    text.textContent = todo.text;

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-button";
    deleteButton.type = "button";
    deleteButton.textContent = "×";
    deleteButton.setAttribute("aria-label", `刪除「${todo.text}」`);
    deleteButton.addEventListener("click", () => deleteTodo(todo.id));

    item.append(checkbox, text, deleteButton);
    todoList.append(item);
  });

  const remainingTodos = todos.filter((todo) => !todo.completed).length;
  remainingCount.textContent = `未完成:${remainingTodos} 項`;
  emptyState.textContent = getEmptyMessage();
  emptyState.hidden = getFilteredTodos().length > 0;
  clearCompletedButton.hidden = !todos.some((todo) => todo.completed);
}

function updateFilterButtons() {
  filterButtons.forEach((filterButton) => {
    const isActive = filterButton.dataset.filter === currentFilter;
    filterButton.classList.toggle("is-active", isActive);
    filterButton.setAttribute("aria-pressed", String(isActive));
  });
}

function addTodo(text) {
  todos.push({
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    text,
    completed: false,
  });
  saveTodos();
  renderTodos();
}

function toggleTodo(todoId) {
  todos = todos.map((todo) => (
    todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
  ));
  saveTodos();
  renderTodos();
}

function deleteTodo(todoId) {
  todos = todos.filter((todo) => todo.id !== todoId);
  saveTodos();
  renderTodos();
}

todoForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = todoInput.value.trim();
  if (!text) {
    todoInput.focus();
    return;
  }

  addTodo(text);
  todoInput.value = "";
  todoInput.focus();
});

clearCompletedButton.addEventListener("click", () => {
  if (!todos.some((todo) => todo.completed)) {
    return;
  }

  if (!confirm("確定要清除所有已完成的待辦事項嗎？")) {
    return;
  }

  todos = todos.filter((todo) => !todo.completed);
  saveTodos();
  renderTodos();
});

themeToggle.addEventListener("click", () => {
  const nextTheme = getCurrentTheme() === "dark" ? "light" : "dark";
  localStorage.setItem(themeStorageKey, nextTheme);
  applyTheme(nextTheme);
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    currentFilter = button.dataset.filter;
    saveFilter();
    updateFilterButtons();
    renderTodos();
  });
});

// 沒有手動選擇時，作業系統主題改變也會即時同步。
themeMediaQuery.addEventListener("change", () => {
  if (!localStorage.getItem(themeStorageKey)) {
    applyTheme(getCurrentTheme());
  }
});

applyTheme(getCurrentTheme());
updateFilterButtons();
renderTodos();