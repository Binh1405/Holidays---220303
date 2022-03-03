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
        const country_code = document.getElementById("country-query").value
        const language_code = document.getElementById("language-query").value
        const year_code = document.getElementById("year-query").value
        const month_code = document.getElementById("month-query").value
        const day_code = document.getElementById("day-query").value
        const search_code = document.getElementById("search-query").value
        const url = `https://holidayapi.com/v1/holidays?year=${year_code}&country=${country_code}&language=${language_code}&search=${search_code}&month=${month_code}&day=${day_code}&key=${API_KEY}`
        console.log("url", url)
        const response = await fetch(url)
        const data = await response.json()
        console.log("holidays",data)
        return data
    } catch (error) {
        console.log("error", error)
        alert("wrong input")
    }
}
// getHolidays()

const renderCountryName = async(code) => {
    try {
    const holidayList = document.getElementById("holidays-list")
    const titleCountry = holidayList.firstElementChild
    console.log("titleCountry", titleCountry)
    const name = await getCountries()
    console.log("countries", name)
    name.countries.find((country) => {
        if(country.code == code){
            console.log("country code", country.code)
            titleCountry.textContent = `Holidays of ${country.name}`
            console.log("titleCountry", titleCountry)
            return titleCountry
        }
    }
    )
} catch (error) {
        console.log("error", error)
    }
}

const renderHolidays = async()=>{
    try {
        const data = await getHolidays()
        const holidayList = document.getElementById("holidays-list")
        const ulHolidayList = holidayList.children[1]
        ulHolidayList.innerHTML = ""
        data.holidays.forEach((holiday, index) => {
            const x = document.createElement("li")
            x.innerHTML = `<div class="bullet">${index+1}</div>
            <div class="li-wrapper">
              <div class="li-title">${holiday.name}</div>
              <div class="li-text">${holiday.weekday.date.name} - ${holiday.date}</div>
            </div>`
            ulHolidayList.appendChild(x)
        })
        const country_code = document.getElementById("country-query").value
        renderCountryName(country_code)
    } catch (error) {
        console.log("error", error)
    }
}
document.getElementById("holidays-btn").addEventListener("click", ()=>{renderHolidays()})

//Render Language List

const getLanguages = async()=>{
    try {
        const url = `https://holidayapi.com/v1/languages?pretty&key=${API_KEY}`
        const response = await fetch(url)
        const data = await response.json()
        console.log("languages", data)
        return data
    } catch (error) {
        console.log("error", error)
    }
}
const renderLanguages = async() =>{
    try {
        const languages = await getLanguages()
        const languageList = document.getElementById("languages-list")
        const ulLanguage = languageList.children[2]
        ulLanguage.innerHTML = ""
        languages.languages.forEach((language, index) => {
            const x = document.createElement('li')
            x.innerHTML = `<div class="bullet">${index+1}</div>
            <div class="li-wrapper">
              <div class="li-title">${language.name}</div>
              <div class="li-text">Code: ${language.code}</div>
            </div>`
            ulLanguage.appendChild(x)
        })
    } catch (error) {
        console.log("error", error)
    }
}
document.getElementById("languages-list-btn").addEventListener("click", ()=>{renderLanguages()})
