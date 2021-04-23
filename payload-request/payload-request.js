/*
Body/Payload Request
Ketika menggunakan Node.js, untuk mendapatkan data pada body request--meskipun datanya hanya sebatas 
teks--kita harus berurusan dengan Readable Stream. Di mana untuk mendapatkan data melalui stream tak semudah 
seperti kita menginisialisasikan sebuah nilai pada variabel. 

Good News! Ketika menggunakan Hapi, Anda tidak lagi berurusan dengan stream untuk mendapatkan datanya. 
Di balik layar, Hapi secara default akan mengubah payload JSON menjadi objek JavaScript. Dengan begitu, 
Anda tak lagi berurusan dengan JSON.parse()!

Kapan pun client mengirimkan payload berupa JSON, payload tersebut dapat diakses pada route handler melalui 
properti request.payload. Contohnya seperti ini:
*/
server.route({
    method: 'POST',
    path: '/login',
    handler: (request, h) => {
        const { username, password } = request.payload;
        return `Welcome ${username}!`;
    },
});

//Pada contoh di atas, handler menerima payload melalui request.payload. Dalam kasus tersebut, client mengirimkan data login dengan struktur:

{ "username": "harrypotter", "password": "encryptedpassword" }