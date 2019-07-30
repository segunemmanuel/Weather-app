window.addEventListener('load', () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimeZone = document.querySelector('.location-timezone')


    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            let long = position.coords.longitude;
            lat = position.coords.latitude;
            // console.log(position)
            const proxy = `https://cors-anywhere.herokuapp.com/`;
            const api = `${proxy}https://api.darksky.net/forecast/6d5d8e184b1a8d7344120fabb2aef016/${lat},${long}`;

            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data)
                    const { temperature, summary, icon } = data.currently;
                    // set DOM elements from the api
                    temperatureDegree.textContent = temperature;
                    temperatureDescription.textContent = summary;
                    locationTimeZone.textContent = data.timezone;
                    // set icons
                    setIcons(icon, document.querySelector('.icon'))
                    // let celius = (temperature - 32) * (5 / 9);
                    // console.log(currently.temperature)

                });



        });

        const temperatureSection = document.querySelector('.temperature')
        const temperatureSpan = document.querySelector('.temperature span')


        temperatureSection.addEventListener('click', () => {

            if (temperatureSpan.textContent === 'F') {
                temperatureSpan.textContent = "C";
                // temperatureDegree.textContent = celsius;
            }
            else {
                temperatureSpan.textContent = "F"
            }
        });
    };




    function setIcons(icon, iconID) {
        const skycons = new Skycons({ color: "white" })
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }





    // windows

});

// add function that chnages the f to c

// <div class="temperature">
//         <div class="degree-section">
//             <h2 class="temperature-degree">34</h2>
//             <span>F</span>
//         </div>
//         <div class="temperature-description">
//             Its friggin cold
//         </div>
//     </div>



