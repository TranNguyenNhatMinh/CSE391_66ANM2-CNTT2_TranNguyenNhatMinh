const statusEl = document.getElementById("status");
const btnHello = document.getElementById("btnHello");
const btnRed = document.getElementById("btnRed");
const nameInput = document.getElementById("nameInput");
const greeting = document.getElementById("greeting");

btnHello.addEventListener("click", function () {
  statusEl.textContent =
    "Xin chào! Đây là nội dung được thay đổi bằng JavaScript.";
});

btnRed.addEventListener("click", function () {
  document.body.style.backgroundColor = "red";
});

nameInput.addEventListener("input", function () {
  const value = nameInput.value;
  greeting.textContent = "Xin chào, " + value + "!";
});

