function getCategories() {
    fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
    .then(res => res.json())
    .then(res => {
        data = (res.categories);
        displayCategories(data);
    })
    .catch(e => {
        console.warn(e);
    });
}

function displayCategories(data) {
    for (i = 0; i < data.length; i++){
        categoryId = JSON.parse(data[i]['idCategory']);
        category = JSON.stringify(data[i]['strCategory']);
        categoryImg = JSON.stringify(data[i]['strCategoryThumb']);
        
        category = category.replaceAll('"', '');
        categoryImg = categoryImg.replaceAll('"', '');

        document.getElementById(`categoryBlock${i}`).innerHTML = category;
        document.getElementById(`imageBlock${i}`).innerHTML = `<img src='${categoryImg}'></img>`
    }
}