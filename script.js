let aArray = [];
let arr;
setLocalStorage();
$("#button").click(function () {
  let name = $("#name").val();
  let number = $("#number").val();
  let email = $("#email").val();

  let u = { name: name, number: number, email: email };
  if (validation()) {
    aArray.push(u);
    setLocalStorage("value");
  }
});

//Localstorage
function setLocalStorage(value) {
  if (!value) {
    arr = JSON.parse(localStorage.getItem("user"));
    if (arr && arr.length) {
      aArray = arr;
      insertRecord();
    } else {
      if (aArray && aArray.length) {
        localStorage.setItem("user", JSON.stringify(aArray));
      }
    }
  } else {
    if (aArray && aArray.length) {
      localStorage.clear();
      localStorage.setItem("user", JSON.stringify(aArray));
      insertRecord();
    }
  }
}

function insertRecord() {
  $("tbody").empty();
  let tr = "";
  for (let i = 0; i < aArray.length; i++) {
    tr = `<tr>
          <td>${aArray[i].name}</td>
          <td>${aArray[i].number}</td>
          <td>${aArray[i].email}</td>
          <td><button id="btn1" value="${i}" onclick ="onDelete(${i})">Delete</button</td>
          <td><button onclick="onEdit(${i})">Edit</button></td>
          </tr>`;
    $("tbody").append(tr);
  }
}

//edit
$("#btn").css("display", "none");
function onEdit(dd) {
  $("#name").val(aArray[dd].name);
  $("#number").val(aArray[dd].number);
  $("#email").val(aArray[dd].email);
  $("#btn").css("display", "inline");
  $("#button").css("display", "none");
  $("#btn").val(dd);
}

///update
function onupdate() {
  dd = $("#btn").val();
  let uname = $("#name").val();
  let unumber = $("#number").val();
  let uemail = $("#email").val();
  aArray.splice(dd, 1, {
    name: uname,
    number: unumber,
    email: uemail,
  });
  $("#btn").css("display", "inline");
  $("#button").css("display", "none");
  setLocalStorage("update");
}

///delete
function onDelete(dd) {
  aArray.splice(dd, 1);

  $("tbody").empty();
  setLocalStorage("akanksha");
  localStorage.setItem("user", JSON.stringify(aArray));
}

//validation
function validation() {
  let name = $("#name").val();
  let number = $("#number").val();
  let email = $("#email").val();

  if (name == "") {
    $("#username").text("*enter username*");
    return false;
  }
  if (!isNaN(name)) {
    $("#username").text("*enter the character*");
    return false;
  }
  if (name.length <= 1 || name.length > 20) {
    $("#username").text("*write 2 to 20 character*");
    return false;
  }
  $("#username").css("display", "none");

  if (number == " ") {
    $("#unumber").text("*enter valid number*");
    return false;
  }
  if (number.length != 10) {
    $("#unumber").text("*enter 10 digit number*");
    return false;
  }

  $("#unumber").css("display", "none");

  if (email == "") {
    $("#gmail").text("* write  corect email id*");
    return false;
  }

  if (email.indexOf("@") <= 0) {
    $("#gmail").text("*check the position of @ *");
    return false;
  }

  if (
    email.charAt(email.length - 4) != "." &&
    email.charAt(email.length - 3) != "."
  ) {
    $("#gmail").text("*check the position of .*");
    return false;
  }

  $("#gmail").css("display", "none");
  return true;
}

//sorting
$("#sort").click(function () {
  arr.sort(function (item1, item2) {
    let name1 = item1.name.toUpperCase();
    let name2 = item2.name.toUpperCase();
    if (name1 < name2) {
      return -1;
    } else if (name1 > name2) {
      return 1;
    }
  });
  setLocalStorage("sort");
});
