var imageTrack = {};
var plainTemplate = {
    childTemplates: [
        {
            type: './imageProxy',
            bindId: 'pic',
            properties: {
                image: 'http://hans-knoechel.de/test/test.png',
                width: '50dp', height: '50dp', left: 0,
                defaultImage: 'assets/images/tab2.png',
                updateCallback(imageUrl) {
                    console.log(imageUrl);
                    const imageInfo = imageTrack[imageUrl]
                    console.log(imageInfo);
                    console.log(`Updating section ${imageInfo.section}, item ${imageInfo.itemIndex}`)
                    const section = listView.sections[imageInfo.section];
                    section.updateItemAt(imageInfo.itemIndex, section.getItemAt(imageInfo.itemIndex));
                },
                requestHeaders: {
                    'Authorization' : 'Basic ' + Titanium.Utils.base64encode('hans:test')
                }
            }
        },
        {
            type: 'Ti.UI.Label',
            bindId: 'title',
            properties: {
                color: 'black',
                font: { fontFamily:'Arial', fontSize: '20dp', fontWeight:'bold' },
                left: '60dp', top: 0,
                text: 'foo'
            },
        },
        {
            type: 'Ti.UI.Label',
            bindId: 'subtitle',
            properties: {
                color: 'gray',
                font: { fontFamily:'Arial', fontSize: '14dp' },
                left: '60dp', top: '25dp',
                text: 'bar'
            }
        }
    ]
};
var win = Ti.UI.createWindow({
    backgroundColor: '#fff'
});
var data = [];
for (var i = 0; i < 1; i++) {
    imageTrack['http://hans-knoechel.de/test/test.png'] = {
        itemIndex: i,
        section: 0
    }
    data.push({
        pic: {
            // image: 'http://hans-knoechel.de/test/test.png'
        }
    });
}
console.log(imageTrack);
var listView = Ti.UI.createListView({
    templates: { 'uncheck': plainTemplate },
    defaultItemTemplate: 'uncheck'
});
var section = Ti.UI.createListSection();
section.setItems(data);
listView.sections = [section];
win.add(listView);
win.open();
