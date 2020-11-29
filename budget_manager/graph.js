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
// spent_data_array: spent_data_array_graph
// flipkart: flipkart_graph
// amazon: amazon_graph
// myntra: amazon_graph
// snapdeal: snapdeal_graph
// others: others_graph
// overall spendings
chrome.storage.sync.get("spent_data_array", function(budget) {
    var x = resolve_for_graph(budget.spent_data_array);
    console.log(x);
    chrome.storage.sync.set({ "spent_data_array_graph": x });
});
// flipkart
chrome.storage.sync.get("flipkart", function(budget) {
    var x = resolve_for_graph(budget.flipkart);
    console.log(x);
    chrome.storage.sync.set({ "flipkart_graph": x });
});
// amazon
chrome.storage.sync.get("amazon", function(budget) {
    var x = resolve_for_graph(budget.amazon);
    console.log(x);
    chrome.storage.sync.set({ "amazon_graph": x });
});

// myntra
chrome.storage.sync.get("myntra", function(budget) {
    var x = resolve_for_graph(budget.myntra);
    console.log(x);
    chrome.storage.sync.set({ "myntra_graph": x });
});

// snapdeal
chrome.storage.sync.get("snapdeal", function(budget) {
    var x = resolve_for_graph(budget.snapdeal);
    console.log(x);
    chrome.storage.sync.set({ "snapdeal_graph": x });
});

// others
chrome.storage.sync.get("others", function(budget) {
    var x = resolve_for_graph(budget.others);
    console.log(x);
    chrome.storage.sync.set({ "others_graph": x });
});