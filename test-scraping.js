const HyperplanningService = require('./src/services/scrapping.js');

async function testScraping() {
    const scraper = new HyperplanningService();
    
    try {
        const courses = await scraper.fetchScheduleData("QvxhUH5BZ5vcwYRv");
        console.log("Cours trouvés:", courses);
    } catch (error) {
        console.error("Erreur:", error);
    }
}

testScraping();