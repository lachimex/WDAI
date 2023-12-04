function compareByTitleDesc(a, b){
    var comparison = a.title.localeCompare(b.title);
    return -comparison;
}

function compareByTitleAsc(a, b){
    var comparison = a.title.localeCompare(b.title);
    return comparison;
}

async function fetchWithSorting(sortingFunction){
   await fetch('https://dummyjson.com/products')
  .then(response => response.json()) // Parsowanie odpowiedzi jako JSON
  .then(data => {
    // Tutaj masz obiekt JavaScript zawierający dane z pliku JSON
    if (sortingFunction != null){
        data.products.sort(sortingFunction);
    }
    let placeholder = document.querySelector("#data-output");
            let out = "";
            for (let i = 0; i < 30; i++) {
                let product = data.products[i];
                out += `
                <div id="data-content">
                    <div id = "img">
                        <img src="${product.thumbnail}" alt="">
                    </div>
                    <div id = "title">
                        <p>${product.title}</p>
                    </div>
                    <p>${product.description}</p>
                </div>
                `;
            }

            placeholder.innerHTML = out;

    // Możesz teraz pracować z danymi, np. wyświetlić je w konsoli lub wykonać inne operacje.
  })
  .catch(error => {
    console.error('Błąd podczas pobierania danych JSON:', error);
  });
}

var inputElement = document.getElementById('myInput');
inputElement.addEventListener('input', function(event) {
    var inputValue = inputElement.value;
    filter(inputValue);

});

async function filter(inputValue){
    await fetch('https://dummyjson.com/products')
  .then(response => response.json())
  .then(data => {
    let placeholder = document.querySelector("#data-output");
            let out = "";
            for (let i = 0; i < 30; i++) {
                let product = data.products[i];
                if (product.title.toLowerCase().includes(inputValue.toLowerCase())){
                    out += `
                    <div id="data-content">
                        <div id = "img">
                            <img src="${product.thumbnail}" alt="">
                        </div>
                        <div id = "title">
                            <p>${product.title}</p>
                        </div>
                        <p>${product.description}</p>
                    </div>
                    `;
                }
            }
            placeholder.innerHTML = out;
  })
  .catch(error => {
    console.error('Błąd podczas pobierania danych JSON:', error);
  });
}

fetchWithSorting(null)