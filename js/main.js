// ARRAY of OBJECTS: events
var events = [
  { title: "Intro to HTML & CSS", type: "Workshop", date: "2026-10-20", venue: "Lab 1" },
  { title: "Campus Hackathon", type: "Competition", date: "2026-11-05", venue: "Main Hall" },
  { title: "JavaScript Bootcamp", type: "Workshop", date: "2026-11-12", venue: "Lab 2" },
  { title: "End of Year Mixer", type: "Social", date: "2026-12-01", venue: "Student Centre" }
];
var committee = [
  { name: "Amina Otieno", role: "Chairperson" },
  { name: "Brian Mwangi", role: "Secretary" },
  { name: "Cynthia Wanjiru", role: "Treasurer" }
];
var photos = ["Hackathon", "Workshop", "Team Day", "Awards", "Meetup", "Demo Night"];
var colors = ["#1d4ed8", "#0d9488", "#b45309", "#7c3aed", "#be123c", "#15803d"];

function showGreeting() {                       // onload event
  var h = new Date().getHours(), text;
  if (h < 12) text = "Good morning"; else if (h < 18) text = "Good afternoon"; else text = "Good evening";
  document.getElementById("greeting").textContent = text + "! Welcome to Code Club";
}
function toggleTheme() {                        // onclick event (interactive feature)
  document.body.classList.toggle("light");
}
function renderEvents() {
  var box = document.getElementById("eventList");
  var f = document.getElementById("filter").value;
  box.innerHTML = "";
  for (var i = 0; i < events.length; i++) {     // loop
    if (f === "All" || events[i].type === f) {
      box.innerHTML += '<div class="card"><h3>' + events[i].title + '</h3><p>' + events[i].type +
        '</p><p>' + events[i].date + ' &middot; ' + events[i].venue + '</p></div>';
    }
  }
  if (box.innerHTML === "") box.innerHTML = "<p>No events found.</p>";
}
function buildGallery() {
  var g = document.getElementById("gallery");
  photos.forEach(function (p, i) {
    var d = document.createElement("div");
    d.textContent = p;
    d.style.background = colors[i];
    d.onclick = function () {
      var lb = document.getElementById("lightbox");
      lb.textContent = p; lb.style.display = "flex";
    };
    g.appendChild(d);
  });
}
function validateForm() {
  var name = document.getElementById("name").value.trim();
  var email = document.getElementById("email").value.trim();
  var course = document.getElementById("course").value.trim();
  var err = document.getElementById("error");
  var pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (name.length < 3) { err.textContent = "Name must be at least 3 characters."; return false; }
  if (!pattern.test(email)) { err.textContent = "Enter a valid email."; return false; }
  if (course === "") { err.textContent = "Course is required."; return false; }
  err.textContent = "";
  return true;
}
window.addEventListener("DOMContentLoaded", function () {
  var c = document.getElementById("committee");
  if (c) committee.forEach(function (m) { c.innerHTML += "<tr><td>" + m.name + "</td><td>" + m.role + "</td></tr>"; });
  var v = parseInt(sessionStorage.getItem("visits") || "0") + 1;
  sessionStorage.setItem("visits", v);
  document.getElementById("visits").textContent = v;
});
