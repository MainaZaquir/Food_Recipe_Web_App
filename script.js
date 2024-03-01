const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const mealList = document.getElementById('mealList');
const modalContainer = document.getElementById('modal-container');
const mealDetailsContent = document.getElementById('meal-details-content');
const recipeCloseBtn = document.getElementById('recipeCloseBtn');

// Event listeners
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

// Function to fetch meals by ingredient from server
async function searchMealsByIngredient(ingredient){
    try{
        const response = await fetch(`http://localhost:3000/meals?ingredient=${ingredient}`);
        const data = await response.json();
        return data;
    }catch(error){
        console.error('Error fetching data:', error);
    }
}

// Function to fetch meal details by Id from server
async function getMealDetails(mealId){
    try{
        const response = await fetch(`http://localhost:3000/mealDetails?mealId=${mealId}`);
        const data = await response.json();
        return data.meal;
    }catch(error){
        console.error('Error fetching meal details:', error);
    }
}

// Function to display meals in the list
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

// Function to create and display meal details on popup
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


// Event listener for popup close button
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

// Perform a chicken search on page load
window.addEventListener('load', () =>{
    searchInput.value = 'chicken';
    performSearch();
});
