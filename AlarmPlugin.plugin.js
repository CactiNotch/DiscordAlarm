/**
 * @name AlarmPlugin
 * @author James Golob
 * @description Setup an alarm within your Discord chats and calls!
 * @version 0.0.1
 */

module.exports = (meta) => ({
  start() {},
  stop() {},
});

// Add the alarm button
const alarmButton = docuemnt.createElement("button");
alarmButton.textContext = "Click me!";
alarmButton.addEventListener("click", () => {
  window.alert("This is an alarm button");
});
const toolbar = document.querySelector(".toolbar_fc4f04");
toolbar.prepend(alarmButton);

// Mutation observer to avoid element loss
const alarmCallback = (mutations) => {
  // Checks that a node has been removed
  if (mutations.removedNodes.length === 0) return;

  // Removed nodes are captured in array
  const removedNodes = Array.from(mutations.removedNodes);

  // Checks that removed node is the alarmButton
  if (!removedNodes.includes(alarmButton)) return;

  // Add button back to toolbar
  toolbar.prepend(alarmButton);
};

// Observer instance linked to callback function
const alarmObserver = new MutationObserver(alarmCallback);

// Observer settings (which mutations to observe)
const observerOptions = {
  childList: true,
  subtree: false,
};

// Start observing target node for configured mutations
alarmObserver.observe(toolbar, observerOptions);
