// Bütün HTML yüklənəndən sonra kodun işə düşməsini təmin edirik
document.addEventListener('DOMContentLoaded', function() {

    // --- 1. DÜYMƏLƏR ÜÇÜN ALERT ---
    const buttons = document.querySelectorAll('button'); 
    buttons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Əgər bu qeydiyyat (submit) düyməsidirsə, alert çıxmasın (aşağıda xüsusi işlənir)
            if (this.type !== 'submit') {
                const buttonText = this.innerText;
                alert("Seçiminiz qeydə alındı: " + buttonText);
            }
        });
    });

    // --- 2. KARTLAR ÜÇÜN HOVER EFFEKTİ ---
    const cards = document.querySelectorAll('.orta');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.backgroundColor = '#f0f0f0';
            card.style.transform = 'scale(1.05)';
            card.style.transition = '0.3s';
        });
        card.addEventListener('mouseleave', () => {
            card.style.backgroundColor = 'transparent';
            card.style.transform = 'scale(1)';
        });
    });

    // --- 3. MESAJ SAYĞACI ---
    const mesajInput = document.getElementById('mesajKutusu');
    const saygacGosterici = document.getElementById('saygac');

    if (mesajInput && saygacGosterici) {
        mesajInput.addEventListener('input', function() {
            const uzunluq = this.value.length;
            saygacGosterici.innerText = uzunluq;
            
            if (uzunluq > 100) {
                saygacGosterici.style.color = "red";
            } else {
                saygacGosterici.style.color = "#ffeb3b";
            }
        });
    }

    // --- 4. LOCAL STORAGE (QEYDİYYAT) ---
    // Düyməni tapmaq üçün ən etibarlı yol (placeholder vasitəsilə inputları tapırıq)
    const submitBtn = document.querySelector('.submit-btn');

    if (submitBtn) {
        submitBtn.addEventListener('click', function(e) {
            e.preventDefault(); // Səhifənin yenilənməsini dayandırır[cite: 4]

            // Formdakı məlumatları götürürük
            const usernameInput = document.querySelector('input[placeholder="Istifadəçi adı"]');
            const passwordInput = document.querySelector('input[placeholder="Şifrə"]');
            const messageInput = document.getElementById('mesajKutusu');

            // Məlumatları obyektə yığırıq[cite: 4]
            const yeniIstifadeci = {
                ad: usernameInput ? usernameInput.value : "Adsız",
                sifre: passwordInput ? passwordInput.value : "",
                mesaj: messageInput ? messageInput.value : "",
                tarix: new Date().toLocaleString()
            };

            // Local Storage-dan köhnə məlumatları alırıq[cite: 4]
            let butunIstifadeciler = JSON.parse(localStorage.getItem('azerbank_data')) || [];

            // Yeni məlumatı əlavə edib yenidən yaddaşa yazırıq[cite: 4]
            butunIstifadeciler.push(yeniIstifadeci);
            localStorage.setItem('azerbank_data', JSON.stringify(butunIstifadeciler));

            alert("Məlumatlar brauzer yaddaşına (Local Storage) uğurla yazıldı!");
            
            // Formu təmizləyək (istəyə bağlı)
            if(usernameInput) usernameInput.value = "";
            if(passwordInput) passwordInput.value = "";
            if(messageInput) messageInput.value = "";
            if(saygacGosterici) saygacGosterici.innerText = "0";
        });
    }
});
   