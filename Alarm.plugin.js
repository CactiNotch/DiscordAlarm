/**
 * @name Alarm
 * @author James Golob
 * @description Setup an alarm within your Discord chats and calls!
 * @version 0.0.1
 */

const { DOM, UI } = BdApi;

module.exports = class Alarm {
  constructor() {
    this.onAlarmButtonClick = () => {
      BdApi.alert("Alarm Plugin", "You clicked the alarm button!");
    };
  }

  start() {
    const toolBar = document.querySelector('[class*="toolbar_"]');
    if (!toolBar) return;

    // Dynamically load Font Awesome if not already loaded
    if (!document.querySelector("link[href*='fontawesome.com']")) {
      const fa = document.createElement("link");
      fa.href =
        "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css";
      fa.type = "text/css";
      fa.rel = "stylesheet";
      document.head.appendChild(fa);
    }

    this.createAlarmButton(toolBar);
  }

  stop() {
    if (this.alarmButton) {
      this.alarmButton.removeEventListener("click", this.onAlarmButtonClick);
      this.alarmButton.remove();
      this.alarmButton = null;
    }
    DOM.removeStyle("alarm-button-style");
  }

  observer(changes) {
    const toolBar = document.querySelector('[class*="toolbar_"]');
    const alarmButton = document.querySelector(".alarm-button");
    // Re-add button when Discord updates its DOM
    if (toolBar && !alarmButton) {
      this.createAlarmButton(toolBar);
    }
  }

  createAlarmButton(toolBar) {
    if (this.alarmButton) {
      this.alarmButton.remove();
    }

    this.alarmButton = document.createElement("button");
    this.alarmButton.innerHTML = `<i class="fa-solid fa-bell"></i>`;
    this.alarmButton.classList.add("alarm-button");

    DOM.addStyle(
      "alarm-button-style",
      `
        .alarm-button {
          color: #b5bac1;
          background-color: transparent;
          border: none;
          cursor: pointer;
          margin: 0px 8px;
          transition: color 0.2s ease-in-out;
          scale: 1.5;
        }
  
        .alarm-button:hover {
          color: #dbdee1 !important;
        }
      `
    );

    toolBar.prepend(this.alarmButton);

    this.alarmButton.addEventListener("click", this.onAlarmButtonClick);
    this.tooltip = UI.createTooltip(this.alarmButton, "Set Alarm", "bottom");
  }
};
