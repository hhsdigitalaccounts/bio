function main() {
  update();
  setInterval(() => {
    console.info("Interval timer fired, refreshing slideshow...");
    update();
  }, REFRESH_INTERVAL);
}

function update() {
  const iframe = document.getElementById("slideshow");
  iframe.src = iframe.src;
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", main);
}
else {
  main();
}
