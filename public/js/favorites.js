// // TODO: REVISIT THIS LOGIC; DOESN'T CURRENTLY POST TO MYPROFILE (ATTEMPT 1)
// $(document).on("click", ".favoritesBtn2", function(event) {
//     event.preventDefault();
//     console.log("The Favorites Button with this id (" + this.id + ") was clicked");
//     // Favorite Recipe Name
//     let favoriteRecipeNameEl = document.getElementById(".favoriteRecipeName");
    
//     // Favorite Ingredients
//     let favoriteIngredientsEl = document.getElementById(".favoriteIngredients");

//     // Favorite Directions
//     let favoriteDirectionsEl = document.getElementById(".favoriteDirections");

//     // define a variable for the modal image: modalImage
//     let favoriteImageEl = document.getElementById("favoriteImage");

//     // define variable for the button ID
//     let btnID = this.id;
//     console.log("Button ID = " + btnID);

//     // AJAX CALL:
//     $.ajax({

//         url : '/myprofile',
//         type : 'GET',
//         dataType:'json',
        
//     })
//     .then(
//         function (response){
//             console.log(response);
//             console.log(response[0].id);
            
//             // run a loop that goes through the entire response for recipes
//             for (let i = 0; i <= response.length; i++) {
//              // take out recipe_name, ingredients, and directions
//                 if (btnID == response[i].id) {
//                     // test to see if it's extracting properly
//                     console.log(response[i].recipe_name);
//                     console.log(response[i].ingredients);
//                     console.log(response[i].directions);
//                     // append the data into the HTML variables
//                     favoriteRecipeNameEl.textContent = response[i].recipe_name;
//                     favoriteIngredientsEl.textContent = response[i].ingredients;
//                     favoriteDirectionsEl.textContent = response[i].directions;
//                     favoriteImageEl.innerHTML = '<img src="' + response[i].image + '"/>';
//                 }
//             }
//         }
//     );
// });


// // async function addToFavorites(event) {
// //     event.preventDefault();

// //     const recipe_name = document.querySelector('#modalRecipeName').value;
// //     const ingredients = document.querySelector('#modalIngredients').value;
// //     const directions = document.querySelector('#modalDirections').value;
// //     const image = document.querySelector('#modalImage').value;

// //     console.log({
// //         recipe_name,
// //         ingredients,
// //         directions,
// //         recipe_type,
// //         image
// //     }, );
// //     const response = await fetch(`/myprofile`, {
// //         method: 'POST',
// //         body: JSON.stringify({
// //             recipe_name,
// //             ingredients,
// //             directions,
// //             image,
// //         }),
// //         headers: {
// //             'Content-Type': 'application/json',
// //         },
// //     });

// //     if (response.ok) {
// //         $('#exampleModal2').modal('show');
        
// //     } else {
// //         alert('Failed to add recipe to favorites');
// //     }
// // };

// // document
// //     .addEventListener('.addToFavoritesButton', addToFavorites);



$(document).on("click", ".favoritesBtn2", async function(event) {
    
      let recipe_id = this.id;
      const response = await fetch(`/favorite`, {
        method: 'POST',
        body: JSON.stringify({
            recipe_id,
        
            // user_id,
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (response.ok) {
        $('#exampleModal2').modal('show');
        

        //document.location.replace('/');// look into functionality of this...
    } else {
        alert('Failed to add favorite recipe');
    }

})

