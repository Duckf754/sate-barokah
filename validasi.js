// Harga menu
const menuPrices = {
    ayam: 20000,
    kambing: 30000,
    lontong: 4000
};

// Fungsi untuk mengupdate jumlah pesanan
function updateQuantity(menu, change) {
    const inputElement = document.getElementById(`qty${menu.charAt(0).toUpperCase() + menu.slice(1)}`);
    let currentValue = parseInt(inputElement.value) || 0;
    let newValue = currentValue + change;
    
    // Pastikan nilai tidak negatif
    if (newValue < 0) newValue = 0;
    
    inputElement.value = newValue;
    updateTotal();
}

// Fungsi untuk mengupdate total dan ringkasan pesanan
function updateTotal() {
    // Ambil jumlah dari setiap menu
    const qtyAyam = parseInt(document.getElementById('qtyAyam').value) || 0;
    const qtyKambing = parseInt(document.getElementById('qtyKambing').value) || 0;
    const qtyLontong = parseInt(document.getElementById('qtyLontong').value) || 0;
    
    // Hitung subtotal untuk setiap menu
    const subtotalAyam = qtyAyam * menuPrices.ayam;
    const subtotalKambing = qtyKambing * menuPrices.kambing;
    const subtotalLontong = qtyLontong * menuPrices.lontong;
    
    // Hitung total keseluruhan
    const total = subtotalAyam + subtotalKambing + subtotalLontong;
    
    // Update tampilan total
    document.getElementById('displayTotal').textContent = `Rp ${total.toLocaleString('id-ID')}`;
    
    // Update ringkasan pesanan
    updateOrderDetails(qtyAyam, qtyKambing, qtyLontong, subtotalAyam, subtotalKambing, subtotalLontong, total);
}

// Fungsi untuk update ringkasan pesanan
function updateOrderDetails(qtyAyam, qtyKambing, qtyLontong, subtotalAyam, subtotalKambing, subtotalLontong, total) {
    const orderDetailsElement = document.getElementById('orderDetails');
    
    // Jika tidak ada pesanan
    if (qtyAyam === 0 && qtyKambing === 0 && qtyLontong === 0) {
        orderDetailsElement.innerHTML = '<p>Belum ada pesanan. Pilih menu yang ingin dipesan.</p>';
        return;
    }
    
    let orderDetailsHTML = '';
    
    // Tambahkan detail untuk setiap menu yang dipesan
    if (qtyAyam > 0) {
        orderDetailsHTML += `
            <div class="order-detail-item">
                <span>Sate Ayam (${qtyAyam} porsi)</span>
                <span>Rp ${subtotalAyam.toLocaleString('id-ID')}</span>
            </div>
        `;
    }
    
    if (qtyKambing > 0) {
        orderDetailsHTML += `
            <div class="order-detail-item">
                <span>Sate Kambing (${qtyKambing} porsi)</span>
                <span>Rp ${subtotalKambing.toLocaleString('id-ID')}</span>
            </div>
        `;
    }
    
    if (qtyLontong > 0) {
        orderDetailsHTML += `
            <div class="order-detail-item">
                <span>Lontong (${qtyLontong} potong)</span>
                <span>Rp ${subtotalLontong.toLocaleString('id-ID')}</span>
            </div>
        `;
    }
    
    orderDetailsElement.innerHTML = orderDetailsHTML;
}

// Fungsi untuk menampilkan/sembunyikan info delivery
function toggleDeliveryInfo() {
    const deliveryCheckbox = document.getElementById('deliveryOption');
    const deliveryInfo = document.getElementById('deliveryInfo');
    
    if (deliveryCheckbox && deliveryInfo) {
        if (deliveryCheckbox.checked) {
            deliveryInfo.style.display = 'block';
        } else {
            deliveryInfo.style.display = 'none';
        }
    }
}

// Fungsi untuk validasi pesanan sebelum mengirim ke WhatsApp
function validateOrder() {
    const qtyAyam = parseInt(document.getElementById('qtyAyam').value) || 0;
    const qtyKambing = parseInt(document.getElementById('qtyKambing').value) || 0;
    const qtyLontong = parseInt(document.getElementById('qtyLontong').value) || 0;
    const deliveryOption = document.getElementById('deliveryOption') ? document.getElementById('deliveryOption').checked : false;
    
    // Validasi 1: Pastikan ada pesanan
    if (qtyAyam === 0 && qtyKambing === 0 && qtyLontong === 0) {
        alert('Wah, pesanannya masih kosong nih. Isi jumlah menu yang mau dibeli dulu ya!');
        return false;
    }
    
    // Validasi 2: Jika delivery dipilih, minimal 5 porsi sate
    if (deliveryOption) {
        const totalSatePorsi = qtyAyam + qtyKambing;
        if (totalSatePorsi < 5) {
            alert(`Untuk pesanan antar (delivery), minimal pemesanan adalah 5 porsi sate (bisa campur ayam/kambing).\n\nPesanan Anda saat ini: ${totalSatePorsi} porsi sate.\nSilakan tambah pesanan sate Anda.`);
            return false;
        }
    }
    
    return true;
}

