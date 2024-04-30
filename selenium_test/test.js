const { Builder, Browser, By, Key, until } = require('selenium-webdriver');

async function runTest() {
    // Indítsuk el a Chrome-ot
    let driver = await new Builder().forBrowser('chrome').build();

    try {
        // A web alkalmazás megnyitása
        await driver.get('http://localhost:3000/');

        // A bejelentkezés form kitöltése
        await driver.findElement(By.id('loginEmail')).sendKeys('admin@admin.hu'); // a felhasználónév/email mező kitöltése
        await driver.findElement(By.id('loginPassword')).sendKeys('123456aA', Key.RETURN); // a jelszó mező kitöltése

        // Várjuk meg, amíg az oldal átirányít (10 másodperce van jelen esetbe állítva)
        await driver.wait(until.urlContains('/admin.html'), 10000);

        // Ellenőrizzük le az átirányított oldalt
        const currentURL = await driver.getCurrentUrl(); // ezzel kinyerjük a jelenlegi URL-t
        if (currentURL.includes('/admin.html')) {
            console.log('A teszt sikeres, sikeresen beléptünk a /admin oldalra!'); // Ha sikerült belépni, akkor ez a teszt eredménye
        } else {
            console.log('Hiba történt a teszt során, nem sikerült belépni a /admin.html oldalra!'); // Ha nem sikerült belépni, akkor ez a teszt eredménye
        }
    } catch (error) {
        console.log(error); // Ha hibát kapunk, akkor az kiírjuk a konzolra
    } finally {
        // A teszt lefutása után a böngésző bezárása
        await driver.quit();
    }
}

runTest();