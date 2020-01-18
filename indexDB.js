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

// Get all data
dbPromise.then(function (db) {
    var tx = db.transaction('buku', 'readonly');
    var store = tx.objectStore('buku');
    return store.getAll();
}).then(function (items) {
    console.log('Data yang diambil: ');
    console.log(items);
});

// Membaca banyak data dengan cursor
dbPromise.then(function (db) {
    var tx = db.transaction('buku', 'readonly');
    var store = tx.objectStore('buku');
    return store.openCursor();
}).then(function ambilBuku(cursor) {
    if (!cursor) {
        return;
    }
    console.log('Posisi cursos: ', cursor.key);
    for (var field in cursor.value) {
        console.log(cursor.value[field]);
    }
    return cursor.continue().then(ambilBuku);
}).then(function () {
    console.log('Tidak ada data lain.');
});

// Memperbarui data
dbPromise.then(function (db) {
    var tx = db.transaction('buku', 'readwrite');
    var store = tx.objectStore('buku');
    var item = {
        judul: 'Menjadi Android Developer Expert (MADE) Versi 2',
        isbn: 123456789,
        description: 'Belajar pemrograman Android di Dicoding dengan modul online dan buku.',
        created: new Date().getTime()
    };
    store.put(item); // dapat juga digunakan untuk menggantikan fungsi method add()
    return tx.complete;
}).then(function () {
    console.log('Buku berhasil disimpan.');
}).catch(function () {
    console.error('Buku gagal disimpan.')
})

// Menghapus data
dbPromise.then(function (db) {
    var tx = db.transaction('buku', 'readwrite');
    var store = tx.objectStore('buku');
    store.delete(123456789);
    return tx.complete;
}).then(function () {
    console.log('Buku berhasil dihapus');
});

// Database versioning
var dbPromise = idb.open('perpustakaan', 2, function (upgradeDb) {
    switch (upgradeDb.oldVersion) {
        case 0:
            upgradeDb.createObjectStore('buku', { keyPath: 'isbn' });
        case 1:
            var bukuStore = upgradeDb.transaction.objectStore('buku');
            bukuStore.createIndex('tahun', 'tahun');
    }
});