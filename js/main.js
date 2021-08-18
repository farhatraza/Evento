function validateForm() {
    $(".text-danger").text('');
    $(".text-danger").attr('hidden', true);
    let x = document.forms["registration-form"]["firstName"].value;
    if (x == "") {
        document.getElementById("firstName_vText").innerHTML = "First Name is required";
        $("#firstName_vText").removeAttr('hidden');
        return false;
    }
    x = document.forms["registration-form"]["lastName"].value;
    if (x == "") {
        document.getElementById("lastName_vText").innerHTML = "Last Name is required";
        $("#lastName_vText").removeAttr('hidden');
        return false;
    }
    x = document.forms["registration-form"]["address"].value;
    if (x == "") {
        document.getElementById("address_vText").innerHTML = "Address is required";
        $("#address_vText").removeAttr('hidden');
        return false;
    }
    x = document.forms["registration-form"]["city"].value;
    if (x == "") {
        document.getElementById("city_vText").innerHTML = "City is required";
        $("#city_vText").removeAttr('hidden');
        return false;
    }
    x = document.forms["registration-form"]["province"].value;
    if (x == "") {
        document.getElementById("province_vText").innerHTML = "Province is required";
        $("#province_vText").removeAttr('hidden');
        return false;
    }
    x = document.forms["registration-form"]["postalCode"].value;
    if (x == "") {
        document.getElementById("postalCode_vText").innerHTML = "Postal Code is required";
        $("#postalCode_vText").removeAttr('hidden');
        return false;
    } else if (null == x.match(/[0-9][a-zA-Z][0-9](-| |)[a-zA-Z][0-9][a-zA-Z]/)) {
        document.getElementById("postalCode_vText").innerHTML = "Pattern: NAN ANA";
        $("#postalCode_vText").removeAttr('hidden');
        return false;
    }
    x = document.forms["registration-form"]["phoneNumber"].value;
    if (x == "") {
        $("#phoneNumber_vText").text("Phone Number is required");
        $("#phoneNumber_vText").removeAttr('hidden');
        return false;
    } else if (null == x.match(/[(]?[0-9]{3}[)]?[-]?[0-9]{3}[-][0-9]{4}/)) {
        document.getElementById("phoneNumber_vText").innerHTML = "Pattern: 123-123-1234 or (123)123-1234";
        $("#phoneNumber_vText").removeAttr('hidden');
        return false;
    }
    x = document.forms["registration-form"]["emailAddress"].value;
    if (x == "") {
        document.getElementById("emailAddress_vText").innerHTML = "Email Address is required";
        $("#emailAddress_vText").removeAttr('hidden');
        return false;
    }
    let usersCount = document.forms["registration-form"]["usersCount"].value;
    if (usersCount == "") {
        document.getElementById("usersCount_vText").innerHTML = "Attendees Number is required";
        $("#usersCount_vText").removeAttr('hidden');
        return false;
    }
    var days = [];
    $.each($("input[name='day']:checked"), function () {
        days.push($(this).val());
    });
    if (days.length < 1) {
        $('#day_vText').text("Select at least 1 day");
        $("#day_vText").removeAttr('hidden');
        return false;
    }

    registerUser().then(() => {
        let message = "Congratulations!!!! You are now registered for Evento for Day ";
        let price = 0;
        $.each(days, (i, val) => {
            if (i == 1) message += " and Day ";
            if (val == 1) {
                price += 350;
                message += val;
            }
            if (val == 2) {
                price += 450;
                message += val;
            }
        });
        price = days.length > 1 ? price - 50 : price;
        price *= usersCount;
        price = usersCount > 5 ? price - price * 0.1 : price;
        message += `. Your total would be $ ${price}`;
        localStorage.setItem("message", message);
    }).then(() => {
        return true;
    })
}

// Functions to Save Registration
async function registerUser() {
    let formData = {
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        address: document.getElementById("address").value,
        city: document.getElementById("city").value,
        province: document.getElementById("province").value,
        postalCode: document.getElementById("postalCode").value,
        phoneNumber: document.getElementById("phoneNumber").value,
        emailAddress: document.getElementById("emailAddress").value,
        usersCount: document.getElementById("usersCount").value
    }
    if (typeof (Storage) !== "undefined") {
        let users = localStorage.getItem("users");
        if (users === null)
            users = [];
        else
            users = JSON.parse(users);
        users.push(formData);
        localStorage.setItem("users", JSON.stringify(users));
        return true;
    } else {
        return false;
    }
}

