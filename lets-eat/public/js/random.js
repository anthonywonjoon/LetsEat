function getRandomMeal() { // call themealdb api
    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
    .then(res => res.json())
    .then(res => {
        data = (res.meals[0]);
        displayRandomMeal(data);
    })
    .catch(e => {
        console.warn(e);
    });
}

/* function to display all recipe data
* param data -- takes in raw json data
*/
function displayRandomMeal(data) {
    // header -- picture and name of meal
    console.log(data);
    mealName = JSON.stringify(data['strMeal']); // convert JSON data into string
    mealName = mealName.replaceAll('"', ''); // remove all weird string stuff
    document.getElementById('meal').innerHTML = mealName; // replace "meal" div with the name of the meal
    document.getElementById('meal-picture').innerHTML = `<img src='${data["strMealThumb"]}'>` // input meal image into "meal-picture" div

    // ingredients and measurements 
    document.getElementById('meal-prep-title').innerHTML = 'Ingredients!' 
    ingredients = storeIngredients(data); 
    measurements = storeMeasurements(data);
    for (i = 0; i < 20; i++){
        if (ingredients[i] != "" && ingredients[i] != null && ingredients[i] != undefined){
            document.getElementById(`meal-ingredients${i}`).innerHTML = ingredients[i] + ':';
            document.getElementById(`meal-measurement${i}`).innerHTML = "   " + measurements[i];
        }
    }

    // instructions
    document.getElementById('meal-instructions-title').innerHTML = 'The Recipe!'
    if (data['strInstructions']) {
        instructions = getInstructions(data['strInstructions']);
        document.getElementById('meal-instructions').innerHTML = ""
        for (i = 0; i < instructions.length; i++){
            document.getElementById('meal-instructions').innerHTML += `<p><strong>Step ${i + 1}:</strong> ${instructions[i]}</p><br>`
        }
    }

    // youtube video
    url = getVideo(data['strYoutube']);
    document.getElementById('meal-video').innerHTML = `<iframe title='YouTube video player' type=\"text/html\" width='640' height='390' src='${url}' frameborder='0' allowFullScreen></iframe>`
    
}

/* function to get the ingredients
* param data -- takes in raw json data
* return array of ingredients
*/
function storeIngredients(data) {
    ingredients = []; // creates an array to store ingredients
    for (i = 1; i < 20; i++){ // loop through array for 20 iterations
            currIng = JSON.stringify(data[`strIngredient${i}`]); // convert the current ingredient to a string
            finalIng = currIng.replaceAll('"', ''); // removes all funky characters 
            if (finalIng != "" && finalIng != null && finalIng != undefined) { // if the ingredient is valid
                ingredients.push(finalIng); // push ingredient to array
            }
    }
    return ingredients; // return array of ingredients
}

/* function to get measurements for ingredients
* param data -- takesi n the raw json data
* return array with measurements for each ingredient
*/
function storeMeasurements(data) { 
    measurements = []; // create array to store measurements
    for (i = 1; i < 20; i++){ // loop through array 20 iterations
            currMeasure = JSON.stringify(data[`strMeasure${i}`]); // convert current measurement to string
            finalMes = currMeasure.replaceAll('"', ''); // remove all funky characters
            if (finalMes != "" && finalMes != null && finalMes != undefined) { // if measurement is valid
                measurements.push(finalMes); // push measurement into array
            }
    }
    return measurements; // return measurement array
}

/* function to get recipe from data
* param data -- takes in the raw json data
* return stringified recipe
*/
function getInstructions(data){ 
    instructions = [];
    rawInstr = JSON.stringify(data);
    rawInstr = rawInstr.replaceAll("\\r\\", "");
    rawInstr = rawInstr.replaceAll('.n', ". ");
    rawInstr = rawInstr.replaceAll('"', '');
    instructions = rawInstr.split('. ');
    return instructions;
}

/* function to get the youtube video url for the recipe
* param data -- takes in the raw json data
* return url for video
*/
function getVideo(data){
    url = JSON.stringify(data);
    url = url.replaceAll('watch?v=', 'embed/');
    url = url.replaceAll('"', "");
    console.log(url);
    return url;
}
    
