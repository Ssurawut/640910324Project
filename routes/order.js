async function orderFood(menuName, price) {
    const quantity = 1; // กำหนดจำนวนรายการที่สั่ง
    const total = price * quantity; // คำนวณราคารวม

    const orderData = {
        menu_name: menuName,
        price: price,
        quantity: quantity,
        total: total
    };

    try {
        const response = await fetch('/Restaurant_Database/api/order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderData)
        });

        if (response.ok) {
            alert('บันทึกคำสั่งอาหารสำเร็จ');
        } else {
            alert('ไม่สามารถบันทึกคำสั่งอาหารได้');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('เกิดข้อผิดพลาดในการสั่งอาหาร');
    }
}