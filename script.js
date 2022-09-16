// TOKEN is Required to Access the SuperHeroAPI website
const SUPERHERO_TOKEN = '1128719634691898'
// For some cases we use .php
const BASE_URL = `https://superheroapi.com/api.php/${SUPERHERO_TOKEN}`

// Global Access for the ID'S
const heroBtn = document.getElementById('heroBtn')
const heroImageDiv =  document.getElementById('heroImage')
const searchBtn = document.getElementById('searchBtn')
const searchInput = document.getElementById('searchInput') //Console inputs Value in searchHeroByName() Function
const heroPowerStatsDiv = document.getElementById('heroPowerStats')

// function to get super hero
const getRandomSuperHero = (id, name) => {
    // Search by ID:- base_url/id
    // Search by ID:- when we search by ID it will Give only ONE result

    // Fetch in this FORMAT
    fetch(`${BASE_URL}/${id}`)
    .then(response => response.json())
    .then(json => {
        console.log(json)
        const superHero = json
        showHeroInfo(superHero) 
    })
}

// Function to get POWERSTATS and Show
const showHeroInfo = (character) => {
    // const name = `<h2>${character.name}</h2>`
    const heroName = document.getElementById('heroName').innerHTML = `${character.name}`
  
    const img = `<img src="${character.image.url}" height=260 width=260/>`
    
    // For POWERSTATS
    const powerStats = Object.keys(character.powerstats).map(stat => {
      return `<p>👉${stat.toUpperCase()}: ${character.powerstats[stat]}</p>`
    }).join('')

    // For BIOGRAPHY STATS
    const biographyStats = Object.keys(character.biography).map(stat => {
        return `<p>👉${stat.toUpperCase()}: ${character.biography[stat]}</p>`
      }).join('')

    const connectionsStats = Object.keys(character.connections).map(stat => {
        return `<p>👉${stat.toUpperCase()}: ${character.connections[stat]}</p>`
      }).join('')
      
      const workStats = Object.keys(character.work).map(stat => {
        return `<p>👉${stat.toUpperCase()}: ${character.work[stat]}</p>`
      }).join('')  

    // Grab the Body Tag to Change theinnnerHTML and use json.image.url to get image, {name} to get name
    heroImageDiv.innerHTML = `${img}`
    heroPowerStatsDiv.innerHTML = `⚔️POWER-STATS${powerStats}`
    const heroBiographyStats = document.getElementById('heroBiographyStats').innerHTML = `🧍BIOGRAPHY-STATS${biographyStats}`
    const heroConnectionsStats = document.getElementById('heroConnectionsStats').innerHTML = `⛓️CONNECTIONS-STATS${connectionsStats}` 
    const heroWorkStats = document.getElementById('heroWorkStats').innerHTML = `🧠WORK-STATS${workStats}`
  }

  
// Funnction to search hero by name 
    // API HEIRARCHY By SuperHero API to Search
    // Search by Name :- base_url/search/name
    // Search by Name:- when we search by name it will give Multiple results(HEROS) so we Take Out the First One, result is the KEY HERE
    // json.result[0].image.url
const searchHeroByName = (name) => {

    // Grab Input Value here and Pass this value onclick to searchHeroByName() Function
    // This will Make Sure when the USER Search it will take the Value And FETCH the HERO by Name
    searchInput.value

    // fetch base_url/search/name
    fetch(`${BASE_URL}/search/${name}`)
    .then(response => response.json())
    .then(json => {
        const hero = json.results[0]
        showHeroInfo(hero)
    })
}

// Function to search

// Function to pick Random Hero
const randomHero = () => {
    const numberOfHeros = 731
    // +1 because if it selects 0 it will add 1 and if it selects 730 it will add 1, so it remains between 1-731, Math.floor will never select 731 i.e not selecting the Upper Bound
    return Math.floor(Math.random() * numberOfHeros) + 1
}

// For Random Hero Button
heroBtn.onclick = () => getRandomSuperHero(randomHero())

// For Search Button, Pass Input Value to Get the Searched Hero by Click
searchBtn.onclick = () => searchHeroByName(searchInput.value)