window.onload = function() {
    var dataPoints = [];
    var stockChart = new CanvasJS.StockChart("stockChartContainer", {
        title: {
            text: "Exchange Rate for EUR to USD"
        },
        charts: [{
            data: [{
                type: "splineArea",
                color: "#3698C5",
                yValueFormatString: "€1 = $#,###.##",
                dataPoints: dataPoints
            }]
        }],
        navigator: {
            slider: {
                minimum: new Date(2015, 0, 01),
                maximum: new Date(2016, 0, 01)
            }
        }
    });
    $.getJSON("https://canvasjs.com/data/gallery/stock-chart/usdeur.json", function(data) {
        for (var i = 0; i < data.length; i++) {
            dataPoints.push({ x: new Date(data[i].date), y: Number(data[i].price) });
        }
        stockChart.render();
    });
};