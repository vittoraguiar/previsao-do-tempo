const local = document.querySelector("#local");
const graus = document.querySelector("#graus");
const input = document.querySelector("input");
const button = document.querySelector("button");

button.addEventListener("click", () => {
    if (!input.value) return;
    getApiData();
});

async function getApiData() {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(
        input.value
    )}&units=metric&appid={YOUR_APIKEY}`;
    try {
        await fetch(url)
            .then((res) => res.json())
            .then((data) => {
                if (data?.cod && data.cod === "404") {
                    return alert("O local não foi encontrado!");
                }
                loadData(data);
            });
    } catch (error) {
        alert(error);
    }
}

function loadData(data) {
    local.innerHTML = `${data.name}, ${data.sys.country}`;
    graus.innerHTML = `Temperatura: ${Math.floor(data.main.temp)}° C`;
}