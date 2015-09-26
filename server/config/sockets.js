module.exports = function Route(app, server) {

	io = require('socket.io').listen(server);

	io.sockets.on('connection', function(socket) {
		console.log('Running Sockets...');
		console.log(socket.id);


		

		//On page load, emit messages that is stored in messages
		// socket.on('page_load', function(data){
		// 	socket.emit("load_messages", {messages: messages})
		// });
		//Listening for message_sent socket
		// socket.on('message_sent', function(data){
		// 	messages.push({name: data.data.name, message: data.data.message});
		// 	//Emitting message socket with FULL BROADCAST with user and other clients
		// 	io.emit('message_live', {user_messages: data});

		// });
	});
};