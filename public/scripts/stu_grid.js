function changeModal(ucid){
    $("#stu_modal").html('');
    $.ajax({
        url: "/students/" + ucid + "?partial=true",
        type: "GET",
        success: function(result){
            $("#stu_modal").empty().append(result);
        }
    });
}