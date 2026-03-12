const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

function clampNumber(value, min, max) {
  if (!Number.isFinite(value)) return null;
  if (value < min || value > max) return null;
  return value;
}

function parseScore(input) {
  const normalized = String(input).trim().replace(",", ".");
  if (normalized === "") return null;
  const num = Number(normalized);
  if (!Number.isFinite(num)) return null;
  return num;
}

function getRank(score) {
  if (score >= 8.5) return "Giỏi";
  if (score >= 7.0) return "Khá";
  if (score >= 5.0) return "Trung bình";
  return "Yếu";
}

function formatNumber(n) {
  if (!Number.isFinite(n)) return "0";
  const rounded = Math.round(n * 100) / 100;
  return String(rounded).replace(/\.0+$/, "").replace(/(\.\d*[1-9])0+$/, "$1");
}

function formatCurrencyVND(amount) {
  const n = Number(amount);
  if (!Number.isFinite(n)) return "0";
  return n.toLocaleString("vi-VN");
}

function startOfDay(d) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

function daysFromNow(days) {
  const d = startOfDay(new Date());
  d.setDate(d.getDate() + days);
  return d;
}

function toISODate(d) {
  const x = startOfDay(d);
  const mm = String(x.getMonth() + 1).padStart(2, "0");
  const dd = String(x.getDate()).padStart(2, "0");
  return `${x.getFullYear()}-${mm}-${dd}`;
}

function hasValue(str) {
  return String(str).trim().length > 0;
}

function setTab(tab) {
  const tabRegister = $("#tabRegister");
  const tabOrder = $("#tabOrder");
  const registerPane = $("#registerPane");
  const orderPane = $("#orderPane");

  if (tab === "register") {
    tabRegister.classList.add("active");
    tabOrder.classList.remove("active");
    registerPane.style.display = "block";
    orderPane.style.display = "none";
  } else {
    tabOrder.classList.add("active");
    tabRegister.classList.remove("active");
    orderPane.style.display = "block";
    registerPane.style.display = "none";
  }
}

$("#tabRegister").addEventListener("click", () => setTab("register"));
$("#tabOrder").addEventListener("click", () => setTab("order"));

const students = [];
let sortDirection = "none";
let searchKeyword = "";
let rankFilter = "all";

const nameEl = $("#studentName");
const scoreEl = $("#studentScore");
const addBtn = $("#addStudentBtn");
const tbody = $("#studentsTbody");
const emptyEl = $("#studentsEmpty");
const totalEl = $("#totalStudents");
const avgEl = $("#avgScore");
const searchEl = $("#searchInput");
const rankEl = $("#rankFilter");
const scoreHeader = $("#scoreHeader");
const scoreSortIcon = $("#scoreSortIcon");

function updateStats(list) {
  totalEl.textContent = String(list.length);
  if (list.length === 0) {
    avgEl.textContent = "0";
    return;
  }
  const sum = list.reduce((acc, s) => acc + s.score, 0);
  avgEl.textContent = formatNumber(sum / list.length);
}

function renderTable(list) {
  tbody.innerHTML = "";

  if (list.length === 0) {
    emptyEl.style.display = "block";
    updateStats(list);
    return;
  }

  emptyEl.style.display = "none";

  list.forEach((s, idx) => {
    const tr = document.createElement("tr");
    if (s.score < 5) tr.classList.add("row-warn");

    const sttTd = document.createElement("td");
    sttTd.textContent = String(idx + 1);

    const nameTd = document.createElement("td");
    nameTd.textContent = s.name;

    const scoreTd = document.createElement("td");
    scoreTd.textContent = formatNumber(s.score);

    const rankTd = document.createElement("td");
    rankTd.textContent = s.rank;

    const actionTd = document.createElement("td");
    const delBtn = document.createElement("button");
    delBtn.type = "button";
    delBtn.className = "btn";
    delBtn.textContent = "Xóa";
    delBtn.setAttribute("data-index", String(s._index));
    actionTd.appendChild(delBtn);

    tr.appendChild(sttTd);
    tr.appendChild(nameTd);
    tr.appendChild(scoreTd);
    tr.appendChild(rankTd);
    tr.appendChild(actionTd);
    tbody.appendChild(tr);
  });

  updateStats(list);
}

