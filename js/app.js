const ui = new UI()

document.addEventListener('DOMContentLoaded', () => {
    ui.showGasStation();
})

// Enable gas station search
const searcher = document.querySelector('#search input');
const form = document.querySelector('#search');
form.addEventListener('submit', e => {
    e.preventDefault();
    if (searcher.value.length > 4) {
        
        ui.getSuggestions(searcher.value)
    } else {
        ui.showGasStation();
    }
})