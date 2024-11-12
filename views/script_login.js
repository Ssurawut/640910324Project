document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    // ส่งคำขอ login ไปยังเซิร์ฟเวอร์
    const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    
    const result = await response.json();
    
    // ตรวจสอบว่าการเข้าสู่ระบบสำเร็จหรือไม่
    if (response.ok) {
        alert("Login successful!");
        users = await fetch(
            `/api/auth/user?username=${data.username}`
        ).then((res) => res.json());
        if(users.role === "admin"){
            window.location.href = "/Restaurant_Database/orderlist"; // เปลี่ยนเส้นทางไปหน้า admin
        }else{
            window.location.href = "/Restaurant_Database/home"; // เปลี่ยนเส้นทางไปหน้า home
        }
    } else {
        alert(result.message || "Login failed");
    }
});