function applyFilters() {
  const keyword = searchKeyword.trim().toLowerCase();
  let list = students.map((s, index) => ({ ...s, _index: index }));

  if (keyword) {
    list = list.filter((s) => s.name.toLowerCase().includes(keyword));
  }

  if (rankFilter !== "all") {
    list = list.filter((s) => s.rank === rankFilter);
  }

  if (sortDirection !== "none") {
    const dir = sortDirection === "asc" ? 1 : -1;
    list = list.slice().sort((a, b) => (a.score - b.score) * dir);
  }

  scoreSortIcon.textContent =
    sortDirection === "asc" ? "▲" : sortDirection === "desc" ? "▼" : "";

  renderTable(list);
}

function addStudent() {
  const name = nameEl.value.trim();
  const scoreVal = parseScore(scoreEl.value);
  const score = clampNumber(scoreVal, 0, 10);

  if (!name) {
    alert("Họ tên không được để trống.");
    nameEl.focus();
    return;
  }

  if (score === null) {
    alert("Điểm không hợp lệ. Vui lòng nhập số từ 0 đến 10.");
    scoreEl.focus();
    return;
  }

  students.push({ name, score, rank: getRank(score) });
  nameEl.value = "";
  scoreEl.value = "";
  nameEl.focus();
  applyFilters();
}

addBtn.addEventListener("click", addStudent);
scoreEl.addEventListener("keyup", (e) => {
  if (e.key === "Enter") addStudent();
});

tbody.addEventListener("click", (e) => {
  const btn = e.target.closest("button[data-index]");
  if (!btn) return;
  const index = Number(btn.getAttribute("data-index"));
  if (!Number.isInteger(index) || index < 0 || index >= students.length) return;
  students.splice(index, 1);
  applyFilters();
});

searchEl.addEventListener("input", () => {
  searchKeyword = searchEl.value;
  applyFilters();
});

rankEl.addEventListener("change", () => {
  rankFilter = rankEl.value;
  applyFilters();
});

scoreHeader.addEventListener("click", () => {
  sortDirection =
    sortDirection === "none"
      ? "asc"
      : sortDirection === "asc"
      ? "desc"
      : "none";
  applyFilters();
});

applyFilters();

function showError(fieldId, message) {
  const input = document.getElementById(fieldId);
  const errorEl = document.getElementById(`${fieldId}-error`);
  if (errorEl) errorEl.textContent = message;
  if (input) {
    input.classList.add("is-invalid");
    input.classList.remove("is-valid");
  }
}

function clearError(fieldId) {
  const input = document.getElementById(fieldId);
  const errorEl = document.getElementById(`${fieldId}-error`);
  if (errorEl) errorEl.textContent = "";
  if (input) {
    input.classList.remove("is-invalid");
  }
}

function setValid(fieldId) {
  const input = document.getElementById(fieldId);
  const errorEl = document.getElementById(`${fieldId}-error`);
  if (errorEl) errorEl.textContent = "";
  if (input) {
    input.classList.remove("is-invalid");
    input.classList.add("is-valid");
  }
}

function showGroupError(errorId, message) {
  const errorEl = document.getElementById(errorId);
  if (errorEl) errorEl.textContent = message;
}

function clearGroupError(errorId) {
  const errorEl = document.getElementById(errorId);
  if (errorEl) errorEl.textContent = "";
}

const fullnameRe = /^[a-zA-ZÀ-ỹ\s]+$/;
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRe = /^0[0-9]{9}$/;
const passwordRe = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

