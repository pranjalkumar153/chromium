// var dat;
// chrome.storage.sync.get("spent_data_array", function(budget) {
//     dat = budget.spent_data_array;
//     dat = JSON.stringify(dat);
//     console.log(dat);
// });

// window.onload = function() {
//     var dataPoints = [];
//     var stockChart = new CanvasJS.StockChart("stockChartContainer", {
//         title: {
//             text: "Exchange Rate for EUR to USD"
//         },
//         charts: [{
//             data: [{
//                 type: "splineArea",
//                 color: "#3698C5",
//                 yValueFormatString: "€1 = $#,###.##",
//                 dataPoints: dataPoints
//             }]
//         }],
//         navigator: {
//             slider: {
//                 minimum: new Date(),
//                 maximum: new Date()
//             }
//         }
//     });
//     // var url = chrome.runtime.getURL('usedeur.json');
//     // //console.log(dat);
//     // console.log("From window.onLoad");
//     $.getJSON("usdeur.json", function(data) {
//         for (var i = 0; i < data.length; i++) {
//             dataPoints.push({
//                 x: new Date(data[i].date.yy, data[i].date.mm, data[i].date.dd),
//                 y: Number(data[i].spent_amount)
//             });
//         }
//         stockChart.render();
//     });
// };

// required function for graph of data
function resolve_for_graph(arr) {
    var arr_new = [];
    if (!arr) {
        return [];
    } else {
        arr_new.push(arr[0]);
        for (var i = 1; i < arr.length; i++) {
            if (arr_new[arr_new.length - 1].date.dd == arr[i].date.dd &&
                arr_new[arr_new.length - 1].date.mm == arr[i].date.mm &&
                arr_new[arr_new.length - 1].date.yy == arr[i].date.yy) {
                arr_new[arr_new.length - 1].spent_amount += arr[i].spent_amount;
            } else {
                arr_new.push(arr[i]);
            }
        }
        return arr_new;
    }
}

//


window.onload = function() {
    chrome.storage.sync.get("flipkart", function(budget) {
        var dataPoints = [];
        var x = resolve_for_graph(budget.flipkart);
        if (x) {
            for (var i = 0; i < x.length; i++) {
                dataPoints.push({
                    x: new Date(x[i].date.yy, x[i].date.mm, x[i].date.dd),
                    y: Number(x[i].spent_amount)
                });
            }
        }

        var stockChartFlipkart = new CanvasJS.StockChart("flipkart_graph", {
            title: {
                text: "Spendings on Flipkart:"
            },
            charts: [{
                data: [{
                    type: "splineArea",
                    color: "#3698C5",
                    yValueFormatString: "Spent = Rs #,###.##",
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
        stockChartFlipkart.render();
    });
    chrome.storage.sync.get("amazon", function(budget) {
        var dataPoints = [];
        var x = resolve_for_graph(budget.amazon);
        if (x) {
            for (var i = 0; i < x.length; i++) {
                dataPoints.push({
                    x: new Date(x[i].date.yy, x[i].date.mm, x[i].date.dd),
                    y: Number(x[i].spent_amount)
                });
            }
        }

        var stockChartAmazon = new CanvasJS.StockChart("amazon_graph", {
            title: {
                text: "Spendings on Amazon:"
            },
            charts: [{
                data: [{
                    type: "splineArea",
                    color: "#3698C5",
                    yValueFormatString: "Spent = Rs #,###.##",
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
        stockChartAmazon.render();
    });
    chrome.storage.sync.get("snapdeal", function(budget) {
        var dataPoints = [];
        var x = resolve_for_graph(budget.snapdeal);
        if (x) {
            for (var i = 0; i < x.length; i++) {
                dataPoints.push({
                    x: new Date(x[i].date.yy, x[i].date.mm, x[i].date.dd),
                    y: Number(x[i].spent_amount)
                });
            }
        }

        var stockChartSnapdeal = new CanvasJS.StockChart("snapdeal_graph", {
            title: {
                text: "Spendings on Snapdeal:"
            },
            charts: [{
                data: [{
                    type: "splineArea",
                    color: "#3698C5",
                    yValueFormatString: "Spent = Rs #,###.##",
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
        stockChartSnapdeal.render();
    });
    chrome.storage.sync.get("myntra", function(budget) {
        var dataPoints = [];
        var x = resolve_for_graph(budget.myntra);
        if (x) {
            for (var i = 0; i < x.length; i++) {
                dataPoints.push({
                    x: new Date(x[i].date.yy, x[i].date.mm, x[i].date.dd),
                    y: Number(x[i].spent_amount)
                });
            }
        }

        var stockChartMyntra = new CanvasJS.StockChart("myntra_graph", {
            title: {
                text: "Spendings on Myntra:"
            },
            charts: [{
                data: [{
                    type: "splineArea",
                    color: "#3698C5",
                    yValueFormatString: "Spent = Rs #,###.##",
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
        stockChartMyntra.render();
    });
    chrome.storage.sync.get("others", function(budget) {
        var dataPoints = [];
        var x = resolve_for_graph(budget.others);
        if (x) {
            for (var i = 0; i < x.length; i++) {
                dataPoints.push({
                    x: new Date(x[i].date.yy, x[i].date.mm, x[i].date.dd),
                    y: Number(x[i].spent_amount)
                });
            }
        }

        var stockChartOthers = new CanvasJS.StockChart("others_graph", {
            title: {
                text: "Spendings on other websites:"
            },
            charts: [{
                data: [{
                    type: "splineArea",
                    color: "#3698C5",
                    yValueFormatString: "Spent = Rs #,###.##",
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
        stockChartOthers.render();
    });
};