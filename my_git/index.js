let products=[ 
{ 
"id": 1, 
"name": "Laptop", 
"price": 50000, 
"brand": "Dell", 
"image": "img1.jpg", 
"altImage": "img1-alt.jpg" 
}, 
{ 
"id": 3, 
"name": "Tablet", 
"price": 30000, 
"brand": "Apple", 
"image": "img3.jpg", 
"altImage": "img3-alt.jpg"
} ,
{ 
"id": 2, 
"name": "Phone", 
"price": 20000, 
"brand": "Samsung", 
"image": "img2.jpg", 
"altImage": "img2-alt.jpg" 
}
] 
const productList = document.getElementById("productList"); 
const cartItems = document.getElementById("cartList"); 
const totalQty = document.getElementById("totalQuantity"); 
const totalCost = document.getElementById("totalPrice"); 
const grandTotal = document.getElementById("grandtotalPrice"); 
const sortSelect = document.getElementById("sortSelection");
const filterSelect = document.getElementById("filterSelection"); 
const regForm = document.getElementById("registration"); 
const formData = document.getElementById("formData");
let cart=JSON.parse(localStorage.getItem("cart"))|| [];
function displayProducts(products){
    productList.innerHTML=""
    cartItems.innerHTML=""
       products.forEach((obj)=>{
        let divel=document.createElement("div");
        divel.className="col-md-4";
        divel.innerHTML=`
        <div class="card h-100 shadow-sm">
          <img src="${obj.image}" data-alt="${obj.altImage}" class="card-img">
           <div class="card-body">
             <h5 class="cared-title">${obj.name}</h5>
             <p class="card-text">Brand:${obj.brand}</br> Price:${obj.price}</p>
             <button class="btn btn-primary addtocartbtn">Addtocart</button>
             <span class="like-btnn">&#9825</span>
             <div class="rating mt-2">${[1,2,3,4,5].map(n=>`<span class="star" data-value="${n}">&#9733;</span>`).join("")}</div>
           </div>
        </div>
        `
        productList.appendChild(divel);
        divel.querySelector('.addtocartbtn').addEventListener('click',()=>addtoCart(obj));
        divel.querySelector(".like-btnn").addEventListener('click',()=>{
            let el=divel.querySelector(".like-btnn");
          el.classList.toggle('liked');
          el.innerHTML=el.classList.contains('liked')?"&#10084;":"&#9825;";
        })
       })

       
}
function addtoCart(p){
    let el=cart.find(obj=>p.id==obj.id);
    if(el){
        el.qnt++;
    }else cart.push({...p,qnt:1});
    updateQuantity();

}
function updateQuantity(){
    cartItems.innerHTML="";
   let qnt=0,cost=0;
   cart.forEach(item=>{
         qnt+=item.qnt;
         cost+=item.price*item.qnt;
         cartItems.innerHTML += `<p>${item.name} - Qty: ${item.qnt} - Price: 
₹${item.price} - Total: ₹${item.price * item.qnt}</p>`; 
}); 
totalQty.textContent = qnt; 
totalCost.textContent = cost; 
grandTotal.textContent = cost; 
localStorage.setItem("cart", JSON.stringify(cart));

}
 sortSelect.addEventListener('change',()=>{
      let sorted=[...products];
      if(sortSelect.value==="name") sorted.sort((a,b)=>a.name.localeCompare(b.name));
      else if(sortSelect.value==="low-high") sorted.sort((a,b)=>a.price-b.price);
      else if(sortSelect.value==="high-low") sorted.sort((a,b)=>b.price-a.price)
      displayProducts(sorted)
 })
 filterSelect.addEventListener('change',()=>{
         let filter=products.filter(obj=>filterSelect.value===obj.brand);
         displayProducts(filter);
         
 })

displayProducts(products)
