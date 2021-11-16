/*
=============================
MODAL POPULATION LOGIC
=============================
*/
//  TODO: Figure out a way to extract the ingredients and directions to be plain text instead of array

// Fires when user clicks "View Recipe" Button
$(document).on("click", ".viewRecipeBtn", function(event) {
    event.preventDefault();
    console.log("The View Recipe Button with this id (" + this.id + ") was clicked");
    // define a variable for the modal header/recipe name: modalRecipeName
    let modalRecipesEl = document.getElementById("modalRecipeName");
    
    // define a variable for the modal ingredients: modalIngredients
    let modalIngredientsEl = document.getElementById("modalIngredients");

    // define a variable for the modal ingredients: modalDirections
    let modalDirectionsEl = document.getElementById("modalDirections");

    // define a variable for the modal image: modalImage
    let modalImageEl = document.getElementById("modalImage");

    // define variable for the button ID
    let btnID = this.id;
    console.log(typeof btnID);

    // AJAX CALL:
    $.ajax({

        url : '/recipes/filter',
        type : 'GET',
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
                    modalRecipesEl.textContent = response[i].recipe_name;
                    modalIngredientsEl.textContent = response[i].ingredients;
                    modalDirectionsEl.textContent = response[i].directions;
                    modalImageEl.innerHTML = '<img src="' + response[i].image + '"/>';
                }
            }
        }
    );










    
    
    
    // find the variables and replace what's there with data from database BASED on the ID
    // basically, I want to say... whatever "THIS" ID value is... look in the recipes modal, 
    // find the recipe.id that has the same ID as the button that was just clicked, and 
    // populate modalRecipesEl with {{recipe.name}}, 
    // populate modalIngredientsEl with {{recipe.ingredients}}, 
    // populate modalDirectionsEl with {{recipe.directions}}, and if an image exists ...
    // populate modalDirectionsEl with {{recipe.directions}}, 
});