import config from "../config";


interface CueilleurResponse {
  // cueilleurPrincipal: Cueilleur | null;
  totalPoids: number;
}

const CueilleurService = {
  async getInfoCueilleur(code: string): Promise<CueilleurResponse> {
    try {
      const response = await fetch(`${config.apiUrl}/InfoCueilleur/${code}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Erreur : ${response.status} - ${response.statusText}`);
      }

      const data: CueilleurResponse = await response.json();
      return data; // Données du cueilleur et poids total
    } catch (error) {
      console.error("Erreur lors de la récupération des informations du cueilleur :", error);
      throw error; // Propager l'erreur pour la gérer dans le composant
    }
  },
};

export default CueilleurService;
