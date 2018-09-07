const functions = require('firebase-functions');
const admin = require('firebase-admin');

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
        return change.after.ref.parent.parent.child("display_name_pool").push({id: display_name});
    });

exports.publishDraft = functions.https.onCall((data, context) => {
    const id = data.id;
    const uid = data.uid;

    console.log(id + " " + uid);

    const db = admin.database();
    const draftRef = db.ref("drafts/" + id);
    const blogRef = db.ref("blogs/"+ id);
    const userDraftRef = db.ref("user_metadata/" + uid + "/drafts");
    const userBlogRef = db.ref("user_metadata/" + uid + "/blogs").push();
    let draft = {};
    return new Promise((resolve, reject) => {

        draftRef.once("value", snapshot => {
            draft = snapshot.val();
            blogRef.set(draft).then(() => {
                userDraftRef.orderByChild("id").equalTo(id).once("value", snapshot => {
                    console.log(snapshot.val());
                    let key = Object.keys(snapshot.val())[0];

                    snapshot.ref.child(key).remove().then(() => {
                        console.log("remove user draft ref");
                        userBlogRef.set({id: id}).then(() => {
                            console.log("set user blog ref");
                            draftRef.remove().then(() => {
                                console.log("remove from /drafts");
                                return resolve(id);
                            }).catch((error) => {
                                console.log("remove from /drafts: " + error.message);
                                return reject(id);
                            });
                        }).catch((error) => {
                            console.log("set user blog ref: " + error.message);
                            return reject(id);
                        });
                    }).catch((error) => {
                        console.log("remove user draft ref: " + error.message);
                        return reject(id);
                    });
                });
            }).catch((error) => {
                console.log("remove from /drafts: " + error.message);
                return reject(id);
            });
        });
    });

});