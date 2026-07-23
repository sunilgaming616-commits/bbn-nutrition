alert("🔥 Welcome to BBN Nutrition!");

let cart = 0;
let total = 0;
let quantity = 0;

function buyNow() {

    cart++;
    quantity++;

    document.getElementById("quantity").innerHTML = "Quantity: " + quantity;

    total = total + 1999;

    document.getElementById("total").innerHTML = "💰 Total: ₹" + total;

    document.getElementById("cart").innerHTML = "🛒 Cart (" + cart + ")";

    alert("💪 Product Added to Cart!");
}

function resetCart() {

    cart = 0;
    total = 0;
    quantity = 0;

    document.getElementById("cart").innerHTML = "🛒 Cart (0)";
    document.getElementById("total").innerHTML = "💰 Total: ₹0";
    document.getElementById("quantity").innerHTML = "Quantity: 0";

    alert("🗑️ Cart Reset Successfully!");
}function checkout(){

    let name = document.getElementById("name").value;

    let phone = document.getElementById("phone").value;

    let address = document.getElementById("address").value;

    if(name=="" || phone=="" || address==""){

        alert("⚠️ Please fill all details!");

        return;

    }
let orderId = Math.floor(Math.random() * 900000) + 100000;

 let message =
"🛒 New Order\n\n" +
"🆔 Order ID: " + orderId + "\n\n" +
"👤 Name: " + name + "\n" +
"📱 Phone: " + phone + "\n" +
"🏠 Address: " + address + "\n\n" +
"💪 Product: Whey Protein\n" +
"💰 Total: ₹" + total;

saveOrder(
    name,
    phone,
    address,
    "Whey Protein",
    total
);

window.open(
  "https://api.whatsapp.com/send?phone=918264028870&text=" + encodeURIComponent(message),
  "_blank"
);

cart = 0;
total = 0;
quantity = 0;

document.getElementById("cart").innerHTML = "🛒 Cart (0)";
document.getElementById("total").innerHTML = "💰 Total: ₹0";
document.getElementById("quantity").innerHTML = "Quantity: 0";

document.getElementById("name").value = "";
document.getElementById("phone").value = "";
document.getElementById("address").value = "";
}