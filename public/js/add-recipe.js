async function newFormHandler(event) {
    event.preventDefault();

    const recipe_name = document.querySelector('#dish_name').value;
    const ingredients = ingredientsArray;
    const directions = directionsArray;
    const recipe_type = document.querySelector('#recipe_type').value;
    const recipe_time = document.querySelector('#recipe_time').value;

    const response = await fetch(`/api/recipe`, {
        method: 'POST',
        body: JSON.stringify({
            recipe_name,
            ingredients,
            directions,
            recipe_type,
            recipe_time,
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (response.ok) {
        document.location.replace('/');// look into functionality of this...
      } else {
        alert('Failed to add recipe');
      }
};

const ingredientsArray = [];

function addIngredients(event) {
    event.preventDefault();

    const newIngredient = document.querySelector('#ingredients');

    ingredientsArray.push(newIngredient);
    document.querySelector('#showIngredients').append("<li>" + newIngredient + "<li>");
    document.querySelector('#ingredients').val("");
};

const directionsArray = [];

function addDirections(event) {
    event.preventDefault();

    const newDirection = document.querySelector('#directions');

    directionsArray.push(newDirection);
    document.querySelector('#showDirections').append("<li>" + newDirection + "<li>");
    document.querySelector('#directions').val("");
};




document
    .querySelector('.new-recipe-form')
    .addEventListener('submit', newFormHandler);

document
    .querySelector('#ingredients')
    .addEventListener('submit', addIngredients);

document
    .querySelector('#directions')
    .addEventListener('submit', addDirections);