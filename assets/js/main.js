function addToInvoice(nama, harga) {
    console.log(nama, harga);

    var existingItem = $("#invoice li:contains('" + nama + "')");

    if (existingItem.length) {
        updateExistingItem(existingItem);
    } else {
        createNewItem(nama, harga);
    }

    hitungTotal();
}

function updateExistingItem(existingItem) {
    var spanQuantity = existingItem.find(".quantity");
    var currentQuantity = parseInt(spanQuantity.text().replace("Quantity: ", ""));
    spanQuantity.text("Quantity: " + (currentQuantity + 1));
}

function createNewItem(nama, harga) {
    var totalItem = harga;
    var itemBaru = $("<li class='list-group-item d-flex justify-content-between align-items-center'>" +
        nama +
        "<span class='total'>Rp" + totalItem.toFixed(1) + "</span>" +
        "<span class='quantity'>Quantity: 1</span>" +
        "<button class='btn btn-danger' onclick='hapusDariInvoice(\"" + nama + "\")' style='background: transparent; border: none;'>" +
        "<img src='/assets/img/bin.png' alt='Hapus' style='width: 20px; height: 20px;'>" +
        "</button>" +
        "</li>");

    $("#invoice").append(itemBaru);
}

function hapusDariInvoice(harga) {
    $("#invoice li:contains('" + harga + "')").remove();
    hitungTotal();
}

var totalAkhir;

function hitungTotal() {
    var jumlahTotal = 0;
    var tarifPajak = 0.11;

    $("#invoice li").each(function () {
        var hargaText = $(this).find(".total").text().replace("Rp", "");
        var quantityText = $(this).find(".quantity").text().replace("Quantity: ", "");
        var harga = parseFloat(hargaText);
        var quantity = parseInt(quantityText);

        jumlahTotal += harga * quantity;
    });

    var pajak = jumlahTotal * tarifPajak;
    totalAkhir = jumlahTotal + pajak;

    $("#totalAmount").text("Jumlah Total: Rp" + totalAkhir.toFixed(2));
    $("#tax").text("Pajak: " + pajak.toFixed(2));

}

function payment() {
    window.print();
}


function showSearchInputGroup() {
    var searchInputGroupContainer = document.getElementById('searchInputGroupContainer');
        if (searchInputGroupContainer.style.display === 'none') {
            searchInputGroupContainer.style.display = 'block';
        } else {
            searchInputGroupContainer.style.display = 'none';
        }
    }

    function changeText(text) {
        $('#dropdownMenu2').text(text);
    }