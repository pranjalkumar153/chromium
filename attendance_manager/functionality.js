$(function() {
    //=====================================================================================//
    //FUNCTIONALITY FOR MARKING THE ATTENDENCE                                             //
    //=====================================================================================//
    $(document).on("click", ".mark_attendence", function() {
        var sub_id = $(this).parent().parent().parent().attr("id");
        chrome.storage.sync.get(["subject_list"], function(res) {
            var aux_sub_list = res.subject_list;
            for (var i = 0; i < aux_sub_list.length; i++) {
                if (sub_id == aux_sub_list[i].sub_name_for_id) {
                    aux_sub_list[i].classes_attended = aux_sub_list[i].classes_attended + 1;
                    aux_sub_list[i].classes_held = aux_sub_list[i].classes_held + 1;
                }
            }
            chrome.storage.sync.set({ "subject_list": aux_sub_list }, function() {
                location.reload();
            });
        });
    });
    //=====================================================================================//
    //FUNCTIONALITY FOR MARKING ABSENT                                                     //
    //=====================================================================================//
    $(document).on("click", ".mark_absent", function() {
        var sub_id = $(this).parent().parent().parent().attr("id");
        chrome.storage.sync.get(["subject_list"], function(res) {
            var aux_sub_list = res.subject_list;
            for (var i = 0; i < aux_sub_list.length; i++) {
                if (sub_id == aux_sub_list[i].sub_name_for_id) {
                    aux_sub_list[i].classes_held = aux_sub_list[i].classes_held + 1;
                }
            }
            chrome.storage.sync.set({ "subject_list": aux_sub_list }, function() {
                location.reload();
            });
        });
    });
    //=====================================================================================//
    //FUNCTIONALITY FOR REMOVING THE SUBJECT                                               //
    //=====================================================================================//
    $(document).on("click", ".remove_subject", function() {
        var sub_id = $(this).parent().parent().parent().attr("id");
        chrome.storage.sync.get(["subject_list"], function(res) {
            var aux_sub_list = [];
            var sub_list = res.subject_list;
            for (var i = 0; i < sub_list.length; i++) {
                if (sub_id != sub_list[i].sub_name_for_id) {
                    aux_sub_list.push(sub_list[i]);
                }
            }
            chrome.storage.sync.set({ "subject_list": aux_sub_list }, function() {
                location.reload();
            });
        });
    });
    //=====================================================================================//
    //FUNCTIONALITY FOR PERCENTAGE SETTING                                                 //
    // <div class="input-group">
    //     <input type="text" class="form-control" placeholder="Enter Percentage" aria-label="Recipient's username with two button addons" id="set_percentage">
    //     <button class="btn btn-primary" type="button" id="set_percent">Set Percentage</button>
    // </div>
    //=====================================================================================//
    $("#set_percent").click(function() {
        var percent = $("#set_percentage").val();
        percent = parseInt(percent);
        if ((percent) && (percent != "")) {
            chrome.storage.sync.set({ "percentage": percent }, function() {
                alert("Percentage set successfully!!");
                $("#set_percentage").val("");
            });
        }
    });
});