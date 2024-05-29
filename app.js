class AlphaVantageAPI {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.baseUrl = 'https://www.alphavantage.co/query?';
    }

    async fetchData(symbol) {
        const url = `${this.baseUrl}function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${this.apiKey}`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log('API Response:', data); 
            return data;
        } catch (error) {
            console.error('Fetch error:', error);
        }
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    const apiKey = 'KBY8OSGF4TCT86Q8'; 
    const symbol = 'AAPL'; 

    const api = new AlphaVantageAPI(apiKey);
    const data = await api.fetchData(symbol);

    if (data && data['Time Series (Daily)']) { 
        const container = document.getElementById('dataContainer');
        const timeSeries = data['Time Series (Daily)'];
        const latestDate = Object.keys(timeSeries)[0];
        const latestData = timeSeries[latestDate];
        const content = `
            <h2>${symbol} - ${latestDate}</h2>
            <p><strong>Open:</strong> ${latestData['1. open']}</p>
            <p><strong>High:</strong> ${latestData['2. high']}</p>
            <p><strong>Low:</strong> ${latestData['3. low']}</p>
            <p><strong>Close:</strong> ${latestData['4. close']}</p>
            <p><strong>Volume:</strong> ${latestData['5. volume']}</p>
        `;

        container.innerHTML = content;
    } else {
        console.error('Invalid data format:', data); 
        container.innerHTML = '<p>Veri alınamadı.</p>';
    }
});










/*
const apiKey = 'KBY8OSGF4TCT86Q8'; 
const symbol = 'AAPL'; 
const baseUrl = 'https://www.alphavantage.co/query?';

const url = `${baseUrl}function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${apiKey}`;

fetch(url)
    .then(response => response.json())
    .then(data => console.log('API Response:', data));
*/

