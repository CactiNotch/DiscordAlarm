/**
 * @name AlarmPlugin
 * @author James Golob
 * @description Setup an alarm within your Discord chats and calls!
 * @version 0.0.1
 */

module.exports = class AlarmPlugin {
  constructor() {
    // Add FontAwesome if it's not already loaded
    if (!document.querySelector("link[href*='fontawesome.com']")) {
      const fa = document.createElement("link");
      fa.href =
        "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css";
      fa.type = "text/css";
      fa.rel = "stylesheet";
      document.head.appendChild(fa);
    }

    this.buttonHTML = `<div class="alarm-button" 
      aria-label="Set Alarm"
      role="button"
      data-tooltip-text="Set Alarm"
      style="
        background-color: white; 
        color: #b5bac1;
        border: none; 
        margin: 0px 4px; 
        cursor: pointer;
        scale: 1.5;
        transition: color 0.2s ease-in-out;
      ">
      <i class="fa-solid fa-bell"></i>
    </div`;

    BdApi.injectCSS(
      "alarm-button-css",
      `
      .alarm-button:hover {
        color: #dbdee1 !important;
      }
    `
    );
  }

  start() {
    this.addButton();
  }

  stop() {
    const button = document.querySelector(".alarm-button");
    if (button) button.remove();
    BdApi.clearCSS("alarm-button-css");
  }

  addButton() {
    // Wait for the toolbar to be available
    const toolBar = document.querySelector('[class*="toolbar_"]');
    if (!toolBar) return;

    // Create and add the button
    const alarmButton = document.createElement("div");
    alarmButton.innerHTML = this.buttonHTML;

    const button = alarmButton.firstChild;
    toolBar.prepend(button);

    const Tooltip = BdApi.Webpack.getModule((m) => m.Tooltip).Tooltip;
    if (Tooltip) {
      new Tooltip(button, {
        text: () => "Set Alarm",
        position: "bottom",
        spacing: 8,
      });
    }
    // Add click handler
    document.querySelector(".alarm-button").onclick = () => {
      BdApi.alert("Alarm Plugin", "You clicked the alarm button!");
    };
  }

  observe(changes) {
    // Re-add button when Discord updates its DOM
    if (
      document.querySelector('[class*="toolbar_"]') &&
      !document.querySelector(".alarm-button")
    ) {
      this.addButton();
    }
  }
};
