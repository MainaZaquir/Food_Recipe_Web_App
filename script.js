const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const mealList = document.getElementById('mealList');
const modalContainer = document.getElementById('modal-container');
const mealDetailsContent = document.getElementById('meal-details-content');
const recipeCloseBtn = document.getElementById('recipeCloseBtn');

searchButton.addEventListener('click', async () =>{
    const ingredient = searchInput.value.trim();
    if(ingredient){
        const meals = await searchMealsByIngredient(ingredient);
        displayMeals(meals);
    }
});

mealList.addEventListener('click', async (e) => {
    const card = e.target.closest('.meal-item');
    if(card){
        const mealId = card.dataset.id;
        const meal = await getMealDetails(mealId);
        if(meal){
            showMealDetailsPopup(meal);
        }
    }
});

// Function for fetching meals by ingredient from the server
async function searchMealsByIngredient(ingredient){
    try{
        const response = await fetch(`/api/meals?ingredient=${ingredient}`);
        const data = await response.json();
        return data;
    }catch(error){
        console.error('Error fetching data:', error);
    }
}

// Function for fetching meal details by Id from the server
async function getMealDetails(mealId){
    try{
        const response = await fetch(`/api/mealDetails?mealId=${mealId}`);
        const data = await response.json();
        return data.meal;
    }catch(error){
        console.error('Error fetching meal details:', error);
    }
}

// Function for displaying meals in the list
function displayMeals(meals){
    mealList.innerHTML = '';
    if(meals){
        meals.forEach((meal) => {
            const mealItem = document.createElement('div');
            mealItem.classList.add('meal-item');
            mealItem.dataset.id = meal.idMeal;
            mealItem.innerHTML = `
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                <h3>${meal.strMeal}</h3>           
            `;
            mealList.appendChild(mealItem);
        });
    }else{
        mealList.innerHTML = '<p>No meals found. Please try another ingredient</p>';
    }
}

// Function for creating and displaying the meal details immediately on popup
function showMealDetailsPopup(meal) {
    mealDetailsContent.innerHTML = `
        <h2 class="recipe-title">${meal.strMeal}</h2>
        <p class="recipe-category">${meal.strCategory}</p>
        <div class="recipe-instruct">
            <h3>Instructions</h3>
            <p>${meal.strInstructions}</p>
        </div>
        <div class="recipe-img">
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
        </div>
        <div class="recipe-video">
            <a href="${meal.strYoutube}" target="_blank">Video Tutorial</a>
        </div>
    `;

    modalContainer.style.display = 'block';
}


recipeCloseBtn.addEventListener('click', closeRecipeModal);

function closeRecipeModal(){
    modalContainer.style.display = 'none';
}

searchInput.addEventListener('keyup', (e) =>{
    if(e.key === 'Enter'){
        performSearch();
    }
});

async function performSearch(){
    const ingredient = searchInput.value.trim();
    if(ingredient){
        const meals = await searchMealsByIngredient(ingredient);
        displayMeals(meals);
    }
}

// This will perform a chicken search once the page load
window.addEventListener('load', () =>{
    searchInput.value = 'chicken';
    performSearch();
});
