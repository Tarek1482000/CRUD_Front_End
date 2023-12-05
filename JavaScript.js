let ReverseColorMode = document.getElementById("ReverseColorMode");
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

/* Dark or Light Mode */

let ColorMod = "Dark";
if (localStorage.colr != "null") {
  ColorMod = localStorage.colr;
}

function ChangeColor() {
  // Check if localStorage.colr is null or undefined
  if (localStorage.colr != "null") {
    // Toggle between "Dark" and "Light"
    localStorage.colr = localStorage.colr === "Dark" ? "Light" : "Dark";
  } else {
    localStorage.setItem("colr", "Light");
  }

  // Update ColorMod with the current value from localStorage
  ColorMod = localStorage.colr;

  // Display the color mode
  DisplayColorMode(ColorMod);
}

DisplayColorMode(ColorMod);
function DisplayColorMode(ColorMode) {
  Head_BodyColorMode(ColorMode);
  InputsColorMode(ColorMode);
}

function Head_BodyColorMode(Colormode) {
  let head_color = "",
    body_color = "",
    body_backG = "";

  if (Colormode == "Light") {
    ReverseColorMode.innerHTML = "Dark Mode";
    body_backG = "white";
    body_color = "black";
    head_color = "black";
  } else if (Colormode == "Dark") {
    ReverseColorMode.innerHTML = "Light Mode";
    body_backG = "black";
    body_color = "rgba(139, 205, 231, 0.968)";
    head_color = "rgba(139, 205, 231, 0.968)";
  }
  document.body.style.backgroundColor = body_backG;
  document.body.style.color = body_color;
  head.style.color = head_color;
}

function InputsColorMode(Colormode) {
  let background = "",
    color = "";
  if (Colormode == "Light") {
    background = "rgb(170, 200  ,200)";
    color = "black";
  } else if (Colormode == "Dark") {
    background = "rgb(30, 30, 30)";
    color = "rgb(139, 205, 231, 0.968)";
  }

  title.style.background = background;
  price.style.background = background;
  taxes.style.background = background;
  ads.style.background = background;
  discount.style.background = background;
  count.style.background = background;
  category.style.background = background;
  search.style.background = background;

  title.style.color = color;
  price.style.color = color;
  taxes.style.color = color;
  ads.style.color = color;
  discount.style.color = color;
  count.style.color = color;
  category.style.color = color;
  search.style.color = color;
}

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

// Check if the localStorage.Products value is not undefined and not "null"
if (localStorage.Products && localStorage.Products !== "null") {
  try {
    // Attempt to parse the JSON string from localStorage.Products
    DataPro = JSON.parse(localStorage.Products);
  } catch (error) {
    console.error("Error parsing JSON:", error);
    // Handle the error, e.g., set DataPro to an empty array or provide a default value
    DataPro = [];
  }
} else {
  // If localStorage.Products is undefined or "null", set DataPro to an empty array
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
