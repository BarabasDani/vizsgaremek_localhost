const { Builder, By, Key, until } = require('selenium-webdriver');

async function runTest(driver, browserName) {
    try {
        // Nyisd meg a weboldalt
        await driver.get('http://localhost:3000/');

        // Töltsd ki az űrlapot
        await driver.findElement(By.id('loginEmail')).sendKeys('admin@admin.hu');
        await driver.findElement(By.id('loginPassword')).sendKeys('123456aA', Key.RETURN);

        // Várjuk meg, amíg az oldal átirányít
        await driver.wait(until.urlContains('/admin.html'), 10000);

        // Ellenőrizzük az átirányított oldalt
        const currentUrl = await driver.getCurrentUrl();
        if (currentUrl.includes('/admin.html')) {
            console.log(`A teszt sikeres ${browserName} böngészőben, sikeresen beléptünk a /admin.html oldalra!`);
        } else {
            console.error(`Hiba történt ${browserName} böngészőben, nem sikerült belépni a /admin.html oldalra.`);
        }
    } catch (error) {
        console.error(`Hiba történt ${browserName} böngészőben:`, error);
    } finally {
        // Ne felejtsük el bezárni a böngészőt
        await driver.quit();
    }
}

async function runTests() {
    // Az egyes böngészők inicializálása
    const chromeDriver = await new Builder().forBrowser('chrome').build();
    const firefoxDriver = await new Builder().forBrowser('firefox').build();
    const edgeDriver = await new Builder().forBrowser('MicrosoftEdge').build();

    try {
        // A tesztek párhuzamos végrehajtása Promise.all segítségével
        await Promise.all([
            runTest(chromeDriver, 'Chrome'),
            runTest(firefoxDriver, 'Firefox'),
            runTest(edgeDriver, 'Microsoft Edge')
        ]);
    } catch (error) {
        console.error('Hiba történt a tesztek során:', error);
    }
}

runTests();