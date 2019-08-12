const imageTrack = {};
const plainTemplate = {
    childTemplates: [
        {
            type: './imageProxy',
            bindId: 'pic',
            properties: {
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
const win = Ti.UI.createWindow({
    backgroundColor: '#fff'
});
const listView = Ti.UI.createListView({
    templates: {
        uncheck: plainTemplate
    },
    defaultItemTemplate: 'uncheck'
});
const data = [];
for (var i = 0; i < 10; i++) {
    imageTrack['http://hans-knoechel.de/test/test.png'] = {
        itemIndex: i,
        section: 0
    }
    // Can't set image property on Android as it will bypass ti.imageview code,
    // need to set something else (left in for demo purposes though)
    if (Ti.UI.iOS) {
        data.push({
            pic: {
                image: 'http://hans-knoechel.de/test/test.png'
            }
        });
    } else {
        data.push({
            pic: {
                image: 'http://hans-knoechel.de/test/test.png',
            }
        })
    }
}
const section = Ti.UI.createListSection({
    items: data
});

listView.sections = [section];
win.add(listView);
win.open();
