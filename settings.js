console.log("Settings page loaded.");

// Example: toggle theme (can be expanded)
document.getElementById("theme").addEventListener("change", function () {
  if (this.checked) {
    document.body.style.backgroundColor = "#1f2937";
    document.body.style.color = "white";
  } else {
    document.body.style.backgroundColor = "#f9fafb";
    document.body.style.color = "#1f2937";
  }
});
