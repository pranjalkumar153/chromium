var dat;
chrome.storage.sync.get("spent_data_array", function(budget) {
    dat = budget.spent_data_array;
    console.log(dat);
});

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
                minimum: new Date(),
                maximum: new Date()
            }
        }
    });
    console.log(dat);
    console.log("From window.onLoad");
    $.getJSON(dat, function(data) {
        for (var i = 0; i < data.length; i++) {
            dataPoints.push({
                x: new Date(data[i].date.yy, data[i].date.mm, data[i].date.dd),
                y: Number(data[i].spent_amount)
            });
        }
        stockChart.render();
    });
};