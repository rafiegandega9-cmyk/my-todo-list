(() => {
  const STORAGE_KEY = "fiira-todo-tasks-v1";
  const form = document.querySelector("#task-form");
  const input = document.querySelector("#task-input");
  const list = document.querySelector("#task-list");
  const emptyState = document.querySelector("#empty-state");
  const totalCount = document.querySelector("#total-count");
  const completedCount = document.querySelector("#completed-count");
  const remainingCount = document.querySelector("#remaining-count");
  const clearCompletedButton = document.querySelector("#clear-completed");
  const formMessage = document.querySelector("#form-message");

  let tasks = loadTasks();

  function loadTasks() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      const parsed = saved ? JSON.parse(saved) : [];
      return Array.isArray(parsed) ? parsed.filter(task =>
        task && typeof task.id === "string" &&
        typeof task.text === "string" &&
        typeof task.completed === "boolean"
      ) : [];
    } catch (error) {
      console.warn("Impossible de charger les tâches enregistrées.", error);
      return [];
    }
  }

  function saveTasks() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {
      formMessage.textContent = "Enregistrement indisponible dans ce navigateur.";
      console.error("Impossible d'enregistrer les tâches.", error);
    }
  }

  function updateSummary() {
    const completed = tasks.filter(task => task.completed).length;
    totalCount.textContent = String(tasks.length);
    completedCount.textContent = String(completed);
    remainingCount.textContent = String(tasks.length - completed);
    emptyState.hidden = tasks.length > 0;
    clearCompletedButton.disabled = completed === 0;
    clearCompletedButton.style.opacity = completed === 0 ? ".45" : "1";
  }

  function renderTasks() {
    list.replaceChildren();

    tasks.forEach(task => {
      const item = document.createElement("li");
      item.className = `task-item${task.completed ? " completed" : ""}`;

      const checkbox = document.createElement("input");
      checkbox.className = "task-check";
      checkbox.type = "checkbox";
      checkbox.checked = task.completed;
      checkbox.setAttribute("aria-label", `Marquer « ${task.text} » comme terminée`);
      checkbox.addEventListener("change", () => {
        tasks = tasks.map(current => current.id === task.id
          ? { ...current, completed: checkbox.checked }
          : current);
        saveTasks();
        renderTasks();
      });

      const text = document.createElement("span");
      text.className = "task-text";
      text.textContent = task.text;

      const deleteButton = document.createElement("button");
      deleteButton.className = "delete-button";
      deleteButton.type = "button";
      deleteButton.textContent = "Supprimer";
      deleteButton.setAttribute("aria-label", `Supprimer la tâche : ${task.text}`);
      deleteButton.addEventListener("click", () => {
        tasks = tasks.filter(current => current.id !== task.id);
        saveTasks();
        renderTasks();
        formMessage.textContent = "Tâche supprimée.";
      });

      item.append(checkbox, text, deleteButton);
      list.append(item);
    });

    updateSummary();
  }

  form.addEventListener("submit", event => {
    event.preventDefault();
    const text = input.value.trim();
    if (!text) {
      formMessage.textContent = "Écris une tâche avant de l'ajouter.";
      input.focus();
      return;
    }

    tasks.unshift({
      id: (window.crypto && crypto.randomUUID) ? crypto.randomUUID() :
        `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      text,
      completed: false
    });

    saveTasks();
    renderTasks();
    input.value = "";
    input.focus();
    formMessage.textContent = "Tâche ajoutée avec succès.";
  });

  clearCompletedButton.addEventListener("click", () => {
    const before = tasks.length;
    tasks = tasks.filter(task => !task.completed);
    if (tasks.length !== before) {
      saveTasks();
      renderTasks();
      formMessage.textContent = "Les tâches terminées ont été effacées.";
    }
  });

  document.querySelector("#current-year").textContent = String(new Date().getFullYear());
  renderTasks();
})();