function validateFullname() {
  const value = $("#fullname").value.trim();
  if (!value) {
    showError("fullname", "Họ và tên không được để trống.");
    return false;
  }
  if (value.length < 3) {
    showError("fullname", "Họ và tên phải có ít nhất 3 ký tự.");
    return false;
  }
  if (!fullnameRe.test(value)) {
    showError("fullname", "Họ và tên chỉ được chứa chữ cái và khoảng trắng.");
    return false;
  }
  setValid("fullname");
  return true;
}

function validateEmail() {
  const value = $("#email").value.trim();
  if (!value) {
    showError("email", "Email không được để trống.");
    return false;
  }
  if (!emailRe.test(value)) {
    showError("email", "Email không đúng định dạng.");
    return false;
  }
  setValid("email");
  return true;
}

function validatePhone() {
  const value = $("#phone").value.trim();
  if (!value) {
    showError("phone", "Số điện thoại không được để trống.");
    return false;
  }
  if (!phoneRe.test(value)) {
    showError("phone", "SĐT phải có 10 chữ số và bắt đầu bằng 0.");
    return false;
  }
  setValid("phone");
  return true;
}

function validatePassword() {
  const value = $("#password").value;
  if (!value) {
    showError("password", "Mật khẩu không được để trống.");
    return false;
  }
  if (!passwordRe.test(value)) {
    showError(
      "password",
      "Mật khẩu ≥ 8 ký tự, có chữ hoa, chữ thường và số."
    );
    return false;
  }
  setValid("password");
  return true;
}

function validateConfirmPassword() {
  const pw = $("#password").value;
  const value = $("#confirmPassword").value;
  if (!value) {
    showError("confirmPassword", "Vui lòng xác nhận mật khẩu.");
    return false;
  }
  if (value !== pw) {
    showError("confirmPassword", "Mật khẩu xác nhận không khớp.");
    return false;
  }
  setValid("confirmPassword");
  return true;
}

function validateGender() {
  const checked = document.querySelector('input[name="gender"]:checked');
  if (!checked) {
    showGroupError("gender-error", "Vui lòng chọn giới tính.");
    return false;
  }
  clearGroupError("gender-error");
  return true;
}

function validateTerms() {
  const terms = $("#terms");
  if (!terms.checked) {
    showGroupError("terms-error", "Bạn phải đồng ý với điều khoản.");
    return false;
  }
  clearGroupError("terms-error");
  return true;
}

function wireFieldValidation(fieldId, validateFn) {
  const el = document.getElementById(fieldId);
  if (!el) return;
  el.addEventListener("blur", validateFn);
  el.addEventListener("input", () => {
    clearError(fieldId);
    el.classList.remove("is-valid");
  });
}

wireFieldValidation("fullname", validateFullname);
wireFieldValidation("email", validateEmail);
wireFieldValidation("phone", validatePhone);
wireFieldValidation("password", validatePassword);
wireFieldValidation("confirmPassword", validateConfirmPassword);

$$('input[name="gender"]').forEach((el) => {
  el.addEventListener("change", () => clearGroupError("gender-error"));
});
$("#terms").addEventListener("change", () => clearGroupError("terms-error"));

$("#registerForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const ok =
    validateFullname() &
    validateEmail() &
    validatePhone() &
    validatePassword() &
    validateConfirmPassword() &
    validateGender() &
    validateTerms();

  if (!ok) return;

  const form = $("#registerForm");
  const success = $("#registerSuccess");
  $("#registeredName").textContent = $("#fullname").value.trim();
  form.style.display = "none";
  success.style.display = "block";
});

$("#registerAgain").addEventListener("click", () => {
  $("#registerForm").reset();
  ["fullname", "email", "phone", "password", "confirmPassword"].forEach((id) => {
    clearError(id);
    const el = document.getElementById(id);
    if (el) el.classList.remove("is-valid", "is-invalid");
  });
  clearGroupError("gender-error");
  clearGroupError("terms-error");
  $("#registerSuccess").style.display = "none";
  $("#registerForm").style.display = "block";
  $("#fullname").focus();
});

