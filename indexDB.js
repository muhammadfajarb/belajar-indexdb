// Membuat database
var dbPromise = idb.open("perpustakaan", 1, function (upgradeDb) {
    if (!upgradeDb.objectStoreNames.contains("buku")) {
        var peopleOS = upgradeDb.createObjectStore("buku", { keyPath: 'isbn' });
        peopleOS.createIndex("judul", "judul", { unique: false });
        peopleOS.createIndex("nomorIndux", "nomorIndux", { unique: true });
    }
});

// Menyimpan data
dbPromise.then(function (db) {
    var tx = db.transaction('buku', 'readwrite');
    var store = tx.objectStore('buku');
    var item = {
        judul: 'Menjadi Android Developer Expert (MADE)',
        isbn: 123456789,
        description: 'Belajar pemrograman Android di Dicoding dengan modul online dan buku.',
        created: new Date().getTime()
    };
    store.add(item); //menambahkan key "buku"
    return tx.complete;
}).then(function () {
    console.log('Buku berhasil disimpan.');
}).catch(function () {
    console.log('Buku gagal disimpan.')
})

// Get one data
dbPromise.then(function (db) {
    var tx = db.transaction('buku', 'readonly');
    var store = tx.objectStore('buku');
    // mengambil primary key berdasarkan isbn
    return store.get(123456789);
}).then(function (val) {
    console.dir(val);
});