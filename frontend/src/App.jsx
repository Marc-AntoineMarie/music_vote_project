import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { fetchPanelInformations } from './services/hyperplanning'
import refreshData from './atoms/button'

function App() {
  const [hyperplanningData, setHyperplanningData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await fetchPanelInformations();
        setHyperplanningData(result);
        console.log('Données reçues:', result);
      } catch (error) {
        console.error('Erreur lors du chargement:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, []);

  if (loading) return <div>Chargement des données...</div>;
  
  if (error) return <div>Erreur: {error}</div>;

  return (
    <>
      
      {/* Affichage des données brutes */}
      <div style={{ margin: '20px 0', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
        <h2>Données Hyperplanning (brutes)</h2>
        <pre style={{ 
          background: '#f5f5f5', 
          padding: '15px', 
          borderRadius: '4px', 
          overflow: 'auto',
          fontSize: '12px',
          textAlign: 'left'
        }}>
          {hyperplanningData ? JSON.stringify(hyperplanningData, null, 2) : 'Aucune donnée'}
        </pre>
      </div>

      {/* Section pour les cours */}
      <div style={{ margin: '20px 0', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
        <h2>Liste des Cours</h2>
        {hyperplanningData?.listeCours?.length > 0 ? (
          <div>
            <p>Nombre de cours: {hyperplanningData.listeCours.length}</p>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
              <thead>
                <tr style={{ backgroundColor: '#f0f0f0' }}>
                  <th style={{ border: '1px solid #ddd', padding: '8px' }}>Horaires</th>
                  <th style={{ border: '1px solid #ddd', padding: '8px' }}>Matière</th>
                  <th style={{ border: '1px solid #ddd', padding: '8px' }}>Enseignant</th>
                  <th style={{ border: '1px solid #ddd', padding: '8px' }}>Salle</th>
                  <th style={{ border: '1px solid #ddd', padding: '8px' }}>Public</th>
                </tr>
              </thead>
              <tbody>
                {hyperplanningData.listeCours.map((cours, index) => (
                  <tr key={index}>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{cours.horaires}</td>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{cours.matiere}</td>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{cours.enseignant}</td>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{cours.salle}</td>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{cours.public}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div>
            <p>📅 Aucun cours prévu pour aujourd'hui</p>
            <p>Les prochains cours seront affichés demain !</p>
          </div>
        )}
        <button onClick={refreshData} style={{ marginTop: '10px', padding: '8px 16px' }}>
          🔄 Actualiser les cours
        </button>
      </div>

    </>
  )
}

export default App