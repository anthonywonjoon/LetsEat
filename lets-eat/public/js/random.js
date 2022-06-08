function getRandomMeal() {
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

function displayRandomMeal(data) {
    // header -- picture and name of meal
    console.log(data);
    mealName = JSON.stringify(data['strMeal']);
    mealName = mealName.replaceAll('"', '');
    document.getElementById('meal').innerHTML = mealName;
    document.getElementById('meal-picture').innerHTML = `<img src='${data["strMealThumb"]}'>`

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

function storeIngredients(data) {
    ingredients = [];
    for (i = 1; i < 20; i++){
            currIng = JSON.stringify(data[`strIngredient${i}`]);
            finalIng = currIng.replaceAll('"', '');
            if (finalIng != "" && finalIng != null && finalIng != undefined) {
                ingredients.push(finalIng);
            }
    }
    return ingredients;
}

function storeMeasurements(data) {
    measurements = [];
    for (i = 1; i < 20; i++){
            currMeasure = JSON.stringify(data[`strMeasure${i}`]);
            finalMes = currMeasure.replaceAll('"', '');
            if (finalMes != "" && finalMes != null && finalMes != undefined) {
                measurements.push(finalMes);
            }
    }
    return measurements;
}

function getInstructions(data){
    instructions = [];
    rawInstr = JSON.stringify(data);
    rawInstr = rawInstr.replaceAll("\\r\\", "");
    rawInstr = rawInstr.replaceAll('.n', ". ");
    rawInstr = rawInstr.replaceAll('"', '');
    instructions = rawInstr.split('. ');
    return instructions;
}

function getVideo(data){
    url = JSON.stringify(data);
    url = url.replaceAll('watch?v=', 'embed/');
    url = url.replaceAll('"', "");
    console.log(url);
    return url;
}
    
