// TODO: REVISIT THIS LOGIC; DOESN'T CURRENTLY POST TO MYPROFILE
$(document).on("click", ".favoritesBtn2", function(event) {
    event.preventDefault();
    console.log("The Favorites Button with this id (" + this.id + ") was clicked");
    // Favorite Recipe Name
    let favoriteRecipeNameEl = document.getElementById(".favoriteRecipeName");
    
    // Favorite Ingredients
    let favoriteIngredientsEl = document.getElementById(".favoriteIngredients");

    // Favorite Directions
    let favoriteDirectionsEl = document.getElementById(".favoriteDirections");

    // define a variable for the modal image: modalImage
    let favoriteImageEl = document.getElementById("favoriteImage");

    // define variable for the button ID
    let btnID = this.id;
    console.log("Button ID = " + btnID);

    // AJAX CALL:
    $.ajax({

        url : '/myprofile',
        type : 'POST',
        dataType:'json',
        
    })
    .then(
        function (response){
            console.log(response);
            console.log(response[0].id);
            
            // run a loop that goes through the entire response for recipes
            for (let i = 0; i <= response.length; i++) {
             // take out recipe_name, ingredients, and directions
                if (btnID == response[i].id) {
                    // test to see if it's extracting properly
                    console.log(response[i].recipe_name);
                    console.log(response[i].ingredients);
                    console.log(response[i].directions);
                    // append the data into the HTML variables
                    favoriteRecipeNameEl.textContent = response[i].recipe_name;
                    favoriteIngredientsEl.textContent = response[i].ingredients;
                    favoriteDirectionsEl.textContent = response[i].directions;
                    favoriteImageEl.innerHTML = '<img src="' + response[i].image + '"/>';
                }
            }
        }
    );
});