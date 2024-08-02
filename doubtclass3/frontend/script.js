function onSubmitForm() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const password = document.getElementById("password").value;

    // send it to my backend server.
    //   we want to pass the above data in request body.
    //   And we want to call localhost:8080/user -> POST
    fetch("http://localhost:8080/user", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name,
            email,
            phone,
            password,
        }),
    }).then((response) => {
        console.log(response);
    });
}
