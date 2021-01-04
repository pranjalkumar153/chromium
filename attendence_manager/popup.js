$(function() {

    //=====================================================================================//
    //ADD BUTTON FUNCTIONALITY                                                             //
    //=====================================================================================//
    $("#add_subject").click(function() {
        var sub_name = $("#subject_name").val();
        chrome.storage.sync.get(["subject_list"], function(res) {
            var sub_list;
            if (sub_name != "" && sub_name) {
                if (!res.subject_list) {
                    sub_list = [];
                    sub_list.push(sub_name);
                    chrome.storage.sync.set({ "subject_list": sub_list }, function() {
                        console.log("New Subject Added!!");
                        alert("New Subject Added Successfully!!");
                    });
                } else {
                    sub_list = res.subject_list;
                    var f = true;
                    // handling duplicates
                    for (var i = 0; i < sub_list.length; i++) {
                        if (sub_name == sub_list[i]) {
                            f = false;
                            break;
                        }
                    }
                    if (f) {
                        sub_list.push(sub_name);
                        chrome.storage.sync.set({ "subject_list": sub_list }, function() {
                            console.log("New Subject Added!!");
                            alert("New Subject Added Successfully!!");
                        });
                    } else {
                        alert("The subject already exists!!");
                        console.log("The subject already exists!!");
                    }
                }
            }
            $("#subject_name").val("");
            location.reload();
        });
    });
    //=====================================================================================//
    //REMOVE BUTTON FUNCTIONALITY                                                          //
    //=====================================================================================//
    $("#remove_subject").click(function() {
        var sub_name = $("#subject_name").val();
        chrome.storage.sync.get(["subject_list"], function(res) {
            var sub_list = res.subject_list;
            if (!sub_list) {
                console.log("Your subject list is empty!! Hence can't remove any subject.");
                alert("Your subject list is empty!! Hence can't remove any subject.");
            } else {
                var f = false;
                var aux_sub_list = [];
                for (var i = 0; i < sub_list.length; i++) {
                    if (sub_name != sub_list[i]) {
                        aux_sub_list.push(sub_list[i]);
                    } else {
                        f = true;
                    }
                }
                chrome.storage.sync.set({ "subject_list": aux_sub_list }, function() {
                    if (!f) {
                        console.log("The subject which you were trying to delete isn't available!!");
                        alert("The subject which you were trying to delete isn't available!");
                    } else {
                        console.log("Subject successfully deleted!!");
                        alert("Subject successfully deleted!!");
                    }
                });
            }
        });
        $("#subject_name").val("");
        location.reload();
    });
});