$("#registerForm").addEventListener("reset", () => {
  setTimeout(() => {
    ["fullname", "email", "phone", "password", "confirmPassword"].forEach(
      (id) => {
        clearError(id);
        const el = document.getElementById(id);
        if (el) el.classList.remove("is-valid", "is-invalid");
      }
    );
    clearGroupError("gender-error");
    clearGroupError("terms-error");
  }, 0);
});

const prices = { Áo: 150000, Quần: 200000, Giày: 450000, Mũ: 90000 };
let lastValidOrder = null;

const productEl = $("#product");
const qtyEl = $("#quantity");
const dateEl = $("#deliveryDate");
const addressEl = $("#address");
const noteEl = $("#note");
const noteCountEl = $("#noteCount");
const totalPriceEl = $("#totalPrice");

dateEl.setAttribute("min", toISODate(daysFromNow(0)));
dateEl.setAttribute("max", toISODate(daysFromNow(30)));

function orderShowError(fieldId, message) {
  const input = document.getElementById(fieldId);
  const errorEl = document.getElementById(`${fieldId}-error`);
  if (errorEl) errorEl.textContent = message;
  if (input) {
    input.classList.add("is-invalid");
    input.classList.remove("is-valid");
  }
}

function orderClearError(fieldId) {
  const input = document.getElementById(fieldId);
  const errorEl = document.getElementById(`${fieldId}-error`);
  if (errorEl) errorEl.textContent = "";
  if (input) input.classList.remove("is-invalid");
}

function orderSetValid(fieldId) {
  const input = document.getElementById(fieldId);
  const errorEl = document.getElementById(`${fieldId}-error`);
  if (errorEl) errorEl.textContent = "";
  if (input) {
    input.classList.remove("is-invalid");
    input.classList.add("is-valid");
  }
}

function validateProduct() {
  const value = productEl.value;
  if (!value) {
    orderShowError("product", "Vui lòng chọn sản phẩm.");
    return false;
  }
  orderSetValid("product");
  return true;
}

function parseIntStrict(value) {
  const s = String(value).trim();
  if (!/^\d+$/.test(s)) return null;
  const n = Number(s);
  if (!Number.isInteger(n)) return null;
  return n;
}

function validateQuantity() {
  const n = parseIntStrict(qtyEl.value);
  if (n === null) {
    orderShowError("quantity", "Số lượng phải là số nguyên.");
    return false;
  }
  if (n < 1 || n > 99) {
    orderShowError("quantity", "Số lượng từ 1 đến 99.");
    return false;
  }
  orderSetValid("quantity");
  return true;
}

function validateDeliveryDate() {
  const value = dateEl.value;
  if (!value) {
    orderShowError("deliveryDate", "Vui lòng chọn ngày giao hàng.");
    return false;
  }
  const d = startOfDay(new Date(value));
  const today = startOfDay(new Date());
  const max = daysFromNow(30);
  if (d < today) {
    orderShowError("deliveryDate", "Ngày giao không được ở quá khứ.");
    return false;
  }
  if (d > max) {
    orderShowError("deliveryDate", "Ngày giao không quá 30 ngày từ hôm nay.");
    return false;
  }
  orderSetValid("deliveryDate");
  return true;
}

function validateAddress() {
  const value = addressEl.value.trim();
  if (!value) {
    orderShowError("address", "Địa chỉ giao không được để trống.");
    return false;
  }
  if (value.length < 10) {
    orderShowError("address", "Địa chỉ giao phải có ít nhất 10 ký tự.");
    return false;
  }
  orderSetValid("address");
  return true;
}

function validateNote() {
  const value = noteEl.value;
  const len = value.length;
  noteCountEl.textContent = `${len}/200`;
  if (len > 200) {
    noteCountEl.style.color = "#dc2626";
    orderShowError("note", "Ghi chú không được quá 200 ký tự.");
    return false;
  }
  noteCountEl.style.color = "";
  orderSetValid("note");
  return true;
}

