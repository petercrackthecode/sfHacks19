const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

exports.addSiteMedia = functions.storage.object().onFinalize((object) => {
    const filePathRegex = new RegExp("^(.*/)", "g");
    const fileNameRegex = new RegExp("[^/]*(?=\\.[^.]+($|\\?))", "g");
    const filePath = object.name.match(filePathRegex)[0];
    const fileName = object.name.match(fileNameRegex)[0];
    const fileType = object.contentType;
    const fileURL = object.mediaLink;

    console.log("adding file: ", fileName, " on ", filePath);

    if (filePath !== "site/") return null;

    const dbRef = admin.database().ref("siteMedia/" + fileName);
    return dbRef.set({
        name: fileName,
        type: fileType,
        url: fileURL
    });
});

exports.deleteSiteMedia = functions.storage.object().onDelete((object) => {
    const filePathRegex = new RegExp("^(.*/)", "g");
    const fileNameRegex = new RegExp("[^/]*(?=\\.[^.]+($|\\?))", "g");
    const filePath = object.name.match(filePathRegex)[0];
    const fileName = object.name.match(fileNameRegex)[0];

    console.log("deleting file: ", fileName, " on ", filePath);

    if (filePath !== "site/") return null;

    const dbRef = admin.database().ref("siteMedia/" + fileName);
    return dbRef.set(null);
});

exports.addUserNameToPool = functions.database.ref("user_metadata")
    .onWrite((change, context) => {
        const user_metadata = change.after.val();
        const display_name = user_metadata.display_name;
        return change.after.parent.child("display_name_pool").push(display_name);
    });