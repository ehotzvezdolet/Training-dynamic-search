const api = `api.json`;

const stations = [];

fetch(api).then(res => res.json()).then(data => {
 data.forEach(line => {
  stations.push(...line.stations)
 })
})

const searchInput = document.querySelector('.search');
const searchOptions = document.querySelector('.options');

function getOptions(word, stations) {
 return stations.filter(s => {
  const regex = new RegExp(word, 'gi');
  return s.name.match(regex);
 })
}

function showOptions() {
 const result = getOptions(this.value, stations);
 const html = result.map(station => {
  const regex = new RegExp(this.value, 'gi');
  const newName = station.name.replace(regex, `<span class="hl">${this.value}</span>`);
  return `<li><span>${newName}</span></li>`
 }).slice(0, 7).join('');
 searchOptions.innerHTML = this.value ? html : null;
}

searchInput.addEventListener('change', showOptions);
searchInput.addEventListener('keyup', showOptions);