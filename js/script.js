var app = angular.module('app',['ngRoute']);

app.config(function ($routeProvider) {
	$routeProvider
	.when('/', {
		templateUrl: 'pages/home.html',
	})	
	.when('/product', {
		templateUrl: 'pages/product.html',
	})	
	.when('/about', {
		templateUrl: 'pages/about.html',
	})	
	.when('/blog', {
		templateUrl: 'pages/blog.html',
	})	
	.when('/contact', {
		templateUrl: 'pages/contact.html',
	})

	.when('/checkout', {
		templateUrl: 'pages/checkout.html',
	})	
	.when('/list-cart', {
		templateUrl: 'pages/list-cart.html',
	})	
	.when('/list-favorite', {
		templateUrl: 'pages/list-favorite.html',
	})	
	.when('/signup', {
		templateUrl: 'pages/signup.html',
	})	
	.when('/login', {
		templateUrl: 'pages/login.html',
	})	


	.when('/blog-detail', {
		templateUrl: 'pages/blog-detail.html',
	})
	.when('/product_detail', {
		templateUrl: 'pages/product_detail.html',
	})

	;
});



app.controller('Ctrl',function($scope,$http,$rootScope){


	$scope.getProdetail = function(pr){
    sessionStorage.removeItem('key_login'); //remove old item

	sessionStorage.setItem('prodetail', angular.toJson(pr)); //set newitem
	
    $scope.prodetail = sessionStorage.getItem('prodetail'); //get new item

}










var stds = sessionStorage.getItem('key_login');
if(stds){
	$scope.std = angular.fromJson(stds)
}else{
	$scope.std = '';
}
$http.get('data/category.json').then(function(cate){
	$scope.cate = cate.data;
});

$http.get('data/product.json').then(function(pro){
	var pros = [];
	$scope.pro = pro.data;
	pros = pro.data;
	$scope.prohome = pro.data;

	$scope.getProByCatId = function(id){
		var result = [];
		for (var i = 0; i < pros.length; i ++) {
			if(id == pros[i].cate_id){
				result.push(pros[i]);
			}
		}

		$scope.pro = result;

		for (let j = 0; j < $scope.cate.length; j++) {
			if($scope.cate[j].id == id){
				$scope.isCat = $scope.cate[j];
			}
			
		}
	}

   // js cart
	$scope.carts = []; // asign cart


    // get cart from section storage
    var CartInStorage = sessionStorage.getItem('cart');

    if (CartInStorage) {

    	$scope.carts = angular.fromJson(CartInStorage);

    	
    }
	//
	if (CartInStorage) {
		$scope.carts = angular.fromJson(CartInStorage);
	}
	$scope.total_qtt = 0;

	$scope.money = 0;
	$scope.total_money = 0;
	for (var i = 0; i < $scope.carts.length; i++) {
		$scope.money = $scope.carts[i].price * $scope.carts[i].quantity;
		$scope.total_money += $scope.money;
		$scope.total_qtt += $scope.carts[i].quantity;
		
	}
	$scope.all = function(){
		$scope.total_qtt = 0;

		$scope.money = 0;
		$scope.total_money = 0;
		for (var i = 0; i < $scope.carts.length; i++) {
			$scope.money = $scope.carts[i].price * $scope.carts[i].quantity;
			$scope.total_money += $scope.money;
			$scope.total_qtt += $scope.carts[i].quantity;
			
		}
	}


     // onclick add to cart
     $scope.add_to_cart = function (sp) {

     	var itemExists = checkCartExists(sp.id); // asign sp.id to check

     	if (itemExists != -1) {
     		$scope.carts[itemExists].quantity += 1;  // if product have in cart. quantity add one
     	} else {
     		sp.quantity = 1; 
     		$scope.carts.push(sp);       // else quantity  = 1 and push product for first
     	}

     	sessionStorage.setItem('cart', angular.toJson($scope.carts)); // up cart to secsion storage
     	$scope.cart = sp;
     	alertify.success('Add product to Cart successful');

     	$scope.all();
     }
     
     // function check product had in cart or not
     function checkCartExists(id) {
     	for (var i in $scope.carts) {
     		if ($scope.carts[i].id == id) {
     			return i;  // if had return to index of product
     		}
     	}
     	return -1;  // else return -1
     }
     //

     // click remove cart buttn

     $scope.remove_cart = function(id) {
     	var itemExists = checkCartExists(id);

     	if (itemExists != -1) {
     		$scope.carts.splice(itemExists,1); // slice product from cart by id
     		sessionStorage.setItem('cart', angular.toJson($scope.carts)); //up cart to secsion storage
     		alertify.error('Remove product to Cart successful');
     		$scope.all();
     	}

     }    
     //clear cart
     $scope.clear_cart = function() {
     	$scope.carts = [];
     		sessionStorage.setItem('cart', angular.toJson($scope.carts)); //up cart to secsion storage
     		$scope.all();
     		alertify.error('Remove Cart successful');
     	}

//Favoritr 



$scope.prodinFavirite = [];
var change = sessionStorage.getItem('key_Favorite');
if(change){
	$scope.prodinFavirite =	angular.fromJson(change)
}



$scope.pushFavorite = function (pro){
	$scope.prodinFavirite.push(pro);
	sessionStorage.setItem('key_Favorite',angular.toJson($scope.prodinFavirite));
	alertify.success('Add product to favorite successful');
}

$scope.delFavorite = function(pr){


	$scope.prodinFavirite.splice(pr,1); 
        	// slice product from cart by id


        	sessionStorage.setItem('key_Favorite', angular.toJson($scope.prodinFavirite)); 
     		//up cart to secsion storage

     		alertify.error('Remove product to Favorite successful');
     		$scope.all();
     	}




     	$scope.pushFavoritetoCart = function(pr){




         itemExists = checkfavitExists(pr.id); // asign sp.id to check

         if (itemExists != -1) {
         	pr.quantity = $scope.carts[itemExists].quantity+1;

         	$scope.carts.splice(pr,1); 
         	$scope.carts.push(pr); 


         }
         else{
         	pr.quantity = 1;
         	$scope.carts.push(pr); 
         }

     	sessionStorage.setItem('cart', angular.toJson($scope.carts)); // up cart to secsion storage

     	alertify.success('Add product to Cart successful');

     	$scope.all();








        	$scope.prodinFavirite.splice(pr,1); // slice product from cart by id


     		sessionStorage.setItem('key_Favorite', angular.toJson($scope.prodinFavirite)); //up cart to secsion storage

     		alertify.error('Remove product to Favorite successful');
     		$scope.all();
     	}











     	$scope.clear_Favorites = function(){
     		sessionStorage.removeItem('key_Favorite');
     		$scope.prodinFavirite = []

     	}



     	$scope.check_inFavorite = function(pro){
     		for (var i = 0; i < $scope.prodinFavirite.length; i++) {
     			if($scope.prodinFavirite[i].id == pro){
     				return pro;
     			}
     		}


     	}

          // function check product had in cart or not
          function checkfavitExists(id) {
          	for (var i in $scope.carts) {
          		if ($scope.carts[i].id == id) {
     			return i;  // if had return to index of product
     		}
     	}
     	return -1;  // else return -1
     }
     //

 });

$http.get('data/categoryBlog.json').then(function(blg){
	$scope.blg = blg.data;
	
});

$http.get('data/blog.json').then(function(blo){
	var blogs = [];
	$scope.blo = blo.data;
	blogs = blo.data;
	$scope.blghome = blo.data;

	$scope.getBlogById = function(id){
		var result = [];
		for (var i = 0; i < blogs.length; i ++) {
			if(id == blogs[i].blogCateId){
				result.push(blogs[i]);
			}
		}

		$scope.blo = result;

		for (let j = 0; j < $scope.cate.length; j++) {
			if($scope.blg[j].id == id){
				$scope.isBlog = $scope.blg[j];
			}
		}
	}
});

	// logout

	$scope.thoat = function(){
		sessionStorage.removeItem('key_login');
		window.location="index.html";
	}

	$scope.xem = function (pnew) {
		$scope.be = pnew;
		$('#modal-show').modal('show');
	}




});

