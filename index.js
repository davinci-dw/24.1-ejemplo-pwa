const URL = "https://ca1cee33-bafc-422e-b286-7bf52f206284-00-2c9r22u7xggi0.riker.replit.dev"

const showList = (list) => {
    const container = document.querySelector('.container');
    list.forEach(element => {
        container.innerHTML += `
            <div class="card horizontal">
                <div class="card-image">
                <img src="${element.image}">
                </div>
                <div class="card-stacked">
                <div class="card-content">
                    <p>
                    ${element.description}
                    </p>
                </div>
                <div class="card-action">
                    <a href="/detalles/?id=${element.id}">Conocer más</a>
                </div>
                </div>
            </div>
        `;
    });
}

const getList = async () => {
    const result = await fetch(`${URL}/list/`).then(data => data.json());
    showList(result.plants);
    const counter = result.plants.length;
    M.toast({html: `¡Se encontraron ${counter} plantas!`})
}

getList();

if(navigator?.serviceWorker) {
    navigator.serviceWorker.register('./sw.js').then((register) => {
        M.toast({html: `Modo offline activado`})
    })
    .catch((error) => {
        console.log("")
    })
}