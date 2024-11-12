document.getElementById("menu1").addEventListener("click", async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    const response = await fetch('/api/menu1', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name : "ข้าวผัดกะเพรา", price : 50})
    });

    const result = await response.json();
    if (response.ok) {
        alert(result.message);
    } else {
        alert(result.error);
    }
});

