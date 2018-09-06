const functions = require('firebase-functions');
const admin = require('firebase-admin');
const {Storage} = require('@google-cloud/storage');
const storage = new Storage();

admin.initializeApp(functions.config().firebase);

exports.addSiteMedia = functions.storage.object()
    .onFinalize((object) => {
        const filePathRegex = new RegExp("^(.*/)", "g");
        const fileNameRegex = new RegExp("[^/]*(?=\\.[^.]+($|\\?))", "g");
        const filePath = object.name.match(filePathRegex)[0];
        const fileName = object.name.match(fileNameRegex)[0];
        const fileType = object.contentType;
        const fileURL = "https://storage.googleapis.com/seeds-vietnam.appspot.com/" + object.name;

        console.log("adding file: ", fileName, " on ", filePath);

        if (filePath !== "site/") return null;

        const dbRef = admin.database().ref("siteMedia/" + fileName);
        return dbRef.set({
            name: fileName,
            type: fileType,
            url: fileURL
        });
    });

exports.deleteSiteMedia = functions.storage.object()
    .onDelete((object) => {
        const filePathRegex = new RegExp("^(.*/)", "g");
        const fileNameRegex = new RegExp("[^/]*(?=\\.[^.]+($|\\?))", "g");
        const filePath = object.name.match(filePathRegex)[0];
        const fileName = object.name.match(fileNameRegex)[0];

        console.log("deleting file: ", fileName, " on ", filePath);

        if (filePath !== "site/") return null;

        const dbRef = admin.database().ref("siteMedia/" + fileName);
        return dbRef.set(null);
    });

exports.addUserNameToPool = functions.database.ref("user_metadata/{created_user}")
    .onWrite((change, context) => {
        // Only edit data when it is first created.
        if (change.before.exists()) {
            return null;
        }
        // Exit when the data is deleted.
        if (!change.after.exists()) {
            return null;
        }
        const user_metadata = change.after.val();
        const display_name = user_metadata.display_name;
        console.log(user_metadata);
        return change.after.ref.parent.parent.child("display_name_pool").push(display_name);
    });