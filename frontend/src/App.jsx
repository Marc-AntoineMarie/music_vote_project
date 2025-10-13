// import { useState, useEffect } from 'react'
import "@radix-ui/themes/styles.css"
import './App.css'
// import {useState } from 'react';
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import CourseDetailPage from './pages/CourseDetailPage'

function App () {
  // const [data, setData] = useState(null)
  // const [loading, setLoading] = useState(false)
  // const [error, setError] = useState(null)

  // const chargerDonnees = async () => {
  //   setLoading(true)
  //   setError(null)
    
  //   // Gestion des erreurs / récup des donnees API
  //   try {
  //     // Utilise le proxy Vite configuré dans vite.config.js
  //     // L'API nécessite un POST avec des paramètres
  //     const response = await fetch('/api/hp/appelpanneauinformations', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         id: "PA3",
  //         init: true
  //       })
  //     })
      
  //     if (!response.ok) {
  //       throw new Error(`Erreur HTTP: ${response.status}`)
  //     }
      
  //     // Gestion des données reçues
  //     const result = await response.json()
  //     console.log('✅ Données reçues:', result)
  //     console.log('📚 Nombre de cours:', result.listeCours?.length || 0)
  //     setData(result)
  //   } catch (err) {
  //     console.error('❌ Erreur lors du chargement:', err)
  //     setError(err.message)
  //   } finally {
  //     setLoading(false)
  //   }
  // }


  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/cours/:courseId" element={<CourseDetailPage />} />
    </Routes>
   
    
    // affichage global de litteralement tout
    /* <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>📅 Hyperplanning - Emploi du temps</h1>
      
      <button 
        onClick={chargerDonnees} 
        disabled={loading}
        style={{ 
          padding: '10px 20px', 
          fontSize: '16px',
          cursor: loading ? 'not-allowed' : 'pointer',
          backgroundColor: loading ? '#ccc' : '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '5px'
        }}
      >
        {loading ? 'Chargement...' : 'Charger les données'}
      </button>
      
      {error && (
        <div style={{ 
          marginTop: '20px', 
          padding: '15px', 
          backgroundColor: '#ffebee', 
          color: '#c62828',
          borderRadius: '5px'
        }}>
          <strong>Erreur:</strong> {error}
        </div>
      )}
      
      {data && (
        <div style={{ marginTop: '20px' }}>
          <h2>📊 Données de l'API</h2>
          
          {/* Affichage des cours */
  //         {/* {data.listeCours && data.listeCours.length > 0 && ( */}
  //           <div style={{ marginBottom: '20px' }}>
  //             <h3>📚 Liste des cours ({data.listeCours.length})</h3>
  //             <table style={{ 
  //               width: '100%', 
  //               borderCollapse: 'collapse',
  //               marginTop: '10px'
  //             }}>
  //               <thead>
  //                 <tr style={{ backgroundColor: '#007bff', color: 'white' }}>
  //                   <th style={{ border: '1px solid #ddd', padding: '10px' }}>Horaires</th>
  //                   <th style={{ border: '1px solid #ddd', padding: '10px' }}>Matière</th>
  //                   <th style={{ border: '1px solid #ddd', padding: '10px' }}>Professeur</th>
  //                   <th style={{ border: '1px solid #ddd', padding: '10px' }}>Salle</th>

  //                   {/* chercher pourquoi les cours sont annulé par defaut ? */}

  //                   {/* <th style={{ border: '1px solid #ddd', padding: '10px' }}>Statut</th> */}
  //                 </tr>
  //               </thead>
  //               <tbody>
  //                 {data.listeCours.map((cours, index) => (
  //                   <tr key={index} style={{ 
  //                     backgroundColor: cours.labelAnnule ? '#ffebee' : 'white',
  //                     color: '#000' 
  //                   }}>
  //                     <td style={{ border: '1px solid #ddd', padding: '8px', color: '#000' }}>
  //                       {cours.deb} - {cours.fin}
  //                     </td>
  //                     <td style={{ border: '1px solid #ddd', padding: '8px', color: '#000' }}>
  //                       <strong>{cours.mat}</strong>
  //                     </td>
  //                     <td style={{ border: '1px solid #ddd', padding: '8px', color: '#000' }}>
  //                       {cours.prof?.join(', ') || 'N/A'}
  //                     </td>
  //                     <td style={{ border: '1px solid #ddd', padding: '8px', color: '#000' }}>
  //                       Salle {cours.sal?.join(', ') || 'N/A'}
  //                     </td>

  //                     {/* chercher pourquoi les cours sont annulé par defaut ? */}

  //                     {/* <td style={{ border: '1px solid #ddd', padding: '8px', color: '#000' }}>
  //                       {cours.labelAnnule ? '❌ ' + cours.labelAnnule : '✅ Confirmé'}
  //                     </td> */}
  //                   </tr>
  //                 ))}
  //               </tbody>
  //             </table>
  //           </div>
  //         {/* )} */}
          
  //         {/* Affichage JSON brut */}
  //         {/* <details style={{ marginTop: '20px' }}>
  //           <summary style={{ cursor: 'pointer', fontWeight: 'bold', color: '#000' }}>
  //             🔍 Voir les données brutes (JSON)
  //           </summary>
  //           <pre style={{ 
  //             background: '#f5f5f5', 
  //             padding: '15px', 
  //             borderRadius: '5px',
  //             overflow: 'auto',
  //             maxHeight: '400px',
  //             fontSize: '12px',
  //             color: '#000' // Texte noir
  //           }}>
  //             {JSON.stringify(data, null, 2)}
  //           </pre>
  //         </details>
  //       </div>
  //     )}
  //   </div>
  //   </>
  // ) */}  
  )
}

export default App;