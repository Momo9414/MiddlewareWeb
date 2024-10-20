import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Livre() {
    const [title, settitle] = useState('');
    const [author, setauthor] = useState('');
    const [file, setfile] = useState(null);
    const navigate = useNavigate();

    // Fonction pour gérer les changements dans le formulaire
    const handleChange = (e) => {
        e.preventDefault();
        const { name, value, files } = e.target;

        if (name === 'title') {
            settitle(value);
        }
        if (name === 'author') {
            setauthor(value);
        }
        if (name === 'file') {
            setfile(files[0]); // Récupérer le fichier sélectionné
        }
    };

    // Fonction pour soumettre le formulaire
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Vérification de la sélection d'un fichier
        if (!file) {
            alert('Veuillez sélectionner un fichier avant de soumettre.');
            return;
        }

        try {
            const token = localStorage.getItem('authToken');

            // Création d'un objet FormData pour envoyer le fichier et les données
            const formData = new FormData();
            formData.append('nom', title);             // Ajouter le champ 'title'
            formData.append('proprietaire', author);   // Ajouter le champ 'author'
            formData.append('fichier', file);          // Ajouter le fichier PDF

            console.log('FormData à envoyer:', formData);

            // Envoyer la requête POST avec FormData et l'en-tête multipart
            const response = await axios.post('http://192.168.252.157:3000/fichier/ajouter', formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data' // Nécessaire pour l'envoi de fichiers
                },
            });

            console.log('Réponse du serveur:', response);

            if (response.status === 201) {
                alert('Document enregistré avec succès !');
                navigate('/'); // Rediriger après succès
            } else {
                alert('Erreur lors de l\'enregistrement du document.');
            }
        } catch (err) {
            console.error('Erreur lors de l\'envoi de la requête:', err);
            alert('Une erreur est survenue lors de la soumission.');
        }
    };

    return (
        <div className="hero-section_livre">
            <h1>Ajouter un Nouveau Document</h1>
            <form onSubmit={handleSubmit} className="form-container">
                <label>Titre du document :</label>
                <input type="text" name="title" required onChange={handleChange} />

                <label>Auteur :</label>
                <input type="text" name="author" required onChange={handleChange} />

                <label>Fichier :</label>
                <input type="file" accept=".pdf, .xls, .xlsx, .ppt, .pptx" onChange={handleChange} required name="file" />

                <button type="submit">Enregistrer</button>
            </form>
        </div>

    );
}

export default Livre;
