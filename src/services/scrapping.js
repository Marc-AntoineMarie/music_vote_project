const axios = require('axios');

async function fetchPanelInformations() {
    try {
        const payload = {
            id: "PA3",
            init: true
        };

        const response = await axios.post(
            'https://paris-02-2.hyperplanning.fr/hp/appelpanneauinformations', 
            JSON.stringify(payload), 
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        );
        
        console.log('Réponse :', JSON.stringify(response.data, null, 2));
        return response.data;
    } catch (error) {
        console.error('Erreur:', error.message);
    }
}

// Pour tester
fetchPanelInformations();