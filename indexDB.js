// Membuat database
var dbPromise = idb.open("perpustakaan", 1, function (upgradeDb) {
    if (!upgradeDb.objectStoreNames.contains("buku")) {
        var peopleOS = upgradeDb.createObjectStore("buku", { keyPath: 'isbn' });
        peopleOS.createIndex("judul", "judul", { unique: false });
        peopleOS.createIndex("nomorIndux", "nomorIndux", { unique: true });
    }
});