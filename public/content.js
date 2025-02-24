// WeakMaps to store per-element timeout IDs and abort controllers.
const timeouts = new WeakMap();
const abortControllers = new WeakMap();

let activeInput = null;

// --- Global Event Listeners ---

// When an input/textarea gains focus, mark it as active and set up an abort controller.
document.addEventListener("focusin", (event) => {
  const target = event.target;
  if (!(target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement)) return;

  activeInput = target;
  // Initialize an abort controller for this element if needed.
  if (!abortControllers.has(target)) {
    abortControllers.set(target, new AbortController());
  }
});

// Listen for input events on inputs/textareas.
document.addEventListener("input", (event) => {
  const target = event.target;
  if (!(target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement)) return;

  // Clear any pending debounce timeout.
  if (timeouts.has(target)) {
    clearTimeout(timeouts.get(target));
  }
  
  // Abort any in-flight API call for this element.
  if (abortControllers.has(target)) {
    abortControllers.get(target).abort();
  }
  // Create a new abort controller for the new request.
  const controller = new AbortController();
  abortControllers.set(target, controller);

  // Set a new debounce timeout.
  const timeoutId = setTimeout(async () => {
    if (target.value.trim().length === 0) return;
    try {
      console.log("🔵 Fetching autocomplete for:", target.value);
      const suggestion = await getAutoComplete(target.value, controller.signal);
      if (suggestion && suggestion.trim().length > 0) {
        console.log("✅ Final Suggestion:", suggestion);
        const initialLen = target.value.length;
        // Append the suggestion.
        target.value = target.value + suggestion.trim();
        // Highlight the suggested portion.
        if (typeof target.setSelectionRange === "function") {
          target.setSelectionRange(initialLen, target.value.length);
        }
      }
    } catch (err) {
      if (err.name === "AbortError") {
        console.log("⛔ API call aborted.");
      } else {
        console.error("❌ Error fetching autocomplete:", err);
      }
    }
  }, 2000); // Adjust debounce time as needed.
  
  timeouts.set(target, timeoutId);
});

// When an input/textarea loses focus, clear its timeout and abort any pending API call.
document.addEventListener("blur", (event) => {
  const target = event.target;
  if (!(target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement)) return;

  if (timeouts.has(target)) {
    clearTimeout(timeouts.get(target));
    timeouts.delete(target);
  }
  if (abortControllers.has(target)) {
    abortControllers.get(target).abort();
    abortControllers.delete(target);
  }
  if (activeInput === target) {
    activeInput = null;
  }
});

// When the user clicks anywhere outside an input/textarea,
// abort the active input's API call and clear its timeout.
document.addEventListener("mousedown", (event) => {
  if (!event.target.closest("input, textarea")) {
    if (activeInput) {
      if (abortControllers.has(activeInput)) {
        abortControllers.get(activeInput).abort();
        abortControllers.delete(activeInput);
      }
      if (timeouts.has(activeInput)) {
        clearTimeout(timeouts.get(activeInput));
        timeouts.delete(activeInput);
      }
      console.log("⛔ API call aborted: Clicked outside input/textarea.");
      activeInput = null;
    }
  }
});
