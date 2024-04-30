// bejelentkezett felhasználó email címének lekérdezése
async function getUserEmail() {
    try {
        const response = await fetch('/getUserEmail');
        const data = await response.json();
    } catch (error) {
        console.error("Hiba az e-mail cím kérése során:", error);
    }
}


async function fetchAlkatreszek() {
    const response = await fetch('/alkatresz');
    const alkatreszek = await response.json();
    let alkatreszHTML = '<h1 class="mt-2 mb-2 centered">Alkatrészek</h1>';
    for (let alkatresz of alkatreszek) {
        const price = alkatresz.price === '' ? '0' : `${alkatresz.price}`;
        alkatreszHTML += `
            <div class="col-xl-3 col-md-4 col-sm-6 my-2">
                <div class="card bg-dark text-white my-2 h-100">
                    <div class="card-header">
                        <img src="../images/${alkatresz.image}" alt="${alkatresz.name}" title="${alkatresz.name}" class="img img-fluid img-thumbnail mx-auto d-block">
                    </div>
                     <div class="card-body">
                      <h6>Termék neve:  ${alkatresz.name}</h6>
                        <h6>Termék ára:  ${alkatresz.price}Ft</h6>
                        <h6>Termék darabszáma: ${alkatresz.stock}</h6>
                        
                    </div>
                    <div class="card-footer" id=${alkatresz.productid}>
                         
                         <button class="btn btn-outline-light me-2" type="button" onclick="cart(${alkatresz.productid})"><i class="fa-solid fa-cart-plus style="font-size: 20pt;"></i>
                        
                    </div>
                </div>
            </div>
        `;
    }

    document.getElementById('alkatresz-list').innerHTML = alkatreszHTML;
}

// keresés a alkatrészek között
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
        let alkatreszHTML = '<h1 class="mt-2 mb-2 centered">Alkatrészek</h1>';
        for (let alkatresz of alkatreszek) {
            const price = alkatresz.price === '' ? '0' : `${alkatresz.price}`;

            alkatreszHTML += `
            <div class="col-xl-3 col-md-4 col-sm-6 my-2">
                <div class="card bg-dark text-white my-2 h-100">
                    <div class="card-header">
                        <img src="../images/${alkatresz.image}" alt="${alkatresz.name}" title="${alkatresz.name}" class="img img-fluid img-thumbnail mx-auto d-block">
                    </div>
                    <div class="card-body">
                      <h6>Termék neve:  ${alkatresz.name}</h6>
                        <h6>Termék ára:  ${alkatresz.price}Ft</h6>
                        <h6>Termék darabszáma: ${alkatresz.stock}</h6>
                    </div>
                    <div class="card-footer" id=${alkatresz.id}>
                    <button class="btn btn-outline-light me-2" type="button" onclick="cart(${alkatresz.productid})"><i class="fa-solid fa-cart-plus style="font-size: 20pt;"></i>

                    </div>
                </div>
            </div>
        `
        }

        document.getElementById('alkatresz-list').innerHTML = alkatreszHTML;
    }
}

// a kosár modal ablak megjelenítése
function cart(productID) {
    const modal = new bootstrap.Modal(document.getElementById('cartModal'));
    const id = document.getElementById('cartModal');
    id.setAttribute('data-productID', productID);
    modal.show();
}

// a rendelés elküldése
async function ordering() {
    const modalElements = document.getElementById('cartModal');
    const modal = bootstrap.Modal.getInstance(modalElements);
    const productID = modalElements.getAttribute('data-productID');

    const stock = document.getElementById('stock').value;
    //console.log(productID, stock);
    const res = await fetch(`/ordering/${productID}`, {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({ stock })
    })

    const data = await res.json();

    if (data.success) {
        modal.hide();
        buy(data.price, productID)
    } else {
        alert(`Csak ${data.available} db elérhető!`);
    }
}

async function buy(price, productID) {
    const modal = new bootstrap.Modal(document.getElementById('paymentModal'));
    const modalElement = document.getElementById('paymentModal');

    modalElement.setAttribute('data-price', price);
    modalElement.setAttribute('data-productID', productID);

    document.getElementById('amount').innerHTML = `${price} Ft`;
    modal.show();
}

async function payment() {
    const modalElements = document.getElementById('paymentModal');
    const modal = bootstrap.Modal.getInstance(modalElements);
    const price = modalElements.getAttribute('data-price');
    const productID = modalElements.getAttribute('data-productID');

    const userID = document.getElementById('userID').value;

    const res = await fetch('/payment', {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({ price, productID, userID })
    });

    const data = await res.json();



    if (data.success) {
        modal.hide();
        alert("Sikeres vásárlás!");
        fetchAlkatreszek();
    }
}