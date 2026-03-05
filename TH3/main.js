console.log("Hello from JavaScript!");

let age = 20;
const studentName = "An";
let isStudent = true;

console.log("Kiểu của age:", typeof age);
console.log("Kiểu của studentName:", typeof studentName);
console.log("Kiểu của isStudent:", typeof isStudent);

let name = "An";
let yearOfBirth = 2005;
let currentYear = 2026;
let realAge = currentYear - yearOfBirth;

console.log(
  "Xin chào, mình là " + name + ", năm nay mình " + realAge + " tuổi."
);

let score = 7.5;

if (score >= 8) {
  console.log("Giỏi");
} else if (score >= 6.5) {
  console.log("Khá");
} else if (score >= 5) {
  console.log("Trung bình");
} else {
  console.log("Yếu");
}

function tinhDiemTrungBinh(m1, m2, m3) {
  let avg = (m1 + m2 + m3) / 3;
  return avg;
}

function xepLoai(avg) {
  if (avg >= 8) {
    return "Giỏi";
  } else if (avg >= 6.5) {
    return "Khá";
  } else if (avg >= 5) {
    return "Trung bình";
  } else {
    return "Yếu";
  }
}

function kiemTraTuoi(ageToCheck) {
  if (ageToCheck >= 18) {
    console.log("Đủ 18 tuổi");
  } else {
    console.log("Chưa đủ 18 tuổi");
  }
}
