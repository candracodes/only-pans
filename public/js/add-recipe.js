async function newFormHandler(event) {
    event.preventDefault();

    const recipe_name = document.querySelector('#dish_name').value;
    const ingredients = document.querySelector('#ingredients').value;
    const directions = document.querySelector('#directions').value;
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
}

document
    .querySelector('.new-recipe-form')
    .addEventListener('submit', newFormHandler);