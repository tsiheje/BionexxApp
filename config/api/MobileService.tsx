import config from "../config";

interface CueilleurResponse {
  //cueilleurPrincipal: Cueilleur | null;
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
      return data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Erreur réseau :", error.message);
        throw new Error("Erreur réseau. Veuillez réessayer.");
      }
      throw error;
    }
  },
};

export default CueilleurService;