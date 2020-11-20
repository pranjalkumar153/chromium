$(function() {
    chrome.storage.sync.get(["total", "limit"], function(budget) {
        if (budget.total) {
            var total_amount = parseInt(budget.total);
            $("#total_spent_amount").text(toString(total_amount));
        }
        if (budget.limit) {
            var limit_value = parseInt(budget.limit);
            $("#spending_limit").text(toString(limit_value));
        }
    });
});