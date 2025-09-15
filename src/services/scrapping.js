const axios = require('axios');

class HyperplanningService {
    constructor() {
        // URL de base pour les appels API (pas la page HTML)
        this.baseURL = 'https://paris-02-2.hyperplanning.fr/hp';
        this.sessionId = null;
    }

    async fetchScheduleData(identifiant) {
        try {
            // Récupérer la page d'accueil avec les cours
            const response = await axios.post(
                `${this.baseURL}/panneauinformations.html`,
                {
                    id: "PageAccueil",
                    identifiant: identifiant
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Cookie': 'ielang=1036'
                    }
                }
            );
            return this.parseScheduleData(response.data);
        } catch (error) {
            console.error('Erreur scrapping:', error);
            throw error;
        }
    }

    parseScheduleData(data) {
        const courses = [];
        // LIGNE PRÉCISE : Naviguer vers les cours dans le JSON
        const listeCours = data.dataSec?.data?.listeCours?.ListeCours || [];

        listeCours.forEach(cours => {
            const courseData = this.extractCourseInfo(cours);
            if (courseData) {
                courses.push(courseData);
            }
        });

        return courses;
    }

    extractCourseInfo(cours) {
        // LIGNES PRÉCISES : Extraire les informations de chaque cours
        const subject = cours.listeC?.find(c => c.G === 0)?.C?.L;      // Matière
        const teacher = cours.listeC?.find(c => c.G === 1)?.C?.[0]?.L; // Professeur
        const classroom = cours.listeC?.find(c => c.G === 3)?.C?.[0]?.L; // Salle
        
        if (!subject) return null;

        return {
            subject,
            teacher,
            classroom,
            position: cours.p,    // Position horaire
            day: cours.d,         // Jour
            color: cours.co,      // Couleur
            type: cours.G         // Type de cours
        };
    }
}

module.exports = HyperplanningService;