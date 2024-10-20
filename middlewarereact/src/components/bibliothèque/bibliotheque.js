import axios from 'axios';
import { useEffect, useState } from 'react';
import { FaFilePdf, FaFilePowerpoint, FaFileExcel, FaFileAlt } from 'react-icons/fa';

function Bibliotheque() {
    const [livres, setLivres] = useState([]); // Stocker les livres ici
    const [isLoading, setIsLoading] = useState(true); // Gérer l'état du chargement
    const [error, setError] = useState(null); // Gérer les erreurs

    // Fonction pour récupérer les livres depuis l'API
    const fetchLivres = async () => {
        try {
            const token = localStorage.getItem('authToken');
            const response = await axios.get('http://192.168.252.157:3000/fichier/afficher', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setLivres(response.data); // Stocker les livres dans l'état
        } catch (error) {
            setError("Erreur lors de la récupération des livres.");
            console.error("Erreur lors de la récupération des livres:", error);
        } finally {
            setIsLoading(false); // Arrêter l'affichage du chargement
        }
    };

    // Utiliser useEffect pour appeler fetchLivres lorsque la page se charge
    useEffect(() => {
        fetchLivres();
    }, []);

    // Fonction pour déterminer l'icône en fonction de l'extension du fichier
    const getFileIcon = (fileName) => {
        if (!fileName) {
            return <FaFileAlt />; // Icône par défaut si le fichier n'est pas disponible
        }
        const extension = fileName.split('.').pop().toLowerCase();
        switch (extension) {
            case 'pdf':
                return <FaFilePdf />;
            case 'ppt':
            case 'pptx':
                return <FaFilePowerpoint />;
            case 'xls':
            case 'xlsx':
                return <FaFileExcel />;
            default:
                return <FaFileAlt />; // Icône générique pour les autres fichiers
        }
    };

    return (
        <div style={{ width: '100%', padding: '20px', backgroundColor: '#f0f0f0' }}>
            <h1 style={{ textAlign: 'center' }}>Bibliothèque</h1>
            <p style={{ textAlign: 'center' }}>Voici la liste des documents enregistrés.</p>

            {isLoading ? (
                <p>Chargement...</p> // Afficher un message de chargement si nécessaire
            ) : error ? (
                <p>{error}</p> // Afficher un message d'erreur en cas d'échec
            ) : (
                <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                    <thead>
                        <tr style={{ backgroundColor: '#00B67D', color: 'white', textAlign: 'left' }}>
                            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Icône</th>
                            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Titre</th>
                            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Auteur</th>
                            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Télécharger</th>
                        </tr>
                    </thead>
                    <tbody>
                        {livres.length > 0 ? (
                            livres.map((livre, index) => (
                                <tr key={livre.id} style={{ backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#fff' }}>
                                    <td style={{ padding: '10px', border: '1px solid #ddd' }}>{getFileIcon(livre.fichier)}</td>
                                    <td style={{ padding: '10px', border: '1px solid #ddd' }}><strong>{livre.nom}</strong></td>
                                    <td style={{ padding: '10px', border: '1px solid #ddd' }}>{livre.proprietaire}</td>
                                    <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                                        <a href={`http://192.168.252.157:3000/telecharger/${livre.fichier}`} target="_blank" rel="noopener noreferrer" style={{ color: '#00B67D', textDecoration: 'none' }}>
                                            Télécharger
                                        </a>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" style={{ padding: '10px', textAlign: 'center', border: '1px solid #ddd' }}>Aucun document trouvé.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default Bibliotheque;
