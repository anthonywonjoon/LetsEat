async function getRandomMeal() {
    const url = 'www.themealdb.com/api/json/v1/1/random.php'

    const randomMeal = await fetch(url)
    .then((res) => res.json())
    .catch((err) => console.error('Fetch failed', err));

    return randomMeal.meals[0];
}

async function randomizer() {
    const recipe = await getRandomMeal();
    console.log(recipe);
}


