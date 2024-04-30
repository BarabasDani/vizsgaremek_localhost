// alkatreszek lekérdezése
async function fetchAlkatreszek() {
    const response = await fetch('/alkatresz');
    const alkatreszek = await response.json();

    kirajzol(alkatreszek);
}

function kirajzol(alkatreszek) {
    let alkatreszHTML = '<h1 class="mt-2 mb-2 centered">Alkatrészek</h1>';
    for (let alkatresz of alkatreszek) {
        const price = alkatresz.price === '' ? '0' : `${alkatreszek.price}`;

        alkatreszHTML += `
            <div class="col-xl-3 col-md-4 col-sm-6 my-2">
                <div class="card bg-dark text-white my-2 h-100">
                    <div class="card-header">
                        <img src="/images/${alkatresz.image}" alt="${alkatresz.name}" title="${alkatresz.name}" class="img img-fluid img-thumbnail mx-auto d-block">
                    </div>
                   <div class="card-body">
                        <h6>Termék neve:  ${alkatresz.name}</h6>
                        <h6>Termék ára:  ${alkatresz.price}Ft</h6>
                        <h6>Termék darabszáma:  ${alkatresz.stock} </h6>
                    </div>
                    <div class="card-footer">
                        <button class="btn btn-outline-danger me-2" onclick="deleteAlkatresz(${alkatresz.productid})"><i class="fa-solid fa-trash"></i></button>
                        <button class="btn btn-warning" onclick="editAlkatresz(${alkatresz.productid})"><i class="fa-solid fa-pen"></i></button>
                    </div>
                </div>
            </div>
        `
    }

    document.getElementById('alkatresz-list').innerHTML = alkatreszHTML;
}

// alkatresz felvétele
document.getElementById('create-alkatresz').onsubmit = async function (event) {
    event.preventDefault();

    const name = event.target.elements.name.value;
    const price = event.target.elements.price.value;
    const stock = event.target.elements.stock.value;
    const image = event.target.elements.image.files[0];

    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('stock', stock);
    formData.append('image', image);

    const res = await fetch('/alkatresz', {
        method: "POST",
        body: formData
    });

    if (res.ok) {
        alert("Sikeres felvétel!");
        event.target.elements.name.value = null;
        event.target.elements.price.value = null;
        event.target.elements.stock.value = null;
        fetchAlkatreszek();
    } else {
        alert("Hiba a felvétel során!");
    }
}

// alkatresz törlése
async function deleteAlkatresz(id) {
    const confirmed = confirm("Biztosan törölni szeretnéd?");

    if (!confirmed) {
        return;
    }

    const res = await fetch(`/alkatresz/${id}`, {
        method: "DELETE"
    });

    if (res.ok) {
        alert("Sikeres törlés!");
        fetchAlkatreszek();
    } else {
        alert("Hiba a törlés során!");
    }
}

// --- alkatresz szerkesztése ---

// modal ablak mutatása, és a megfelelő id eltárolása a modal-on belül
async function editAlkatresz(id) {
    const res = await (fetch(`/alkatresz/${id}`));
    const dataFromFetch = await res.json();

    const name = dataFromFetch[0].name;
    const price = dataFromFetch[0].price;
    const stock = dataFromFetch[0].stock;

    document.getElementById('editName').value = name;
    document.getElementById('editPrice').value = price;
    document.getElementById('editStock').value = stock;

    // ---
    // itt hozzáadjuk a alkatresz id-ját a modal ablak attribútumaihoz
    // ---
    const modal = new bootstrap.Modal(document.getElementById('updateAlkatreszModal'));
    const productID = document.getElementById('updateAlkatreszModal');
    productID.setAttribute('data-productID', id);
    modal.show();
}

// a backend-el való kapcsolatfelvétel
async function updateAlkatreszData() {
    const modalElements = document.getElementById('updateAlkatreszModal');
    const id = modalElements.getAttribute('data-productID');
    const modal = bootstrap.Modal.getInstance(modalElements);

    const name = document.getElementById('editName').value;
    const price = document.getElementById('editPrice').value;
    const stock = document.getElementById('editStock').value;
    const image = document.getElementById('editImage').files[0];

    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('stock', stock);
    formData.append('image', image);

    const res = await fetch(`/alkatresz/${id}`, {
        method: "PUT",
        body: formData
    });

    if (res.ok) {
        modal.hide();
        alert("Sikeres módosítás!");
        fetchAlkatreszek();
        resetInput();
    }
    else {
        alert("Hiba a szerkesztés során!");
    }
}

// modal ablak beviteli mezőinek kiürítése
function resetInput() {
    document.getElementById('editName').value = '';
    document.getElementById('editPrice').value = '';
    document.getElementById('editStock').value = '';
}

// keresés a alkatreszek között
document.getElementById('searchingForm').onsubmit = async function (event) {
    event.preventDefault();

    const searching = event.target.elements.searching.value;

    const res = await fetch('/searching', {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({ searching })
    });

    const alkatreszek = await res.json();



    if (alkatreszek.length === 0) {
        document.getElementById('alkatresz-list').innerHTML = '<h3 class="text-center m-4">Nincs találat</h3>';
    }

    else {
        kirajzol(alkatreszek);
    }
}