// Fungsi untuk mengirim pesanan ke WhatsApp
function kirimWA() {
    // Validasi pesanan
    if (!validateOrder()) {
        return;
    }
    
    // Ambil data pesanan
    const qtyAyam = parseInt(document.getElementById('qtyAyam').value) || 0;
    const qtyKambing = parseInt(document.getElementById('qtyKambing').value) || 0;
    const qtyLontong = parseInt(document.getElementById('qtyLontong').value) || 0;
    const deliveryOption = document.getElementById('deliveryOption') ? document.getElementById('deliveryOption').checked : false;
    
    // Hitung total
    const subtotalAyam = qtyAyam * menuPrices.ayam;
    const subtotalKambing = qtyKambing * menuPrices.kambing;
    const subtotalLontong = qtyLontong * menuPrices.lontong;
    const total = subtotalAyam + subtotalKambing + subtotalLontong;
    
    // Format tanggal
    const now = new Date();
    const formattedDate = now.toLocaleDateString('id-ID', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    // Buat pesan untuk WhatsApp
    let message = `*PESANAN SATE ABANG IMUL*\n`;
    message += `Tanggal: ${formattedDate}\n\n`;
    message += `*DETAIL PESANAN:*\n`;
    
    if (qtyAyam > 0) {
        message += `• Sate Ayam: ${qtyAyam} porsi x Rp ${menuPrices.ayam.toLocaleString('id-ID')} = Rp ${subtotalAyam.toLocaleString('id-ID')}\n`;
    }
    
    if (qtyKambing > 0) {
        message += `• Sate Kambing: ${qtyKambing} porsi x Rp ${menuPrices.kambing.toLocaleString('id-ID')} = Rp ${subtotalKambing.toLocaleString('id-ID')}\n`;
    }
    
    if (qtyLontong > 0) {
        message += `• Lontong: ${qtyLontong} potong x Rp ${menuPrices.lontong.toLocaleString('id-ID')} = Rp ${subtotalLontong.toLocaleString('id-ID')}\n`;
    }
    
    message += `\n*TOTAL: Rp ${total.toLocaleString('id-ID')}*\n\n`;
    
    // Tambahkan opsi pengiriman
    if (deliveryOption) {
        message += `*Pengiriman:* Antar ke rumah (Delivery)\n`;
    } else {
        message += `*Pengiriman:* Ambil di tempat (Take Away)\n`;
    }
    
    message += `\nSilakan konfirmasi pesanan ini dan berikan alamat lengkap (jika delivery). Terima kasih!`;
    
    // Encode pesan untuk URL
    const encodedMessage = encodeURIComponent(message);
    
    // Tentukan nomor WhatsApp (bisa disesuaikan dengan lokasi)
    const phoneNumber = "6281234567890"; // Ganti dengan nomor WhatsApp yang sesuai
    
    // Buka WhatsApp dengan pesan yang sudah disiapkan
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
}

// Inisialisasi saat halaman dimuat
document.addEventListener('DOMContentLoaded', function() {
    // Fungsi untuk mobile menu
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');
    
    // Toggle menu mobile saat tombol diklik
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            // Ganti ikon menu
            const icon = this.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.replace('fa-bars', 'fa-times');
            } else {
                icon.classList.replace('fa-times', 'fa-bars');
            }
        });
    }
    
    // Tutup menu mobile saat link diklik
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                // Kembalikan ikon ke menu bar
                const icon = mobileMenuBtn.querySelector('i');
                if (icon.classList.contains('fa-times')) {
                    icon.classList.replace('fa-times', 'fa-bars');
                }
            }
        });
    });
    
    // Smooth scrolling untuk link navigasi
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Inisialisasi tampilan order details
    updateTotal();
    
    // Sembunyikan info delivery awal
    const deliveryInfo = document.getElementById('deliveryInfo');
    if (deliveryInfo) {
        deliveryInfo.style.display = 'none';
    }
    
    // Tambahkan event listener untuk input quantity
    const qtyInputs = document.querySelectorAll('.qty-input');
    qtyInputs.forEach(input => {
        input.addEventListener('change', updateTotal);
        input.addEventListener('input', updateTotal);
    });
});