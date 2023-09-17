let carts = document.querySelectorAll('.add-cart');

let fooditems =[
	{
		name: 'Meaty Onion Pizza',
		tag: 'meatyonionpizza',
		price:450,
		inCart: 0
	},
	{
		name: 'Deep Sea Pizza',
		tag: 'deepseapizza',
		price:150,
		inCart: 0
	},
	{
		name: 'Meat masala pizza',
		tag: 'meatmasalapizza',
		price:550,
		inCart: 0
	},
	{
		name: 'Sausage carnival',
		tag: 'sausagecarnival',
		price:550,
		inCart: 0
	},
	{
		name: 'BBQ meat pizza',
		tag: 'bbqpizza',
		price:600,
		inCart: 0
	}
];

for (let i =0; i < carts.length ; i++) {
	carts[i].addEventListener ('click', () => {
			cartnumbers(fooditems[i]);	
			totalcost(fooditems[i])

		})
	}

	function onLoadCartNumbers(){
		let productNumbers = localStorage.getItem('cartNumbers'); 

			if(productNumbers){
				document.querySelector('.cart span').textContent = productNumbers;

		}

	}	

	function cartnumbers(fooditem){
		let productNumbers = localStorage.getItem('cartNumbers');

		productNumbers = parseInt(productNumbers);

		if(productNumbers){
			localStorage.setItem('cartNumbers', productNumbers + 1);
			document.querySelector('.cart span').textContent = productNumbers + 1;

		}
		else{
			localStorage.setItem('cartNumbers', 1);
			document.querySelector('.cart span').textContent = 1;
		}
		setItem(fooditem);
	}

	function setItem(fooditem){
		let cartItem = localStorage.getItem('fooditemsInCart')
		cartItem = JSON.parse(cartItem);

		if(cartItem != null){

			if(cartItem[fooditem.tag] == undefined){
				cartItem = {
					...cartItem,
					[fooditem.tag]: fooditem
				}
			}
			cartItem[fooditem.tag].inCart += 1;

		}
		else{
			fooditem.inCart = 1;

		 cartItem = {
			[fooditem.tag]: fooditem 
		}
 
		}
		
		
		localStorage.setItem("fooditemsInCart", JSON.stringify(cartItem))
	}

	function totalcost(fooditem){
		let cartcost = localStorage.getItem('totalcost');
		
		console.log("My cart cost is ", cartcost);
		console.log(typeof cartcost);

		if(cartcost != null){
			cartcost = parseInt(cartcost);
			localStorage.setItem("totalcost", cartcost + fooditem.price);
		}
		else{
			localStorage.setItem("totalcost",fooditem.price);
		}

	}


	function displaycart() {
		let cartItem = localStorage.getItem("fooditemsInCart");
		cartItem = JSON.parse(cartItem);

		let fooditemContainer = document.querySelector(".fooditem-container");

		console.log(cartItem);
		if(cartItem && fooditemContainer){
			fooditemContainer.innerHTML = '';
			Object.values(cartItem).map(item => {
				fooditemContainer.innerHTML += `
				<div class="fooditem">
					<ion-icon name="close-circle-outline"></ion-icon>
					<img src="./images/${item.tag}.png">
					<span>${item.name}</span>
				</div>	
				<div class="price">${item.price} </div>
				<div class="quantity">${item.quantity} </div>

				`
			});
		}

	}


	onLoadCartNumbers();

	displaycart();