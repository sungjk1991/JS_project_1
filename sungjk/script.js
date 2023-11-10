(function(){
    "use strict";
    //For getting city's coordination used by api.
    const cityCoordinate = {
        "Tokyo": [35.689487, 139.691711],
        "New_York":[40.712776, -74.005974],
        "Paris":[48.856613, 2.352222],
        "Rome":[41.902782, 12.496365],
        "Seoul":[37.5519, 126.9918],
        "London":[51.5072, 0.1276],
        "Barcelona":[41.3874, 2.1686],
        "Cancun":[21.1619, 86.8515],
        "Dubai":[25.2048, 55.2708]
    }
    //fetching access token needed by api
    async function fetchAccessToken(){
        const url = 'https://test.api.amadeus.com/v1/security/oauth2/token';
        const options = {
            method: 'POST',
            headers: {
                'Content-type': 'application/x-www-form-urlencoded',
            },
            body:'grant_type=client_credentials&client_id=QP6A4nMt4q9VnZWgLG2XeAI4U39UgZ68&client_secret=Gw44PK8zRwG6HHMj'
        };

        try {
            const response = await fetch(url, options);
            const result = await response.json();     

            return result;
        } catch (error) {
            console.error(error);
        }
    }
    //actually fetching the data from endpoint
    async function fetchFromApi(result, lat, long){
        const accessToken = result["access_token"];
        const url = `https://test.api.amadeus.com/v1/shopping/activities?latitude=${lat}&longitude=${long}&radius=15`;
        const options = {
            method: 'GET',
            headers:{
                'Authorization': `Bearer ${accessToken}`
            }
        };
        try {
            const response = await fetch(url, options);
            const result = await response.json();

            return result;
        } catch (error) {
            console.error(error);
        }

    }
    //to show loading screen inside of the items div
    function showLoading(){
        const itemsTag = document.querySelector('.items');
        const loaderTag = document.createElement('div');
        const btnTag = document.querySelector('input');
        itemsTag.innerHTML="";
        btnTag.disabled = true;
        loaderTag.className = "loader"
        itemsTag.style.justifyContent = "center"
        itemsTag.appendChild(loaderTag);
    }
    //to hide loading screen inside of the items div
    function hideLoading(){
        const itemsTag = document.querySelector('.items');
        const btnTag = document.querySelector('input');
        btnTag.disabled = false;
        itemsTag.style.justifyContent = "";
    }
    //main function that will be running
    function main(){
        //initialzing menu. Did it this way to easily scale later.
        const selectTag = document.querySelector("#menu");
        for(const city of Object.keys(cityCoordinate)){
            let optionTag = document.createElement('option');
            optionTag.setAttribute('value', city);
            optionTag.innerHTML = city;
            selectTag.appendChild(optionTag);
        }
        let formTag = document.querySelector("form");

        //adding eventlistner to trigger the api fetch.
        formTag.addEventListener('submit',(e)=>{
            e.preventDefault();
            //show loading screen and disable submit button while fetch to be finished.
            showLoading();

            const formData = document.querySelector('#menu').value;

            const cityLat = cityCoordinate[formData][0];
            const cityLong = cityCoordinate[formData][1];

            //chaining getAccessToken and fetchFromApi functions
            fetchAccessToken()
                .then(tokenResult => fetchFromApi(tokenResult, cityLat, cityLong))
                .then((output)=>{

                    let itemsTag = document.querySelector(".items");
                    itemsTag.innerHTML = "";

                    const results = output["data"];

                    //if api does not have specified city's information.
                    if(results.length > 0){
                        for(const result of results){
                            let itemDiv = document.createElement('div');
                            itemDiv.setAttribute('class', "item");
                            const newString = result["description"]?.length > 163 ? result["description"].substring(0,164) + "..." : result["description"];

                            //validating output so user can see output that has reasonable amount of information about activities
                            if(!newString || newString.length < 30){
                                continue;
                            }
                            itemDiv.innerHTML=`
                                <img src="${result["pictures"][0]}" alt="Activity image not available" class="image">

                                <div class="details">

                                    <p class="description">${newString}</p>

                                    <div class="duration"> <strong>Duration:</strong> ${result["minimumDuration"]} </div>

                                    <div class="price"> <strong>Price:</strong> ${result["price"]["amount"]} ${result["price"]["currencyCode"] ? result["price"]["currencyCode"] : ""} </div>
                                </div>

                                <a href="${result["bookingLink"]}" class="booking-link">Book Now</a>
                            `;
                            itemsTag.appendChild(itemDiv);
                        }
                    }
                    else{
                        //if there is no results show user that there is no information available.
                        console.log("am i being called?")
                        const itemDiv = document.createElement('div');
                        itemDiv.setAttribute('class', 'no-result-div');
                        const headingTag = document.createElement('h3');
                        headingTag.innerHTML = "No results found."
                        itemDiv.appendChild(headingTag);
                        itemsTag.appendChild(itemDiv);
                    }
                    //hide loading screen when fetch is finished.
                    hideLoading();

            }).catch(error=>{
                console.error("An error occurred during fetching from API", error);
            })
        })
    }

    main();
}())