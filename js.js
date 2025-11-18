
        //  Kode tersebut berfungsi untuk mengeksekusi blok perintah JavaScript hanya setelah seluruh elemen dokumen HTML selesai dimuat oleh browser.
        document.addEventListener('DOMContentLoaded', function() {
            
            //  Kode tersebut berfungsi untuk mengambil referensi elemen HTML dengan ID display dan statusImage, serta mengumpulkan seluruh elemen yang memiliki kelas btn-calc guna digunakan dalam manipulasi atau interaksi selanjutnya melalui JavaScript.
            const display = document.getElementById('display');
            const statusImage = document.getElementById('statusImage');
            const buttons = document.querySelectorAll('.btn-calc');

            //  Kode tersebut berfungsi untuk mendefinisikan tiga variabel yang masing-masing menyimpan URL gambar berbeda sebagai representasi visual untuk status normal, sukses, dan kesalahan pada antarmuka aplikasi.
            const imgNormal = 'https://placehold.co/400x100/374151/E5E7EB?text=Kalkulator';
            const imgSuccess = 'https://placehold.co/400x100/16A34A/FFFFFF?text=Sukses!';
            const imgError = 'https://placehold.co/400x100/DC2626/FFFFFF?text=Error!';

            /**
              Kode tersebut berfungsi untuk mengubah sumber dan teks alternatif gambar status kalkulator berdasarkan parameter state, sehingga tampilan visual dapat menyesuaikan dengan kondisi sukses, kesalahan, atau keadaan normal. 
             */
            function changeImage(state) {
                if (state === 'success') {
                    statusImage.src = imgSuccess;
                    statusImage.alt = "Perhitungan Sukses";
                } else if (state === 'error') {
                    statusImage.src = imgError;
                    statusImage.alt = "Error Perhitungan";
                } else {
                    //  Kode tersebut berfungsi untuk menetapkan sumber gambar statusImage ke variabel imgNormal dan memberikan teks alternatif "Status Kalkulator" sebagai deskripsi visual default.
                    statusImage.src = imgNormal;
                    statusImage.alt = "Status Kalkulator";
                }
            }

            /**
              Kode tersebut berfungsi untuk menghapus seluruh isi tampilan pada elemen input display dan mengembalikan gambar status kalkulator ke kondisi normal melalui pemanggilan fungsi changeImage('normal').
             */
            function clearDisplay() {
                display.value = '';
                changeImage('normal'); // Memanggil function untuk merubah gambar
            }

            /**
              Kode tersebut berfungsi untuk menghapus satu karakter terakhir dari nilai yang sedang ditampilkan pada elemen input display.
             */
            function deleteLastChar() {
                display.value = display.value.slice(0, -1);
            }

            /**
              Kode tersebut berfungsi untuk menambahkan nilai yang diterima sebagai parameter value ke akhir teks yang saat ini ditampilkan pada elemen input display.
             */
            function appendToDisplay(value) {
                display.value += value;
            }

            /**
              Kode tersebut berfungsi untuk mendeklarasikan sebuah fungsi bernama calculateResult() yang akan digunakan untuk menghitung hasil dari ekspresi matematika yang terdapat pada elemen display.
             */
            function calculateResult() {
                //  Kode tersebut berfungsi untuk memeriksa apakah elemen display kosong, dan jika benar, maka mengubah gambar status menjadi kondisi kesalahan serta menampilkan teks “Kosong!” pada layar kalkulator.
                if (display.value === '') {
                    changeImage('error');
                    display.value = 'Kosong!';
                    //  Kode tersebut berfungsi untuk menjadwalkan pemanggilan fungsi clearDisplay setelah jeda waktu 1.500 milidetik (1,5 detik) dan menghentikan eksekusi fungsi saat ini dengan perintah return.
                    setTimeout(clearDisplay, 1500);
                    return;
                }

                try {
                    //  Kode tersebut berfungsi untuk menghitung nilai ekspresi matematika pada elemen display dengan terlebih dahulu mengganti simbol persen (%) menjadi operasi pembagian seratus (/100) sebelum dievaluasi menggunakan fungsi eval().
                    let result = eval(display.value
                        .replace(/%/g, '/100') //  Jelaskan Kodingan ini apa 
                    ); 
                    
                    //  Kode tersebut berfungsi untuk memeriksa apakah hasil perhitungan berupa nilai hingga (finite), lalu menampilkan hasil tersebut pada elemen display dan mengubah gambar status menjadi kondisi sukses. 
                    if (isFinite(result)) {
                        display.value = result;
                        changeImage('success'); //  Kode tersebut berfungsi untuk menimbulkan pengecualian (error) dengan pesan "Hasil tidak valid" apabila hasil perhitungan tidak memenuhi kondisi nilai hingga. 
                    } else {
                        throw new Error("Hasil tidak valid");
                    }

                } catch (error) {
                    console.error("Error kalkulasi:", error);
                    display.value = 'Error';
                    changeImage('error'); //  Kode tersebut berfungsi untuk menangani kesalahan yang terjadi selama proses perhitungan dengan menampilkan pesan error di konsol, menampilkan teks “Error” pada layar kalkulator, mengubah gambar status menjadi kondisi kesalahan, serta menghapus tampilan setelah jeda waktu 1,5 detik.
                    setTimeout(clearDisplay, 1500);
                }
            }


            //  Kode tersebut berfungsi untuk menambahkan event listener pada setiap tombol kalkulator sehingga saat tombol diklik, nilai atribut data-value dari tombol tersebut diambil untuk diproses lebih lanjut.
            buttons.forEach(button => {
                button.addEventListener('click', () => {
                    const value = button.getAttribute('data-value');

                    //  Kode tersebut berfungsi untuk memulai struktur kontrol switch yang akan mengeksekusi blok perintah tertentu berdasarkan nilai variabel value, dengan kasus pertama yang ditangani adalah ketika nilai tersebut sama dengan 'C'.
                    switch(value) {
                        case 'C':
                            //  Kode tersebut berfungsi untuk menangani kondisi ketika tombol dengan nilai 'C' ditekan, yaitu dengan memanggil fungsi clearDisplay() untuk menghapus seluruh isi tampilan kalkulator dan kemudian menghentikan eksekusi pernyataan switch pada kasus tersebut menggunakan break.
                            clearDisplay();
                            break;
                        case 'DEL':
                            //  Kode tersebut berfungsi untuk menangani kondisi ketika tombol dengan nilai 'DEL' ditekan, yaitu dengan memanggil fungsi deleteLastChar() untuk menghapus satu karakter terakhir dari tampilan kalkulator dan kemudian menghentikan eksekusi pada kasus tersebut menggunakan break.
                            deleteLastChar();
                            break;
                        case '=':
                            //  Kode tersebut berfungsi untuk menangani kondisi ketika tombol dengan nilai '=' ditekan, yaitu dengan memanggil fungsi calculateResult() untuk menghitung hasil ekspresi matematika yang ditampilkan, kemudian menghentikan eksekusi pada kasus tersebut menggunakan break.
                            calculateResult();
                            break;
                        default:
                            //  Kode tersebut berfungsi untuk menangani input tombol selain 'C', 'DEL', dan '=', dengan memeriksa apakah gambar status menunjukkan kondisi sukses atau kesalahan—jika ya, maka tampilan akan dikosongkan terlebih dahulu—lalu menambahkan nilai tombol yang ditekan ke tampilan kalkulator sebelum menghentikan eksekusi dengan break.
                            if (statusImage.src === imgSuccess || statusImage.src === imgError) {
                                clearDisplay();
                            }
                            appendToDisplay(value);
                            break;
                    }
                });
            });

            //  Kode tersebut berfungsi untuk menambahkan event listener pada dokumen agar kalkulator dapat merespons input dari keyboard, dengan mendeteksi berbagai tombol seperti angka, operator, Enter, Backspace, atau Escape, kemudian menjalankan fungsi yang sesuai—seperti menambah input, menghitung hasil, menghapus karakter, atau mengosongkan tampilan—serta mencegah perilaku default browser.
            document.addEventListener('keydown', (e) => {
                const key = e.key;

                if (key >= '0' && key <= '9' || key === '.' || key === '+' || key === '-' || key === '*' || key === '/' || key === '%') {
                    if (statusImage.src === imgSuccess || statusImage.src === imgError) {
                        clearDisplay();
                    }
                    appendToDisplay(key);
                    e.preventDefault();
                } else if (key === 'Enter' || key === '=') {
                    calculateResult();
                    e.preventDefault();
                } else if (key === 'Backspace') {
                    deleteLastChar();
                    e.preventDefault();
                } else if (key === 'Escape' || key.toLowerCase() === 'c') {
                    clearDisplay();
                    e.preventDefault();
                }
            });

        });