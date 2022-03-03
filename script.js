const API_KEY = "288a8e46-e730-4f1e-9490-ec0adbd34b2f"
const getCountries = async()=>{
    try {
        const url = `https://holidayapi.com/v1/countries?pretty&key=${API_KEY}`
    const response = await fetch(url)
    const data = await response.json()
    // console.log("data", data)
    return data
    } catch (error) {
        console.log("error", error)
    }
}
// getCountries()

const renderCountries = async() =>{
    try {
        const data = await getCountries()
        const countriesList = document.getElementById("countries-list")
        const ulCountriesList = countriesList.children[2]
        ulCountriesList.innerHTML = ""
        
        data.countries.forEach((country, index)=>{
            const x = document.createElement("li")
            x.innerHTML = `<div class="bullet">${index+1}</div>
            <div class="li-wrapper">
              <div class="li-title">${country.name}</div>
              <div class="li-text">Code: ${country.code}</div>
            </div>`
            ulCountriesList.appendChild(x)
        })
    } catch (error) {
        console.log("error", error)
    }
}
document.getElementById("countries-list-btn").addEventListener("click", ()=>{renderCountries()})



const getHolidays = async() =>{
    try {
        let url = ""
        const country_code = document.getElementById("country-query").value
        url = `https://holidayapi.com/v1/holidays?year=2021&country=${country_code}&key=${API_KEY}`
        // console.log("url", url)
        // console.log("data", allCountries)
        const response = await fetch(url)
        const data = await response.json()
        console.log("holidays",data)
        // const titleCountry = document.getElementById("holidays-list").firstElementChild
        // console.log("titleCountry", titleCountry)
        // titleCountry.innerHTML = `Holidays of ${country_code}`
        return data
    } catch (error) {
        console.log("error", error)
        alert("wrong input")
    }
}
// getHolidays()

const renderCountryName = async(code) => {
    try {
       const name = await getCountries()
       console.log("name", name)
       name.countries.find((country) => {
           if(country.code == code){
               console.log("countryName", country.name)
               return country.name
           } 
        } 
    )
} catch (error) {
        console.log("error", error)
    }
}

const renderHolidays = async()=>{
    try {
        const country_code = document.getElementById("country-query").value
        console.log("country Code", country_code)
        const countryName = await renderCountryName(country_code)
        console.log("country Name", countryName)
        const data = await getHolidays()
        const holidayList = document.getElementById("holidays-list")
        const ulHolidayList = holidayList.children[1]
        ulHolidayList.innerHTML = ""
        const titleCountry = holidayList.firstElementChild
        titleCountry.innerHTML = `Holidays of ${countryName}`
        data.holidays.forEach((holiday, index) => {
            const x = document.createElement("li")
            x.innerHTML = `<div class="bullet">${index+1}</div>
            <div class="li-wrapper">
              <div class="li-title">${holiday.name}</div>
              <div class="li-text">${holiday.weekday.date.name} - ${holiday.date}</div>
            </div>`
            ulHolidayList.appendChild(x)
        })
    } catch (error) {
        console.log("error", error)
    }
}
document.getElementById("holidays-btn").addEventListener("click", ()=>{renderHolidays()})


