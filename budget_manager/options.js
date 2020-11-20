$(function() {
    $("#set_limit").click(function() {
        if ($("#set_the_limit").val()) {
            var limit_value = parseInt($("#set_the_limit").val());
            chrome.storage.sync.set({ "limit": limit_value }, function() {
                $("#spending_limit").text(limit_value);
                $("#set_the_limit").val("");
            });
        }
    });
    $("#reset").click(function() {
        chrome.storage.sync.set({ "total": 0 }, function() {
            $("#set_the_limit").val("");
        });
    });
});