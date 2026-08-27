const form = document.getElementById("subscribeForm");

form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value;

    try {
        const response = await fetch("/subscribe", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: email })
        });

        const result = await response.json();

        if (response.ok) {
            alert(result.message);
            form.reset();
        } else {
            alert("Something went wrong.");
        }
    } catch (error) {
        alert("Could not connect to the server.");
    }
});