document.addEventListener("mousemove", (e) => {
    console.log(e);
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    const anchor = document.getElementById("anchor");
    const rekt = anchor.getBoundingClientRect();
    const anchorX = rekt.left + rekt.width / 2;
    const anchorY = rekt.top + rekt.height / 2;
    const angleDeg = angle(mouseX, mouseY, anchorX, anchorY);
    console.log(angleDeg);
    const eyes = document.querySelectorAll(".eye");
    eyes.forEach((eye) => {
        eye.style.transform = `rotate(${90 + angleDeg}deg)`; //eye rotation
    });
});
function angle(cx, cy, ex, ey) {
    const dy = ey - cy;
    const dx = ex - cx;
    const rad = Math.atan2(dy, dx);
    const deg = (rad * 180) / Math.PI;
    return deg;
}
function updateDateTime() {
    const now = new Date();
    const date = now.toLocaleDateString("en-US");
    const time = now.toLocaleTimeString("en-US", { hour12: false });
    document.getElementById("date-time").innerHTML = `
        <span>${date}</span>
        <span>${time}</span>
    `;
}
setInterval(updateDateTime, 1000);
updateDateTime();
document.getElementById("anchor").addEventListener("click", function () {
    const saneImage = this;
    const handImage = document.getElementById("hand");
    const eyes = document.querySelectorAll(".eye");
    const links = document.getElementById("links");
    saneImage.style.animation = "moveDown 0.5s forwards";
    eyes.forEach((eye) => {
        eye.style.animation = "moveDown 0.5s forwards";
    });
    setTimeout(() => {
        handImage.style.display = "block";
        handImage.style.animation = "handSlideUp 0.5s forwards";
        links.style.display = "flex";
    }, 500);
});
document.getElementById("hand").addEventListener("click", function () {
    const saneImage = document.getElementById("anchor");
    const eyes = document.querySelectorAll(".eye");
    const links = document.getElementById("links");
    saneImage.style.animation = "";
    saneImage.style.transform = "translateY(0)";
    eyes.forEach((eye) => {
        eye.style.animation = "";
        eye.style.transform = "translateY(0)";
    });
    this.style.display = "none";
    links.style.display = "none";
});