function validatePayment() {
  const checked = document.querySelector('input[name="payment"]:checked');
  if (!checked) {
    showGroupError("payment-error", "Vui lòng chọn phương thức thanh toán.");
    return false;
  }
  clearGroupError("payment-error");
  return true;
}

function calcTotal() {
  const product = productEl.value;
  const qty = parseIntStrict(qtyEl.value) ?? 0;
  const price = prices[product] ?? 0;
  const total = qty * price;
  totalPriceEl.textContent = formatCurrencyVND(total);
  return total;
}

function wireOrderField(fieldId, validateFn, eventName = "blur") {
  const el = document.getElementById(fieldId);
  if (!el) return;
  el.addEventListener(eventName, validateFn);
  el.addEventListener("input", () => {
    orderClearError(fieldId);
    el.classList.remove("is-valid");
  });
}

wireOrderField("product", validateProduct, "change");
wireOrderField("quantity", validateQuantity);
wireOrderField("deliveryDate", validateDeliveryDate, "change");
wireOrderField("address", validateAddress);
wireOrderField("note", validateNote);

$$('input[name="payment"]').forEach((el) => {
  el.addEventListener("change", () => clearGroupError("payment-error"));
});

productEl.addEventListener("change", () => calcTotal());
qtyEl.addEventListener("input", () => calcTotal());
noteEl.addEventListener("input", () => {
  validateNote();
  orderClearError("note");
});

calcTotal();
validateNote();

function resetOrderUI() {
  ["product", "quantity", "deliveryDate", "address", "note"].forEach((id) => {
    orderClearError(id);
    const el = document.getElementById(id);
    if (el) el.classList.remove("is-valid", "is-invalid");
  });
  clearGroupError("payment-error");
  $("#orderConfirm").style.display = "none";
  $("#orderSuccess").style.display = "none";
  $("#orderForm").style.display = "block";
  lastValidOrder = null;
  calcTotal();
  validateNote();
}

$("#orderForm").addEventListener("reset", () => {
  setTimeout(() => resetOrderUI(), 0);
});

$("#orderForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const ok =
    validateProduct() &
    validateQuantity() &
    validateDeliveryDate() &
    validateAddress() &
    validateNote() &
    validatePayment();

  if (!ok) return;

  const product = productEl.value;
  const qty = parseIntStrict(qtyEl.value);
  const date = dateEl.value;
  const address = addressEl.value.trim();
  const note = noteEl.value.trim();
  const payment = document.querySelector('input[name="payment"]:checked')?.value;
  const total = calcTotal();

  lastValidOrder = { product, qty, date, address, note, payment, total };

  const lines = [
    `<div><strong>Sản phẩm:</strong> ${product}</div>`,
    `<div><strong>Số lượng:</strong> ${qty}</div>`,
    `<div><strong>Tổng tiền:</strong> ${formatCurrencyVND(total)} ₫</div>`,
    `<div><strong>Ngày giao:</strong> ${date}</div>`,
    `<div><strong>Thanh toán:</strong> ${payment}</div>`,
    `<div><strong>Địa chỉ:</strong> ${address}</div>`,
  ];
  if (note) lines.push(`<div><strong>Ghi chú:</strong> ${note}</div>`);

  $("#orderSummary").innerHTML = lines.join("");
  $("#orderConfirm").style.display = "block";
});

$("#cancelOrderBtn").addEventListener("click", () => {
  $("#orderConfirm").style.display = "none";
});

$("#confirmOrderBtn").addEventListener("click", () => {
  if (!lastValidOrder) return;
  $("#orderForm").style.display = "none";
  $("#orderConfirm").style.display = "none";
  $("#orderSuccess").style.display = "block";
});

$("#orderAgain").addEventListener("click", () => {
  $("#orderForm").reset();
  resetOrderUI();
  setTab("order");
  productEl.focus();
});

