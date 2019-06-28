const imageview = require('./imageview');
imageview.defaultRequestHeaders = {
	'Authorization' : 'Basic ' + Titanium.Utils.base64encode('hans:test')
};
let self;
module.exports = class ImageView {
	constructor(args) {
		this.args = JSON.parse(JSON.stringify(args));
		console.log(this.args);
		self = this;
		imageview.httpHandler = function httpHandler(url, cb) {
			Ti.API.info('making my request');
			var client = Ti.Network.createHTTPClient({
				onload: function(e) {
					cb(this.responseData);
					args.updateCallback && args.updateCallback(self.args.image);
				},
				onerror: function(e) {
					e.url = this.url;
					Ti.API.error('ti.imagecache: unable to download image');
					Ti.API.error(e);
				}
			  });
			  client.open('GET', url);
			  console.log(imageview.defaultRequestHeaders);
			  for (var name in imageview.defaultRequestHeaders) {
				client.setRequestHeader(name, args.requestHeaders[name]);
			  }
			
			  client.send();
		}
		this.img = imageview.createImageView(args);
	}

	getView() {
		return this.img;
	}
}
