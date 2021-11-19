const recipeForm = document.querySelector(".new-recipe-form");
const ingredientsInput = document.querySelector("#ingredients-input");
const ingredientsButton = document.querySelector("#ingredients-button");
const directionsInput = document.querySelector("#directions-input");
const directionsButton = document.querySelector("#directions-button")
const ingredientsDisplay = document.querySelector("#showIngredients");
const directionsDisplay = document.querySelector("#showDirections");
const removeButton = document.querySelector(".removeButton");



async function newFormHandler(event) {
    event.preventDefault();



    const recipe_name = document.querySelector('#dish_name').value;
    const ingredients = JSON.stringify(pushIngredients());
    const directions = JSON.stringify(pushDirections());
    const image = "/images/thumb-placeholder.png";
    //const recipe_type = document.querySelector('#recipe_type').value;
    // const user_id = req.session.user_id;
    // is this the correct route?
    const recipe_type = $('#recipe_type :selected').text();

    console.log({
        recipe_name,
        ingredients,
        directions,
        recipe_type,
        image,
        // user_id,
    }, );
    const response = await fetch(`/recipes`, {
        method: 'POST',
        body: JSON.stringify({
            recipe_name,
            ingredients,
            directions,
            recipe_type,
            image,
            // user_id,
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (response.ok) {
        $('#exampleModal').modal('show');
        

        //document.location.replace('/');// look into functionality of this...
    } else {
        alert('Failed to add recipe');
    }
};

// THIS LOGIC CREATES LIST ITEMS FOR INGREDIENTS
ingredientsButton.addEventListener("click", function (event) {
    event.preventDefault();

    const ingredientsText = ingredientsInput.value.trim();

    if (ingredientsText === "") {
        return;
    }

    let li = document.createElement("li");
    let p = document.createElement("p");
    p.textContent = ingredientsText;
    p.classList.add("ingredientsValue");

    let button = document.createElement("button");
    button.innerHTML = "<i class='fas fa-trash-alt'></i> Remove";
    button.type = "button";

    button.classList.add("removeButton");
    button.classList.add("btn-danger");
    button.classList.add("btn");
    li.appendChild(p);
    p.appendChild(button);
    ingredientsDisplay.appendChild(li);

    ingredientsInput.value = "";
});

// THIS LOGIC REMOVES SPECIFIC INGREDIENT LIST ITEMS
$(document).on("click", ".removeButton", function (event) {
    event.preventDefault();

    $(this).parent().remove();
});

// THIS LOGIC TAKES INGREDIENT LIST ITEMS AND INCLUDES THEM IN AN ARRAY
function pushIngredients() {

    var ingredientsArray = [];
    $('.ingredientsValue').each(function () {
        var ingredientAdd = $(this).text().split(' ', 2)
        ingredientsArray.push(ingredientAdd[0]);
    });

    return ingredientsArray;

    //     console.log($(".ingredientsValue"));
    //     const ingredientsValueList = $(".ingredientsValue").map((el) => el.textContent);
    //     console.log(ingredientsValueList);
    //     return ingredientsValueList;
}

// THIS LOGIC CREATES LIST ITEMS FOR DIRECTIONS
directionsButton.addEventListener("click", function (event) {
    event.preventDefault();

    const directionsText = directionsInput.value.trim();

    if (directionsText === "") {
        return;
    }

    let li = document.createElement("li");
    let p = document.createElement("p");
    p.textContent = directionsText;
    p.classList.add("directionsValue");

    let button = document.createElement("button");
    button.innerHTML = "<i class='fas fa-trash-alt'></i> Remove";
    button.type = "button";
    button.classList.add("removeButton");
    button.classList.add("btn-danger");
    button.classList.add("btn");
    li.appendChild(p);
    p.appendChild(button);
    directionsDisplay.appendChild(li);

    directionsInput.value = "";
});

// THIS LOGIC REMOVES SPECIFIC DIRECTION LIST ITEMS
$(document).on("click", ".removeButton", function (event) {
    event.preventDefault();

    $(this).parent().remove();
});

// THIS LOGIC TAKES DIRECTION LIST ITEMS AND INCLUDES THEM IN AN ARRAY
function pushDirections() {
    var directionsArray = [];
    $('.directionsValue').each(function () {
        var directionsAdd = $(this).text().split(' ', 2)
        directionsArray.push(directionsAdd[0]);
    })
    return directionsArray;
    // console.log($(".directionsValue"));
    // const directionsValueList = $(".directionsValue").map((el) => el.textContent);
    // console.log(directionsValueList);
    // return directionsValueList;
}

// THIS LOGIC CLEARS THE FORM WHEN THE USER CLOSES THE "SUCCESS" MODAL FROM THE (X) ICON
$( "#closeSuccessModal1" ).click(function() {
    // clear the form
    $('.new-recipe-form').trigger("reset");
    // clear the list items
    $( "#showIngredients" ).empty();
    $( "#showDirections" ).empty();
    
  });

  // THIS LOGIC CLEARS THE FORM WHEN THE USER CLOSES THE "SUCCESS" MODAL FROM THE "CLOSE" BUTTON
$( "#closeSuccessModal2" ).click(function() {
    // clear the form
    $('.new-recipe-form').trigger("reset");
    // clear the list items
    $( "#showIngredients" ).empty();
    $( "#showDirections" ).empty();
    
  });


document
    .querySelector('.new-recipe-form')
    .addEventListener('submit', newFormHandler);