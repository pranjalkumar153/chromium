$(function() {
    chrome.storage.sync.get(["total", "limit"], function(budget) {
        if (budget.total) {
            var total_amount = parseInt(budget.total, 10);
            $("#total_spent_amount").text(total_amount);
        } else if (!(budget.total)) {
            $("#total_spent_amount").text("NA");
        }
        if (budget.limit) {
            var limit_value = parseInt(budget.limit, 10);
            $("#spending_limit").text(limit_value);
        } else if (!(budget.limit)) {
            $("#spending_limit").text("NA");
        }
    });
    $("#spend_amount").click(function() {
        var newTotal = 0;
        if ($("#entered_amount").val()) {
            var spent_value = parseInt($("#entered_amount").val(), 10);
            newTotal += spent_value;
            $("#entered_amount").val("");
        }
        chrome.storage.sync.get("total", function(budget) {
            if (budget.total)
                newTotal += parseInt(budget.total, 10);
            chrome.storage.sync.set({ "total": newTotal }, function() {
                $("#total_spent_amount").text(newTotal);
                $("#entered_amount").val("");
            });
        });
    });
});