$(document).ready(function() {
    $("#kanoe_kamarad").on("input", function() {
            
        var kamarad = $('#kanoe_kamarad').val();
        var submiter = $("#sub-btn")
        if(kamarad.length > 0) {
            $.ajax({
                url: "/check-kamarad/" + kamarad,
                type: "POST",
                success: function(data) {
                    if (data === "True") {
                        $("#kanoe_kamarad").css("background-color", "#98fb98");
                        $("#sub-btn").prop("disabled", false);
                        $("#sub-btn").css("background-color", "")
                        $("#sub-btn").val("Odeslat")
                    } else {
                        $("#kanoe_kamarad").css("background-color", "#f08080");
                        $("#sub-btn").prop("disabled", true);
                        $("#sub-btn").val("  ❌  ")


                    }
                },
                error: function() {
                    $("#kanoe_kamarad").css("background-color", "#f08080");
                }
            });
        }
        
    });



    $('#form').submit(function(event) {
        
        var kamarad = $('#kanoe_kamarad').val();
        let odeslat = "True"
        


        

        var plavec = $('#je_plavec').val();
        var nick = $('#nick').val();
        var kamarad = $('#kanoe_kamarad').val();

        if (plavec === '0') {
            alert('Nemůžete odeslat formulář, pokud nejste plavec.');
            $('#je_plavec').css('background-color', 'red'); 
            event.preventDefault(); 
            return;
        } else {
            $('#je_plavec').css('background-color', ''); 
        }

   
        if (nick.length < 2 || nick.length > 20) {
            alert('Nick musí mít 2-20 znaků.');
            $('#nick').css('background-color', 'red');
            event.preventDefault(); 
            return;
        } else {
            $('#nick').css('background-color', ''); 
        }

  
        if (kamarad && (kamarad.length < 2 || kamarad.length > 20)) {
            alert('Kamarád musí mít 2-20 znaků nebo být prázdný.');
            $('#kanoe_kamarad').css('background-color', 'red'); 
            event.preventDefault(); 
            return;
        } else {
            $('#kanoe_kamarad').css('background-color', ''); 
        }
        if(odeslat === "True"){
            alert("Úspěšně jste se přihlásili!")
        } else {
            event.preventDefault();
        }
   
    });
});

$(document).ready(function() {
    $("#nick").on("input", function() {
        var username = $("#nick").val();
        var submiter = $("#sub-btn")
        if(username.length > 0) {
            $.ajax({
                url: "/check-username/" + username,
                type: "POST",
                success: function(data) {
                    if (data === "True") {
                        $("#nick").css("background-color", "#98fb98");
                        $("#sub-btn").prop("disabled", false);
                        $("#sub-btn").css("background-color", "")
                        $("#sub-btn").val("Odeslat")
                    } else {
                        $("#nick").css("background-color", "#f08080");
                        $("#sub-btn").prop("disabled", true);
                        $("#sub-btn").val("  ❌  ")


                    }
                },
                error: function() {
                    $("#nick").css("background-color", "#f08080");
                }
            });
        }
        
    });
})

