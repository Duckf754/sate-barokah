
        function hitungTotal() {
    // Ambil jumlah dari input
    const ayam = document.getElementById('qtyAyam').value;
    const kambing = document.getElementById('qtyKambing').value;
    const lontong = document.getElementById('qtyLontong').value;

    // Hitung total harga
    const total = (ayam * 25000) + (kambing * 35000) + (lontong * 4000);

    // Tampilkan total ke layar
    document.getElementById('displayTotal').innerText = "Rp " + total.toLocaleString();
}

function kirimWA() {
    const ayam = document.getElementById('qtyAyam').value;
    const kambing = document.getElementById('qtyKambing').value;
    const lontong = document.getElementById('qtyLontong').value;
    const total = (ayam * 25000) + (kambing * 35000) + (lontong * 4000);

    if (total === 0) {
        alert("Pilih menunya dulu dong bro!");
        return;
    }

    // Susun pesan teksnya
    let pesan = "Halo Sate Mulyadi, saya mau pesan:%0A";
    if (ayam > 0) pesan += `- Sate Ayam: ${ayam} porsi (Rp ${ayam * 25000})%0A`;
    if (kambing > 0) pesan += `- Sate Kambing: ${kambing} porsi (Rp ${kambing * 35000})%0A`;
    if (lontong > 0) pesan += `- Lontong: ${lontong} biji (Rp ${lontong * 4000})%0A`;
    
    pesan += `%0A*Total Pembayaran: Rp ${total.toLocaleString()}*`;

    // Ganti nomor ini dengan nomor Mulyadi
    const nomorWA = "628123456789"; 
    window.open(`https://wa.me/${nomorWA}?text=${pesan}`, '_blank');
}

        // Kode JavaScript untuk menu mobile

        document.addEventListener('DOMContentLoaded', function() {
            const mobileMenuBtn = document.getElementById('mobileMenuBtn');
            const navLinks = document.getElementById('navLinks');
            
            // Toggle menu mobile saat tombol diklik
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
            
            // Tutup menu mobile saat link diklik
            const navItems = document.querySelectorAll('.nav-links a');
            navItems.forEach(item => {
                item.addEventListener('click', function() {
                    navLinks.classList.remove('active');
                    // Kembalikan ikon ke menu bar
                    const icon = mobileMenuBtn.querySelector('i');
                    if (icon.classList.contains('fa-times')) {
                        icon.classList.replace('fa-times', 'fa-bars');
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
        });