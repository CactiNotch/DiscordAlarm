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

const alarmButton = docuemnt.createElement("button");
alarmButton.textContext = "Click me!";
alarmButton.addEventListener("click", () => { window.alert("This is an alarm button"); });
const toolbar = document.querySelector(".toolbar_fc4f04");
toolbar.prepend(alarmButton);
