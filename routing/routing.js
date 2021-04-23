/*
Method/Verb Request dan Routing
Setelah membuat dan menjalankan server, selanjutnya adalah menambahkan routing agar server dapat merespons 
permintaan sesuai dengan method dan url yang diminta oleh client.

Routing pada Hapi tidak dilakukan di dalam request handler seperti cara native. 
Namun, ia memanfaatkan objek route configuration yang disimpan pada method server.route(). 
Lihat kode yang ditebalkan yah.
*/

const init=async()=>{

	const server=Hapi.server({
		port:3000,
		host:'localhost',
	});

	server.route({
		method:'GET',
		path:'/',
		handler:(request,h)=>{
			return 'hello world';
		}
	});

	await server.start();
	console.log('server running on %s',server.info.uri);
};

/*
Objek route configuration memiliki properti yang bisa dimanfaatkan untuk menspesifikasikan route yang diinginkan. 
Termasuk menspesifikasikan method, path, dan fungsi sebagai handler untuk menangani permintaan tersebut 
(request handler).

Tunggu, request handler dituliskan di dalam route configuration? Yap benar! Handler pada Hapi dipisahkan 
berdasarkan route yang ada. Setiap spesifikasi route memiliki handler-nya masing-masing. Dengan begitu, 
tentu kode akan lebih mudah dikelola. Anda bisa mengatakan selamat tinggal pada if else yang bersarang.

Lalu, bagaimana cara menetapkan lebih dari satu route configuration dalam method server.route()? Mudah! 
Sebenarnya, server.route() selain dapat menerima route configuration, ia juga dapat menerima array dari 
route configuration. Jadi, Anda bisa secara mudah menentukan banyak spesifikasi route dengan seperti ini:
*/
const init=async()=>{
	const server=Hapi.server({
		port:5000,
		host:'localhost',
	});

	server.route([
		{
			method:'GET',
			path:'/',
			handler:(request, h)=>{
				return 'homepage';
			},
		},

		{
			method:'GET',
			path:'/about',
			handler:(request, h)=>{
				return 'about page';
			},
		},
	]);

	await server.start();
	console.log(`server berjalan pada ${server.info.uri}`);
};

/*
Kami merekomendasi untuk memisahkan seluruh routes configuration pada berkas JavaScript berbeda. 
Dengan begitu, satu berkas JavaScript hanya memiliki satu fungsi atau tanggung jawab saja (single responsibility 
principle).
*/

//ROUTE.JS
const routes=[
	{
		method:'GET',
		path:'/',
		handler:(request, h)=>{
			return 'Homepage';
		},
	},
	{
		method:'GET',
		path:'/about',
		handler:(request, h)=>{
			return 'about page';
		},
	},
];

module.exports=routes;

//SERVER.JS
const Hapi=require('@hapi/hapi');
const routes=require('./routes');

const init=async()=>{
	const server=Hapi.server({
		port:5000,
		host:'localhost',
	});

	server.route(routes);

	await server.start();
	console.log(`server berjalan pada ${server.info.uri}`);
};

init();
