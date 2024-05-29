document.addEventListener('DOMContentLoaded', () => {
    const exchangeSelect = document.getElementById('exchange-select');
    const headers = document.querySelectorAll('.header');
    const tableBody = document.querySelector('#stock-table tbody');
    const toggleThemeBtn = document.getElementById('toggle-theme');
    let currentExchange = exchangeSelect.value;
    let currentList = 0;
    let timer;

    

    // or we can use fetch instead xhttp
    // function fetchData() {
    //     fetch(`https://livefeed3.chartnexus.com/Dummy/quotes?market_id=${currentExchange}&list=${currentList}`)
    //         .then(response => response.json())
    //         .then(data => updateTable(data))
    //         .catch(error => console.error('Error fetching data:', error));
    // }


    // AJAX
    function fetchData() {
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                const data = JSON.parse(this.responseText);
                updateTable(data);
            } else if (this.readyState === 4) {
                console.error('Error fetching data:', this.statusText);
            }
        };
        xhttp.open("GET", `https://livefeed3.chartnexus.com/Dummy/quotes?market_id=${currentExchange}&list=${currentList}`, true);
        xhttp.send();
    }

    function updateTable(data) {
        tableBody.innerHTML = '';
        data.forEach(stock => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${stock.stockcode}</td>
                <td>${stock.stockcode}</td>
                <td class="last">${stock.last}</td>
                <td>${stock.volume}</td>
                <td>${stock.buy_price}</td>
                <td>${stock.buy_volume}</td>
                <td>${stock.sell_price}</td>
                <td>${stock.sell_volume}</td>
                <td class="change">${(stock.last - stock.previous).toFixed(2)}</td>
                <td class="percent">${((stock.last - stock.previous) / stock.previous * 100).toFixed(2)}%</td>
            `;
            tableBody.appendChild(row);
        });
    }

    function switchList(event) {
        currentList = event.target.dataset.list;
        headers.forEach(header => header.classList.remove('active'));
        event.target.classList.add('active');
        fetchData();
    }

    function toggleTheme() {
        document.body.classList.toggle('dark-theme');
        document.body.classList.toggle('light-theme');
    }

    exchangeSelect.addEventListener('change', (event) => {
        currentExchange = event.target.value;
        fetchData();
    });

    headers.forEach(header => {
        header.addEventListener('click', switchList);
    });

    toggleThemeBtn.addEventListener('click', toggleTheme);

    fetchData();
    //Set interval about 5 seconds
    timer = setInterval(fetchData, 5000);
});