app.controller('LoginCtrl',function($scope,$http){
	$http.get('data/user.json').then(function(res){
		$scope.studentList = res.data;
		var stds = sessionStorage.getItem('key_login')

		if(stds){
			$scope.std = angular.fromJson(stds)
		}


		$scope.login = function(){
			var check = true;
			for (var i = 0; i < $scope.studentList.length; i++) {
				var stsList = $scope.studentList[i];
				if(stsList.email == $scope.email && stsList.password == $scope.password){
					$scope.alert = "";
					$scope.std = stsList;
					sessionStorage.setItem('key_login',angular.toJson($scope.std));
					check = false;
					window.location="index.html";
					// alert("Login successfully")
					break;
				}

			}
			if(check){
				$scope.alert = "Incorrect email or password";

			}
		}
		
		$scope.reset = function(){
			$scope.alert = "";
		}
	});
})

var check = 0;
function mobile_button(){
	if(check == 0){
		mobile_nav.style.opacity = '1';
		mobile_nav.style.right = '0'
		check = 1;
	}
	else{
		mobile_nav.style.opacity = '0';
		mobile_nav.style.right = '-300px';
		check = 0;
	}
}


function mobile1(a){
	if(a.style.transform == "rotate(90deg)"){
		a.style.transform = "rotate(0deg)"
	}else{
		a.style.transform = "rotate(90deg)";
	}
}

function open_nav_ul(a,angle_down){
	if(a.style.display == "block"){
		a.style.display = "none";
		angle_down.style.transform = "translate(0, -50%) rotate(0deg)";

	}
	else{
		a.style.display = "block";
		angle_down.style.transform = "translate(0, -50%) rotate(180deg)";
	}
}



// begin js clock
var myVar = setInterval(function() {
	myTimer();
}, 1000);

function myTimer() {
	var d = new Date();
	var month = new Array();
	month[0] = "January";
	month[1] = "February";
	month[2] = "March";
	month[3] = "April";
	month[4] = "May";
	month[5] = "June";
	month[6] = "July";
	month[7] = "August";
	month[8] = "September";
	month[9] = "October";
	month[10] = "November";
	month[11] = "December";
	var n = month[d.getMonth()];

	document.getElementById("clock").innerHTML = d.getDate()+"/"+n+"/"+d.getFullYear()+" - "+d.getHours()+": "+d.getMinutes()+": "+d.getSeconds();
}
// end js clock