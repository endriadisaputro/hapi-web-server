/*
Query Parameters
Selain path parameter, terdapat cara lain yang sering digunakan dalam mengirimkan data melalui URL, 
yakni dengan query parameter. Teknik ini umum digunakan pada permintaan yang membutuhkan kueri dari client, 
contohnya seperti pencarian dan filter data. 

Data yang dikirim melalui query memiliki format key=value. Contohnya:

localhost:5000?name=harry&location=bali
Contoh di atas memiliki dua query parameter. Yang pertama adalah name=harry dan location=bali. 
Di Hapi, Anda bisa mendapatkan nilai dari query parameter melalui request.query.
*/
server.route({
    method: 'GET',
    path: '/',
    handler: (request, h) => {
        const { name, location } = request.query;
        return `Hello, ${name} from ${location}`;
    },
 });


/*
Latihan Query Parameters
Saatnya latihan!

Pada latihan kali ini kita akan menambahkan dukungan bahasa terhadap path /hello/{name} yang sudah kita buat. 
Bila path tersebut memiliki kueri lang dengan nilai id, maka server akan menanggapi dengan pesan “Hai, {name}!”. 
Selain itu, biarkan pesan tetap sama seperti latihan sebelumnya. Ayo kita mulai!

Buka berkas routes.js dan pada fungsi handler GET /hello/ {name} dapatkan nilai kueri lang melalui 
properti request.query.
*/

{
    method: 'GET',
    path: '/hello/{name?}',
    handler: (request, h) => {
        const { name = "stranger" } = request.params;
        const { lang } = request.query;
        
        return `Hello, ${name}!`;
    },
},

//Lalu, sesuaikan pesan kembalian handler berdasarkan evaluasi nilai lang seperti ini:

{
    method: 'GET',
    path: '/hello/{name?}',
    handler: (request, h) => {
        const { name = "stranger" } = request.params;
        const { lang } = request.query;
 
        if(lang === 'id') {
            return `Hai, ${name}!`;
        }
        return `Hello, ${name}!`;
    },
},

/*
Simpan perubahan pada berkas routes.js; jalankan kembali server dengan perintah npm run start; dan 
lakukan permintaan pada path /hello/dicoding dengan dan tanpa melampirkan kueri lang=id.

curl -X GET http://localhost:5000/hello/dicoding?lang=id
// output: Hai, dicoding!
curl -X GET http://localhost:5000/hello/dicoding
// output: Hello, dicoding!