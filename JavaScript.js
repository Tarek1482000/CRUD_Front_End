let DarkMode = document.getElementById("DarkMode");
let LightMode = document.getElementById("LightMode");
let head = document.querySelector(".head");

let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");

let search = document.getElementById("search");
let SearchTitle = document.getElementById("SearchTitle");
let SearchCategory = document.getElementById("SearchCategory");

let Mode = "Create",
  temp = "";
/* Get Total */
function GetTotal() {
  if (price.value != "" && price.value >= "0") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.background = "green";
  } else {
    total.innerHTML = "";
    total.style.background = "red";
  }
}

let DataPro = [];
if (localStorage.Products != null) {
  DataPro = JSON.parse(localStorage.Products);
} else {
  DataPro = [];
}

/* Create Product */
submit.onclick = function () {
  let NewProd = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    category: category.value.toLowerCase(),
    count: count.value,
  };

  if (NewProd.title != "" && NewProd.price != "" && NewProd.category != "") {
    if (Mode === "Create") {
      /* Count*/
      if (NewProd.count > 1) {
        for (let i = 0; i < NewProd.count; i++) {
          DataPro.push(NewProd);
        }
      } else {
        DataPro.push(NewProd);
      }
    } else {
      DataPro[temp] = NewProd;
      count.style.display = "block";
      Mode = "Create";
      submit.innerHTML = "Create";
    }
    ClearData();
    /* Save LocalStorage */
    localStorage.setItem("Products", JSON.stringify(DataPro));
    ShowData();
  }
};

/* Clear Inputs places*/
function ClearData() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
}

/* Read */
function ShowData() {
  GetTotal();
  let table = "";
  for (let i = 0; i < DataPro.length; i++) {
    table += `
    <tr>
      <td>${i + 1}</td>
      <td>${DataPro[i].title}</td>
      <td>${DataPro[i].price}</td>
      <td>${DataPro[i].taxes}</td>
      <td>${DataPro[i].ads}</td>
      <td>${DataPro[i].discount}</td>
      <td>${DataPro[i].total}</td>
      <td>${DataPro[i].category}</td>
      <td><button onclick="UpdateData(${i})" id="update">update</button></td>
      <td><button onclick="DeleteData(${i})" id="delete">delete</button></td>
    </tr>
    `;
  }
  document.getElementById("tbody").innerHTML = table;

  let DeleteAllBtn = document.getElementById("deleteAll");
  if (DataPro.length > 0) {
    DeleteAllBtn.innerHTML = `
    <button onclick="DeleteAll()">Delete All(${DataPro.length})</button>
    `;
  } else {
    DeleteAllBtn.innerHTML = "";
  }
}
ShowData();

/* Delete */
function DeleteData(i) {
  DataPro.splice(i, 1);
  localStorage.Products = JSON.stringify(DataPro);
  ShowData();
}
function DeleteAll() {
  localStorage.clear();
  DataPro.splice(0);
  ShowData();
  search.value = "";
}

/* Update */
function UpdateData(i) {
  title.value = DataPro[i].title;
  price.value = DataPro[i].price;
  taxes.value = DataPro[i].taxes;
  ads.value = DataPro[i].ads;
  discount.value = DataPro[i].discount;
  count.style.display = "none";
  category.value = DataPro[i].category;
  GetTotal();
  Mode = "Update";
  submit.innerHTML = "Update";
  temp = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}

/* Search Mode*/
let Search_Mode_var = "Title";
function SearchMode(id) {
  if (id == "SearchTitle") {
    Search_Mode_var = "Title";
  } else if (id == "SearchCategory") {
    Search_Mode_var = "Category";
  }
  search.focus();
  search.value = "";
  search.placeholder = "Search By " + Search_Mode_var;
  ShowData();
}

/* Search */
function SearchData(data) {
  let table = "";

  for (let i = 0; i < DataPro.length; i++) {
    if (Search_Mode_var == "Title") {
      if (DataPro[i].title.includes(data.toLowerCase())) {
        table += `
    <tr>
      <td>${i + 1}</td>
      <td>${DataPro[i].title}</td>
      <td>${DataPro[i].price}</td>
      <td>${DataPro[i].taxes}</td>
      <td>${DataPro[i].ads}</td>
      <td>${DataPro[i].discount}</td>
      <td>${DataPro[i].total}</td>
      <td>${DataPro[i].category}</td>
      <td><button onclick="UpdateData(${i})" id="update">update</button></td>
      <td><button onclick="DeleteData(${i})" id="delete">delete</button></td>
    </tr>
    `;
      }
    } else if (Search_Mode_var == "Category") {
      if (DataPro[i].category.includes(data)) {
        table += `
    <tr>
      <td>${i + 1}</td>
      <td>${DataPro[i].title}</td>
      <td>${DataPro[i].price}</td>
      <td>${DataPro[i].taxes}</td>
      <td>${DataPro[i].ads}</td>
      <td>${DataPro[i].discount}</td>
      <td>${DataPro[i].total}</td>
      <td>${DataPro[i].category}</td>
      <td><button onclick="UpdateData(${i})" id="update">update</button></td>
      <td><button onclick="DeleteData(${i})" id="delete">delete</button></td>
    </tr>
    `;
      }
    }
  }
  document.getElementById("tbody").innerHTML = table;
}

function ChangeColor(id) {
  if (id == "LightMode") {
    DarkMode.style.display = "block";
    LightMode.style.display = "none";

    document.body.style.backgroundColor = "white";
    document.body.style.color = "black";
    head.style.color = "black";
  } else if ("DarkMode") {
    DarkMode.style.display = "none";
    LightMode.style.display = "block";
    document.body.style.backgroundColor = "black";
    document.body.style.color = "rgba(139, 205, 231, 0.968)";
    head.style.color = "rgba(139, 205, 231, 0.968)";
  }
}
