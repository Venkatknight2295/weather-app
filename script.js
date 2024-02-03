const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');
const cityHide = document.querySelector('.city-hide');
const weatherIcon = document.querySelector('.weather-box img');

search.addEventListener('click', async () => {
    const APIKey = '8952580ce18a42bc8ec974689c97fa2b';
    const city = document.querySelector('.search-box input').value;

    if (city === '') {
        return;
    }

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`);
        const json = await response.json();

        if (json.cod === '404') {
            handleNotFoundError(city);
            return;
        }

        handleWeatherData(city, json);
    } catch (error) {
        console.error('Error fetching weather data', error);
    }
});

function handleNotFoundError(city) {
    cityHide.textContent = city;
    container.style.height = '400px';
    weatherBox.classList.remove('active');
    weatherDetails.classList.remove('active');
    error404.classList.add('active');
}

function handleWeatherData(city, json) {
    const image = document.querySelector('.weather-box img');
    const temp = document.querySelector('.weather-box .temp');
    const desc = document.querySelector('.weather-box .desc');
    const humidity = document.querySelector('.info-humidity span');
    const wind = document.querySelector('.info-wind span');

    if (cityHide.textContent === city) {
        return;
    } else {
        cityHide.textContent = city;

        container.style.height = '555px';
        container.classList.add('active');
        weatherBox.classList.add('active');
        weatherDetails.classList.add('active');
        error404.classList.remove('active');

        // Comment out the following lines to remove the fade-out effect
        
        setTimeout(() => {
            container.classList.remove('active');
        }, 50500);
        

        switch (json.weather[0].main) {
            case 'Clear':
                image.src = 'images/clear.png';
                break;
            case 'Rain':
                image.src = 'images/rain.png';
                break;
            case 'Snow':
                image.src = 'images/snow.png';
                break;
            case 'Clouds':
                image.src = 'images/cloud.png';
                break;
            case 'Mist':
            case 'Haze':
                image.src = 'images/mist.png';
                break;
            default:
                image.src = 'images/cloud.png';
        }

        temp.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
        desc.innerHTML = `${json.weather[0].main}`;
        humidity.innerHTML = `${json.main.humidity}%`;
        wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

        // Comment out the following lines to remove the fade-out effect
        
        weatherIcon.style.opacity = '1';

        setTimeout(() => {
            weatherIcon.style.opacity = '0';
        }, 100000); // Change this duration to the desired time in milliseconds
        
    }
}
