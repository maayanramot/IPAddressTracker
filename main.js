const secret_api = 'at_swvLpxqpWcx6ewiI7FSmL4Ez9Nf6G'
const api_uri = 'https://geo.ipify.org/api/v2/country,city'

// elements to update
let current_ip = document.getElementById('current_ip')
let current_town = document.getElementById('current_town')
let current_zone = document.getElementById('current_zone')
let current_isp = document.getElementById('current_isp')

// form elements
const entered_ip = document.getElementById('inputIP')
const search_btn = document.getElementById('searchBtn')

const map = L.map('map', {
  center: [0, 0],
  zoom: 0,
  layers: [
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    }),
  ],
})

updateMarker = (update_marker = [-33.665, 18.993]) => {
  map.setView(update_marker, 13)
  L.marker(update_marker).addTo(map)
}

getIPDetails = (default_ip) => {
  let ip_url = ''
  if (default_ip == undefined) {
    ip_url = `${api_uri}?apiKey=${secret_api}`
  } else {
    ip_url = `${api_uri}?apiKey=${secret_api}&ipAddress=${default_ip}`
  }
  fetch(`${ip_url}`)
    .then((results) => results.json())
    .then((data) => {
      current_ip.innerHTML = `${data['ip']}`
      current_town.innerHTML = `${data['location']['city']} ${data['location']['country']} ${data['location']['postalCode']}`
      current_zone.innerHTML = `${data['location']['timezone']}`
      current_isp.innerHTML = `${data['isp']}`

      // update map marker
      updateMarker([data['location']['lat'], data['location']['lng']])
    })
    .catch((error) => {
      alert('Unable to get IP details')
      console.log(error)
    })
}

document.addEventListener('load', updateMarker())

search_btn.addEventListener('click', (e) => {
  e.preventDefault()
  console.log('e.preventDefault()')
  if (entered_ip.value != '' && entered_ip.value != null) {
    getIPDetails(entered_ip.value)
    return
  }
  alert('Please enter a valid IP address')
})
