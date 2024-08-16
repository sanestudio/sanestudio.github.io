// Function to calculate the angle between two points
function calculateAngle(cx, cy, ex, ey) {
    const dy = ey - cy;
    const dx = ex - cx;
    const rad = Math.atan2(dy, dx);
    return (rad * 180) / Math.PI; // Convert radians to degrees
}

// Function to update the date and time display
function updateDateTime() {
    const now = new Date();
    const date = now.toLocaleDateString("en-US");
    const time = now.toLocaleTimeString("en-US", { hour12: false });
    document.getElementById("date-time").innerHTML = `
        <span>${date}</span>
        <span>${time}</span>
    `;
}

// Event listener for mouse movement
document.addEventListener("mousemove", (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    const anchor = document.getElementById("anchor");
    const { left, top, width, height } = anchor.getBoundingClientRect();
    const anchorX = left + width / 2;
    const anchorY = top + height / 2;
    const angleDeg = calculateAngle(mouseX, mouseY, anchorX, anchorY);

    // Rotate eyes based on mouse position
    document.querySelectorAll(".eye").forEach((eye) => {
        eye.style.transform = `rotate(${90 + angleDeg}deg)`;
    });
});

// Update date and time every second
setInterval(updateDateTime, 1000);
updateDateTime();

// Event listener for anchor click
document.getElementById("anchor").addEventListener("click", () => {
    const anchor = document.getElementById("anchor");
    const handImage = document.getElementById("hand");
    const links = document.getElementById("links");

    // Animate anchor and eyes
    anchor.style.animation = "moveDown 0.5s forwards";
    document.querySelectorAll(".eye").forEach((eye) => {
        eye.style.animation = "moveDown 0.5s forwards";
    });

    // Show hand image and links after animation
    setTimeout(() => {
        handImage.style.display = "block";
        handImage.style.animation = "handSlideUp 0.5s forwards";
        links.style.display = "flex";
    }, 500);
});

// Event listener for hand click
document.getElementById("hand").addEventListener("click", () => {
    const anchor = document.getElementById("anchor");
    const links = document.getElementById("links");
    const eyes = document.querySelectorAll(".eye");

    // Reset animations and hide elements
    anchor.style.animation = "";
    anchor.style.transform = "translateY(0)";
    eyes.forEach((eye) => {
        eye.style.animation = "";
        eye.style.transform = "translateY(0)";
    });

    document.getElementById("hand").style.display = "none";
    links.style.display = "none";
});

// Modal close functionality
const modal = document.getElementById('myModal');
const closeButton = document.getElementsByClassName("close")[0];
closeButton.onclick = () => {
    modal.style.display = "none";
};
